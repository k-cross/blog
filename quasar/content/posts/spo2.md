+++
title = "Pulse Oximeter Monitor Project"
excerpt = "Building a monitor for the Masimo RAD8 pulse oximeter"
date = 2021-03-08
updated = 2021-03-08
draft = false

[taxonomies]
categories = ["Engineering"]
tags = ["project","engineering"]

[extra]
lang = "en"
toc = true
comment = true
copy = true
math = true
mermaid = false
outdate_alert = false
display_tags = true
truncate_summary = false
+++

When the doctors left us with a medical device to monitor the blood oxygen levels of my newborn son, the less than desirable interface converted us into zombies.
Alerts beeped when SPO2 or BPM reached specific thresholds and nothing else.
The device, the _Masimo RAD8_ contains space to store data except no patient based mechanisms to read the results it collects.

It's crazy!
Medical professionals leave patients with a device where caregivers can't monitor nor track progress over long periods of time;
preventing the collection of valuable data doctors require to inform their decisions and care plans.
Placing the blame on doctors is unfair since these devices and their options are limited by supply and insurance companies.
The inconvenient part stems from infant pulse oximeters, either costing a small fortune for a medical grade one or non-medical grade ones not taken seriously by doctors.
We purchased the _wellvue_ which was an order of magnitude more convenient.
The battery operated machine lasted through the night, wireless, gathering data, and printed out summaries over single recording periods.
Data collection and reporting wasn't ideal but provided insight into the patient's overall progress, for example: patient was below 92% SPO2 for 12.5 minutes over a 10 hour period.
It was impossible to track the reliability of the device and the accuracy of the recorded measurements.
We ended up returning the device because of its unreliability and our doctors didn't trust it.

When our insurance company signed off on renting the _RAD8_, the pulmonary team was ecstatic, but the enthusiasm in my eyes quickly drained after figuring out how much of a burden it was to use.
The _RAD8_ advertises storing 72 hours worth of data but specialized software is required to retrieve it.
Visiting the doctors office to read data off the device with the given frequency wasn't sustainable.
The doctors expected us to record alerts by hand as they didn't mention any method for data retrieval.
Manual data recording is too error prone of a task, particularly when the best time to gather reliable information is when both patient and parent are sleeping.
This was worse in every way to the _Wellvue_, with the exception of its reliability.
I took action once noticing the serial interface on its back.

## Project Goals

The project had modest ambitions and I was on a timeline through the initial implementation cycle for this to be useful for my family.
It needed to:

1. record readings in a centralized system that can be queried
1. contain a web interface (in order to monitor and query from any device)
1. perform queries to answer questions about SPO2 levels
1. display live numerical readings (enables remote monitoring)

Recreating an interface similar to hospital displays was ideal but the need to get the basics completed to answer the doctors' questions outweighed those ambitions.
The extended goals:

- [x] graph historical data to get visual context showing trends
- [x] add live visualizations
- [ ] in-depth queries and query parameters
- [ ] extendible to include more medical grade pulse oximeters
- [ ] customizable data storage (MySQL / PostgreSQL / Mnesia)

## A Journey through a Proprietary Wonderland

After digging, Philips has a proprietary protocol named _vuelink_ that gives the most insightful data to read from the device.
With time short, I did not decode the protocol (wish I did).
Instead, I used the basic _ASCII_ standards which provided the basic yet important data: _BPM, SPO2, Perfusion Index_ over standard serial protocols.
_ASCII_ doesn't contain the _Signal IQ_ information that's viewable on the physical display as _SIQ_, measuring the confidence level of individual readings.
_SIQ_ makes me want to reverse engineer the _vuelink_ protocol, because it creates the possibility to filter for high confidence readings during analysis.
Watching these machines at hospitals, they display a variety of waveforms and display the changes to them indicating measurement stability.
That type of data would enable more sophisticated waveform analysis, but I needed something quick making it outside the project's scope.

The documentation describing device setup was less than desirable.
First, I had to figure out how to unlock it.
The medical supply company "set the prescription" and then do the wonderful work of locking the device.
This makes settings unadjustable, including the noise level of alerts.
These are loud and can wake up a sleeping infant which exacerbates existing medical issues when they need to rest.
Step one was getting the instruction manual and figuring out the crazy way to unlock the _RAD8_.
Next, the serial interface needed configuration to function properly.
Once accomplished, the official manual stated it take measurements every 500ms, which wasn't true.
I noticed this while analyzing data where my original calculations to get the duration of measurements was:

$$
duration = \frac{\sum_{reading=1}^{n} 1}{\frac{1_{reading}}{500_{ms}}} = \frac{numOfReadings}{readingRate}
$$

This result allowed us to generate the amount of time recorded directly, but it was a lie.
Checking the database timestamps, the _reading rate_ was actually $\frac{1_{reading}}{1_s}$...
It was a lot of fun to discover and tell the pulmonary doctors the wrong results for the first two days because of bad documentation 🤦🏻‍♂️.
There were other issues that were more pressing at the time which made me realize the incorrect calculation later than I would have liked.
You might be wondering, was it the polling rate?
No, the serial device is immediately read and asked for more information after it returns with a result, timing out at $5_s$ for a reading.
The last bit of proprietary fun came from the information display and error codes.
These were bit masks that were represented in ASCII as hexadecimal bit-masks.
I copied the common ones from a python project which was a great help in the creation of this application.

## Implementation Specifics

The project utilizes the Elixir programming language because of its immediate familiarity and its failure handling mechanisms.
The actor model that erlang provides to supervise processes is ideal for handling connection issues and retry logic.
With all the built-in features of erlang, reconnecting devices came for free because of the supervision strategies for processes!
The serial connection was handled under a supervised process so if disconnects or unhandled errors occur, the supervisor keeps retrying to restore the task to a stable state.
Users can use the device in the way they need to at the time they need to.
It doesn't matter if the device is turned off, unplugged, or can't communicate with the OS.
The supervisor keeps retrying and spins up new processes errors are encountered, repeatedly attempting to stabilize.

The `Nerves UART` library is used to handle serial connections.
Connecting to the _RAD8_ was simple since the only concern was finding the proper serial device to communicate with.
Using a heuristic that worked on both MacOS and Ubuntu, which was grabbing the last result in the list of serial devices achieved the goal.
If there are issues connecting to the RAD8, it will certainly be from this convenient hack.
Its purpose, automated connection handling upon reconnects since the serial device name can change.
Using the web framework `phoenix` was really straight forward and easy to utilize.
I wanted an excuse to use `liveview` in order to see how things worked to do server side rendering for the first time and that was its own adventure.
All of the logic designed into the web application is built around `phoenix liveview` and the charts and graphs were built using `contex` which generates an `svg`.

Testing and development was a pain at first.
It required having the physical device connected.
Building a fake data input system that randomly generates data was the best way to rapidly increase productively while still being able to use the _RAD8_.
The data storage mechanism was initially intended to be provided by the application directly via `Mnesia` which is an erlang backed database of sorts.
For the sake of speed, I had to forgo this choice and require that users setup a _Postgresql_ database instead.
Not requiring a RDBMS would have been awesome for simplicity but ultimately, anyone using this application is going to need to be savvy enough to install a RDBMS anyways.

## Retrospective on Technological Choices

Using Elixir was a good fit for the project overall.
It was reliable and has good integration with libraries that can talk with embedded hardware.
Using phoenix as the web framework was fine and honestly, probably any web framework would have been sufficient.
I was able to use `phoenix liveview` and dig my teeth into it for the first time.
I'm not a `javascript` developer and I prefer doing things on the backend so I've put off learning JS for a long time.
By using `liveview` I have been able to put off learning JS longer but honestly, I had to learn a lot more about a framework then I would have liked.
It wasn't particularly clear what I was doing at times and there's a lot of magic involved in variable naming and configuring things to work well with `liveview`.
I think overall it was faster to setup than running the frontend in JS but I don't know if I'll ever do that again.

To me, `liveview` seems to shine for server side control of visual updates and information.
This project was perfect because all I wanted to do was display and update information with minimal interaction.
If this were a project that needed a lot more frontend involvement, I would definitely choose JS over `liveview` simply because JS is the domain of the frontend.
No matter how much backend engineers want to complain about it and avoid it, JS is a very capable language in the environment it was intended to run in.
I say this with love for both sides, the `phoenix liveview` project is pretty incredible that backend developers have the ability to make more frontend things possible that are smooth and dynamic.
At the same time, is it really worth the effort of learning another framework with more limited use cases where an escape hatch into JS is needed for complex UI interactions?
Maybe, but after this project, if I need to do frontend work again it will most likely be in raw JS.
Overall, if I were to create a serious project that I intended to support long term, I'd be sticking with JS.
The case for `liveview` for me personally shines where the backend needs to control the frontend.
That said, the simplicity of having `liveview` for the management of this project was awesome.
The entire stack is in `Elixir` except for the generated JS that's run and served by `phoneix` itself.
It's pretty easy to make an IP address publicly exposed so asking a doctor to go to a particular link so they can get some updates or run some queries live is pretty trivial.

## Final Thoughts

This was built for my son to make his health care better and my family's lives easier.
I never got to fully appreciate all the features and work I put into it, but I tried to make something simple and useful for technically inclined kindred spirits alike.
These features were requested by others and I genuinely hope that they keep helping people in need.

I don't think people should need to have additional equipment and gear in order to get data from these devices, they need to be made with both doctors and patients in mind.
If I was harsh on the doctors in this article about this device, please know it was just about the recommended device and not an insult to their capability.
We had an incredible team of doctors that were all wonderful to interact with.
They were kind and caring and often went beyond the scope of their duties to make sure our son's needs were met.
All the hatred in this article is directed at medical institutions that treat patients as a cost of business instead of humans that need care.

This is probably as far as I'll go with the project, but I'll probably end up experimenting with some other strategies as a learning exercise which may enhance its reliability.
Unfortunately, due to the technical limitations of the project requiring users to buy a serial cable and setting up the RAD8, putting additional effort into the ease of use with software setup wouldn't enable any additional non-technical users.
In short, it's as easy as it's going to get but I wish it was accessible to a wider audience of patients and caregivers.
Thanks for visiting!

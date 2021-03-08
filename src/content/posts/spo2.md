---
layout: post
title: 'Pulse Oximeter Monitor Project'
author: [quasarken]
tags: ['Project','Software Engineering']
excerpt: 'Building a monitor for the Masimo RAD8 pulse oximeter'
date: '2021-03-05T15:11:55.000Z'
draft: true
---
When the doctors left us with a medical device to monitor the blood oxygen levels of my newborn son, it came with a less than desirable interface.
The alerts would beep when SPO2 or BPM reached certain thresholds and that was it.
The device itself was the _Masimo RAD8_.
It had a small amount of space for it to store data, but no patient based mechanisms to read it.

How crazy is that?
Medical professionals leave patients with a device that they have no hope to monitor nor track over long periods of time to get reliable data.
This prevents meaningful conversations with the same doctors that prescribed the device!
It's not necessarily their fault since they do not make these devices and their options are limited.
The inconvenient part stems from infant pulse oximeters, either costing a small fortune for a medical grade one or not taken seriously by doctors.
We had bought the _wellvue_ which was an order of magnitude more convenient.
It was battery operated which lasted through the night, mobile, recorded the data, and gave you a print out of each recorded period's results.
The data collection and reporting wasn't ideal but did provide insight into the patient's overall progress, for example: patient was below 92% SPO2 for 12.5 minutes over a 10 hour period.
Unfortunately, it was not possible to track the reliability of the device or to know when and which times it was recording things accurately.
For this reason and for a few others, we returned the device because we couldn't trust it and our doctors didn't trust it.
So when we started with the _RAD8_, the pulmonary team was ecstatic, but the enthusiasm in my eyes quickly drained after figuring out how much of a burden it was to use.
The _RAD8_ advertises that it will store up to 72 hours of data but you need to have specialized software to read from it.
Going to the doctors office so frequently to read data off the device wasn't sustainable.
The doctors seemed like they expected us to record alerts by hand as they didn't bother mentioning any additional methods that could be used to collect data.
Manual data recording would have been a really error prone task, particularly when the best time to gather reliable information was while sleeping for both patient and parent alike.
This was worse in every way to the _Wellvue_, with the exception of its reliability and how much more doctors could trust its results.
I decided to take action once I noticed it had a serial interface on its back.

## Project Goals

The project had modest ambitions and I was on a timeline through the initial implementation cycle for this to be useful for myself.
It needed to:

1. record readings in a centralized system that can be queried
1. contain a web interface (in order to monitor and query from any device)
1. perform queries to answer questions about SPO2 levels
1. display live numerical readings (enables remote monitoring)

Recreating something similar to hospital displays was ideal but the need to get the basics going in order to answer the doctors' questions outweighed those ambitions.
The extended goals:

- [x] graph historical data to get visual context showing trends
- [x] add live visualizations
- [ ] more in-depth queries and query parameters
- [ ] extendible to include more medical grade pulse oximeters
- [ ] customizable data storage (MySQL / PostgreSQL / Mnesia)

## A Journey through a Proprietary Wonderland

After some digging, Philips has a proprietary protocol named _vuelink_ that gives the most insightful data to read from the device.
I did not have time to figure out how to talk to it (wish I did).
Instead, I used the basic _ASCII_ standards which provided the most basic but important data: _BPM, SPO2, Perfusion Index_ over standard serial protocols.
Unfortunately it doesn't provide the _Signal IQ_ number that's shown on the physical display as _SIQ_, which is a measurement for the confidence level of a measurement.
This number makes me want to reverse engineer the _vuelink_ protocol, because it answers the question: can I trust this measurement?
By answering that, it's possible to filter out bad readings only including high confidence data in analysis.
Watching these machines connected to Philips hardware at hospitals, you'll also notice that they look at waveforms and look at the sudden changes of waveforms to indicate reliability.
Having that type of data would have enabled more sophisticated waveform analysis, but I needed something quick making it outside the project's scope.

The documentation describing device setup was less than desirable.
First, I had to figure out how to unlock it.
The medical supply company "set the prescription" and then do the wonderful work of locking the device.
This means that you can't adjust any of the settings including the noise level of alerts.
These are loud and can wake up a sleeping infant which exacerbates existing issues when they need to rest.
So the first thing that had to happen was getting the instruction manual and figuring out the crazy way to unlock the device in order to change its settings.
During this process, setting up the serial interface was the next step.
Once that was accomplished, the official manual said that it would provide a reading every 500ms which it didn't.
I figured this out once getting to the analysis of data, but on my original calculations to get the duration of measurements was:

$$
duration = \frac{\sum_{reading=1}^{n} 1}{\frac{1_{reading}}{500_{ms}}} = \frac{numOfReadings}{readingRate}
$$

This result allowed us to generate the amount of time recorded directly, but it was a lie.
Checking the database timestamps, the _reading rate_ was actually $\frac{1_{reading}}{1_s}$...
It was a lot of fun to discover and tell the pulmonary doctors the wrong results for the first two days because of bad documentation 🤦🏻‍♂️.
There were other issues that were more pressing at the time which made me realize the incorrect calculation later than I would have liked.
You might be wondering, was it the polling rate?
No, the serial device is immediately read and asked for more information after it returns with a result, timing out at $$5_s$$ for a reading.

## Implementation Specifics

I decided to pursue the project utilizing the Elixir programming language because I had been working in it for some time and it also has a great way to handle failures.
The actor model that erlang provides to supervise processes was ideal for handling connection issues and retry logic.
With all the built-in features of erlang, reconnecting devices basically came for free because of the supervision strategies for processes!
The serial connection was handled under a supervised process so if any disconnects or errors happened, the supervisor would keep retrying even when the process encounters unhandled errors.
This was ideal because users can use the device in the way they need to at the time they need to.
It didn't matter if the device was turned off, unplugged, or couldn't sync for some OS reason.
The supervisor would just keep retrying and spin up new processes as they encountered errors.
The `Nerves UART` library was used to handle the serial connections.
This made connecting to the _RAD8_ really simple since the only concern I had to deal with was finding the proper serial device to connect to.
This was done by using a heuristic that worked on both MacOS and Ubuntu, which was grabbing the last result in the list of serial devices.
If there are any issues with connecting to the RAD8, it will certainly be at this heuristic since its just a hack.
This hack is convenient because in the event the device disconnects then reconnects, the serial device name can change.
Using the web framework `phoenix` was really straight forward and easy to utilize.
I wanted an excuse to use `liveview` in order to see how things worked to do server side rendering for the first time and that was its own adventure.
All of the logic designed into the web application is built around `phoenix liveview` and the charts and graphs were built using `contex` which generates an `svg`.

Testing and development was a pain at first.
It required having the physical device connected.
Building a fake data input system that randomly generates data was the best way to rapidly increase productively while still being able to use the _RAD8_.

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
I say this with love for both sides, the `phoenix liveview` project is pretty incredible that we have the ability to make more frontend things possible that are smooth and dynamic.
At the same time, is it really worth the effort of learning another framework with more limited use cases where an escape hatch into JS is needed for complex UI interactions?
Maybe, but after this project, if I need to do frontend work again it will most likely be in raw JS.
Overall, if I were to create a serious project that I intended to support long term, I'd be sticking with JS.
The case for `liveview` for me personally shines where the backend needs to control the frontend.
That said, the simplicity of having `liveview` for the management of this project was awesome.
The entire stack is in `Elixir` except for the generated JS that's run and served by `phoneix` itself.
It's pretty easy to make an IP address publicly exposed so asking a doctor to go to a particular link so they can get some updates or run some queries live is pretty trivial.

## Final Thoughts

If you're interested in the project, it's [here](https://github.com/k-cross/pulse_oximeter).
It was built for my son to make his health care better and our lives easier.
I never got to fully appreciate all the features and work I put into it, but I tried to make something simple and useful for technically inclined kindred spirits alike.

You shouldn't need to have additional equipment and gear in order to get data from these devices, they need to be made with both doctors and patients in mind.
If I was harsh on the doctors in this article about this device, please know it was just about the recommended device and not an insult to their capability.
We had an incredible team of doctors that were all wonderful to interact with.
They were kind and caring and often went beyond the scope of their duties to make sure our son's needs were met.
All the hatred in this article is purely directed at medical institutions that treat patients as a cost of business instead of humans that need care.

This is probably as far as I'll go with the project, but I'll probably end up experimenting with some other strategies as a learning exercise which may enhance its reliability.
Unfortunately, due to the technical limitations of the project requiring users to buy a serial cable and setting up the RAD8, putting additional effort into the ease of use with software setup wouldn't enable any additional non-technical users.
In short, it's as easy as it's going to get but I wish it was accessible to a wider audience of patients and caregivers.
Thanks for visiting!

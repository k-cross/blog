+++
title = "Effective Software Engineering Processes"
description = "Using research to review software engineering processes"
date = 2020-07-14
draft = true

[taxonomies]
categories = ["Engineering"]
tags = ["research","engineering"]

[extra]
lang = "en"
toc = true
comment = true
copy = true
math = false
mermaid = false
outdate_alert = false
display_tags = true
truncate_summary = false
+++

Software engineering processes have traditionally been applied as a series of anecdotes based on the _well-formed_ evidence of personal experiences and conjecture.
As engineers being trained in the scientific method, we should be better.
Reading _Making Software: What Really Works and Why We Believe It_ was inspiring and as such began to dig into more of the research to see how it can be used to modernize the software engineering process.
Many of these studies are biased towards either large organizations or large code bases rather than small startups that are rapidly prototyping and building.
That said, I will call out the areas that I think largely wouldn't apply to early stage projects or startups.

## Software Design - The Composition of Code

How does the shape of code impact a project?

### Is the Pen Mightier than the Sword?

How much architecture is too much?
Basically the argument here is the cost of getting things right the first time versus the cost of getting things wrong.
Getting things wrong in smaller code bases tends to be cheap and more cost effective to fix things as you go.
I personally hate this but the evidence is pretty clear.
I'd add a specific caveat here that was not studied, is that some things tend to be more critical than others and as such should be weighted differently in terms of software correctness and robustness.
In contrast to large projects, the cost of getting things wrong is very high because there is a lot more effort to coordinate changes and testing tends to be much more complex.

### The Modesty of Modules

Another topic was about the modularity of code and its impact on development.
The consensus was clear that breaking up code into modular and logical blocks is a better approach because it leads to a clearer and more explicit architecture.
Another benefit about modularity was that the additional clarity led to fewer software faults.
The best modules are the ones that handle very specific subsystems that are logically consistent with the rest of the application.
The most error prone modules are the ones where the context of their use is not clear and so they end up being used everywhere.
The idea here is that since the module ends up having many purposes, it will be used in many places that all have different contexts and so the assumptions about the inner-workings of the module are different for each subsystem using it.

### The Case Against DRY

Using code that repeats itself in various places throughout a project is often seen as something to be avoided but research suggests that's only true about half the time.
There are cases where using DRY (Don't Repeat Yourself) code ends up leading to more errors.
There are other cases where it makes sense to reduce the amount of duplicated code in order to prevent issues where changes in one place don't get reflected in the other.


## Collaboration - Well-Oiled Machines - Human to Human Interface

Collaborating is a major part of both open source and commercial software development.
Understanding the effectiveness of tools and techniques for collaboration are valuable because their effects are multiplicative.
The way collaboration occurs affects product quality, organization productivity, and the software's physical design.

### Code Reviews

Engineer's spend more time reading code than writing it, although that's not just due to reviews, it can certainly take up a good chunk of time.
Reviews can range from being very useful to just being authoritative rubber stamps to check off a requirement for a SOC2 auditor.
There are things the engineers can do as both authors and readers to improve the effectiveness of the review process.
First, as an author, reviews should contain a maximum between 200 to 500 changes.
Adding more than 500 changes and a review quickly begins to fall into the authoritative rubber stamp category, where less feedback is given and the code quality also suffers.
As both an author and reviewer, adding insight and getting context is incredibly valuable.
This creates the environment for reviewers to contribute to the logical context of what's being evaluated, actively improving the quality of the software.
Adding more than one person to a review has exponentially diminishing returns. (NOTE: add the numbers here but I think it's 90% of defects by one reviewer and 96% of defects with a team).
The only time a team should actually review an entire bundle of code is when it is critical or there is additional motive to doing so like learning about the design in order to actively collaborate.

### Pair Programming

Pair programming is beneficial in a lot of scenarios but less beneficial in others.
It can also be facilitated in a manner that can make it effective or ineffective.
First, let's define what pair programming is for the context of software collaboration.

// NOTE: review this
> It is the active design, development or review of code with a partner.

### The Affliction of Workspaces

For the last couple years I've heard no end to the rant about how open office environments are bad and not conducive to work.
I've also heard that cubicles were better.
Unfortunately the research suggests something different altogether.
If you need to be thinking deeply and focused where there is little collaboration needed towards an end result, then an isolated room is best.
If you have a high need for collaboration, then an open office style is far more conducive to this type of work.
Bad new for cubicle lovers is that the research shows they are bad for both focused and collaboration work.
These conclusions were drawn from the chapters _code talkers_ and _communal workspaces_.

### Conway's Law

NOTE: Do more research on how git has affected teams.

In _Making Software_, the chapter on Conway's law is particularly interesting.
It reads:

> A software's communication structure is bound to be duplicated by the organization's communication structure.

Basically, the research there shows that by trying to make sure that teams, software design, and the organization at large all share the same style of communications.
Breaking these communication structures results in a loss of productivity.

### Productivity

Back in 2014 I remember reading a bunch of material that happened to show up in my article feeds mentioning that Tuesday was the most productive day.
After doing a little digging, it looks like this was provided by _Accoutemps_ which looks very much like a marketing push of some sort.
The data came from surveys which begs the question, how are people actually measuring productivity?
A survey would just be the result of the days people feel the most productive rather than hard data.

With this in mind and over the course of the last year, the average number of commits/day on the team I worked on was.

| Mon  | Tue  | Wed  | Thu  | Fri  |
| 5.29 | 7.14 | 7.31 | 5.98 | 7.25 |

Wednesdays being the most productive comes as a no surprise to me because we have _no-meetings_ at that time.
Fridays tend to be the next most productive day which I actually think is false since it's extremely spikey in nature, as is Monday, due to things like Code Freeze when everyone is scrambling to meet artificial deadlines.

## Quality

There has been a lot of research into the who, what, why, where, and how software bugs come from and what kind of things can be done about it.
The aggregation of these results in different settings and domains seems to be in order to further progress our quality efforts.

### Test Driven Disaster

The _test-driven development_ (TDD) approach to software engineering has been shown to be ineffective throughout a _systematic review_ (impressive!) of the research as described in (TDD Chapter in Making Software).
The benefits that it does list are an improvement in software design at the micro-level at the expense of the macro level and increasing the number of unit tests.
The issues with increasing unit test coverage are that the vast majority of software faults are not discovered through unit tests, they are discovered through system level tests and are not particularly effective.
So if unit test coverage is not really helping us build correct designs then we should stop placing strong emphasis on them.
Code coverage turns out to be a poor metric for analyzing the number of faults new features will have.
The other issue is that the papers do not compare using the TDD approach against non-TDD for optimization tasks.
It's an issue because when optimization is the goal the only focus is at the micro level and thus I'm assuming that the results end up being negligible.
In short, using TDD is worse for the overall big picture and has significant defects to its general approach.

_Disclaimer: The research was conducted by someone biased towards someone in favor of TDD and I'm biased against TDD_

## Facebook Paper

The effect that a continuous delivery pipeline had on their mobile engineering team was impressive!
General developer velocity did not increase by implementing a continuous delivery pipeline but their software quality did improve due to the effect that long release cycles had on the team.
Basically, when a release was nearing, everyone would rush to finish their features and skip more quality checks than what they might ordinarily develop with.
By increasing the release frequency, the software quality improved because missing a release was not a big deal.
Since the increase in product quality leads to a smaller defect rate, developers did gain more time to deal with their tasks rather than waste effort on additional test cycles.
By going from a waterfall release cycle type model to a continuous deployment model, they had to make test automation a priority in order to achieve this goal.
Adding tooling and adjusting parameters with the release process, they were able to both reduce the amount of process required cutting down on coordination efforts while simultaneously releasing features at the time of completion, at a higher quality.
This did not measure and negative effects by changing the process.
Basically, the expectation here is that quality will improve and product management will be able to measure feature effectiveness quicker and course correct more often.
There is a lot of upfront cost to doing this in a mobile application environment which is what the paper was about, but everything stated seems as if it would apply equally to the web and with less upfront costs on tooling and process changes.

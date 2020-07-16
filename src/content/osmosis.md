---
layout: post
title: 'Osmosis Driven Development'
author: [quasarken]
tags: ['Opinion','Software Engineering']
excerpt: 'A review of the team collaboration process'
date: 2018-10-29T07:59:41-07:00
modified: 2020-07-16T00:06:38-07:00
draft: false
---
Once upon a time in a magical world where all tasks are well defined, performing task $$Y$$ or implementing feature $$X$$ is a simple matter of doing;
In this world, only the current state of the feature needs to be communicated.
A product manager could tell the sales team what engineering was capable of performing based on raw metrics and create hard deadlines, meaningful to customers.
Time is used as a means to measure progress and productivity, two clear indicators that show how hard people are working.

Back down to reality though, there's a lot of grey area.
Communication has been the most effective tool in the art of creating effective deliverables.
It may also be one of my weakest skills.
Originally upon entering the industry, it's importance was unclear and the assumption that product _stories_ would be well-defined is often invalid in a startup or greenfield project.
Distributing customer feedback is critical as is communicating to the members who communicate to those customers.
If expectations are not properly managed, it makes life stressful for all involved.

What is it that can be applied to situation _X_ that would make desired outcomes more effective or accelerated.
The solution is not more meetings but rather, determining what's useful then providing that knowledge in a format that's easily consumable.
Gauging what an audience needs to hear and presenting technical information in an understandable way will provide insight to other organization functions.
The increased communication may bring possible solutions or demonstrate bottlenecks, some of which may be non-technical, but its real power is the ability to persuade.
Demonstrating to product management why a particular feature is harder to build than expected or explaining why changing the shape of production data without certainty is a bad idea, could encourage people who are in a position to fight or push back deadlines to do just that.

## Minimum Valuable Product

This infamous term is meaningful in the context of a small product that barely exists in production.
Building an _MVP_ is hard, from an engineering standpoint it requires compromises of other features and functionality.
Understanding what's definitely coming down the pipeline can accelerate future production, but that's not what the _MVP_ is.
Understanding the compromises to get base functionality is also something any good engineer should already be doing.
For major feature requests, often they require most of the work to be done upfront anyway.
Shaving off a week for a major feature that takes a few months to build is pretty small in the grand scheme of things and is often done in effort to ship things quickly and get feedback ASAP.

The problem is that an _MVP_ often applies to a special case of the problem.

* Base case is the core function of the feature which might be the less commonly used case but required for other cases.
* Special case is less generic and may be simpler or more complex than the base case.

In the stance of a special case, the base case is often required to be built anyways to have the scaffolding ready for other features.
If the special case is built without regard to the base case then a lot of duplicated effort occurs.
The other problem with building in such a manner is that the shape of data that might need to be stored will be far less defined which creates significant overhead for future migrations and cognitive effort to dig out of a data hole.
Unless the startup is brand new or there is minimal effort required in shifting directions, then the _MVP_ makes sense, otherwise it's just not a useful way to build software on a large project in production.

## Builder's Conundrum

This probably has a name in some management textbook somewhere, but let's call it the _builder's conundrum_.
A problem by which the _builder_ creates something to be consumed in a domain which the _builder_ is unfamiliar.
Imagine being new to a very large code base and being assigned a critical new feature and given a hard deadline.
Progress must be made, but the implications of design choices might be longer lasting, particularly the ones around data or new API endpoints.
It's unclear how APIs might be used by customers but it's also unfortunate when the shape of production data is changed to a shape that's difficult to work with.

How can an engineer solve problems for customers or develop solutions when all the information that's given is, _implement feature X?_
Understanding how customers use a product is critical to the design and implementation of new features.
While the product team is supposed to help answer these questions, it's beneficial as an engineer to understand it too.
Customers will be happier because the solution was designed with the intent to solve the problem they care about.
Engineers are happy because the amount of effort to implement is easier to ascertain and are in a better position to make judgments around future features.
Product will be happy because customers are happy and engineering will be able to produce higher quality features with meaningful commitments in place and less technical debt.
There is an acceptable level of technical debt on any project, but the more that accumulates causes complexity to increase making simple features more difficult than necessary.

The other interesting thing about technical debt is that it can cause internal strain particularly when the debt starts to accrue in areas like instrumentation.
For example, someone on the team somewhere might have to manually write some type of query to perform some kind of analysis and properly bill a customer somewhere.
It can place a higher burden on the security and ops teams too.
Technical debt will eventually start placing burdens on internal organization functions so care should be given to how much accrues.

Humans don't absorb information, it's curated and consumed.
For engineers, distilling technical knowledge into easy summaries that can be consumed by non-technical people will help persuade peers in other functions to fight for the important things.
As engineers, understanding key components of why this feature is being built or how this product is being used allows for better implementation strategies and insight for meaningful compromises.
This might just make life a bit more comfortable since product will be less likely to enter in overly ambitious partner commitments.

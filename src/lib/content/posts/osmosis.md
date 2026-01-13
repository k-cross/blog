---
layout: post
title: 'Osmosis Driven Development'
author: [Ken Cross]
tags: ['Opinion', 'Software Engineering']
excerpt: 'How context drives the engineering process'
date: 2018-10-29
modified: 2020-08-08
draft: false
---

In a magical world where all tasks are well defined, performing task <!-- [Math]--> or implement feature <!-- [Math]--> is a simple matter of doing.
In this world only the current state of the feature needs to be communicated.
A product manager informs stakeholders what engineering is capable of based on raw metrics, creating hard deadlines meaningful to clients.
Time is used as the sole metric to measure progress and productivity.
Unfortunately, there's a lot of grey area back in the non-magical realm of Earth.

Well-defined tasks are rare in businesses with high uncertainty, volatility, or both.
Key factors contributing to uncertainty are related to context.
A ticket describing a task is often created by someone operating with language and context that may not translate to the person performing the task.
Engineers usually have contextual concerns related to the inner-workings of a running system, even when the customer problem is known other departments own its context.
What can accelerate desired outcomes and increase the effectiveness of collaboration?

At the team level, distributing context and customer feedback between colleagues handling the same project is critical.
Team members have the opportunity to create a shared language for the project, rather than specific field jargon segmented between different types of team members.
Clarity between communication channels results because individuals talk about the same things rather than things that are off-center or tangential.
The idea is to create communication based feedback loops.
Making this loop as quick as possible is ideal since it's used as a qualitative measure of effort.
With a slow feedback loop, more effort is spent on work that ends up misaligned with either customer or organizational goals.

For individuals, providing relevant context is about determining who the target audience is.
Determining what's useful then providing that knowledge in a format that's easily consumable.
Gauging what an audience needs to hear and presenting technical information in an understandable way will provide insight to other organization functions.
Increased communication has the potential to simplify problem solutions; it'll demonstrate both process and technical bottlenecks; finally, it provides power to persuade.
For example, it's valuable to be able to:

- demonstrate to product management why a particular feature is harder to build than expected
- explain why changing the shape of production data without certainty is a bad idea

Providing insight to people in a position to fight or push back deadlines, might do just that, provided they receive information that updates their native context.

## Maximum Value for Least Effort

The _MVP_ (minimum viable product) is an infamous term that's meaningful in the context of a new product.
Building an MVP is hard particularly when features are designed as MVPs on top of an MVP because there's a good chance it requires compromises to _existing_ features and functionality.
As an application's complexity increases, the MVP model to feature development becomes less relevant.
Rapid prototyping should still be part of the development process, but prototypes are designed to reduce uncertainty, not become MVPs.
As the term mentions, MVP applies to _products_ not _features_ so let's posit that the goals of an MVP are the same for new features.

1. maximize value while performing least amount of work
1. ship as quickly as possible
1. initialize client feedback loop determining signal to noise ratio

Building out MVPs often means catering to solving the subset of a more generalized problem.
The _base case_ of a problem is it's most generic form, which might be the least commonly used case.
The _special case_ is a specific form of the same problem which may be simpler or more complex.
In the stance of a special case, the base case is often required to be built to have the scaffolding ready for future features.
If the special case is built without regard to the base case then duplicated effort results.
When little effort is necessary to shift directions, the MVP makes sense, otherwise it's not a useful design strategy.

## Builder's Conundrum

A problem by which the _builder_ creates something to be consumed in a domain which the _builder_ is unfamiliar.
Imagine being new to a very large code base and assigned a critical new feature with a hard deadline.
The design choices around data or public API endpoints are long lasting, but it's unlikely to be correct when incremental, measured progress is the goal.
It's unclear how customers use APIs and it's also unfortunate when the shape of production data difficult to work with.

How can an engineer solve problems for customers when all the information that's given is, _implement feature X?_
Understanding how customers use a product is critical to the design and implementation of new features.
While the product team answers these questions, it's valuable as an engineer to understand the context behind the solutions.
Having context results in a few benefits;
happier customers because solutions are designed for the problem they care about, rather than _using what was designed as a \_workaround for the problem they care about_;
happier engineers because their autonomy increased, making judgment calls regarding the solution's architecture, resulting in less effort and technical debt;
happier designers and product managers because resulting features are higher quality and more in line with what clients expect.

Humans don't absorb information, it's curated and consumed.
Understanding the limitations of MVPs increases the understanding of overall feature effort with respect to the product's phase in its life-cycle.
For engineers, distilling technical knowledge into easy summaries that can be consumed by non-technical people will help persuade peers in other functions to fight for the important things.
As engineers, understanding key components of why this feature is being built or how this product is being used allows for better implementation strategies and insight for meaningful compromises.
This makes life more comfortable since overly ambitious partner commitments are less likely to occur, if we posit that colleagues are not malicious, otherwise all bets are off.

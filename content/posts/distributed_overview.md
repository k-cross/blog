---
title: "Distributed Systems Overview"
date: 2018-07-18T09:20:30-07:00
showDate: true
draft: true
tags: ["computing","distributed", "programming", "open problems"]
---
The goal here is to give an overview of common problems in the distributed computing space along with some common names.
Each problem described will have a follow up article that goes into a more in-depth study of its technical solutions.

## Protocols Versus Algorithms
The two are defined by dictionary.com as follows:

Protocol: 
> a set of rules governing the format of messages that are exchanged between computers.

Algorithm: 
> a set of rules for solving a problem in a finite number of steps.

This is something that should be clear, but in my entire career its never been formalized.
Algorithms are a pretty easy concept, they're used to compute something and take time to run.
Protocols on the other hand deal with communication, they handle things in a particular way and have a time or order component to them.
That is key, the difference between the two is that one depends on a logical time order to proceed rather than a logical step.

Why does this matter?
The order through which something arrives and the time that it takes to get there is what determines the next action, rather than the order alone.
Orderings in an algorithm can matter, but algorithms don't have generic concepts of time.
Maybe time is necessary in some factor of computation for a particular algorithm, but it largely shouldn't matter in terms of how it achieves its task.
For instance, a faster processor clock cycle would get you the same result using the same algorithm faster.
On the other hand, for a protocol, it might not matter.
A protocol might be waiting for a network request, get a response within some time window, and return some result.
Another request might be made that is identical in every way except its time window, and we'll recieve a different response.
So the way in which I formalize a protocol is that a protocol is dependent on both time and order.

# Problem Statements

## Too Much Bread: An Introduction to Concurrency

This is the problem that first introduced me to concurrent computing.
It's stated in the following way:

> Alice and Bob are roomates that hate each other, but they must live with each other and both love bread.
> They have decided that

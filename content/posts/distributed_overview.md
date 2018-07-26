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
> They have decided that the best way to not see each others faces is to create a wall between their living spaces where there is a two door container for each side of the wall.
> The bread is stored in this container, so how can we create an algorithm such that they will always have bread or have a clear answer about what to do when they don't.

## The Dining Philosophers

This problem is about handling deadlocks and how to prevent them while maximizing resources available.

> There are five philosophers sitting at a round table.
> Each one is hungry and either decides to debate with other philosophers or eat.
> There is exactly one fork to each philosophers left and right side, but they require two in order to eat.
> How can the philosophers debate and eat in peace?

## The Two Lovers

This is a coordination problem.

> Two lovers need to decide when to meet and can only send messages to each other.
> How can they decide when and where to meet?
> If one lover makes the mistake to come to the wrong place or at the wrong time, the relationship will end.

## Movie Night


## Byzantine Generals

This deals with trust and coordination in distributed systems.

> There are five generals which need to coordinate to either strike or flee an enemy.
> Each general can only write messages to each other and all generals will know who sent which messages.
> There is a traitor amongst the generals, who will send bad messages, how do can they come to a real agreement?


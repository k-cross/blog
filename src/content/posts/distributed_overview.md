---
layout: post
title: 'Distributed Algorithms: An Introduction'
author: [Ken Cross]
tags: ['Tutorial','Software Engineering']
excerpt: 'An introduction into the world of distributed computing and its problems'
date: 2020-07-18T09:20:30-07:00
draft: true
---

The goal here is to give an overview of common problems in the distributed computing space along with some common names.
Each problem described will have a follow up article that goes into a more in-depth study of its technical solutions.
Another thing worth noting is that each problem will be stated by its _original_ analogy and then reworded to computing terms.
These analogies often make assumptions which do not translate intuitively in the real world and so describing the problem as it actually exists in computing is ideal.

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
Another request might be made that is identical in every way except its time window, and we'll receive a different response.
So the way in which I formalize a protocol is that a protocol is dependent on both time and order.

# Problem Statements

## Too Much Bread: An Introduction to Concurrency

This is the problem that first introduced me to concurrent computing.
It's stated in the following way:

> Alice and Bob are roommates that hate each other, but they must live with each other and both love bread.
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

This is another coordination problem that's based around majority agreement.

_Note: Text messages are assumed to arrive instantly and not get lost in this problem._

> A group of friends are deciding meeting at the theatre and along the way, they all have an opinion on which movie to see.
> All friends are in different modes of transportation and will not meet before they come to agreement.
> Each person decides on which movie to see and once everyone has voted exactly once, they will tally up the vote and decide who wins or repeat until they come to agreement.
> At any point in the process any friend can drop and go do something else.

A solution requires that:

1. All remaining friends that haven't dropped must come to agreement.
2. The movie that has been decided on is at least the majority opinion of one of the remaining friends.

## Byzantine Generals

This deals with trust and coordination in distributed systems.
How is trust provided when things can malfunction or there are bad actors involved?
The problem is stated as follows:

> There are five generals which need to coordinate to either strike or flee an enemy.
> Each general can only write messages to each other and all generals will know who sent which messages.
> The generals can also tell when a message has not been sent.
> Traitors may send false messages so how do can loyal generals come to agreement with their initial opinions?

A solution needs to satisfy two requirements, _agreement_ and _validity_.
Agreement means that loyal generals are able to execute the same action while _validity_ means loyal generals decide based on their initial opinions.
Three conditions are also placed on this problem:

1. Every message arrives to the correct destination.
2. Absence of messages can be detected.
3. The receiver knows who sent the message.
4. Any general can send messages to all other generals.

## Choice Coordination

A group of tourists decide to meet at one of two places

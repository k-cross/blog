---
layout: post
title: 'Toxic Wastelands'
author: [Ken Cross]
tags: ['Opinion', 'Software Engineering', 'Culture', 'Leadership']
excerpt: 'How toxic cultures can ruin businesses'
date: '2024-12-12T15:11:55.000Z'
draft: true
---

Most people have experienced working with someone that sucks the joy out of everything at some point in their lives. It's easier to confine the foulness of a single person in a way that mostly avoids you. It's harder to do when the person holds direct authority over you. Worse, is when an entire organization has a toxic culture. It leads to bad practices and leaders that passive about culture issues and unwilling to change anything because they're seen as not moving the needle in business objectives.

## Hazardous Waste

What makes a work environment toxic?

### Knowledge Differentials

Unnecessary discretion and keeping secrets. Yes it is possible that this is a job requirement because you work for the government on classified materials, in which this probably applies less to you. In order to work effectively in that kind of environment, you have to assume that people are acting with good faith. A lack of transparency will:

- slow down decision making
- weaponize knowledge
- increase risk of creating misaligned incentives

Transparency comes in two varieties, active and passive. Passive transparency might be worse than no transparency because it's pretending to do something it's not while giving people a valid claim to say they're still giving you what you want. Passive transparency is having information available, but a person has to specifically request it. It does not sound sinister, but it is easy to weaponize by creating large knowledge gaps.

```mermaid
%%{init: {'theme':'neutral'}}%%
quadrantChart
    title Domains of Knowledge
    quadrant-1 Known-Knowns (stable knowledge)
    quadrant-2 Unknown-Knowns (unstable knowledge: biases, unknown gaps in knowns, etc...)
    quadrant-3 Unknown-Unknowns (things we don't know that we don't know)
    quadrant-4 Known-Unknowns (things we know we don't know)
```

No transparency and passive transparency unnecessarily add to quadrant 3; anyone that does not know what questions to ask for or where to find information or even the existence of information, will not find it. Unknown-unknowns move to quadrant 1 or 4 by stumbling on them. Knowledge in both passively transparent and opaque organizations are largely transfered with intent, the only difference being the level of explicitness.

By contrast, active transparency is going out of your way to make sure everyone knows about information and making it easy to access and find. This makes for a much better environment because it significantly reduces knowledge differentials. When information is withheld, it's the worst of all. Knowledge differentials is a form of office politics. Withholding information to gain advantage, whether in public through something like perceived competence, or information leading to more effective work output. Holding knowledge hostage should be avoided. It slows decisions down considerably and creates a zero-sum game type culture, internal to the company.

### Process Tycoons

Prioritizing processes over people is the pathology. If this were a Simpsons episode, Bart's chalkboard would have been filled with:

- A process that works does not make it good.
- A process that works does not make it good.
- A process that works does not make it good.

Speaking from the engineering side -- poor processes lead to bizarre failure modes. Ones where written processes work most of the time have failure modes that result in updates to add more process to account for those failure modes. A death spiral to avoid!

As a personal example, I once worked in an organization that had a SDLC (software development life-cycle) that was 13 pages long; it contained no diagrams, a real wall of bulleted text. Engineers would routinely fail to follow all the steps in the SDLC. It was doing too much since the document was also meant to be something similar to a runbook. In particular, the release portion of this document, after _verifications_ were considered complete in a _non-prod_ environment, had some glaring issues. The same failure mode occurred on multiple occasions, and during the incident review meetings after pointing out these issues things changed for the worse by... extending the document. There were many pathologies at this organization but the process bits were clear. The SDLC and its runbooks were ineffective when considering the whole system. They needed to provide more guardrails to people doing deployments. The SDLC and the runbooks needed to be different documents.

Another process issue that creeps in and becomes more nuanced is requiring group consensus to do every. single. work. item! In software engineering, coming across _agile_ is almost a certainty at some point. It's practiced in different ways, in different places, with different meanings, and styles. Scrum is probably the most common methodology in product teams and here is how it can be weaponized against them. Imagine story planning and grooming and there are fresh tickets for work items. Having a backlog of tickets is great, there's nothing wrong with that. The bigger issue is when story planning devolves into "how am I going to do this work?"

### We Value Your Feedback

Actionable feedback is a real gift. People and organisations that choose inaction or punishment will stop receiving it. The message being sent is clear; there are top-down directives from a hierarchal order of authority to follow, with unquestioning loyalty.

For example, I remember having a 1-1 with my boss that was entirely another work synchronization meeting. This was essentially discussing the same topics as other public team meetings, and was held for a hour at a weekly cadence. I said that I don't get much value out of the 1-1s and would rather have a half hour meeting every 2 weeks instead, since I could never get the topics to shift and I was already used to that cadence. I remember being denied passively, no change was ever made to cadence but I did get a new weekly meeting added to my calendar to synchronize more of the same work items. Perhaps I was a bad communicator? Perhaps my work wasn't broken down enough? I'll never know since it was never discussed. However, my request to have a reduced cadence was ignored and punished.

Treating individuals differently. To some degree this is inevitable, but wildly different behaviors for different people in similar roles is absolutely unacceptable. For instance, allowing one person to deviate from a process because you like them more than another person, is unacceptable. If there are rules and processes in place, they need to be followed by everyone for everyone, otherwise you're letting some people skip rules and automatically be more effective giving them unfair treatment and advantage along multiple axis.

Bosses versus people managers.

Not treating people roles as effectively different than contributor roles.

How you treat people matters.

After agreeing on something, taking it back.

Criticism of leaders goes punished.

Criticism of processes goes punished.

The people promoted to the highest positions are the ones who had been around longest, instead of the ones most qualified to do that type of work. My first month on a new team I eventually got around to asking the sole staff engineer in the organization to a meeting to go over architectural issues. This team was small and had a lot of legacy issues, which is fine as long as they are aware of them and have a plan to tackle some of the most pressing concerns. One concern I brought up was about signed integer ID values in a MySQL database, noticing it had a legacy PHP application still in tact. The staff engineer immediately said they don't have any signed integer values so I shouldn't worry about it. Then when doing performance testing and running into issues with the database, I ended up dumping how all the schemas were created and looked like. Sure enough it was a mixture of a lot of stuff but in it, were the signed integer values.... It was in that moment that I knew I could not trust the technical direction of the product or the engineers on the team to know what they're doing. Yes they could do work, yes they could build things, but no one actually did more than read stack overflow to get answers to their questions without doing the hard work of understanding how anything actually worked.

## Root of Trust

Toxic work environments rot the tree of trust at the root.
Trust is the foundation of all positive human relationships.
When that trust erodes, building it back up is hard.
Layoffs erode trust, but how much trust is up to you.
Performance reviews erode trust, but how much is up to you.

### Notes

- Poor behavior is incentivized.
- Prioritizing processes over people.
- Requiring group consensus to do every single required work item.
- Not listening to feedback.
- Punished for feedback.
- Treating individuals differently.
- Bosses versus people managers.
- Not treating people roles as effectively different than contributor roles.
- How you treat people matters.
- After agreeing on something, taking it back without discussion.
- The people promoted to the highest positions are the ones who had been around longest, instead of the ones most qualified to do that type of work.

It's hard to learn in toxic environments. Even valid criticism of yourself can be more difficult to take seriously or be actionable on, because your guard is always up making it more difficult to have conversations about improvement because everyone is trying to smell the weakness in each other. The problem is that being effective always puts... The best organizations are ones where I didn't have to worry about my performance if I did my job well. The ones with less politics involved. I remember being a part of a highly functioning team and it's very addicting. When that goes away, its hard to figure out how to bring it back.

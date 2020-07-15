---
layout: post
title: 'Three Phase Commit'
author: [quasarken]
excerpt: 'Updating the research on software engineering process and thoughts on its applications'
tags: ['Data Migrations','Zero Downtime']
date: 2018-12-09T12:35:54-07:00
draft: false
---

Paving a path towards continuous delivery and zero downtime deployments is a challenging pursuit.
It seems that each organization has a different strategy to employ and different techniques to use.
One of the more generic solutions that is at the heart of this article was inspired by the three-phase-commit.
Its origin stems from _computer networking_. 
It's a way to perform the non-blocking version of the two-phase commit protocol, described as:

1. The voting phase: a coordinator tries to prepare all the transaction's participants, communicating to proceed until either committing or aborting.
1. The commit phase: depending on participant votes, the coordinator decides to commit if all voted _agree_ otherwise it _aborts_ and notifies all participants.

Unlike networking however, we care about _contention_ for _resources_ with respect to databases and long-lived state in memory.
Taking downtime is commonly caused by blocking actions from locking mechanisms with respect to a common resource.
Another reason for taking downtime is to ensure the stability of the environment upon an update to refresh the _state_ of application processes.
Since causes for downtime can often be determined they can be planned around.

## Construction Phase

The first phase with respect to applications and databases deals with the creation or generation of a new entity.
In a database, this might mean a new table or column.
If the new entity is meant to replace on old entity then dual writing is the first step to take.
This is when both new and old entities are recorded in the database alongside the running application as normal.
If the new entity has no requirement on an existing entity then its business as usual.
In an application, a new data structure intended to replace an old one is a common source failure.
The application strategy would be to create a legacy handler that's able to turn an old structure into a new one.

## Renovation Phase

Back-filling data into a newly created column is the essence of this phase.
Copying data from one place to another and perhaps processing the data only requires a read from an old entity and a write to a now pre-existing but new one.
It's unlikely this will create a high contention lock.
This strategy is more manageable since back-filling doesn't need to occur all at once.
Instead, they can be batched into stages in case a lock is required to perform the operation.
This makes timeouts unlikely to occur but it might make users temporarily experience longer waits.
When a database migration is too expensive, the _legacy handler_ becomes useful.
The _handlers_ operate by shaping different input into a uniform output.
It might be desirable to update the data then persist the change but that might lead to the belief that the legacy code handler can be deleted prematurely.
Removal is valid if every entity has been updated or if the old data is no longer supported.
A way to mitigate this problem is _data compaction_, which is a way to make old and new data look like the same thing.

## Dismantle Phase

This is equivalent to dropping an entity from the database. 
It's easy to do once it's truly no longer required and by this phase it should not be, but a way to confirm that this is the case may ease the nerves or help get buy in.
In an application, the process life cycle might live long, but this is essentially getting rid of _legacy handlers_ and _versioned functions_.
When code complexity starts to become a problem or the legacy data handlers are preventing desirable features from happening, this is when its time to start considering data compaction.

## All Good Things

A final word of caution.
When dealing with application code updates, these only work reliably when the state of the application can be rebuilt and executed even in the event of a crash.
One approach is to build a history from immutable states which can be replayed.
If the behavior of an application is determined by global state that cannot be restored reliably, there may be larger problems at play, but this strategy is unlikely to help.

For the last year, this strategy has worked in production.
Previously, deployments would happen during the odd hours of evening in order to cause minimal disruption.
The reason why zero-downtime deployments are nice is because they bring more certainty to stake holders and allow engineering to deploy during sane hours.
It should catch mistakes earlier in the process, usually before a deployment.
This brings all the good things for all parties that have a lot to loose when things go wrong.

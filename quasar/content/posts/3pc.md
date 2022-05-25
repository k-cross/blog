+++
title = "Three Phase Commit Data Migrations"
tags = ["Technique", "Software Engineering"]
date = 2018-12-09T12:35:54-07:00
modified = 2020-07-16T00:06:38-07:00
draft = false
+++

Paving a path towards continuous delivery and zero-downtime deployments is a challenging pursuit especially when each project employs its own strategy.
One generic solution that is at the heart of this article was inspired by the three-phase-commit.
Its origin stems from _computer networking_ as a way to perform the non-blocking version of the two-phase commit protocol, described as:

1. voting phase: a coordinator prepares all transaction participants, signaling to proceed until either committing or aborting.
1. commit phase: depending on participant votes, the coordinator decides to _commit_ if all voted _agree_ otherwise it _aborts_ and notifies all participants.

Adapting these to web applications, the _contention_ for _resources_ occurs with respect to databases and long-lived state.
Taking downtime is commonly due to blocking operations from locking mechanisms over shared resources.
To ensure the stability of an application's environment while updating, taking downtime will guarantee _state_ remains consistent for all services and users.
Since causes for downtime can be determined in advance, using more sophisticated approaches to eliminate it is possible.
Executing data migrations as three distinct phases is a generic approach that anyone can use as a stone to pave in the road to zero-downtime deployments.

## Assemble Phase

The first phase involves the creation of new entities which usually means new tables or columns with respect to a database.
When a new entity replaces an old one the use of dual writes and idempotent operations is an effective strategy.
Dual writes are when both old and new entities are recorded in the database alongside the running application.
It allows changes to happen in production while still being able to roll-back those changes to the old model should the need arise.
This increases the reliability that the updates work as intended and without issue.
Making the new entity operations idempotent is also very valuable in many cases as we'll find in the next phase.
For an application, data structures that replace old ones are a common source failure.
By the creation of an idempotent legacy handler, it's possible to create a version chain that's able to turn an old structure into a new one reliably.
Having multiple versions of data and data structures is not ideal, but it is not always practical to migrate all data in one shot.
By having a type of JIT version update in place, it's possible to avoid complexities around more sophisticated data migrations.

## Manipulation Phase

Back-filling data into a newly created column is the essence of this phase.
Processing data only requires a read from an old entity and a write to the new one.
How those writes are performed matters greatly.
The trivial approach to writing a data migration is to do everything in one shot with no roll-back plan.
It's not always possible or at least practical to build database roll-back plans.
When failures occur with single pass migrations, they can be very expensive.
The database might have locked some critical columns with a large number of rows.
So whatever the downtime is for a successful operation always needs to be planned to be double just in case a rollback is required.

Alternatively, when writing operations are made idempotent the application can be made eventually consistent.
Since dual writing new data is already occurring, backfilling old data into the new format using an idempotent write operation allows the application to fail safely.
A write might fail for many reasons -- junk data, unexpected formats, and mishandled cases.
Imagine having the first $$75%$$ of a migration be performed and then fail on a single valid case.
There are a few potential issues here:

1. the backfill task is performed as a migration
1. the backfill task is performed as a transaction
1. the backfill task is not idempotent

The first case has the flaw of downtime.
The second issue may be computationally expensive and infeasible to repeatedly perform.
The last issue creates potential for duplicated data during the backfill process.
Using the idempotent strategy is more manageable since backfilling doesn't need to occur all at once.
If multiple write operations do happen, they end in the same result.
Flexible data migrations are the result.
Migrations can be written so that they're performed in one shot or done as batch jobs.
The failure handling mechanisms can also be as simple or complex as desired.
For instance, using a trivial approach to retry the entire backfill or a sophisticated one to pick up where it left off.

## Dismantle Phase

This is equivalent to dropping an entity from the database. 
With the completion of the _manipulation phase_, getting verification that the backfill is complete is necessary to confirm the entity is no longer required.
All the code that handled the updates and branching paths that resulted from different version functions can be removed too.
There's no better feeling as an engineer than reducing all the complexity of a system by removing the bloat and scaffolding that's no longer needed.

## All Good Things

A final word of caution.
Application code updates only work reliably when the state of the application can be rebuilt and executed in the event of a crash.
One approach is to build a history from immutable states which can be replayed, basically a log in the way some file systems work.
If the behavior of an application is determined by global state that cannot be restored reliably, larger problems exist and this strategy is unlikely to help.
Other problems that were not covered include the existence of operating on data across different databases.
This is a much harder distributed systems problem to solve but using idempotent operations is a great place to start.

The three phase commit strategy has worked on production systems for a few years in a variety of different scenarios.
Previously, deployments would happen during the odd hours of evening in order to cause minimal disruption.
Zero-downtime deployments can happen during sane working ours bringing joy to engineers, more certainty to stake holders, and a better experience for customers.
All good things result for all parties that have a lot to loose when things go wrong.

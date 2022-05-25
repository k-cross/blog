+++
title = "Abstractions"
tags = ["Opinion", "Software Engineering"]
date = 2018-07-04T00:06:38-07:00
modified = 2020-07-16T00:06:38-07:00
draft = false
+++

Correct abstractions in programming are hard to make for the future case.
Often, there is not enough data at the start of a project when the problem space is not well understood.
This makes development harder due to the volatility of projects, showing that it's unlikely to make meaningful predictions further into the future.
So how then, should sustainable programs be built?
Optimizing for code deletion is one strategy worth utilizing since it's forward moving flexibility that's the real goal.
In essence, being unconstrained from the past, the future can be built unencumbered, thus reducing effort.
The following emergent traits tend to result:

1. a modular type of architecture
1. extending features takes less effort
1. code base is more optimized for the current running state rather than the predicted future state

## Grabbing an Axe

One of the more satisfying things in programming is utilizing a razor-sharp axe and cutting a code base down to size!
Grokking a system is far easier when it's simple, well designed, and small.
How better, to understand a system than by focusing on cutting stuff out of it?
When emphasis is placed on deletion it's paramount to understand the system's complexity and nuances at the boundaries.
This calls for the need to have equivalency tests available to the systems that are intended to be replaced.
Equivalence testing is the only real hope to allowing a proper rewrite.
It's an uneasy feeling to delete code that's not well understood.
Being able to verify that those changes do what's expected is critical -- the path to the new system needs to be trustworthy.
There's a fine line between tests that mock what you expect versus checking the expected behavior of a _system/function/method_.
Getting the system behavior correct is mandatory, even the undesirable behavior that is thought of as broken internally, because customers probably rely on the broken behavior making them features.

Deletion promotes modularity and the clarity of application contracts.
Being able to remove things comfortably means that the core logic of isolated features are successfully decoupled from the core logic of other components of the system.
Deleting a feature should cause its tests to fail, but those tests ideally wouldn't affect the behavior of other tests other than related subcomponent.
Tests reveal a starting point in which to add new features once code has been deleted, or at least where more care needs to be placed.
Tests pave the way to automate and verify the behavior of what deletion does.
Optimizing for deletion enforces modularity because scaling quickly in a large code base demands it.
The easiest way to verify integrity is by isolation, testing isolated components, and then testing the interoperability of the system as a whole.
In order to do this reliably, avoid side-effects, as they'll cause additional complexity as well as combinatorial growth of the testable problem space.
Modularity is the core component in optimizing for deletion.
It allows for the most flexibility during the reimplementation a feature since the interfaces remain largely unchanged.
For instance, a billing system shouldn't be tied to a metric system other than by interfaces, otherwise swapping out one or the other makes it a very time intensive project and the end result will almost certainly be a modular system that replaces it.
Not convinced?
Imagine that the billing system is a third-party service?
What happens when that third-party changes its usage policy in a highly undesirable way?
How much effort is required to swap implementations?

## Embracing the Void

What does the absence of code buy?
The flexibility to extend the system with fewer legacy restrictions.
To some degree, legacy requirements are always going to linger, but they should be external customer facing legacy issues, not internal system constraints.
APIs are very hard to not be constrained by.
New features are much easier to write when all the other interfaces that they'll rely on can also be changed and modified easily.
With a modular code base, new features can be developed and tested in isolation and then added into the system through an interface.

Optimizing for deletion reduces the scope of development to the minimal requirements rather than predictions.
The consequences of deletion create some very desirable traits.
Their drawbacks come from the necessity to perform deletions reliably, which are not trivial.

## Vectors

This idea is not without its drawbacks.
Initial development velocity for example, is not a trait since it's impossible to rebuild nontrivial features reliably.
Taking this philosophy to its extremes, like any other philosophy, is inane.
Feature implementations are like vector math, where there are different paths that can be taken but there's a single optimal route from point A to point B.
Keeping the mentioned traits in mind helps strike a balance as a guide post to do it properly.
Improper utilization can occur when a feature is easy enough to extend rather than write from scratch.
Too many _time/space_ optimizations probably results in very inflexible code which can easily become coupled with other components for the sake of efficiency.
Sometimes it's warranted, sometimes it's not.
While it's a good idea to think about current use cases, obvious future cases like extending an API, should remain flexible enough to not have to be rewritten every time a feature is requested.

At the end of the day,
```
83 files changed, 1716 insertions(+), 19478 deletions(-)
```
if this doesn't put a smile on your face, you're probably a masochist.

_NOTE: when referring to testing I mean that in the general sense, not specifically unit testing_

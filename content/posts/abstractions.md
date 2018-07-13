---
title: "Abstractions"
date: 2018-07-04T00:06:38-07:00
draft: false
tags: ["optimize for deletion","software engineering","programming","paradigms"]
---
_Foreword: the idea comes from [Greg Young](https://vimeo.com/108441214)._

Correct abstractions in programming are hard to make for the future case.
Often, not enough data is given at the start of a project and it'll change in such a way that is no longer flexible with the current implementation strategy.
So how then, should sustainable programs be built?
Optimizing for code deletion is a large part of the answer, perhaps not a full one though.

## Emergent Properties

Optimizing for code deletion creates potential for desirable properties to emerge.

* The first property -- it helps enforce a clean code base.
* The second property -- a modular type of architecture tends to result.
* The third property -- new features are easier to add.
* The fourth property -- the code based is optimized for the current running state rather than the predicted future state.

Please note that these are not mathematically proven properties `;)`.

## Grabbing an Axe

There are fewer things more satisfying than utilizing a razor-sharp axe, cutting a code base down to size!
Grokking a system is far easier when it's simple, well designed, and small.
How better, to understand a system than by focusing on cutting stuff out of it?
When emphasis is placed on deletion, understanding what needs to be deleted is paramount.
The first two properties result directly from this _design-by-subtraction_ approach to engineering.

Why? Deleting things quickly and securely places emphasis on code readability.
It's an uneasy feeling to delete code that's not well understood.
Being able to verify that those changes do what's expected is critical.
In order to do this quickly, testing needs to be part of the plan -- and those tests need to be trustworthy.
There's certainly a fine line between tests that just mock what you expect versus testing the expected behavior of a _system/function/call_.
The ability to write the latter and cut out the former is the ideal.

As shown, deletion promotes readability, but it also promotes modularity.
Being able to remove things comfortably means that the core logic of isolated features are successfully decoupled from the core logic of other components of the system.
Deleting a feature should cause its tests to fail, but those tests ideally wouldn't affect the behavior of other tests nor cause other tests to fail.
Tests reveal a starting point in which to add new features once code has been deleted, or at least where more care needs to be placed.
Tests are a quick way in which to automate and verify the behavior of what deletion does.
Optimizing for deletion enforces modularity because scaling quickly on a large code base demands it.
The easiest way to verify integrity is by isolation, testing isolated components, and then testing the interoperability of the system as a whole.
In order to do this effectively, system side-effects must be kept to a minimum.
The functional paradigm for programming essentially falls into this category, but the point is about isolation, not language theory.
Modularity is the core component in optimizing for deletion because it allows for the deletion or reimplementation of a feature, where the only system requirement is the rewiring of the interfaces that rely on it.
For instance, a billing system shouldn't be tied to its metric system so tightly that swapping out one or the other would cause so many system wide side effects that make it a very time intensive project to replace.
What happens when that billing system is a third-party application or service?
What happens when that third-party changes its usage policy in a highly undesirable way?

## Embracing the Void

The second property implies the third for the general case.
What does the absence of code buy?
The flexibility to extend the system with fewer legacy restrictions.
To some degree, legacy requirements are always going to linger, but they should be external customer facing legacy issues, not internal system constraints.
API versioning for instance, is going to be very hard to not be constrained by.
New features are much easier to write when all the other interfaces that they'll rely on can also be changed and modified easily.
Also, because much of the code base is modular, hooking up the new feature is simply a matter of plugging it into a system interface!

The last property is also implied, since optimizing for deletion essentially means to create features that you need to exist and nothing else.
It's much less a property and more like an alias of this system design strategy.
The consequences of deletion create very desirable properties indeed.
Code readability keeps engineers happy and productive, while modularity and feature production keeps the business and its customers happy.

## Vectors

This idea is not without its negative consequences.
Taking code deletion optimizations to its extremes, like any other philosophy, is inane.
This is more like vector math, where there are different paths that can be taken but there's a single optimal route from point A to point B.
Keeping the mentioned properties in mind is a great way to strike a balance and do it properly.
A red flag of improper utilization is easy to spot when you spend too much time deleting and rewriting features when they could have originally been extended simply.
For instance, the result of too many _time/space_ optimizations for the current code base, could result in very inflexible code that becomes tightly coupled with other components for the sake of efficiency.
Sometimes it's warranted, sometimes it's not.
While it's a good idea to think about current use cases, obvious future cases like extending an API, should remain flexible enough to not have to be rewritten every time a feature is requested.

At the end of the day,
```git
839 files changed, 17169 insertions(+), 19478 deletions(-)
```
if this doesn't put a smile on you're face, than you're probably a masochist.

_Note: Please treat this article as art rather than science. Absolutely no studies have been done to verify claims._

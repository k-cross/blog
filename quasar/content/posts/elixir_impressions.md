+++
title = "Elixir Impressions"
description = "TLDR: Elixir is awesome!!!"
date = 2018-07-07
draft = false

[taxonomies]
categories = ["Engineering"]
tags = ["engineering", "languages"]

[extra]
lang = "en"
toc = true
comment = true
copy = true
math = false
mermaid = false
outdate_alert = false
outdate_alert_days = 120
display_tags = true
truncate_summary = false
+++
I've had the luxury of programming with _elixir_ for the last nine months.
It's been my first full-time experience utilizing a functional language in a non-academic setting.
_Elixir_ is a new language built on top of _erlang_.
It looks similar to _ruby_ but the semantics are quite different.

Coming from a _c_ and _python_ background, the language has been expressive, powerful, and refreshingly different.
Its tooling makes it a pleasurable experience to work with and easy to get started on any new project.
But the real fun comes from the language itself.
Parallel, concurrent and distributed programming semantics are top notch and built directly into the language or provided by standard libraries.
Have one process that needs to talk to another? Just create a simple `GenServer`.
Need to create a K/V store? There's `ETS`.
Does that store need to be available across multiple nodes and persist? There's `mnesia`.

There are so many good solutions that are readily available to access with minimal effort.
Most modern web applications utilize these tools, yet most languages only think about these requirements as afterthoughts.
Applications can scale without the immediate and common constraints of other languages, making it easier for startups to focus on the problem domain.
It's less common to need specialized solutions like `redis` or `kafka` since similar tooling's baked into _elixir_ already.
In many cases, the language tooling is the desired approach because the application can be built around business logic rather than infrastructure choices, creating less operational burdens.
It also is closer to the business logic in a natural way which is less common in other languages trying to respect domain boundaries.
There are still times when reaching for an external tool is required and the libraries that wrap common tools to be consumed in the language are either really good and well supported or completely lacking.
Since _erlang_ is in the picture, it's really easy to natively call and use _erlang_ libraries directly making the language far more mature in tooling than most at a similar age.

The language is also infinitely flexible as it includes _macros_, a form of _metaprogramming_, by which the language can be extended by anyone.
Tired of writing the same boiler-plate code over and over? Write a macro!
The amount of thought that goes into the everyday usage of the language is also nice, since there's a fresh take on doing things the `erlang` way.
Case in point is the `with` statement, its inclusion wasn't necessary but certainly makes simple patterns much easier to deal with and manage.

```elixir
error_tuple = {:error, "function isn't fun"}

# Before `with`
case fun_fun_function() do
  {:ok, val} ->
    case fun_function(val) do
      {:ok, val2} -> do_stuff_with(val, val2)
      _ -> error_tuple
    end
  _ ->
    error_tuple
end

# Afer `with`
with {:ok, val} <- fun_fun_function(),
     {:ok, val2} <- fun_function(val) do
  do_stuff_with(val, val2)
else
  _ -> error_tuple
end
```

That's far easier to grok both syntactically and by length.
The `with` implementation is just a macro that expands into nested `case` statements under the hood.
It's possible to keep this looking pretty by making function wrappers for case statements, but that's essentially what `with` does in a generic way already.
Using the `with` statement is elegant for long chains of validation statements, making the code's intent clear.

Personally, the benefits of _elixir_ extend beyond code.
It's allowed me to fully switch into the mindset of functional programming.
It's opened an entirely new paradigm of problem solving tools that have been mostly better than their OOP alternatives.

All things considered, _elixir_ is an amazing language with great tooling built on top of the incredibly reliable _BEAM_.
The community is also very welcoming and friendly.
If you're looking for a new language or skill to pick up, I urge you to try _elixir_.
It is a great way to expand your knowledge base and understanding of a variety of topics.

## Updates for 2020

I'm still using _elixir_ in 2020 and it's still an amazing language.
The tooling keeps improving and the community is getting larger which means the packages available are also increasing.
Utilizing the actor model allowed our programs to run very reliably with minimal issue, while maximizing the ability to parallel process requests at a granular level.
A similar workload and application that was written in _PHP_ and serves less overall traffic requires upwards of 20 AWS instances.
Contrasting that to our current _elixir_ application, our maximum autoscale group now reaches 4 AWS instances, all of which are smaller and cheaper instance types by comparison.
Using _elixir_ actively saves money on _operational expenses_ because it utilizes resources effectively.

One caveat, I mentioned in the past about using `mnesia` and hinted at using `distributed erlang`.
Each of those tools can work but they are specialized and should probably be avoided.
Distributed computation is a hard problem and these tools were built with different use cases than the modern web.
Knowing what the trade-offs are is invaluable since there are probably better options available for distributed computation.
This will probably change over time but as of today I cannot in good conscience recommend the out-of-box tooling for this.

The language is still great for a large variety of use cases and there many things that make it a joy to work with.
The actor model is baked into the language itself and feels like it belongs directly in the language itself, unlike many actor frameworks in other languages.
At the end of the day, its possible to make any language work for the problem at hand.
For the majority of non-computationally heavy workloads, _elixir_ still remains my goto language, even in a distributed computing world!

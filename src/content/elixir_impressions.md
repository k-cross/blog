---
layout: post
title: 'Elixir Impressions'
author: [quasarken]
tags: ['Opinion','Software Engineering']
excerpt: 'TLDR: Elixir is awesome!!!'
date: 2018-07-07T00:36:24-07:00
modified: 2020-07-16T00:06:38-07:00
draft: false
---

I've had the luxury of programming with _elixir_ for the last nine months.
It's been my first full-time experience utilizing a functional language in a non-academic setting.
For those who don't know, `elixir` is a new language built on top of the `erlang` VM.
It looks similar to `ruby`, but behaves quite differently.

Coming from a `c` and `python` background, the language has been incredibly expressive, powerful, and different.
Its tooling makes it a pleasurable experience to work with most of the time.
But the real fun comes from the language itself.
Parallel, concurrent and distributed programming semantics are top notch and built directly into the language or provided by standard libraries.
Have one process that needs to talk to another? Just create a simple `GenServer`.
Need to create a K/V store? There's `ETS`.
Does that store need to be available across multiple nodes and persist? There's `mnesia`.
Basically any modern web application becomes this type of environment anyway, yet most languages only think about these things as afterthoughts.
Applications can scale without immediate and common constraints of other languages, making it easier for startups with limited starting funds (of course not just startups).

There are so many good solutions that are readily available to access with minimal effort.
So much so that it's rare to need specialized solutions like `redis` or `kafka` since similar tools already exist in the language.
In many cases that makes them better since the application can be built around business logic rather than infrastructure choices.
The only time these issues don't work out is when there is a major performance issue or there is less support for other languages and another service written in another language needs to consume or produce some result.

The language is also infinitely flexible as it includes _macros_, a form of _metaprogramming_ by which the language can be extended by anyone.
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
The `with` implementation is just a macro that expands this type of logic.
Sure, it's possible to keep this looking pretty by making function wrappers for case statements, but that's essentially what `with` does in a generic way already.
This is just a simple case of 6 versus 9 lines of code, but it can easily extend beyond that.
My personal benefits with `elixir` go beyond the code, it's allowed me to fully switch into the mindset of functional programming.
It's opened an entire new paradigm of problem solving tools that seem mostly better than their OOP alternatives.

All things considered, `elixir` is an amazing language with great tooling built on top of the incredibly reliable _BEAM_ that's able to utilize the best features of `erlang`.
The community is also very welcoming and friendly.
There are no real boundaries to getting started.
As Billy Mays might say, _DO IT TODAY!_

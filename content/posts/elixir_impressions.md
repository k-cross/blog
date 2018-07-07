---
title: "Impressions of Elixir"
date: 2018-07-07T00:36:24-07:00
draft: true
---
_TLDR: Elixir is f*!#ing awesome!_

I've had the luxury of being able to program with _elixir_ for the last nine months.
It's been my first full-time experience utilizing a functional language in a non-educational environment.
For those who don't know, `elixir` is a new language built on top of the `erlang` VM.
It looks similar to `ruby` but behaves quite different.

Coming from a `c` and `python` background, the language has been incredibly expressive and powerful.
The tooling around it makes it a pleasurable experience to work with most of the time.
But the language itself is a real joy to work with.
Parallel, concurrent and distributed programming semantics are top notch and built directly into the language.
Have one program that needs to talk to another? Just create a simple `GenServer`.
Need to create a K/V store, there's `ETS`.
Need that store to be available across multiple nodes and persist, there's `mnesia`.

There are so many good solutions that are readily available to just access in the language with minimal effort.
There's rarely any need for specialized solutions like `redis` or `kafka` because most of the tools are already provided by the language, and in many cases that makes them better since they're easier to extend for a particular use case.
The only time these issues don't work out is when there is a major performance issue or there is less support for other languages and another service written in another language needs to consume or produce some result.
The language is also infinitely flexible as it includes _macros_, a form of _metaprogramming_ by which the language can be extended.
Tired of writing the same boiler-plate code over and over? Write a macro and include it.
The amount of thought that goes into the everyday usage of the language is also nice, since there's a fresh take on doing things the `erlang` way.
Case in point is the `with` statement, its inclusion wasn't necessary but certainly makes simple patterns much easier to deal with and manage.

```elixir
# Before `with`
error_tuple = {:error, "function isn't fun"}

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

That's far easier to grok both syntactically and by volume.
Sure, it's possible to keep this looking pretty by making function wrappers for case statements, but that's essentially what with does in a generic way already.
This is just a simple case of 6 versus 9 lines of code, but it can easily extend beyond that.
My personal benefits with `elixir` go beyond the code, it's allowed me to fully switch into the mindset of functional programming.
It's opened an entire new paradigm of problem solving tools that are mostly better than the OOP alternatives.

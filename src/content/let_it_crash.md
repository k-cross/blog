---
layout: post
title: 'Reflecting on Software Failure'
author: [quasarken]
tags: ['Error Handling','Elixir Examples','Programming']
excerpt: 'Thoughts on the "let it crash" philosophy.'
date: 2020-07-10T17:16:31-07:00
draft: false
---

Being able to just crash an ill running process is awesome.
No need to handle it, no need to `kill -9` a pesky service because of a buggy system call handler.
Just a nice old fashioned death.
This comes from _erlang's let it crash_ philosophy.
But this is about the times when dying is less than desirable.

Why should a process be able to crash and when should it?
They should crash when they're not expected to handle failure.
They're able to crash because they run in isolated tasks with independent memory spaces that can be restarted and run to completion, or just killed.
The thing that makes crashing desirable in the first place is the fact that the correct result either doesn't matter or will result regardless.

What happens when a failure occurs but a user's expecting a response?

> User: WTF is going on?
> Programmer: \\\_(ツ)\_/

Any blocking system call that a user directly relies upon should be handled, whether it's an error message for a non-technical user or a status code for an API consumer.
This doesn't matter for asynchronous calls since their errors can be handled with no user interaction.
Those wayward children can be thrown in a task supervisor and restarted.
In essence if a program needs to relay a message, error handling becomes a requirement.

This is all fine and dandy, but where should error handling code exist?
It's quite easy in functional languages like _erlang/elixir_ to handle error cases because of pattern matching.
For instance:
```elixir
val1 = :some_value

# Response to some blocking client call
with :expected_result1 = val2 <- fun1(val1),
     :expected_result2 <- fun2(val2) do
  :expected_result
end

def fun1(val) do
  case val do
    :some_value -> :expected_result1
    err -> {:error, "Expected somthing else, got #{inspect err}"}
  end
end

def fun2(:expected_result1), do: :expected_result2
def fun2(val), do: {:error, "Some message"}
```
Any error that happens in this function call pipeline simply redirects to it's function's error handler.
There are many ways to deal with error cases but pattern matching on expected results with a catch all on the unexpected ones (or the well known error cases for more tailored responses) create a robust foundation with clear acceptance criteria.
But notice, each function is handling errors here.
Using `with` here makes this cleaner since we don't need to handle errors in function calls, but handling errors inside each function is not ideal either.

Looking at a slightly more complicated example should demonstrate why.
```elixir
# Some more blocking code
def blocking_call({:msg1, val1}, :state) do
  with val2 = val1 <- fun1(val1),
       :expected_result2 <- fun2(val2) do
    :expected_result
  else
    err -> handle_error(err)
  end
end

def blocking_call({:msg2, val1}, :state) do
  with :expected_result1 = val2 <- fun1(val1),
       :expected_result2 <- fun2(val2) do
    :expected_result
  else
    err -> handle_error(err)
  end
end

def handle_error({:error, msg}), do: {:error, msg}
def handle_error(err) when is_atom(err), do: {:error, "got unknown atom"}
def handle_error(err), do: {:error, "generic msg"}

def fun1(val) do
  case val do
    :some_value -> :expected_result1
    val -> val
  end
end

def fun2(:expected_result1), do: :expected_result2
def fun2(val), do: {:error, "Some message"}
```
The more that functions are shared, the more generic they're likely to get.
Generic functions should be focused on applying transformations rather than growing into giant error handlers.
Instead, just write code to handle the unexpected in a isolated and generic way, as a function itself.
Sure, it is not practical for every case but it's certainly nicer than rewriting similar error handling logic when it can be made generic.

Those were examples of direct calls from the client.
So that's straight forward enough, but is there a way to handle less errors in blocking code for complex interactions?
Of course!
```elixir
# Some more blocking code
def blocking_call({:msg1, val1}, :state) do
  with val2 = val1 <- fun1(val1),
       :expected_result2 <- fun2(val2) do
       :ok <- extremely_long_running_function(val2) do
    :expected_result
  else
    err -> handle_error(err)
  end
end

...
def extremely_long_running_function(val) do
  # Wraps program in async task handled by supervisor
  ...
  :ok
end
```
The thing of interest is `:ok` is returned for the asynchronous call, regardless of its success, pawning off error handling and retry logic to the supervisor.
When a thing just needs to happen and no response is needed, then make it asynchronous.
Just because the client needs a response doesn't necessarily mean that the entire request needs to be blocking.

Hopefully this demonstrates the delegation of error handling to robust services and generic functions.
Obviously this will differ in implementation from language to language and project to project, but that's an exercise for the reader `;)`.

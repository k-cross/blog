---
layout: post
title: 'Reflecting on Software Failure'
author: [quasarken]
tags: ['Opinion','Software Engineering']
excerpt: 'Thoughts on the "let it crash" philosophy'
date: 2018-07-10T17:16:31-07:00
modified: 2020-07-19T00:06:38-07:00
draft: false
---
Having the ability to disregard the fallout from process crashes is absolutely cathartic after years of worrying about unhandled exceptions -- resulting in complete failure.
With an actor model and the use of an error kernel, most failures are not catastrophic.
The essence of Erlang's _let it crash_ philosophy stems from the language's runtime architecture.
This is about the times when crashing is less than desirable with an actor model.
Why should a process be able to crash and when should it?
Handling errors becomes a design choice rather than a necessity.
Processes should crash when they're not expected to handle failure, that's the beauty of the error kernel.
They're able to crash because they run in isolated tasks with independent memory spaces that can be restarted and run to completion through the use of different supervision strategies.
The thing that makes crashing desirable is that the correct result either doesn't matter or will eventually result.
Its desirable because crashing is inconsequential.
Handling failures becomes about communication.
How are failures logged in the system and where do stack traces end up?
What happens when a failure occurs and the user receives an unhandled error page?

> User: WTF is going on?
>
> Programmer: \\\_(ツ)\_/

In many cases, wayward children can be thrown in a task supervisor and restarted.
Blocking system calls that users directly rely upon should be handled, whether they're an error message for a non-technical user or a status code for an API consumer.
Asynchronous requests matter less since errors can be handled with no user interaction but logging for operations teams is invaluable in order to gain observability into potentially larger issues.
If a program needs to relay a message, error handling becomes a requirement.
So then, where should error handling code exist?
Ideally, errors would be handled at the application's boundaries enforced through monads but not everyone has the luxury of being able to express errors in this manner.
Pattern matching is a clear way to delineate the error handling logic and business logic, which translates into languages without pattern matching, just less elegantly.
In _elixir_ for instance:

```elixir
# blocking code
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

Pattern matching on expected results with a catch all on the unexpected ones creates a robust foundation with clear acceptance criteria.
Functions should be focused on applying transformations rather than growing into giant error handlers.
Instead, errors should be returned as a type of result and then routed to an error handler.
This also applies equally to `try`/`catch` statements.
It's not always practical but it's less messy than error handling inside of each function.
Here, the failure cases can be made robust and are clear.

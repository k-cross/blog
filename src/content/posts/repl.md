---
layout: post
title: 'Basics: Read, Evaluate, Print, Loop'
author: [Ken Cross]
tags: ['Basics Project', 'Software Engineering']
excerpt: 'How a basic REPL works'
date: 2025-03-03
modified: 2025-03-03
draft: false
---

For a while now, I've been curious about how some of the most basic UNIX tools work.
This is the first post of a series named _Basics_ which will explore the core ideas of these tools, as opposed to the intricacies of various implementations that make specific things nicer.
Being in the higher layers of the stack for a while now I've needed to scratch the lower layer itch.
The easiest thing to start out with is probably a REPL.

First, initialize the input string and like any good shell, print an indicator.
This is done with a macro pushing characters to stdout and flushing the buffer the characters get stored in (don't forget to add `std::io::Write` trait).

```rust
print!("> ");
std::io::stdout().flush().ok();
```

Next, is reading the input from the stdin `BufReader` and storing it in a `String`.
The match on the return values of the read handle signals, in this case it's catching `ctrl-d` and errors beyond the happy path.
This is not an OS signal handler, like taking `ctrl-c` aka `SIGINT` and handling those separately.

```rust
match std::io::stdin().read_line(&mut input) {
    Ok(0) => break,
    Ok(_) => {
        if eval(&input) == 0 {
            break;
        }
        input.clear();
    }
    Err(e) => {
        eprintln!("Error: {}", e);
        break;
    }
}
```

The match then goes into a different function named `eval` to evaluate the input.
It matches the input string for a keyword `"quit"` and returns a `0` signaling to break out of the REPL otherwise it prints the string to the terminal, returns a `1`, and clears the string for reuse.

```rust
match input.trim() {
    "quit" => 0,
    x => {
        println!("You entered: {}", x);
        1
    }
}
```

For our purposes of understanding the REPL control flow, this is it, but it's possible to imagine something smarter as the evaluation function.
Saving and storing previous input for use later as stored variables, saving history, or fancier formatting.
The full program:

```rust
use std::io::Write;

fn main() {
    let mut input = String::new();

    loop {
        print!("> ");
        std::io::stdout().flush().ok();

        match std::io::stdin().read_line(&mut input) {
            Ok(0) => break,
            Ok(_) => {
                if eval(&input) == 0 {
                    break;
                }
                input.clear();
            }
            Err(e) => {
                eprintln!("Error: {}", e);
                break;
            }
        }
    }
}

fn eval(input: &str) -> u8 {
    match input.trim() {
        "quit" => 0,
        x => {
            println!("You entered: {}", x);
            1
        }
    }
}
```

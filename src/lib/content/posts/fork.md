---
layout: post
title: 'Basics: what the fork()'
author: [Ken Cross]
tags: ['Basics Project', 'Software Engineering']
excerpt: 'Where do children come from?'
date: 2025-03-19
modified: 2025-03-19
draft: false
---

This is the third post in the _Basics_ series.
What happens when a process creates multiple processes?

## Operating System View

There are a few process specific operations but specifically we're going to talk about `fork` and `execve` and a bit about what makes a process, a process.
Depending on the OS, a process will contain different things but they are usually represented in memory like the following:

```mermaid
---
title: "Virtual Memory"
config:
  packet:
    showBits: false
---
packet
  0-31: "Stack (Local Variables)"
  32-63: "Heap (Dynamic Memory)"
  64-95: "Data (Static and Global Variables)"
  96-127: "Text (Instructions)"
```

The _text_ field of a process is also known as the _code segment_ and is where the process's instructions are held.
On top of it is the _data_ field which contains, initialized and uninitialized static and global variables.
These are fixed memory locations that are always available to the process and never moved around.
Next is the _heap_ which contains dynamically allocated data for the process.
Dynamic memory allocation is for all data with unbounded requirements like lists, dictionaries, and strings;
an array or a structure with deterministic memory bounds fit on the _stack_, which sits on top of the _heap_.
It contains a lot of information about the process like its state, local variables, and function return locations.

So why am I talking about utensils? The `fork()` system call (and its variants) are the primary mechanism used to create a user process.
A process has a lot of things attached to it and some of it gets copied, like:

- process group
- security credentials
- scheduling priority via its _nice_ settings
- associated file descriptors

Others get explicitly set, such as:

- zeroing out its statistics structures (resource utilization measurements)
- getting a new PID
- entry onto one of the process queues

In Linux, it works like the following:

> The child inherits copies of the parent’s data, stack, and heap segments, which it may then modify independently of the parent’s copies. (The program text, which is placed in memory marked as read-only, is shared by the two processes.) The child process goes on either to execute a different set of functions in the same code as the parent, or, frequently, to use the execve() system call to load and execute an entirely new program. An execve() call destroys the existing text, data, stack, and heap segments, replacing them with new segments based on the code of the new program.[^1]

So in addition to the data attached to a process by the kernel changing, it also gets a new set of memory allocated to it.
In FreeBSD, it's more interesting---`fork()` has a _copy-on-write_ mechanism where it reads all the same data from the parent's memory location but once a modification happens, that entire memory page is copied and updated strictly for the child process.[^2] This is ideal because the use of `fork()` often immediately follows the use of `execve()` which makes fewer copies more optimal.

## Programming Language View

Regardless of programming language, using `libc` is required as its the system call interface to perform protected operations in kernel space[^3] for \*nix operating systems.
The best place to examine what's happening is probably the system's _shell_, which is a special type of [REPL](https://k-cross.github.io/posts/repl) baked into the OS.
A `shell` and how it executes a command is similar to the following program:

```rust
use libc::{c_char, execve, fork, waitpid};
use std::ffi::CString;

fn main() {
    // fork
    unsafe {
        // fork the current process at this point
        let pid = fork();
        if pid == 0 {
            println!("Child process!");

            // execve
            let path = CString::new("/bin/ls").unwrap();
            let arg1 = CString::new("-l").unwrap();
            let args = [path.as_ptr(), arg1.as_ptr(), std::ptr::null()];
            let env = [std::ptr::null::<c_char>()];

            let exit_code = execve(path.as_ptr(), args.as_ptr(), env.as_ptr());
            // Will never execute this because the program stack in the child is
            // rewritten for the program replacing it which is `ls -l` here.
            println!("Child exit status: {}", exit_code);
        } else {
            println!("Parent process! Child PID: {}", pid);
            let mut status: i32 = 0;
            waitpid(pid, &mut status as *mut i32, 0);
            println!("Waiting from parent... Child PID: {}, Exit Status: {}", pid, status);
        }
    }
}
```

That same `fork()` call is copying the running system's shell process, so the child shares the same _heap_, _stack_, _data_, and _text_ memory at this point.
The conditional statement utilizes that fact to determine if it should then execute the new process using `execve()` or whether it should wait and report the outcome of the child process using `waitpid()`.
The `execve()` call replaces the process entirely with `ls -l` and the last line in that conditional branch shows how it will never be executed.
The parent immediately prints then waits for the child to run only to print its exit status once finished.
The program's output:

```plaintext
Parent process! Child PID: 429
Child process!
total 16
-rw-r--r--@ 1 ken  staff  367 Mar 18 10:57 Cargo.lock
-rw-r--r--@ 1 ken  staff   93 Mar 18 10:57 Cargo.toml
drwxr-xr-x@ 3 ken  staff   96 Mar 18 10:58 src
drwxr-xr-x@ 5 ken  staff  160 Mar 18 10:58 target
Waiting from parent... Child PID: 429, Exit Status: 0
```

Notice the output and how it goes from parent -> child -> parent due to the wait and also notice how it never executes the line below `execve()`.
That's it, thanks for reading!

[^1]: The Linux Programming Interface by Kerrisk, Michael

[^2]: [The Design and Implementation of the FreeBSD Operating System, 2nd Edition](https://dl.acm.org/doi/10.5555/2659919)

[^3]: [Gentoo LibC documentation](https://wiki.gentoo.org/wiki/Libc)

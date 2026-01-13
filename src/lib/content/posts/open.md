---
layout: post
title: 'Basics: open()'
author: [Ken Cross]
tags: ['Basics Project', 'Software Engineering']
excerpt: 'How opening a file works'
date: 2025-03-04
modified: 2025-03-04
draft: false
---

This is the second post in the _Basics_ series.
How does _opening_ a file work?

## Operating System

Depending on the operating system, some details may be a little different but should be similar enough for UNIX based systems.
There are a few types of _descriptors_ and using the `open` system call to get a _file descriptor_ is most common.
_Descriptors_ are small unsigned integers that are made from specific system calls.
For the _open_ system call, it takes a _file path_ and a _permission mode_ to determine if the file should be read or write access.
The _read_ and _write_ system calls can be applied to the _descriptor_ and the _close_ call will deallocate the _descriptor_.

A list of different kinds of descriptors[^1]:

- file: a linear array of bytes with a name
- pipe: a linear array of bytes used solely as a unidirectional I/O stream containing two descriptors, one of which is input that the other accepts
- fifo: is the same as a pipe but has a name and can be used with _open_ since it appears in the file-system
- socket: a transient object existing only as long as a process is using it
- POSIX IPC: these are for message queues, shared memory, and semaphores
- event queue: is a notification system that signal to something holding the descriptor that something occurred

Descriptors get a _file offset_ associated with them which tell where _reads_ or _writes_ should happen.

## Programming Languages

_Note: Assuming an OS and a language's standard library_

Opening a file from a programming language works similarly, it's a wrapper around the `open` system call.
System calls are accessed via `libc` which implements the _portable operating system interface_ (POSIX) facilities[^2].
Using the `open` system call will return a file descriptor, where `-1` indicates a failure.

```rust
let filename = CString::new("example.txt").unwrap();

unsafe {
    let fd = libc::open(filename.as_ptr(), O_RDONLY);
    if fd == -1 {
        eprintln!("Failed to open file.");
        return;
    }
```

In order to read data from the file, the `read` system call is used with the file descriptor and a pointer to an empty array of unsigned integers along with its length are given as arguments, to fill up the _buffer_.
The `read` returns an `isize` integer indicating how many bytes have been read.
Next the program converts the bytes into a string and prints to console.
Lastly, the `close` system call is used to give up the file descriptor, which removes locks and the seek position associated with that descriptor, returning an integer indicating the status of the close, `0` for success and `-1` for error.

```rust
let mut buffer = [0u8; 100];
let bytes_read = libc::read(fd, buffer.as_mut_ptr() as *mut _, buffer.len());

println!("Bytes read: {:?}", &bytes_read);

if bytes_read > 0 {
    let output = String::from_utf8_lossy(&buffer[..bytes_read as usize]);
    println!("File content:\n{}", output);
} else {
    eprintln!("Failed to read file.");
}

let close_val = libc::close(fd);
```

Showing that the file descriptor was given up and that the `rust` standard library is just a wrapper, immediately after calling the `libc` version, use the standard library to open a different file and see what it looks like:

```rust
let file = File::open("/Users/ken/src/hello.d").unwrap();
println!("This is a standard file: {:?}", file);
```

Another fun fact, is that _stdin_, _stdout_, and _stderr_ are all common file descriptors that can easily be written to.

```rust
let msg = "Hello, libc syscalls!\n";
let stdout_fd = 1;
unsafe {
    libc::write(
        stdout_fd,
        msg.as_ptr() as *const c_void,
        msg.len() as size_t,
    );
}
```

The full program and its output:

```rust
use libc::{O_RDONLY, c_void, size_t};
use std::ffi::CString;
use std::fs::File;

fn main() {
    // using libc syscalls to write a msg to stdout
    let msg = "Hello, libc syscalls!\n";
    let stdout_fd = 1;
    unsafe {
        libc::write(
            stdout_fd,
            msg.as_ptr() as *const c_void,
            msg.len() as size_t,
        );
    }

    let filename = CString::new("example.txt").unwrap();

    unsafe {
        // Tell the OS to open a new file which gives us a FD
        let fd = libc::open(filename.as_ptr(), O_RDONLY);
        if fd == -1 {
            eprintln!("Failed to open file.");
            return;
        }

        let mut buffer = [0u8; 100];
        let bytes_read = libc::read(fd, buffer.as_mut_ptr() as *mut _, buffer.len());

        println!("Bytes read: {:?}", &bytes_read);

        if bytes_read > 0 {
            let output = String::from_utf8_lossy(&buffer[..bytes_read as usize]);
            println!("File content:\n{}", output);
        } else {
            eprintln!("Failed to read file.");
        }

        // Tell the OS that we're done with the FD
        let close_val = libc::close(fd);
        println!("fd = {}, close = {}", fd, close_val);
    }

    // Regular rust file procedure
    let file = File::open("/Users/ken/src/hello.d").unwrap();
    println!("This is a standard file: {:?}", file);
}
```

```plaintext
Hello, libc syscalls!
Bytes read: 100
File content:
data
this should be a very 長いですよ！ long sentance that's more than 100 bytes and contains
fd = 3, close = 0
This is a standard file: File { fd: 3, path: "/Users/ken/src/hello.d", read: true, write: false }
```

Notice how the two different files get the same file descriptor number, `3`, after it's been deallocated. Thanks for reading!

[^1]: [The Design and Implementation of FreeBSD, 2nd Edition](https://dl.acm.org/doi/10.5555/2659919)

[^2]: [Gentoo LibC documentation](https://wiki.gentoo.org/wiki/Libc)

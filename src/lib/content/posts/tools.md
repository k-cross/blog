---
layout: post
title: 'Tools'
author: [Ken Cross]
tags: ['Opinion', 'Software Engineering']
excerpt: 'A new age of tooling for software engineers'
date: 2025-01-09
modified: 2025-01-09
draft: false
---

There is no shortage of tools and depending on when you've started your career, you have opinions on which ones are _the best_. The tools we create ourselves to solve our own problems spark little joys that reignite the excitement of computing and what it can be. General purpose tools have their place, by contrast, performing a surgery with a butcher's knife instead of a scalpel results in more scar tissue and worse patient outcomes.

# Into the Unknown

People love their tools, regardless of profession---the more time spent working with them represents effort spent honing a particular skill. Discarding a tool that's taken considerable time to master is difficult precisely because it equates to eliminating the energy invested. Better tools should be evaluated against these energy requirements to make clear the investment pays off; remaining a curmudgeon is essentially realizing the sunk cost fallacy.

$$
\text{Energy invested} = e
$$

$$
\text{Energy expended upon use} = u
$$

$$
(e' - e) + (u' - u) > 0
$$

Over a long enough time horizon, this should be greater than zero. I'm not here to tell you which tools are better than others, but to encourage you to try new ones at some regular cadence. I empathize with everyone against the idea because of that commitment that's being thrown away but we grow by expanding what we're capable of and new tools are an easy lever to try. Tools for software engineering have improved by large margins and they're more accessible than ever, making things that were once difficult more tractable. The time is ripe, so I've begun re-evaluating the tools that have been used in my daily workflow. My ideal tools are simple and require minimal configuration to be productive; steep learning curves are acceptable if the energy payout is worthwhile. Highly configurable tools have the potential to become maintainability burdens and customizing them means being unfamiliar with their standard behavior across environments which is unappealing. Ideally, the same set of tools I use on MacOS should work on the \*nix variants and ideally Windows.

The list below are the new tools that have been replacing the ones in my workflow as of late:

- Zed, and Helix editors have replaced most of my neovim usage
- jj has replaced most of my personal git usage
- zellij has replaced tmux
- ghostty has replaced alacritty and terminal.app
- rust has replaced python scripts for CLI programs

Both the Zed and Helix editors are phenomenal in their own ways. The terminal has been my home for work for most of my career but setting up common tools like language servers has an impact on performance and maintainability on neovim. Helix has been a refreshing change, it's a different type of modal editor that makes it easier to learn the system (borrowing from kakoune), but modern features like language servers are integrated directly and managed through configuration files. My issue is that I am still not entirely productive with _helix_ because it has different key bindings and finding ways to make that translation from _vim_ has not always been easy. That said, I do welcome the differences it brings to the table and the experimentation its done in the problem space. I hope it becomes more widely adopted because it would make modal editing more popular than it is today. I also started splitting my time up with _Zed_ which is not a terminal based editor but has good _vim_ emulation and incredibly fast. I do miss my terminal workflow from time to time but it's been less and less with _zed_. Most of what I want to do through quick tasks can be achieved through its baked in terminal---it's not perfect but a substantial upgrade from _VS Code_ which is slow and feels less natural for _vim_ users.

Next, _jujutsu_ or _jj_ has replaced my personal usage of _git_. It's workflow is nicer, it's CLI is more intuitive and it has done its homework about real features it can add on to it while supporting _git_ as its _backend_. The reason I was not able to use this at work was because it uses headless by default and making all the custom git tooling work properly with internal systems was more of a headache than not doing it. If you don't have a company with modified _git_ binaries and custom tooling to manage its workflows, consider using _jj_. It's easier to on-board people into while still providing value for those who know git.

Discovering _tmux_ considerably improved my workflow performance. It removed my need for a tiling window manager since I mostly used one for additional terminals. It's rare that I want tiling windows for other things but it is occasionally nice to have. Configuring _tmux_ is not straight forward and terminal emulators have come a long way. It has some hostile defaults for what one would expect in a modern application. _Zellij_ is new and fills the gap for me here. Not only does it have sane defaults, but it also adds a whole host of interesting and useful features. Another reason I like using _zellij_ on my local environment is because I don't need to worry about nested instances when I ssh into another system. I can use _tmux_ on the remote system and know that all of my tmux controls are being applied to that instance. My biggest criticism with _zellij_ is that is seems like it's doing too much. It has a lot of features I will likely never use but it is an interesting take on a modernized terminal multiplexer. I would like to see it implement the newer _kitty graphics protocol_ instead of, or in addition to _sixel_, but we'll see.

MacOS is home now---in the past I was sporting a Gentoo rig but after having kids I wanted to spend my limited time on interesting projects instead of configuration issues. As a side note, it was a great way to learn a lot about systems, dealing with certain issues in anger. Anyways, the default Mac terminal emulator could be better. It's very slow to respond to inputs and run programs---until switching to _alacritty_ I did not notice how bad it was. The responsiveness of _ghostty_ has been on par with _alacritty_ which has been a noticeable improvement. _Ghostty_ is a recent change and people are actively making the terminal experience better rather than being curmudgeons about which features to include (not implementations, but features).

To top it off, _rust_ has been an amazing tool. It's helped me write powerful CLIs at work and on personal projects. For CLIs particularly, its deployment model is simple and stable---the ecosystem makes writing CLIs fun. Getting a single deployable executable is easier to manage operationally than a python project that needs to get pull its packages from a package manager, all being shipped and bundled with the right versions of libraries and runtimes which may end up in OS conflicts. It's possible to bundle python applications too, but it is more effort to do so; since _rust_ was built for this, making professional grade CLIs with _clap_ as its argument parser is dead simple. It is really easy to get things to run fast using libraries like _rayon_ to parallelize things quickly. The last thing I wrote at Dropbox was a tool that would help audit code bases and dump its results into a CSV file but one of the things it used was an internal CLI tool to track owners of those files. Running the check owners utility was painfully slow, but by doing it in parallel it reduced an hour and a half job to about 15 seconds.

# Create the Future

Creating custom tools that improve working conditions for specific use cases has always been worth it. Tedious tasks and untenable requests often make writing custom tools worth building even when they seem like they won't pay off. There are two reasons, the first one is that they keep you engaged in the work so that you actually perform it with a high degree of quality; the second is that once it's been made, if there is ever a second request to do it again, you can repeat it quickly or you can share the tool to make the other person's life a little better. Building tools can keep you aligned on outcomes and make specific requests repeatable. A manager might look at you cock-eyed but, if it seems like it's the right way forward or it's the only way to stay motivated on a task that takes more than a few hours, it might be worth it. I've written tools to generate JIRA tickets from CSV files; audit code bases and generate reports tracking the owners of files; a custom monitoring system for an ELK stack that reported custom health metrics and set alarms; infrastructure visualization utility to help understand how certain network patterns would affect services in chaos experiments and incidents... The point is, don't be afraid to build something only you might use, as it's often worth it and inspires someone else to build on the work you did to make something even better. These are often the best product ideas and the origin stories of companies.

Being willing to expend energy, exploring a new problem domain will deepen your understanding of the engineering behind a class of problems. Personally, I'm curious, I want to learn new things even if they might not pay off because it brings more optimism to the craft. It's not all I want to do with my time, but it helps remind me about the things I enjoy about the work. Cheers!

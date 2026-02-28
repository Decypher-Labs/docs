# Process Management

A **process** is a running instance of a program. The kernel gives each process a PID (process ID), memory space, and resources. These commands help you see and control them.

## ps

Snapshot of processes. Useful columns: **PID**, **USER**, **%CPU**, **%MEM**, **COMMAND**.

```bash
ps                     # Your terminal's processes only
ps aux                 # All processes (a=all, u=user columns, x=include no terminal)
ps -ef                 # All processes, full format (e=all, f=full)
ps -e -o pid,user,cmd  # Custom columns
```

Pipe to grep to find a program: `ps aux | grep nginx`.

## top

Interactive live view that updates periodically. Shows overall CPU/memory and a list of processes sorted by resource use.

```bash
top                    # Start top (q quit, k kill, M sort by memory, P sort by CPU)
```

- **q** — Quit  
- **k** — Kill a process (enter PID, then signal)  
- **M** — Sort by memory  
- **P** — Sort by CPU  

## htop

Friendlier interactive process viewer (clearer layout, colors). Often not installed by default.

```bash
htop                   # Start htop (F9/k send signal, F10/q quit)
```

Install: `sudo apt install htop` (or your distro's package manager). Use arrow keys to select a process; **F9** or **k** to send a signal (e.g. SIGTERM, SIGKILL).

## kill

Send a signal to a process. Prefer **SIGTERM** so the program can clean up; use **SIGKILL** only when necessary.

```bash
kill <PID>             # Default: SIGTERM (ask process to exit)
kill -15 <PID>         # SIGTERM (same as default)
kill -9 <PID>          # SIGKILL (force exit; use if SIGTERM fails)
kill -l                 # List signal names and numbers
killall <name>         # Kill all processes whose name matches
killall -9 <name>      # Force kill by name
```

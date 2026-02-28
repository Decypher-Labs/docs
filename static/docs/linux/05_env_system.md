# Environment & System Info

## env

List current environment variables, or run a command with a modified environment.

```bash
env                      # List all environment variables
env USER=alice cmd       # Run cmd with USER=alice in its environment
env -i cmd               # Run with empty environment (-i)
```

## export

Make variables available to child processes. Variables set in the shell are not passed to programs unless you **export** them.

```bash
MY_VAR=hello
export MY_VAR                    # Child processes now see MY_VAR
export PATH="$PATH:/opt/bin"     # Add to PATH
export EDITOR=vim                # Often combined: export VAR=value
```

## uname

Kernel and system information. Useful for scripts that need OS or architecture.

```bash
uname                   # Kernel name (e.g. Linux)
uname -a                # All: kernel name, hostname, release, version, machine
uname -r                 # Kernel release (e.g. 5.15.0-...)
uname -m                 # Machine architecture (e.g. x86_64, aarch64)
uname -n                 # Hostname (-n)
```

## df

Disk space per mounted filesystem. Use **-h** for human-readable sizes.

```bash
df                      # All mounted filesystems (1K blocks)
df -h                   # Human-readable (G, M, K)
df -h /                 # Only filesystem containing /
```

## du

Disk usage of directories and files. **-s** = summary (total only), **-h** = human-readable.

```bash
du -sh /var/log         # Total size of /var/log (summary, human-readable)
du -h --max-depth=1     # Sizes one level deep
du -sh *                # Size of each item in current directory
du -ah dir/             # All files and dirs, human-readable
```

## uptime

How long the system has been up, plus load averages (1, 5, 15 minutes). Load average is a rough measure of how busy the system is.

```bash
uptime
# e.g. 10:00:00 up 30 days, 2:00, 3 users, load average: 0.50, 0.60, 0.55
```

## free

Memory usage. **-m** is common in scripts (MiB); **-h** for human-readable.

```bash
free                    # Memory in KiB
free -m                 # In MiB
free -h                 # Human-readable
free -m -s 5             # Refresh every 5 seconds
```

Shows total, used, free, and (where relevant) buffer/cache.

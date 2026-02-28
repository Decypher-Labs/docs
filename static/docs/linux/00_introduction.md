# Introduction to Linux
**Linux** is a **kernel** — the core program that talks directly to the hardware (CPU, memory, disks, devices). It is **not** the whole operating system. A "Linux system" is usually the kernel plus user-space tools (shell, commands, desktop) from projects like GNU, which is why many call it **GNU/Linux**.

> **Note:** How a kernel differs from an entire OS? See [Kernel vs Operating System](/blogs/kernel-vs-os)

## Why it's so popular?

- **Free and open source** — No license cost; you can inspect and change the code.
- **Stable and reliable** — Powers servers and embedded systems for long uptimes.
- **Ecosystem** — Huge amount of software, docs, and community support.
- **DevOps default** — Most servers, clouds, containers, and automation run on Linux.

## Linux architecture

```
    ┌────────────────────────────────────────────┐
    │  User applications (browser, editor, etc.) │
    ├────────────────────────────────────────────┤
    │  Shell & user commands (bash, ls, grep)    │
    ├────────────────────────────────────────────┤
    │  System libraries / daemons (cron, sshd)   │
    ├────────────────────────────────────────────┤
    │  Kernel (scheduler, memory, devices)       │
    ├────────────────────────────────────────────┤
    │  Hardware (CPU, RAM, disk, network)        │
    └────────────────────────────────────────────┘
         ↑ system calls          ↑ direct access
```

On high-level, the architecture looks something like this:
1. **Hardware** — CPU, RAM, disk, network, etc.
2. **Kernel** — Schedules processes, manages memory, handles devices, implements system calls.
3. **System services / daemons** — Login, networking, cron, etc.
4. **Shell & user commands** — The environment where you type commands (e.g. bash).
4. **User applications (browsers, editors)** — The applications/bins installed by the user.

The **shell** reads your commands and starts other programs; the **kernel** does the low-level work (files, processes, network).

## FileSystem hierarchy

Linux organizes the whole system under a single tree starting at **`/`** (root).

| Path     | Purpose |
|----------|---------|
| `/`      | Root of the filesystem. |
| `/bin`   | Essential user binaries (e.g. `ls`, `cp`). |
| `/sbin`  | Essential system/admin binaries. |
| `/etc`   | Configuration files. |
| `/home`  | User home directories. |
| `/root`  | Root user's home. |
| `/var`   | Variable data (logs, caches, databases). |
| `/tmp`   | Temporary files. |
| `/usr`   | User programs and read-only data. |
| `/dev`   | Device files (disks, terminals, etc.). |
| `/proc`  | Virtual filesystem for process and kernel info. |
| `/sys`   | Virtual filesystem for kernel/subsystem info. |

**"Everything is a file"** means files, directories, and devices are exposed through the filesystem. You read/write normal files and also special "files" in `/dev`, `/proc`, `/sys` to interact with hardware and the kernel — one uniform interface (open, read, write, close).

## Why to learn in the first place?

- **Docker** — Uses Linux kernel features (namespaces, cgroups) to isolate processes and limit resources. Containers share the host kernel; that's why they're Linux-native.
- **Kubernetes** — Runs on Linux nodes. Kubelet, container runtime, and workloads rely on the Linux kernel and filesystem.
- **CI/CD runners** — Most runners (GitHub Actions, GitLab Runner, Jenkins agents) run on Linux, so pipelines use Linux commands and tools.
- **Cloud VMs** — The majority of cloud instances (AWS, GCP, Azure) run Linux. Knowing the kernel, filesystem, and basic shell is essential for managing them.

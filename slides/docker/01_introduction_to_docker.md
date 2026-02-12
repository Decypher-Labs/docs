# Introduction to Docker

Docker is a platform for developing, shipping, and running applications in **containers**.

## What is a container?

A container is a lightweight, standalone executable package that includes everything needed to run a piece of software:

- Code
- Runtime
- System tools
- Libraries
- Settings

Containers are isolated from each other and from the host system, but share the host kernel.

## Why Docker?

| Benefit | Description |
|--------|-------------|
| **Consistency** | Same environment from dev to production |
| **Isolation** | Apps don't conflict with each other |
| **Portability** | Run anywhere: laptop, cloud, on-prem |
| **Efficiency** | Lightweight compared to virtual machines |

## Getting started

```bash
docker run hello-world
```

Docker will download the `hello-world` image (if needed) and run it in a container.

## Next steps

In the following slides we'll cover:

1. Images and containers
2. Dockerfile basics
3. Docker Compose for multi-container apps
4. Best practices

---

*Happy containerizing!*

# Permissions & Ownership

Every file and directory has an **owner**, a **group**, and **permissions** (read, write, execute) for owner, group, and others.

## Managing owners & groups

- **Owner** — User that owns the file (often the creator).
- **Group** — Group associated with the file; members get the "group" permissions.
- **Others** — Everyone else.

Permissions are three sets of **r**ead, **w**rite, **e**xecute: **owner | group | others**. Example from `ls -l`:

```text
-rwxr-xr--  1 alice devs 1024 Feb 28 10:00 script.sh
│││││││││
││││││││└── others: r-- (read only)
││││││└─── group:  r-x (read + execute)
││││└──── owner:  rwx (read + write + execute)
│└─────── type: - = file, d = directory, l = link
```

## chmod

Change permissions. Numeric (octal): **r=4, w=2, x=1** per set (owner/group/others). For directories, **x** means "can enter and use names inside".

```bash
chmod 755 script.sh    # rwxr-xr-x (owner all, others read+execute)
chmod 644 file.txt     # rw-r--r-- (owner read+write, others read)
chmod 700 private      # rwx------ (only owner)
chmod u+x script.sh    # Add execute for owner
chmod g-w file.txt     # Remove write for group
chmod o+r file.txt     # Add read for others
chmod a+r file.txt     # Add read for all (a = all)
chmod -R 755 dir/      # Recursive
```

## chown

Change owner and/or group. Usually requires root (`sudo`).

```bash
chown alice file.txt           # Set owner to alice
chown alice:devs file.txt      # Owner alice, group devs
chown :devs file.txt           # Group only
chown -R alice:devs /var/app   # Recursive
```

## sudo

Run a single command as **root**, if your user is in `/etc/sudoers`.

```bash
sudo apt update
sudo systemctl restart nginx
sudo -i                 # Open root's shell (login as root)
```

## sudo su

Switch to another user's shell. **sudo su** or **sudo su -** gives you root's shell; **su - username** switches to that user (needs their password or root).

```bash
sudo su                # Switch to root shell
sudo su -              # Switch to root with root's environment
su - alice             # Switch to user alice
```

Use **sudo** for single commands; use **sudo su** or **su -** when you need a full shell as another user.

## whoami

Print the effective username. Useful in scripts and when using sudo.

```bash
whoami                 # e.g. alice
sudo whoami            # root
```

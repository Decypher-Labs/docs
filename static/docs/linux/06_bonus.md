# Bonus & Advanced

## apt

Package management on Debian/Ubuntu. Always run **update** before **upgrade** or **install**.

```bash
sudo apt update                # Refresh package lists
sudo apt upgrade                # Upgrade all installed packages
sudo apt install <pkg>          # Install a package
sudo apt install -y <pkg>       # Install without confirmation (-y)
sudo apt remove <pkg>           # Remove package (keep config)
sudo apt purge <pkg>            # Remove package and config files
sudo apt autoremove             # Remove unused dependencies
apt search <term>               # Search packages
apt show <pkg>                  # Package details
apt list --installed            # List installed packages
```

## tmux

Terminal multiplexer: keeps sessions alive if SSH drops and lets you split windows/panes. Prefix key is **Ctrl+b**.

```bash
tmux                   # Start new session
tmux attach            # Reattach to last session (tmux a)
tmux attach -t 0       # Attach to session 0 (-t target)
```

- **Ctrl+b d** — Detach (session keeps running)  
- **Ctrl+b c** — New window; **Ctrl+b n** / **Ctrl+b p** — Next/previous window  
- **Ctrl+b %** — Split vertically; **Ctrl+b "** — Split horizontally  
- **Ctrl+b arrow** — Move between panes  

## zshrc operations (alias, env)

**~/.zshrc** (or **~/.bashrc** for bash) runs when you start an interactive shell. Use it for aliases and environment variables.

```bash
# Aliases
alias ll='ls -la'
alias g=git
alias ..='cd ..'

# Environment variables
export EDITOR=vim
export PATH="$PATH:$HOME/bin"
```

Reload after editing: `source ~/.zshrc` or `source ~/.bashrc`, or open a new terminal.

## systemctl

Manage systemd services. Use **status** first to see if the service is active and any errors.

```bash
sudo systemctl start <unit>     # Start service
sudo systemctl stop <unit>      # Stop
sudo systemctl restart <unit>   # Restart
sudo systemctl reload <unit>    # Reload config (if supported)
sudo systemctl status <unit>    # Status and recent logs
sudo systemctl enable <unit>    # Start at boot
sudo systemctl disable <unit>   # Don't start at boot
sudo systemctl list-units       # List loaded units
```

## journalctl & crontab

**journalctl** — Read systemd journal (logs from services and kernel).

```bash
journalctl -u nginx             # Logs for nginx unit (-u)
journalctl -f -u nginx          # Follow (-f), like tail -f
journalctl -n 100               # Last 100 lines (-n)
journalctl -p err               # Priority error and above (-p)
journalctl --since "1 hour ago"
journalctl --since "2025-02-28" --until "2025-02-29"
```

**crontab** — Schedule jobs. Format: **minute hour day-of-month month day-of-week command**. Use absolute paths for scripts.

```bash
crontab -e              # Edit your crontab
crontab -l              # List current entries
crontab -r              # Remove your crontab
```

Examples:

```bash
0 2 * * * /opt/backup.sh        # Every day at 02:00
*/5 * * * * /opt/check.sh      # Every 5 minutes
0 * * * * /opt/hourly.sh       # Every hour at :00
```

## ss

Socket statistics (replaces **netstat** on many systems). Useful for listening ports and connections.

```bash
ss -tuln                # TCP (-t) and UDP (-u) listening (-l), numeric (-n)
ss -tlnp                # TCP listening with process info (-p)
ss -an                  # All sockets (-a), numeric
ss -t state established # TCP in established state
```

- **-t** TCP, **-u** UDP, **-l** listening, **-n** numeric (no DNS), **-p** process  

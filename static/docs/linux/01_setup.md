# Installation & Getting Started
If you already have `linux` or `macOS`, you are good to go.

<details>
<summary>For Windows</summary>
<ul>
<li><strong><a href="https://git-scm.com/install/windows" target="_blank" rel="noopener noreferrer">Git Bash</a></strong> — Installed with Git for Windows. Gives a bash-like shell and common Unix tools so you can run many Linux-style commands.</li>
<li><strong>WSL (Windows Subsystem for Linux)</strong> — Runs a real Linux kernel and distro (e.g. Ubuntu) inside Windows. Best option for a full Linux environment.</li>
</ul>
</details>

## Getting started with commands

### Navigating & inspecting

```bash
pwd                    # Print current working directory
ls                     # List directory contents
ls -l                  # Long format (permissions, owner, size, date)
ls -la                 # Long format + hidden files (dotfiles)
ls -lh                 # Long format, human-readable sizes
cd <dir>               # Change directory
cd ~                   # Change to home directory
cd -                   # Change to previous directory
tree                   # Show directory tree (install if needed)
tree -L 2              # Limit depth to 2 levels
stat <file>            # File/dir metadata (size, permissions, timestamps)
```

### Creating & removing

```bash
touch <file>           # Create empty file or update modification time
mkdir <dir>            # Create directory
mkdir -p a/b/c         # Create nested directories (no error if exists)
rmdir <dir>            # Remove empty directory
rm <file>              # Remove file
rm -r <dir>            # Remove directory and contents (recursive)
rm -rf <dir>           # Force recursive remove (use with care)
```

### Copying & moving

```bash
cp <src> <dest>        # Copy file
cp -r <src> <dest>     # Copy directory recursively
cp -i <src> <dest>     # Prompt before overwrite
mv <src> <dest>        # Move or rename file/directory
```

### Editing

```bash
vi <file>              # Edit file (learn: i insert, Esc, :wq save and quit, :q! quit without saving)
vim <file>             # Same, improved vi
```

### Viewing file content

```bash
cat <file>             # Print whole file to stdout
less <file>            # Paginated view (Space scroll, / search, q quit)
head <file>            # First 10 lines
head -n 20 <file>      # First 20 lines
tail <file>            # Last 10 lines
tail -n 20 <file>      # Last 20 lines
tail -f <file>         # Follow new lines (live)
wc <file>              # Line, word, byte count
wc -l <file>           # Line count only
wc -w <file>           # Word count only
nl <file>              # Number lines
```

Use these with pipes (`|`) and redirection (`>`, `>>`, `<`) as the foundation for scripting.

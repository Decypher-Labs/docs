# Finding, Searching & Sorting

## grep

Search lines of input (files or stdin) for a pattern (plain text or regex). Use with pipes: `ps aux | grep nginx`, `cat file | grep "key"`.

```bash
grep "error" /var/log/app.log    # Lines containing "error"
grep -i "warning" file.txt       # Case-insensitive (-i)
grep -r "TODO" src/             # Recursive in directories (-r)
grep -n "pattern" file.txt      # Show line numbers (-n)
grep -v "debug" file.txt        # Invert: lines NOT matching (-v)
grep -c "pattern" file.txt      # Count matching lines (-c)
grep -l "error" *.log           # List only filenames that match (-l)
grep -E "foo|bar" file.txt      # Extended regex (-E)
```

## find

Search the directory tree by name, type, time, size, etc. Always give a scope (e.g. `.` or `/path`) to avoid slow, wide searches.

```bash
find /home -name "*.txt"              # Files ending in .txt
find . -name "config*"                # Names starting with "config"
find /var -type d -name "log"        # Directories (-type d) named "log"
find . -type f -name "*.sh"          # Files (-type f) only
find . -type f -mtime -7             # Modified in last 7 days (-mtime -7)
find . -type f -mtime +30            # Older than 30 days
find . -type f -size +10M            # Files larger than 10 MB (-size)
find /tmp -empty                     # Empty files or dirs
find . -exec chmod 644 {} \;         # Run command on each ({} \; or {} +)
find . -name "*.log" -delete         # Find and delete
```

- **-type f** = file, **-type d** = directory  
- **-mtime -7** = modified in last 7 days; **+7** = older than 7 days  

## sort

Sort lines (from file or stdin). Often used with pipes.

```bash
sort file.txt              # Alphabetical order
sort -n numbers.txt        # Numeric order (-n)
sort -r file.txt          # Reverse order (-r)
sort -u file.txt           # Unique (deduplicate) (-u)
sort -t',' -k2 data.csv    # Comma-separated (-t), sort by 2nd field (-k2)
sort -t':' -k3 -n file     # Sort by 3rd colon-separated field, numeric
```

Common combo: `sort file | uniq -c` to count occurrences.

#!/usr/bin/env python3
"""Checks that every address that worked on the old site still works.
Usage: python3 tools/check_urls.py http://localhost:8000      (or https://sonicsquirrels.com)"""
import sys, urllib.request, urllib.error, urllib.parse
base = sys.argv[1].rstrip("/"); bad = 0
for path in [l.strip() for l in open(__file__.replace("check_urls.py", "old_urls.txt")) if l.strip()]:
    u = base + urllib.parse.quote(path, safe="/%:@")
    try: code = urllib.request.urlopen(u, timeout=15).status
    except urllib.error.HTTPError as e: code = e.code
    except Exception as e: code = str(e)
    if code != 200: bad += 1
    print(("OK   " if code == 200 else "FAIL ") + str(code) + "  " + path)
print(f"\n{'ALL URLS WORK' if not bad else str(bad) + ' PROBLEM(S) - fix before going live'}"); sys.exit(1 if bad else 0)

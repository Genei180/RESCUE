RESCUE PWA proof-of-concept
=================================

This directory contains a tiny PWA scaffold used to validate offline IndexedDB storage and service-worker behavior.

How to run
----------
You need to serve the files over HTTP (service workers require secure context or localhost). From the repo root run a simple static server, for example with Python 3:

```bash
python -m http.server 8000 --directory .
```

Then open:

http://localhost:8000/src/pwa-proof-of-cocnept/

What it demonstrates
--------------------
- Adding PositionUpdates stored into IndexedDB
- Simple service worker registration and precaching
- Installable manifest (limited)

Limitations
-----------
- This is a minimal demo and not production-ready. Map tiles and offline tile caching are out of scope for this prototype. Use it to validate the PWA-first approach.

# Athena

A real, working personal assistant: talk to her (terminal or HTTP), and she
controls Home Assistant devices, reads/writes files, generates PDFs, and
creates Word/Excel/PowerPoint documents — all through tool-calling, gated by
a tiered permission system, with a disk-backed audit trail and an
online/offline (Claude ↔ local Ollama) backend switch.

## What she can actually do right now

- **Home Assistant**: check device states, control lights/switches/climate,
  with locks/covers requiring your explicit approval.
- **Files**: read/write/delete text files and generate PDFs, sandboxed to a
  single workspace folder (path traversal is blocked, tested).
- **Office documents**: create Word, Excel, and PowerPoint files in that same
  workspace.
- **Online/offline**: uses Claude when there's internet; falls back to a
  local Ollama model when there isn't (you'll need Ollama installed and a
  model pulled — see `athena/llm_backends/ollama_backend.py`). Told honestly,
  not pretended: if neither is available, she says so.
- **Persistent audit trail**: every action is logged to a SQLite file in the
  workspace, so it survives restarts.
- **Runs three ways**:
  - `main.py` — interactive terminal chat, Tier 3 actions ask you `y/n` right there.
  - `service.py` — headless HTTP service for autostart (systemd/launchd/Task
    Scheduler — see `deploy/`). Tier 3 actions get queued instead of blocking,
    since nobody's there to answer; approve/deny them via `/pending`.
  - `voice.py` — always-listening for a wake word ("Athena," once you've set
    up a custom keyword — see below), hands-free. Tier 3 actions queue the
    same way `service.py` does; run both together and approve via `/pending`.
    **Genuinely untested beyond the code compiling and the surrounding logic
    passing tests** — no mic/speakers in the dev sandbox this was built in.
    See `PROJECT_LOG.md` Phase 5 for exactly what was and wasn't verified,
    and verify wake-word/STT accuracy on your own machine before relying on
    it.

## Desktop app build

The Next.js/Tauri desktop path is now the canonical UI runtime. Voice is optional
and is not required to build or use the desktop application. From the project
root, install Python dependencies, Node dependencies, Rust/Cargo, and
PyInstaller, then run:

```powershell
python -m pytest -q
npm install
npm --prefix frontend install
npm run check:packaging
npm run tauri:build
```

`tauri:build` creates a target-triple-named PyInstaller sidecar under
`src-tauri/binaries/` before packaging the static frontend. Release readiness
still requires launching the installer and checking `/health`, login, command
round-trip, file/artifact access, approval replay, and clean shutdown. The
installer does not include Ollama models, Home Assistant, microphone drivers,
or API secrets.

## Setup

1. **Home Assistant**: an instance running and reachable on your network.
2. Get a **Long-Lived Access Token**: Home Assistant → profile icon (bottom
   left) → *Long-Lived Access Tokens* → *Create Token*.
3. Copy `.env.example` to `.env` and fill in `ANTHROPIC_API_KEY`,
   `HA_BASE_URL`, `HA_TOKEN`. (Ollama settings are optional — see the
   comments in `.env.example`.)
4. `pip install -r requirements.txt`
5. **For voice mode only**: get a free Picovoice AccessKey at
   https://console.picovoice.ai/, put it in `.env` as `PICOVOICE_ACCESS_KEY`.
   Optionally generate a custom "Athena" keyword there too (2 minutes, no ML
   needed — see `athena/voice/wake_word.py`); without one, voice mode falls
   back to the built-in "jarvis" wake word.
6. Run it:
   ```
   python main.py          # interactive chat
   # or
   python service.py       # headless HTTP service on 127.0.0.1:8787
   # or
   python voice.py         # always-listening voice mode
   ```

For autostart on boot/login, see `deploy/README.md` — it walks through
systemd (Linux), launchd (macOS), and Task Scheduler (Windows), all pointed
at `service.py`.

## Project layout

```
athena/
    config.py               # loads .env settings
    permissions.py           # Tier 1-4 permission gate
    storage.py                # SQLite audit log + pending-approvals queue
    connectivity.py            # is-the-internet-up check
    router.py                   # picks Claude (online) vs Ollama (offline) per turn
    orchestrator.py               # the tool-use loop ("the brain"), backend-agnostic
    llm_backends/
        base.py                    # shared interface + message format
        anthropic_backend.py        # Claude via the API
        ollama_backend.py            # local model via Ollama's HTTP API
    tools/
        home_assistant.py            # Home Assistant REST client + tool schemas
        files.py                      # sandboxed file/PDF tools
        office.py                      # Word/Excel/PowerPoint tools
main.py                     # interactive terminal entry point
service.py                  # headless HTTP entry point (for autostart)
deploy/                     # systemd / launchd / Task Scheduler configs
```

Adding a new capability means writing one new file in `tools/` that exports
`TOOL_DEFINITIONS` and a `dispatch()` function, adding it to `self.tools` in
`orchestrator.py`, and adding one line to `_dispatch_tool`'s prefix routing.
Nothing else needs to change — this pattern has now been used four times
(Home Assistant, files, Office, and implicitly the backend router) and held
up each time.

## About the permission tiers

`permissions.py` maps actions to a risk tier (1 = read, 2 = reversible/logged,
3 = requires approval). Tune the tier maps freely — e.g. bump climate to 3 if
you want it to require confirmation too.

Deliberately not built: a "Tier 4 / master override" as a magic phrase in the
system prompt. A string in a prompt is not a security boundary — a
determined-enough input (or a compromised tool) can talk around plain-English
instructions. When you need a real hard stop, it should live outside the LLM
entirely (a process supervisor, a physical/2FA/WebAuthn step) — flagged in
"honest next steps" below, not built speculatively.

## Honest next steps, in rough order of value

1. **Try it against 2-3 real devices before wiring up your whole house.**
2. **Alerting for pending approvals.** Right now you have to poll `/pending`
   yourself. A script that polls it and pings you (desktop notification,
   email) is a small, real next step. A full mobile app is bigger scope.
3. **Voice input/output** (Whisper for STT, Piper/Kokoro for offline TTS,
   ElevenLabs for online) — a real, self-contained feature, doesn't require
   a frontend framework, good candidate for the next big addition.
4. **Local RAG** over your own notes/documents, if you want her to answer
   questions grounded in things you've written rather than just acting on
   commands.
5. **Explicitly shelved for now** (revisit only when there's an actual need,
   not speculatively): multi-device cloud sync of the local database and a
   translucent always-on-top HUD/global-hotkey overlay. The Next.js/Tauri
   frontend is now the supported desktop UI path; the packaged sidecar still
   needs a real Windows/macOS/Linux installer smoke test before release claims.

## Development sidebar and workspace

The development HUD now includes a branded **Athena AI** sidebar with project-
scoped durable chats, a nested **Uploaded Files & Media** tree, MIME-aware file
icons, byte sizes, indexing status/error indicators, image previews before send,
and clean document chips. Chat menus provide Files in Chat, Add to Project,
Export Chat, Share Link, Rename, Pin, and Delete. Select mode supports bulk chat
and workspace operations.

Chat, message, and bounded attachment metadata persist in SQLite. File, folder,
and project deletion remains Tier 3 approval-required; the UI reports
`pending_approval` truthfully rather than claiming that a destructive operation
already completed. Tauri packaging is intentionally deferred until the FastAPI
and Next.js development workflow passes restart, indexing, approval, and manual
interaction checks.

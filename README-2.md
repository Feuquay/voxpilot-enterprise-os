# VoxPilot Chairman — iPhone + GitHub v3

This is the standalone Chairman build for a Founder who has an iPhone and GitHub.

It does not require a Mac, PC, terminal, Python, Node, or private server.

## Runtime functions

- Installable GitHub Pages PWA
- Offline application shell
- Deterministic local Chairman engine
- Live GitHub Models adapter
- Optional OpenAI and Anthropic adapters
- Persistent Founder doctrine and typed memory
- Relevance-based memory retrieval
- Executive sessions
- Enterprise portfolio
- Decision register
- Governed action proposals
- Explicit Founder approve/reject workflow
- Executive tasks evaluated whenever the app opens
- Chairman Lock
- Audit trail
- Local JSON export/import
- AES-256-GCM encrypted GitHub backup and restore

## iPhone deployment

1. Download and unzip the package in Files.
2. Create a GitHub repository named `voxpilot-chairman`.
3. Upload the contents of this folder into the repository root.
4. Open **Settings → Pages** and choose **GitHub Actions**.
5. Run **Deploy Chairman to GitHub Pages**.
6. Open the resulting Pages URL in Safari.
7. Tap **Share → Add to Home Screen**.

## GitHub Models

Create a fine-grained GitHub personal access token with **Models: read**. In the app choose:

- Provider: GitHub Models
- Model: `openai/gpt-4.1`
- Token: your fine-grained token

## Encrypted continuity

For backup and restore, restrict a fine-grained token to the Chairman repository and grant **Contents: read and write**.

The complete runtime is encrypted on the iPhone with PBKDF2-SHA256 and AES-256-GCM before upload. The passphrase is not uploaded.

## Exact operating boundary

This is a functioning static iPhone executive runtime. It cannot remain continuously active while iOS suspends it, cannot hide a permanent secret inside static GitHub Pages code, and cannot act inside external accounts without their tokens and permissions. Due tasks are therefore evaluated when the app opens or returns to the foreground.


## Design and engineering software fabric

v4 adds 35 connector families and governed interconnection patterns across CAD, BIM, PLM, CAE, GIS, creative media, realtime 3D, code, cloud, data and enterprise systems.

Open **Integrations** inside Chairman to:

- search the catalog
- inspect each platform's products, capabilities, authentication and file formats
- mark integrations as disconnected, planned or connected
- view the complete orchestration architecture
- inspect cross-platform engineering workflows

A connector marked planned is architecturally defined but not yet authorized. External execution still requires the vendor account, credentials and—in many cases—a secure backend.

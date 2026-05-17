# Global Stack Digital — Setup Guide

Hosted on **GitHub Pages**. The contact form submits leads via GitHub Actions —
the write token lives in **GitHub Secrets only**, never in any file.

---

## How It Works

```
User fills form
      ↓
Browser calls GitHub Actions API  (uses a trigger-only token, visible in HTML)
      ↓
GitHub Action runs save-lead.yml  (uses LEADS_TOKEN secret — never visible)
      ↓
Action writes/updates data/leads.json and commits it to the repo
```

Two tokens, two jobs — only the harmless one is in the HTML.

---

## Project Structure

```
/
├── index.html                            ← Full website
├── .github/
│   └── workflows/
│       └── save-lead.yml                 ← Writes leads.json using a secret
├── data/
│   └── leads.json                        ← Auto-created on first submission
└── README.md
```

---

## One-Time Setup

### Step 1 — Create the LEADS_TOKEN (secret, never in code)

This token does the actual writing. It lives only in GitHub Secrets.

1. Go to **https://github.com/settings/tokens?type=beta** (Fine-Grained)
2. Click **Generate new token**
3. Settings:
   - **Name:** `gsd-leads-writer`
   - **Expiration:** 1 year
   - **Repository access:** Only `globalstackdigital`
   - **Permissions → Contents:** Read and Write — everything else: No access
4. Generate and copy the token

5. Go to your repo → **Settings → Secrets and variables → Actions**
6. Click **New repository secret**
   - **Name:** `LEADS_TOKEN`
   - **Value:** paste the token
7. Click **Add secret**

Done — this token is now fully hidden. Nobody can see it, not even you after saving.

---

### Step 2 — Create the Trigger Token (goes in index.html)

This token can **only trigger workflows** — it cannot read or write any files.
It is safe to be visible in HTML source.

1. Go to **https://github.com/settings/tokens** (Classic tokens)
2. Click **Generate new token (classic)**
3. Settings:
   - **Note:** `gsd-workflow-trigger`
   - **Expiration:** 1 year
   - **Scopes:** tick only `workflow`  ← nothing else
4. Generate and copy the token

5. Open `index.html`, find this line near the bottom:
   ```js
   const GH_TRIGGER_TOKEN = 'PASTE_WORKFLOW_TRIGGER_TOKEN_HERE';
   ```
6. Replace the placeholder with your token:
   ```js
   const GH_TRIGGER_TOKEN = 'ghp_xxxxxxxxxxxxxxxxxxxx';
   ```
7. Commit and push

---

### Step 3 — Enable GitHub Pages

1. Repo → **Settings → Pages**
2. Source: **Deploy from a branch**
3. Branch: `main` / root (`/`)
4. Save

Live at: `https://globalstackdigital.github.io/globalstackdigital/`

---

### Step 4 — Allow Actions to write to the repo

1. Repo → **Settings → Actions → General**
2. Scroll to **Workflow permissions**
3. Select **Read and write permissions**
4. Save

---

## Viewing Leads

Open your repo and go to:
`data/leads.json`

Every form submission creates a new commit with the lead appended to the array.

### Lead fields saved:
| Field | Description |
|---|---|
| id | Timestamp-based unique ID |
| submittedAt | ISO timestamp |
| name | Full name |
| company | Company / brand (optional) |
| email | Email address |
| phone | Phone / WhatsApp (optional) |
| service | Service selected |
| budget | Budget range (optional) |
| message | Project description |
| status | Always `"new"` on creation |

---

## Security Summary

| Token | Where it lives | What it can do |
|---|---|---|
| `LEADS_TOKEN` | GitHub Secrets only | Write `data/leads.json` in this repo |
| `GH_TRIGGER_TOKEN` | `index.html` (visible) | Only trigger workflow runs — nothing else |

Even if someone finds the trigger token in the HTML source, the worst they can do
is spam empty workflow runs — they cannot read leads, write files, or access anything else.

---

## Fonts
- **Headings:** `Bricolage Grotesque`
- **Body:** `Instrument Sans`

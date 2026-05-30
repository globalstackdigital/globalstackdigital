// ── PRIVATE CONFIG — DO NOT COMMIT THIS FILE ──────────────────────────────
// This file reads the token from .env (never committed to GitHub)
// Generate a classic token at: https://github.com/settings/tokens
// Scope needed: workflow (only)
// ──────────────────────────────────────────────────────────────────────────

require('dotenv').config();

const GH_TRIGGER_TOKEN = process.env.GH_TRIGGER_TOKEN;

if (!GH_TRIGGER_TOKEN) {
  throw new Error('GH_TRIGGER_TOKEN is missing. Add it to your .env file.');
}

module.exports = { GH_TRIGGER_TOKEN };
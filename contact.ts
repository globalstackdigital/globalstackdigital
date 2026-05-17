import type { Context } from "@netlify/functions";

// ─── GitHub config ─────────────────────────────────────────────────────────
// Token is read from the GITHUB_TOKEN environment variable.
// Set it in: Netlify → Site → Environment Variables → GITHUB_TOKEN
// Generate a token at: https://github.com/settings/tokens/new  (repo scope)
// NEVER hardcode the token here — keep it only in Netlify env vars.
// ──────────────────────────────────────────────────────────────────────────

const GITHUB_TOKEN     = process.env.GITHUB_TOKEN ?? "";
const GITHUB_OWNER     = "globalstackdigital";
const GITHUB_REPO      = "globalstackdigital";
const GITHUB_FILE_PATH = "data/leads.json";
const GITHUB_BRANCH    = "main";

const API_BASE = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_FILE_PATH}`;

const GH_HEADERS = {
  Authorization: `Bearer ${GITHUB_TOKEN}`,
  Accept:        "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  "Content-Type": "application/json",
  "User-Agent":  "GlobalStackDigital-ContactForm/1.0",
};

// ── Types ──────────────────────────────────────────────────────────────────

interface Lead {
  id:          string;
  submittedAt: string;
  name:        string;
  company:     string | null;
  email:       string;
  phone:       string | null;
  service:     string;
  budget:      string | null;
  message:     string;
  status:      "new" | "contacted" | "closed";
}

interface LeadsFile {
  lastUpdated: string;
  totalLeads:  number;
  leads:       Lead[];
}

// ── GitHub helpers ─────────────────────────────────────────────────────────

async function getFileFromGitHub(): Promise<{ content: LeadsFile; sha: string } | null> {
  const res = await fetch(`${API_BASE}?ref=${GITHUB_BRANCH}`, { headers: GH_HEADERS });

  if (res.status === 404) return null; // file doesn't exist yet — will be created

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GitHub GET failed (${res.status}): ${err}`);
  }

  const data = await res.json() as { content: string; sha: string };
  const decoded = atob(data.content.replace(/\n/g, ""));
  return {
    content: JSON.parse(decoded) as LeadsFile,
    sha: data.sha,
  };
}

async function writeFileToGitHub(
  newContent: LeadsFile,
  sha: string | undefined,
  commitMessage: string
): Promise<void> {
  const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(newContent, null, 2))));

  const body: Record<string, unknown> = {
    message: commitMessage,
    content: encoded,
    branch:  GITHUB_BRANCH,
  };
  if (sha) body.sha = sha;

  const res = await fetch(API_BASE, {
    method:  "PUT",
    headers: GH_HEADERS,
    body:    JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GitHub PUT failed (${res.status}): ${err}`);
  }
}

// ── Handler ────────────────────────────────────────────────────────────────

export default async function handler(req: Request, _context: Context) {
  const CORS = {
    "Access-Control-Allow-Origin":  "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type":                 "application/json",
  };

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405, headers: CORS,
    });
  }

  // Guard: token must be set via env var — never hardcode it
  if (!GITHUB_TOKEN) {
    console.error("❌ GITHUB_TOKEN environment variable is not set.");
    return new Response(
      JSON.stringify({ error: "Server misconfiguration: GitHub token missing." }),
      { status: 500, headers: CORS }
    );
  }

  try {
    const body = await req.json();
    const { id, timestamp, name, company, email, phone, service, budget, message } = body;

    if (!name?.trim() || !email?.trim() || !service || !message?.trim()) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: name, email, service, message" }),
        { status: 400, headers: CORS }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email address." }),
        { status: 400, headers: CORS }
      );
    }

    const newLead: Lead = {
      id:          String(id ?? Date.now()),
      submittedAt: timestamp ?? new Date().toISOString(),
      name:        name.trim(),
      company:     company?.trim() || null,
      email:       email.trim().toLowerCase(),
      phone:       phone?.trim() || null,
      service,
      budget:      budget || null,
      message:     message.trim(),
      status:      "new",
    };

    const existing = await getFileFromGitHub();
    const currentData: LeadsFile = existing?.content ?? {
      lastUpdated: new Date().toISOString(),
      totalLeads:  0,
      leads:       [],
    };
    const sha = existing?.sha;

    currentData.leads.push(newLead);
    currentData.totalLeads  = currentData.leads.length;
    currentData.lastUpdated = new Date().toISOString();

    await writeFileToGitHub(
      currentData,
      sha,
      `📬 New lead: ${newLead.name} — ${newLead.service} [${newLead.id}]`
    );

    console.log(`✅ Lead saved to GitHub: ${newLead.name} <${newLead.email}>`);

    return new Response(
      JSON.stringify({ success: true, leadId: newLead.id }),
      { status: 200, headers: CORS }
    );

  } catch (err) {
    console.error("Contact function error:", err);
    return new Response(
      JSON.stringify({ error: "Failed to save your message. Please try again." }),
      { status: 500, headers: CORS }
    );
  }
}

export const config = { path: "/api/contact" };

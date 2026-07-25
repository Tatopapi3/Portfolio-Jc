# Cycle 4 — Property OS (capstone, in progress)

**Live:** [property-os-morning-briefing.property-os.workers.dev](https://property-os-morning-briefing.property-os.workers.dev) (single demo workspace, no login required)
**Code:** [github.com/MITRAKER/PROPERTY-OS](https://github.com/MITRAKER/PROPERTY-OS)

Team project — built with Mitra Kermanian.

*This is a capstone still in active development. What follows is an honest
snapshot of what's actually shipped vs. still open, not a finished pitch.*

## Problem

Real-estate agents prospecting existing homeowners juggle a fragmented set of
tools — lead lists, CRMs, dialers, notes, email, texts, public-record sites,
and maps — with context for the same property split across all of them.
Follow-up commitments buried in messy notes ("call after Christmas,"
"daughter graduates in June," "not selling — do not call") get missed or
mishandled. Meaningful property signals (ownership length, violations,
absentee ownership, mortgage age) exist as raw data an agent has to interpret
manually, with no prioritization of who to actually contact first.

## Solution

Property OS is a property-centered command center: every address gets a
persistent workspace (owner, records, notes, call history, timeline, tasks),
and the system produces an explainable daily action plan instead of a flat
list. The core feature: upload a messy CSV of leads and get back a ranked
"top 3 properties to contact today," each with evidence, a confidence level,
and a recommended next action — with do-not-contact records excluded before
ranking ever happens.

## Features complete so far

- **Evidence-backed morning briefing** — CSV/Excel import → a Follow-Up
  Agent (Claude Haiku 4.5, with a deterministic offline fallback) extracts
  structured signals, then a ranked "top 3 to contact today" briefing is
  generated with cited evidence and do-not-contact leads excluded first.
- **Persistent, multi-tenant workspace** — a real Cloudflare D1 database via
  Drizzle ORM, Google OAuth with signed sessions, and workspace-scoped data
  across 18 tables; notes, tasks, timelines, and approvals all survive
  reloads and server restarts.
- **Live NYC public-records enrichment** — pulls real BBL, assessed value,
  violations, permits, and deed/mortgage history from six official NYC Open
  Data sources, and flags absentee owners by detecting mailing-address
  mismatches.
- **Real interactive map with click-to-prospect** — Leaflet/OpenStreetMap
  tiles plot properties at their true coordinates; clicking any block pulls
  real NYC tax-lot parcels and scores them as new leads on the spot.
- **Human-approval gate for all outreach** — drafted emails, texts, and
  letters sit as pending approvals; nothing sends without an explicit human
  approval, and compliance (do-not-contact + channel permission) is
  re-checked again at send time.

## What's still open

Manual CSV column remapping and legacy `.xls` import, budgets/durable
retries/LLM-planned routing for the agent orchestration layer, and the
longer-term "radio DJ" voice-briefing and dialer-integration vision are
explicitly future work — not part of the current build.

## Tech stack

- Next.js 16 + React 19 + TypeScript
- Cloudflare Workers + D1 (Drizzle ORM)
- Claude Haiku 4.5 (primary), Opus 4.8 (optional low-confidence fallback)
  via the Anthropic SDK
- Leaflet + OpenStreetMap
- Google OAuth 2.0
- NYC Open Data (GeoSearch, PLUTO, HPD, DOB, ACRIS)
- Resend (email) + Twilio (SMS, optional) for approved outreach delivery

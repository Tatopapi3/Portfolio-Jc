# Cycle 3 — TalentFlow

**Code:** [github.com/Tatopapi3/talentflow-agent](https://github.com/Tatopapi3/talentflow-agent)

*(No public live deployment — runs locally via `python server.py`, a Flask web UI at `localhost:8000`, or `python demo.py` for an interactive terminal demo.)*

## Problem

Recruiters spend ~23 hours per hire manually screening 50–200+ resumes, and
attention quality degrades with fatigue late in a large pool.

## Solution

TalentFlow is an AI agent for HR / Talent Acquisition that reads every
incoming resume against a job description the moment it lands, flags the
clear yes/no matches, and surfaces only the ambiguous cases for a recruiter
to actually look at — automating the first pass so screening time drops
toward minutes, without removing the recruiter from the decision. It never
rejects a candidate on its own: every verdict is advisory and cites the
exact resume evidence behind it.

## The observe-decide-act loop

TalentFlow **observes** a resume against a job description, **decides** an
advance/reject/ambiguous verdict with cited evidence (cross-checked by
running the same screening multiple times in parallel when it matters), and
**acts** by surfacing that verdict and its evidence to a recruiter — pausing
at a mandatory human checkpoint before any reject is ever treated as final.

## Key features

- **Evidence-cited verdicts** — every matched or missing requirement must
  quote the exact resume phrase behind it; the model is never allowed to
  infer a skill that isn't stated.
- **Human checkpoint before reject** — the one verdict with no natural
  downstream review pauses for an explicit yes/no confirmation before it's
  final; an override is logged as part of the audit trail, not silently
  discarded.
- **Parallel-vote consensus** — runs the same screening twice in parallel
  and downgrades to `ambiguous` on any disagreement, catching borderline
  calls that a single run's self-reported confidence would miss.
- **Recruiter calibration feedback loop** — surfaces a recruiter's own past
  accept/reject decisions on the *same* job description as visible,
  inspectable context (not a black-box learned profile), to help resolve
  genuinely borderline calls.
- **Automatic model fallback** — transparently retries on OpenRouter/`gpt-4o`
  if the primary Anthropic call fails, logging which provider actually
  served each request.

## Tech stack

- Python, `strands.Agent` agent framework
- Claude Sonnet 5 via `LiteLLMModel` (direct Anthropic API), with an
  OpenRouter/`gpt-4o` fallback
- `asyncio` for parallel vote aggregation
- SQLite (`feedback_store.py`) for the calibration feedback loop
- Flask (`server.py`) for the local web UI

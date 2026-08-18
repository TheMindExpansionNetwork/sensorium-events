# AGENTS.md — SENSORIUM System Architecture & Intelligence

> **Repository**: [TheMindExpansionNetwork/sensorium-events](https://github.com/TheMindExpansionNetwork/sensorium-events)  
> **Target Production Domain**: `sensorium.events`  
> **Brand & Vision**: Jameson Shelnut — The Sonic Alchemist  
> **Foundational Document**: *SENSORIUM Game Foundation & Client-Facing Brand, Vision & Impact Document*  
> **Authoring Engine**: J1MSKY (Hermes Agent / Nous Research)

---

## 1. Executive Summary & Identity

**Sensorium** is a living ecosystem and conscious wellness experience platform created by **Jameson Shelnut (The Sonic Alchemist)**. It integrates:
- **Sound & Frequency Alchemy** (432Hz/528Hz vibroacoustics, crystal bowls, sonic resonance)
- **Breathwork & Somatic Movement** (Holotropic, cellular oxygenation, ancestral flow)
- **Nourishment & Herbalism** (Adaptogenic elixir bars, raw cacao alchemy, holistic food)
- **Frontier Science & Biohacking** (Cold plunge protocols, red light therapy, neuro-telemetry)
- **Conscious Commerce & Thought Leadership** (Transparent revenue splits, live podcast recording, curated artisan vendor marketplace)

### Core Declaration
> *"I am Jameson, the Sonic Alchemist, and the impact I make is an expansive community of thought leaders paving the way to make new tools accessible to unlock humankind’s highest potential."*

---

## 2. Technical Stack & Connected Integrations

```
┌────────────────────────────────────────────────────────────────────────┐
│                        SENSORIUM REACT HUB                             │
│       Vite + React 18 + Tailwind CSS + Lucide Icons + Theme Engine      │
└───────────────────┬────────────────────────────────┬───────────────────┘
                    │                                │
    ┌───────────────▼───────────────┐ ┌──────────────▼──────────────┐
    │     DATA & BACKEND LAYER      │ │     AI CONCIERGE & CRM      │
    │  • Supabase REST & Auth API   │ │  • Autonomous Team Chat     │
    │  • Stripe Checkout & Elements │ │  • RBAC Lead & Vendor Admin │
    │  • SweatPals Event Connector  │ │  • Lead CSV Exporter        │
    └───────────────┬───────────────┘ └──────────────┬──────────────┘
                    │                                │
    ┌───────────────▼────────────────────────────────▼──────────────┐
    │                 EXTERNAL RECON & SCRAPING ENGINE              │
    │  • Firecrawl SDK (Web & Instagram Lead Enrichment)            │
    │  • MCP Connector Hub (Comfy Cloud, Model Serving)             │
    └───────────────────────────────────────────────────────────────┘
```

### Integrated Systems
1. **Supabase Client Layer (`src/utils/supabaseClient.js`)**:
   - Manages authenticated sessions, partner submissions, and persistent lead tracking.
   - Dual-mode fallback to localized storage when environment credentials are not present.
2. **Stripe & SweatPals Payment Bridge (`src/utils/paymentGateway.js`)**:
   - Integrates direct checkout links with SweatPals ticket tiers ($0 market entry to sliding VIP workshop passes) and Stripe merchant billing readiness.
3. **Firecrawl Scraper Utility (`src/utils/firecrawlScraper.js`)**:
   - Powered by Firecrawl API (`fc-0fc0a1ff90c94fc9915dae7a343a4c64`).
   - Scrapes and parses Instagram profiles, partner landing pages, and vendor portfolios directly from the Admin CRM.
4. **Autonomous AI Concierge (`src/components/ChatBot.jsx`)**:
   - Embedded interactive guide trained on Jameson's Sonic Alchemy brand pillars, event logistics, and partner criteria.

---

## 3. Role-Based Access Control (RBAC) Architecture

| Role | Access Level | Capabilities |
|---|---|---|
| **Public Visitor** | Read-Only | Browse event continuum, register on SweatPals, chat with AI concierge |
| **Vendor Applicant** | Portal Access | Submit product/elixir catalogue, request booth space, view revenue splits |
| **Practitioner** | Portal Access | Propose workshop modalities, apply for keynote podcast panel |
| **Team / Admin** | Full CRM & Ops | Review applications, scrape partner websites via Firecrawl, export CSVs, trigger Stripe webhooks |

---

## 4. Brand & Messaging Standards

### Permitted / Recommended Phrasing
- *"Sound gives the body a language before the mind can explain what is happening."*
- *"United Monthly. Integrated Weekly. Lived Daily."*
- *"Where the festival world meets the wellness world. Where the spiritual meets the practical."*
- *"The event is the doorway. The community is the continuation."*

### Excluded / Disallowed Phrasing
- ❌ Do NOT make medical or therapeutic curing claims (*"We cure trauma / we fix you"*).
- ❌ Do NOT use vague spiritual jargon without grounding in real physical modalities (breath, sound, temperature, nourishment).
- ❌ Do NOT position the founder hierarchically; emphasize the collective ecosystem of aligned contribution.

---

## 5. Development & Deployment Protocol

```bash
# Clone & install dependencies
git clone https://github.com/TheMindExpansionNetwork/sensorium-events.git
cd sensorium-events
npm install

# Run local development server
npm run dev

# Build production bundle
npm run build
```

---

*Authored by J1MSKY for Jameson Shelnut and the Sensorium Core Team.*

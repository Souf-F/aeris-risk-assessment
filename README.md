# AERIS — Cyber Risk Assessment Tool

> Aeronautique & Evaluation des Risques · Supply chain cyber risk assessment for the Aerospace & Defence sector · Based on EBIOS Risk Manager methodology (ANSSI)

![AERIS Screenshot](screenshot.png)

---

## What is AERIS ?

AERIS is a personal project built as part of my application for a **Consultant Aerospace & Defence** position at Accenture (Toulouse).

It is a web-based cyber risk assessment tool focused on the aeronautical and defence supply chain. It allows users to evaluate, score, and prioritize cyber risks across a set of suppliers and critical assets — following the logic of the **EBIOS Risk Manager** framework published by the French National Cybersecurity Agency (ANSSI).

The goal was to demonstrate that I understand how a consultant thinks about cyber risk: not just as a technical problem, but as a **business priority decision**.

---

## Why I built this

Most candidates show technical skills through code exercises. I wanted to show something different: the ability to **connect cybersecurity to business value**.

AERIS simulates the kind of deliverable a consultant would produce for an aerospace client:
- Identify critical assets in the supply chain
- Assess the probability and impact of cyber threats
- Prioritize risks using a scoring matrix
- Recommend concrete remediation actions

---

## How it works

### Risk scoring

Each asset is evaluated on two axes:

| Axis | Scale | Description |
|------|-------|-------------|
| **Probability** | 1 → 5 | Likelihood that the threat materializes |
| **Impact** | 1 → 5 | Severity of consequences if it does |

**Score = Probability × Impact** (1 to 25)

| Score | Level | Color |
|-------|-------|-------|
| ≤ 6 | Low | 🟢 Green |
| 7 – 14 | Medium | 🟠 Orange |
| ≥ 15 | Critical | 🔴 Red |

This logic is directly inspired by the **EBIOS RM** (Risk Manager) method — the French standard for cyber risk assessment, widely used in the aerospace and defence industry.

### Features

- **9 pre-loaded realistic assets** from the aero/defence supply chain (Thales, Safran, Airbus D&S, Dassault, Naval Group…)
- **Interactive sliders** — adjust probability and impact in real time, scores update instantly
- **Risk matrix** — 5×5 visual grid showing all assets positioned by risk level
- **Key stats** — number of critical risks, average score, total assets evaluated
- **Add an asset** — extend the scenario with custom suppliers
- **Delete an asset** — remove any entry from the list
- **Persistent storage** — data is saved in localStorage, survives page refresh
- **Reset button** — reload the original scenario at any time

---

## Methodology

AERIS is structured around the **EBIOS Risk Manager** framework (ANSSI, 2018), which is the reference standard for cyber risk management in France — used by major defence contractors, government agencies, and critical infrastructure operators.

Key concepts applied:
- **Asset inventory** — identifying what needs to be protected
- **Threat identification** — what could go wrong and how
- **Risk scoring** — probability × impact matrix
- **Prioritization** — focus resources on the highest risks first
- **Recommendations** — concrete actions aligned with standards (ISO 27001, NIS2)

---

## Tech stack

| Layer | Technology |
|-------|-----------|
| Structure | HTML5 |
| Styling | CSS3 (custom properties, flexbox, grid) |
| Logic | Vanilla JavaScript (ES6) |
| Storage | localStorage API |
| Hosting | Self-hosted VPS (Nginx + HTTPS) |

No framework, no dependencies, no build tool. Everything runs in the browser — keeping it simple, fast, and fully understandable.

---

## Project structure

```
aeris-risk-assessment/
├── index.html          # Single page app structure
├── css/
│   └── style.css       # Full stylesheet (palette A — cyber emerald)
├── js/
│   ├── data.js         # Aeronautical scenario (assets, threats, recommendations)
│   └── app.js          # App logic (scoring, rendering, events, localStorage)
├── assets/
│   ├── logo.svg        # AERIS logo
│   └── favicon.svg     # Browser tab icon
└── README.md
```

---

## Live demo

🔗 **soon**

> Access restricted — credentials available on request.

---

## Author

**Soufiane F.** — Student at Holberton School France (RNCP Niveau 6 — Web & Application Development)

Parallel specialization in cybersecurity · Seeking an alternance position in full stack development or consulting

[![GitHub](https://img.shields.io/badge/GitHub-Souf--F-1D9E75?style=flat&logo=github)](https://github.com/Souf-F)

---

*Data used in this project is entirely fictional and intended for demonstration purposes only. AERIS is a personal portfolio project, not a commercial product.*
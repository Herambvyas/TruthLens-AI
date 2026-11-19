# TruthLens AI

<p align="center">
  <strong>Interrogate the claim. Follow the evidence.</strong><br/>
  An AI-assisted fact investigation workspace that searches the web, weighs evidence, and explains uncertainty.
</p>

<p align="center">
  <a href="https://truthlens-ai-2mbf.onrender.com"><strong>🚀 Live Demo</strong></a>
  &nbsp; · &nbsp;
  <a href="https://github.com/Herambvyas/TruthLens-AI">Source Code</a>
  &nbsp; · &nbsp;
  <a href="https://github.com/Herambvyas/TruthLens-AI/issues">Report an Issue</a>
</p>

<p align="center">
  <img alt="React" src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white" />
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-18%2B-339933?logo=nodedotjs&logoColor=white" />
  <img alt="License" src="https://img.shields.io/badge/License-ISC-blue.svg" />
</p>

---

## ✨ What is TruthLens?

TruthLens AI helps investigate factual claims instead of simply labelling them true or false. Submit a claim or paragraph, retrieve relevant web sources, and review an AI-generated assessment with supporting evidence, caveats, and confidence.

**Try it now:** [truthlens-ai-2mbf.onrender.com](https://truthlens-ai-2mbf.onrender.com)

> **Note:** The hosted demo runs on Render's free instance and may take a little time to wake up after inactivity. Live investigations also depend on the availability and usage limits of the configured AI and search providers.

## Features

- **Claim investigation** — submit a factual claim, headline, or paragraph.
- **Web-backed research** — retrieve relevant source excerpts using Tavily Search.
- **AI-assisted assessment** — analyze evidence with Google's Gemini API.
- **Nuanced verdicts** — Supported, Partially supported, Disputed, or Insufficient evidence.
- **Evidence review** — inspect source links, excerpts, and source assessments.
- **Transparent reports** — review key findings, caveats, and confidence estimates.
- **Investigation history** — recent reports are saved in the browser.
- **Responsive workspace** — dark/light appearance and mobile-friendly layout.

## How it works

1. **Submit a claim** — enter a statement or a paragraph to investigate.
2. **Retrieve evidence** — the backend searches the web for relevant material.
3. **Evaluate context** — Gemini reviews the retrieved evidence and produces a structured assessment.
4. **Review the report** — inspect the verdict, findings, sources, and limitations.

## Tech stack

| Layer | Technology |
| --- | --- |
| Frontend | React 18, Vite 6 |
| Styling | CSS |
| Icons | Lucide React |
| Backend | Node.js, Express |
| AI analysis | Google Gemini API |
| Web search | Tavily Search |
| Hosting | Render |

## Project structure

```text
TruthLens-AI/
├── server/
│   └── index.js          # Express API and AI investigation flow
├── src/
│   ├── App.jsx           # Main React application
│   ├── main.jsx          # Frontend entry point
│   └── styles.css        # Application styles
├── .env.example          # Required environment variable template
├── index.html
├── package.json
└── vite.config.js
```

## Run locally

The public version is already deployed at **[https://truthlens-ai-2mbf.onrender.com](https://truthlens-ai-2mbf.onrender.com)**. You only need the steps below if you want to run or modify the project on your own machine.

### Requirements

- Node.js 18 or newer
- A Google Gemini API key
- A Tavily API key

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/Herambvyas/TruthLens-AI.git
   cd TruthLens-AI
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create your environment file:

   ```bash
   cp .env.example .env
   ```

4. Add your API keys to `.env`:

   ```env
   GEMINI_API_KEY=your_gemini_api_key
   TAVILY_API_KEY=your_tavily_api_key
   PORT=8787
   ```

5. Start the frontend and backend together:

   ```bash
   npm run dev
   ```

6. Open the local development URL printed by Vite in your terminal (typically **http://localhost:5173**).

### Get API keys

- [Google AI Studio — Gemini API](https://aistudio.google.com/app/apikey)
- [Tavily — Search API](https://tavily.com/)

**Security:** Keep API keys in your server-side `.env` file or hosting provider's environment settings. Never commit `.env`, expose keys in frontend code, or share them in screenshots.

## Deployment (Render)

This repository is configured for a Node web service on Render.

| Setting | Value |
| --- | --- |
| Build command | `npm install && npm run build` |
| Start command | `npm start` |
| Environment | `NODE_ENV=production` |
| Required secrets | `GEMINI_API_KEY`, `TAVILY_API_KEY` |

Render supplies the `PORT` environment variable automatically.

**Deployment dashboard:** [Open the TruthLens Render service](https://dashboard.render.com/web/srv-dbvdvm67bikc738be3bg)

## API

| Endpoint | Purpose |
| --- | --- |
| `GET /api/health` | Checks service and API-key configuration |
| `POST /api/investigate` | Runs an investigation for the submitted claim |

The investigation endpoint accepts a JSON body containing a `claim` string.

## Important limitations

TruthLens is an educational research aid, not a professional fact-checking authority.

- Search snippets may omit important context from the full source.
- Search ranking does not prove that a source is reliable.
- AI-generated verdicts and confidence scores can be wrong; confidence is not a calibrated probability.
- Some claims may not have enough available evidence for a reliable conclusion.
- Always open and independently review sources before relying on an important result.

## Academic concepts demonstrated

This project can be used to demonstrate:

- Prompt engineering and structured outputs
- Retrieval-augmented generation (RAG)
- Evidence-based reasoning and source attribution
- Claim decomposition and classification
- Hallucination awareness and uncertainty handling
- Full-stack development and API integration
- Environment-variable and secret management
- Cloud deployment

---

<p align="center">
  Built as an AI major project · <a href="https://truthlens-ai-2mbf.onrender.com">Launch TruthLens AI ↗</a>
</p>

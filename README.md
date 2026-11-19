# TruthLens AI

An evidence-first AI fact-investigation platform built with React, Vite, Express, Gemini and Tavily Search.

## Features
- Breaks a submitted paragraph into independently checkable claims.
- Searches the web for each claim.
- Compares retrieved source excerpts for support, contradiction and context.
- Produces cautious verdicts: Supported, Partially supported, Disputed, or Insufficient evidence.
- Shows source URLs, excerpts, source stance, caveats and confidence.
- Saves recent investigations in browser local storage.
- Responsive dark/light interface.

## Requirements
- Node.js 18+
- Google Gemini API key
- Tavily API key

## Run locally
1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env`
3. Add `GEMINI_API_KEY` and `TAVILY_API_KEY` to `.env`
4. Start: `npm run dev`
5. Open the Vite URL shown in the terminal (usually http://localhost:5173).

The Express API runs on port 8787. Vite proxies `/api` requests to it during development.

## API keys
- Gemini: https://aistudio.google.com/app/apikey
- Tavily: https://tavily.com/

Keep keys in `.env` on the server. Never add them to frontend code or commit `.env`.

## Deploy on Render
- Runtime: Node
- Build command: `npm install && npm run build`
- Start command: `npm start`
- Add `GEMINI_API_KEY`, `TAVILY_API_KEY`, and `NODE_ENV=production` as environment variables.
- Render provides `PORT` automatically.

## Limitations
Search excerpts are not equivalent to reading full articles. Search ranking is not a credibility score. Confidence is a model estimate, not a calibrated probability. The app is a research aid, not an authoritative fact-checking body. Preview mode does not invent citations or verdicts.

## Viva topics
Prompt engineering, claim decomposition, multi-step prompting, retrieval-augmented generation, hallucination control, source-ID validation, evidence stance classification, recency, and confidence calibration.

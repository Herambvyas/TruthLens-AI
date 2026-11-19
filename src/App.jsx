import { useEffect, useMemo, useState } from "react";
import {
  Activity, ArrowUpRight, BadgeCheck, BookOpen, Check, ChevronDown, CircleHelp,
  Copy, ExternalLink, FileSearch, FlaskConical, Globe2, History, Info, Layers3,
  LoaderCircle, Menu, Microscope, Moon, Plus, Search, ShieldCheck, Sparkles,
  Sun, Target, TrendingUp, X
} from "lucide-react";

const examples = [
  "India generates 50% of its electricity from renewable energy.",
  "The Great Wall of China is visible from the Moon.",
  "Drinking eight glasses of water every day is essential for everyone."
];
const verdictMeta = {
  supported: { label: "Supported", color: "green", icon: BadgeCheck },
  partially_supported: { label: "Partially supported", color: "amber", icon: Info },
  disputed: { label: "Disputed", color: "red", icon: X },
  insufficient: { label: "Insufficient evidence", color: "slate", icon: CircleHelp }
};
function Verdict({ value }) {
  const meta = verdictMeta[value] || verdictMeta.insufficient;
  const Icon = meta.icon;
  return <span className={`verdict verdict-${meta.color}`}><Icon size={13}/>{meta.label}</span>;
}
function App() {
  const [claim, setClaim] = useState("");
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [configured, setConfigured] = useState(false);
  const [history, setHistory] = useState(() => {
    try { return JSON.parse(localStorage.getItem("truthlens-history") || "[]"); } catch { return []; }
  });
  const [activeTab, setActiveTab] = useState("overview");
  const [dark, setDark] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  useEffect(() => {
    fetch("/api/health").then(r => r.json()).then(d => setConfigured(d.configured)).catch(() => setConfigured(false));
  }, []);
  const sourceMap = useMemo(() => Object.fromEntries((report?.sources || []).map(s => [s.id, s])), [report]);
  const doInvestigate = async (value = claim) => {
    const text = value.trim();
    if (text.length < 12) { setError("Add a little more context — at least 12 characters."); return; }
    setClaim(text); setLoading(true); setError(""); setReport(null); setActiveTab("overview");
    try {
      const response = await fetch("/api/investigate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ claim: text }) });
      const raw = await response.text();
      let data;
      try { data = JSON.parse(raw); }
      catch { throw new Error("The server returned an unreadable response. Please retry in a moment."); }
      if (!response.ok) throw new Error(data.error || "Something went wrong.");
      setReport(data);
      const item = { id: Date.now(), claim: text, verdict: data.verdict, date: new Date().toISOString(), report: data };
      setHistory(old => {
        const next = [item, ...old.filter(x => x.claim !== text)].slice(0, 12);
        localStorage.setItem("truthlens-history", JSON.stringify(next));
        return next;
      });
    } catch (e) { setError(e.message || "Could not complete investigation."); }
    finally { setLoading(false); }
  };
  const copyReport = async () => {
    if (!report) return;
    const text = `${report.headline}\nVerdict: ${report.verdict}\nConfidence: ${report.confidence}%\n\n${report.summary}\n\nKey findings:\n${(report.keyFindings || []).map(x => "• " + x).join("\n")}\n\nSources:\n${(report.sources || []).map(s => `${s.id}. ${s.title} — ${s.url}`).join("\n")}`;
    await navigator.clipboard.writeText(text);
  };
  const reset = () => { setClaim(""); setReport(null); setError(""); setActiveTab("overview"); };
  const openHistory = item => { setClaim(item.claim); setReport(item.report); setActiveTab("overview"); setSidebarOpen(false); };
  return (
    <div className={dark ? "app dark" : "app light"}>
      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="brand"><div className="brand-mark"><Microscope size={20}/></div><span>truthlens<span className="brand-ai">.ai</span></span><button className="mobile-close icon-btn" onClick={() => setSidebarOpen(false)}><X size={18}/></button></div>
        <div className="workspace-label">WORKSPACE</div>
        <button className="nav-item active" onClick={reset}><Plus size={17}/> New investigation <span className="nav-shortcut">⌘ K</span></button>
        <button className="nav-item" onClick={() => document.getElementById("investigator")?.scrollIntoView({ behavior: "smooth" })}><Search size={17}/> Investigate claim</button>
        <div className="sidebar-section"><div className="section-head"><span>RECENT REPORTS</span><History size={14}/></div>
          {history.length ? history.slice(0, 6).map(item => <button key={item.id} className="history-item" onClick={() => openHistory(item)}><span className={`history-dot dot-${item.verdict || "insufficient"}`}/><span>{item.claim}</span></button>) : <div className="empty-history">Your investigations will appear here.</div>}
        </div>
        <div className="sidebar-bottom">
          <div className="trust-card"><div className="trust-icon"><ShieldCheck size={17}/></div><div><strong>Evidence first.</strong><p>Every conclusion needs a source. No made-up citations.</p></div></div>
          <button className="nav-item muted" onClick={() => setDark(!dark)}>{dark ? <Sun size={17}/> : <Moon size={17}/>} {dark ? "Light appearance" : "Dark appearance"}</button>
          <div className="profile"><div className="avatar">TL</div><div><strong>Research workspace</strong><span>Personal edition</span></div><ChevronDown size={15}/></div>
        </div>
      </aside>
      <main className="main">
        <header className="topbar"><button className="icon-btn mobile-menu" onClick={() => setSidebarOpen(true)}><Menu size={19}/></button><div className="breadcrumbs"><span>Workspace</span><span className="crumb-slash">/</span><strong>{report ? "Investigation report" : "New investigation"}</strong></div><div className="top-actions"><div className={`system-status ${configured ? "online" : "offline"}`}><span/>{configured ? "API keys connected" : "Preview mode"}</div><button className="icon-btn" title="Toggle theme" onClick={() => setDark(!dark)}>{dark ? <Sun size={17}/> : <Moon size={17}/>}</button><div className="top-avatar">TL</div></div></header>
        <div className="content">
          {!report && !loading && <section className="hero"><div className="eyebrow"><span className="eyebrow-pulse"/> AI-POWERED FACT INVESTIGATION</div><h1>Curiosity deserves<br/><span>credible answers.</span></h1><p className="hero-copy">Cut through the noise. Investigate claims, compare evidence, and see what the sources actually say.</p><div className="hero-stats"><div><strong><ShieldCheck size={15}/> Evidence-led</strong><span>Source-backed analysis</span></div><i/><div><strong><Globe2 size={15}/> Web research</strong><span>Multiple perspectives</span></div><i/><div><strong><FlaskConical size={15}/> Transparent</strong><span>Uncertainty included</span></div></div></section>}
          <section className={`investigator-card ${report || loading ? "compact" : ""}`} id="investigator">
            <div className="card-topline"><div className="card-icon"><FileSearch size={19}/></div><div><h2>What should we investigate?</h2><p>Enter a factual claim, headline, or paragraph.</p></div><span className="step-label">01 <span>/ INPUT</span></span></div>
            <div className="input-wrap"><textarea value={claim} onChange={e => setClaim(e.target.value)} placeholder="e.g. A claim circulating online that you want to verify..." maxLength={4000}/><div className="input-footer"><span>{claim.length}/4,000 characters</span><span><kbd>⌘</kbd> + <kbd>↵</kbd> to investigate</span></div></div>
            {error && <div className="error-message"><Info size={15}/>{error}</div>}
            <div className="investigator-actions"><div className="example-label">TRY AN EXAMPLE</div><div className="examples">{examples.map((x, i) => <button key={i} onClick={() => setClaim(x)}>{x}</button>)}</div><button className="investigate-btn" disabled={loading || claim.trim().length < 12} onClick={() => doInvestigate()}>{loading ? <><LoaderCircle className="spin" size={17}/> Investigating...</> : <><Sparkles size={17}/> Investigate claim <ArrowUpRight size={16}/></>}</button></div>
          </section>
          {loading && <div className="loading-panel"><div className="loading-orb"><Microscope size={27}/></div><h2>Following the evidence trail</h2><p>Finding sources · Comparing evidence · Preparing a transparent report</p><div className="loading-track"><span/></div><div className="loading-steps"><span className="done"><Check size={13}/> Claim detected</span><span className="working"><LoaderCircle size={13}/> Researching web</span><span>Evaluating evidence</span></div></div>}
          {report && !loading && <section className="report-section">
            {report.demo && <div className="demo-banner"><Info size={16}/><div><strong>Preview mode</strong><span>Add Gemini and Tavily API keys to enable live research and AI verdicts.</span></div></div>}
            <div className="report-heading"><div><div className="eyebrow">INVESTIGATION COMPLETE <span className="report-id">/ TL-{String(Date.now()).slice(-6)}</span></div><h2>{report.headline || "Claim investigation"}</h2><p>Analysis of your submitted claim · {new Date(report.generatedAt || Date.now()).toLocaleString()}</p></div><button className="secondary-btn" onClick={copyReport}><Copy size={15}/> Copy report</button></div>
            <div className="verdict-panel"><div className={`verdict-symbol verdict-symbol-${verdictMeta[report.verdict]?.color || "slate"}`}>{(() => { const Icon = verdictMeta[report.verdict]?.icon || CircleHelp; return <Icon size={25}/> })()}</div><div className="verdict-main"><span className="mini-label">OVERALL ASSESSMENT</span><h3><Verdict value={report.verdict}/></h3><p>{report.summary}</p></div><div className="confidence"><div className="confidence-number">{report.confidence ?? 0}<small>%</small></div><span>Confidence</span><div className="confidence-bar"><i style={{ width: `${Math.max(0, Math.min(100, report.confidence || 0))}%` }}/></div></div></div>
            <div className="report-tabs"><button className={activeTab === "overview" ? "selected" : ""} onClick={() => setActiveTab("overview")}><Layers3 size={15}/> Overview</button><button className={activeTab === "evidence" ? "selected" : ""} onClick={() => setActiveTab("evidence")}><BookOpen size={15}/> Evidence <span>{report.sources?.length || 0}</span></button><button className={activeTab === "method" ? "selected" : ""} onClick={() => setActiveTab("method")}><Activity size={15}/> Methodology</button></div>
            {activeTab === "overview" && <div className="report-grid"><div className="report-main-col">
              <div className="panel"><div className="panel-heading"><div><span className="panel-kicker">01 / BREAKDOWN</span><h3>Claim-by-claim analysis</h3></div><span className="subtle-tag">{report.claims?.length || 0} claims</span></div>
                {(report.claims || []).map((c, i) => <div className="claim-row" key={i}><div className="claim-index">0{i + 1}</div><div className="claim-content"><p>{c.text}</p><Verdict value={c.verdict}/><span className="claim-explanation">{c.explanation}</span>{c.sourceIds?.length > 0 && <div className="inline-citations">{c.sourceIds.map(id => <button key={id} onClick={() => setActiveTab("evidence")}>{id}</button>)}</div>}</div></div>)}
              </div>
              <div className="panel"><div className="panel-heading"><div><span className="panel-kicker">02 / TAKEAWAYS</span><h3>Key findings</h3></div><TrendingUp size={17}/></div><ul className="findings-list">{(report.keyFindings || []).map((f, i) => <li key={i}><span>{String(i + 1).padStart(2, "0")}</span>{f}</li>)}</ul></div>
            </div><div className="report-side-col">
              <div className="panel sources-panel"><div className="panel-heading"><div><span className="panel-kicker">03 / REFERENCES</span><h3>Sources consulted</h3></div><span className="source-count">{report.sources?.length || 0}</span></div>
                {(report.sources || []).slice(0, 4).map(s => <SourceItem key={s.id} source={s} assessment={report.sourceAssessments?.find(a => a.sourceId === s.id)}/>)}
                {(report.sources || []).length > 4 && <button className="view-all" onClick={() => setActiveTab("evidence")}>View all sources <ArrowUpRight size={14}/></button>}
                {!report.sources?.length && <p className="no-sources">No live sources were retrieved.</p>}
              </div>
              <div className="caveat-panel"><div><Info size={16}/><strong>Read with context</strong></div><ul>{(report.caveats || ["AI analysis can be incomplete. Open sources and verify important claims independently."]).map((c, i) => <li key={i}>{c}</li>)}</ul></div>
            </div></div>}
            {activeTab === "evidence" && <div className="panel evidence-panel"><div className="panel-heading"><div><span className="panel-kicker">SOURCE REVIEW</span><h3>Evidence library</h3></div><span className="subtle-tag">{report.sources?.length || 0} sources</span></div>{(report.sources || []).map(s => <SourceItem key={s.id} source={s} assessment={report.sourceAssessments?.find(a => a.sourceId === s.id)} expanded/>)}</div>}
            {activeTab === "method" && <div className="panel methodology"><div className="panel-heading"><div><span className="panel-kicker">TRANSPARENCY</span><h3>How this assessment was made</h3></div><ShieldCheck size={18}/></div><div className="method-steps"><div><b>01</b><section><strong>Claim review</strong><p>The original submission is checked for factual statements and context before the evidence is assessed.</p></section></div><div><b>02</b><section><strong>Source discovery</strong><p>Web search retrieves relevant excerpts. Search ranking is not treated as proof of reliability.</p></section></div><div><b>03</b><section><strong>Evidence comparison</strong><p>A single grounded AI analysis compares the retrieved excerpts for support, contradiction, and missing context.</p></section></div><div><b>04</b><section><strong>Calibrated conclusion</strong><p>The system can return insufficient evidence. If the primary model is unavailable, a backup model is tried. Confidence is a model estimate, not a statistical probability.</p></section></div></div><div className="method-note"><Info size={16}/> TruthLens uses search-result excerpts. It does not guarantee that every source has been read in full or that every relevant source has been found.</div></div>}
            <div className="report-footer"><span><ShieldCheck size={14}/> Generated with an evidence-first workflow</span><button onClick={reset}><Plus size={14}/> New investigation</button></div>
          </section>}
          {!report && !loading && <section className="bottom-info"><div className="bottom-info-icon"><Target size={18}/></div><div><strong>Not just a yes or no.</strong><p>Real-world claims can be nuanced. TruthLens shows what supports a claim, what challenges it, and what remains unknown.</p></div><div className="bottom-info-link">OUR PRINCIPLE <ArrowUpRight size={14}/></div></section>}
          <footer className="footer"><span>© 2026 TRUTHLENS AI</span><span>BUILT FOR CLARITY, NOT CERTAINTY.</span><span><span className="footer-dot"/> SYSTEM OPERATIONAL</span></footer>
        </div>
      </main>
      {sidebarOpen && <div className="mobile-scrim" onClick={() => setSidebarOpen(false)}/>}
    </div>
  );
}
function SourceItem({ source, assessment, expanded = false }) {
  return <div className={`source-item ${expanded ? "source-expanded" : ""}`}><div className="source-top"><span className="source-id">{source.id}</span><div className="source-info"><a href={source.url} target="_blank" rel="noreferrer">{source.title || source.domain}<ExternalLink size={12}/></a><span>{source.domain}{source.publishedDate ? ` · ${source.publishedDate}` : ""}</span></div><ArrowUpRight className="source-arrow" size={15}/></div>{expanded && <p className="source-snippet">{source.snippet}</p>}{assessment && <div className={`source-stance stance-${assessment.stance}`}><span>{assessment.stance}</span><p>{assessment.reason}</p></div>}{!expanded && source.snippet && <p className="source-preview">{source.snippet}</p>}</div>;
}

export default App;

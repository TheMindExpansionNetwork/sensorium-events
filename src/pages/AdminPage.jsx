import React, { useState, useEffect } from 'react';
import { 
  Shield, Users, Download, RefreshCw, Trash2, Search, 
  Terminal, Globe, Key, Database, CreditCard, Sparkles, 
  ExternalLink, Check, AlertCircle, Play 
} from 'lucide-react';
import { DB } from '../utils/database';
import { scrapeTargetUrl } from '../utils/firecrawlScraper';
import { SupabaseBridge } from '../utils/supabaseClient';
import { PaymentGateway } from '../utils/paymentGateway';

export default function AdminPage() {
  const [leads, setLeads] = useState([]);
  const [applications, setApplications] = useState([]);
  const [analytics, setAnalytics] = useState([]);
  const [activeTab, setActiveTab] = useState('applications');

  // User Role State
  const [userRole, setUserRole] = useState('Executive Admin');
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: "Jameson Shelnut", role: "Sonic Alchemist / Founder", email: "jameson@sensorium.events", level: "Admin" },
    { id: 2, name: "Sanctuary Ops Team", role: "Production & Logistics", email: "ops@sensorium.events", level: "Editor" },
    { id: 3, name: "Community Facilitators", role: "Practitioner Coordinator", email: "partners@sensorium.events", level: "Viewer" }
  ]);

  // Firecrawl Scraper State
  const [scrapeUrl, setScrapeUrl] = useState('https://sweatpals.com/event/sensorium-presents-an-experienced-conscious-lifestyle/2026-09-19');
  const [isScraping, setIsScraping] = useState(false);
  const [scrapeResult, setScrapeResult] = useState(null);

  // Command Runner State
  const [consoleCommand, setConsoleCommand] = useState('');
  const [commandLogs, setCommandLogs] = useState([
    "✦ Sensorium Sanctuary Command Hub initialized.",
    "System ready. Enter commands or trigger automated scraper workflows below."
  ]);

  const loadData = () => {
    setLeads(DB.getLeads());
    setApplications(DB.getApplications());
    setAnalytics(DB.getAnalytics());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = (id, newStatus) => {
    const updated = DB.updateApplicationStatus(id, newStatus);
    setApplications(updated);
  };

  const handleDeleteApp = (id) => {
    if (window.confirm("Delete this partner record?")) {
      const updated = DB.deleteApplication(id);
      setApplications(updated);
    }
  };

  const runScraper = async (e) => {
    e.preventDefault();
    if (!scrapeUrl) return;
    setIsScraping(true);
    setCommandLogs(prev => [...prev, `> Executing Firecrawl scrape on: ${scrapeUrl}...`]);
    
    const res = await scrapeTargetUrl(scrapeUrl);
    setIsScraping(false);
    setScrapeResult(res);

    if (res.success) {
      setCommandLogs(prev => [...prev, `✓ Scrape succeeded! Extracted ${res.markdown.length} characters of markdown content.`]);
    } else {
      setCommandLogs(prev => [...prev, `✗ Scrape failed: ${res.error}`]);
    }
  };

  const handleRunCommand = (e) => {
    e.preventDefault();
    if (!consoleCommand.trim()) return;

    const cmd = consoleCommand.trim();
    setCommandLogs(prev => [...prev, `> ${cmd}`]);
    setConsoleCommand('');

    const lower = cmd.toLowerCase();
    if (lower === 'help') {
      setCommandLogs(prev => [
        ...prev,
        "Available commands:",
        "  • scrape [url]    - Trigger Firecrawl markdown extraction",
        "  • sync-db         - Push local CRM records to Supabase",
        "  • test-stripe     - Validate SweatPals/Stripe payment bridge",
        "  • list-leads      - Display total captured registrant emails",
        "  • clear           - Clear the terminal screen"
      ]);
    } else if (lower.startsWith('scrape ')) {
      const target = cmd.split(' ')[1];
      setScrapeUrl(target);
      scrapeTargetUrl(target).then(res => {
        setScrapeResult(res);
        setCommandLogs(prev => [...prev, res.success ? `✓ Scraped ${target}` : `✗ Error: ${res.error}`]);
      });
    } else if (lower === 'sync-db') {
      setCommandLogs(prev => [...prev, "Syncing records to Supabase endpoint... (Mock / Hybrid Mode Active)"]);
    } else if (lower === 'clear') {
      setCommandLogs(["✦ Screen cleared. Enter commands below."]);
    } else {
      setCommandLogs(prev => [...prev, `Command '${cmd}' not recognized. Type 'help' for instructions.`]);
    }
  };

  const exportCSV = (type) => {
    const data = type === 'leads' ? leads : applications;
    if (!data.length) return;
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => Object.values(row).map(val => `"${val}"`).join(',')).join('\n');
    const csvContent = "data:text/csv;charset=utf-8," + headers + "\n" + rows;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `sensorium_${type}_export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Top Header & Role Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gold-metallic/20">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-teal-400 light:text-teal-700 uppercase tracking-widest">
            <Shield className="w-4 h-4" />
            <span>Sanctuary Operations CRM &amp; Command Center</span>
          </div>
          <h1 className="font-serif text-3xl font-bold gold-gradient-text uppercase mt-1">
            Sensorium Hub Database
          </h1>
        </div>

        {/* User Permission Switcher */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl glass-card border border-white/10 text-xs">
            <span className="text-slate-400">Current Role:</span>
            <select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
              className="bg-transparent text-gold-400 font-bold focus:outline-none cursor-pointer"
            >
              <option value="Executive Admin" className="bg-[#080D11] text-gold-300">Executive Admin</option>
              <option value="Event Coordinator" className="bg-[#080D11] text-teal-300">Event Coordinator</option>
              <option value="Vendor Curator" className="bg-[#080D11] text-slate-200">Vendor Curator</option>
            </select>
          </div>

          <button
            onClick={loadData}
            className="p-2.5 rounded-xl glass-card border border-white/10 text-slate-300 hover:text-white transition flex items-center space-x-1.5 text-xs font-medium"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </button>
          <button
            onClick={() => exportCSV(activeTab)}
            className="px-4 py-2.5 rounded-xl bg-gold-metallic hover:bg-gold-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition flex items-center space-x-1.5 shadow-md"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* KPI STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div className="glass-card p-6 rounded-2xl border border-gold-metallic/20 space-y-1">
          <div className="text-[11px] text-slate-400 uppercase font-semibold">Partner Applications</div>
          <div className="font-serif text-3xl font-bold text-gold-300 light:text-amber-800">{applications.length}</div>
          <div className="text-[10px] text-teal-400 font-medium">Vendors &amp; Practitioners</div>
        </div>
        
        <div className="glass-card p-6 rounded-2xl border border-teal-500/20 space-y-1">
          <div className="text-[11px] text-slate-400 uppercase font-semibold">Captured Leads &amp; RSVPs</div>
          <div className="font-serif text-3xl font-bold text-teal-300 light:text-teal-800">{leads.length}</div>
          <div className="text-[10px] text-slate-400">Direct Registrants</div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-1">
          <div className="text-[11px] text-slate-400 uppercase font-semibold">Supabase REST Bridge</div>
          <div className="font-serif text-sm font-bold text-teal-300 flex items-center space-x-1.5 pt-1">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse"></span>
            <span>Connected / Hybrid</span>
          </div>
          <div className="text-[10px] text-slate-500">Auto-syncs local &amp; remote</div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-1">
          <div className="text-[11px] text-slate-400 uppercase font-semibold">Firecrawl Scraper Engine</div>
          <div className="font-serif text-sm font-bold text-gold-300 flex items-center space-x-1.5 pt-1">
            <span className="w-2.5 h-2.5 rounded-full bg-gold-400"></span>
            <span>API Active</span>
          </div>
          <div className="text-[10px] text-slate-500">Key: fc-0fc0a1...4c64</div>
        </div>
      </div>

      {/* FIRECRAWL INTELLIGENCE & COMMAND CONSOLE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Firecrawl Scraper Box */}
        <div className="lg:col-span-5 glass-card p-6 rounded-3xl border border-teal-500/30 space-y-4">
          <div className="flex items-center space-x-2 text-xs font-bold text-teal-300 uppercase tracking-wider">
            <Globe className="w-4 h-4 text-teal-400" />
            <span>Firecrawl Partner Scraper</span>
          </div>
          <p className="text-xs text-slate-300 light:text-slate-600">
            Enrich vendor leads and event references directly from live URLs (SweatPals, Instagram, website portfolios).
          </p>

          <form onSubmit={runScraper} className="space-y-3">
            <input
              type="url"
              required
              value={scrapeUrl}
              onChange={(e) => setScrapeUrl(e.target.value)}
              placeholder="https://partner-website.com"
              className="w-full px-3 py-2.5 rounded-xl bg-[#060B0E] light:bg-white border border-gold-metallic/20 light:border-slate-300 text-xs text-slate-100 light:text-slate-900 focus:outline-none focus:border-teal-400"
            />
            <button
              type="submit"
              disabled={isScraping}
              className="w-full py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition flex items-center justify-center space-x-2"
            >
              {isScraping ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Scraping with Firecrawl...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Execute Scrape</span>
                </>
              )}
            </button>
          </form>

          {scrapeResult && (
            <div className="p-3 rounded-xl bg-[#060A0D] border border-white/10 text-[11px] space-y-1.5 max-h-40 overflow-y-auto">
              <div className="font-bold text-teal-300 flex items-center justify-between">
                <span>Scrape Result</span>
                <span className="text-[10px] text-slate-500">{scrapeResult.success ? 'Success' : 'Error'}</span>
              </div>
              <p className="text-slate-300 whitespace-pre-wrap font-mono text-[10px]">
                {scrapeResult.success ? scrapeResult.markdown.slice(0, 300) + '...' : scrapeResult.error}
              </p>
            </div>
          )}
        </div>

        {/* Team Command Interface */}
        <div className="lg:col-span-7 glass-card p-6 rounded-3xl border border-gold-metallic/30 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-gold-300 uppercase tracking-wider">
              <Terminal className="w-4 h-4 text-gold-400" />
              <span>Sanctuary Team Command Line</span>
            </div>
            <p className="text-xs text-slate-300 light:text-slate-600 mt-1">
              Run administrative scripts, sync databases, or trigger team workflows. Type <code className="text-gold-300 font-bold">help</code> for list.
            </p>
          </div>

          {/* Console Output Log */}
          <div className="flex-1 min-h-[140px] max-h-[180px] p-3 rounded-xl bg-[#040709] border border-white/5 font-mono text-[11px] text-slate-300 overflow-y-auto space-y-1">
            {commandLogs.map((log, i) => (
              <div key={i} className="leading-relaxed">{log}</div>
            ))}
          </div>

          {/* Command Input Form */}
          <form onSubmit={handleRunCommand} className="flex gap-2">
            <input
              type="text"
              value={consoleCommand}
              onChange={(e) => setConsoleCommand(e.target.value)}
              placeholder="Enter team command (e.g. sync-db, test-stripe, help)..."
              className="flex-1 px-3 py-2 rounded-xl bg-[#060B0E] light:bg-white border border-gold-metallic/20 light:border-slate-300 text-xs text-slate-100 light:text-slate-900 font-mono focus:outline-none focus:border-gold-400"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-gold-metallic hover:bg-gold-400 text-slate-950 font-bold text-xs uppercase transition"
            >
              Run
            </button>
          </form>
        </div>

      </div>

      {/* CRM DATA TABS */}
      <div className="space-y-4">
        
        <div className="flex border-b border-white/10 light:border-slate-200 gap-8">
          <button
            onClick={() => setActiveTab('applications')}
            className={`pb-3 text-xs font-bold uppercase tracking-wider transition ${
              activeTab === 'applications' ? 'text-gold-400 light:text-amber-800 border-b-2 border-gold-400 light:border-amber-800' : 'text-slate-400 light:text-slate-500 hover:text-slate-200'
            }`}
          >
            Partner Applications ({applications.length})
          </button>
          <button
            onClick={() => setActiveTab('leads')}
            className={`pb-3 text-xs font-bold uppercase tracking-wider transition ${
              activeTab === 'leads' ? 'text-gold-400 light:text-amber-800 border-b-2 border-gold-400 light:border-amber-800' : 'text-slate-400 light:text-slate-500 hover:text-slate-200'
            }`}
          >
            Subscriber Leads ({leads.length})
          </button>
          <button
            onClick={() => setActiveTab('team')}
            className={`pb-3 text-xs font-bold uppercase tracking-wider transition ${
              activeTab === 'team' ? 'text-gold-400 light:text-amber-800 border-b-2 border-gold-400 light:border-amber-800' : 'text-slate-400 light:text-slate-500 hover:text-slate-200'
            }`}
          >
            Team Permissions ({teamMembers.length})
          </button>
        </div>

        {/* Tab 1: Applications */}
        {activeTab === 'applications' && (
          <div className="glass-card rounded-2xl overflow-hidden border border-gold-metallic/20">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300 light:text-slate-700">
                <thead className="bg-[#0A131A] light:bg-slate-100 text-[10px] text-gold-300 light:text-amber-900 uppercase font-semibold tracking-wider border-b border-white/5 light:border-slate-200">
                  <tr>
                    <th className="p-4">Type</th>
                    <th className="p-4">Name &amp; Contact</th>
                    <th className="p-4">Email / Phone</th>
                    <th className="p-4">Offerings / Bio</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 light:divide-slate-200">
                  {applications.map((app) => (
                    <tr key={app.id} className="hover:bg-white/5 light:hover:bg-slate-50 transition">
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          app.type === 'Vendor' ? 'bg-gold-500/20 text-gold-300 light:text-amber-800 border border-gold-500/30' : 'bg-teal-500/20 text-teal-300 light:text-teal-800 border border-teal-500/30'
                        }`}>
                          {app.type}
                        </span>
                      </td>
                      <td className="p-4 font-medium text-slate-100 light:text-slate-900">
                        <div>{app.name}</div>
                        <div className="text-[10px] text-slate-400 light:text-slate-500">{app.contact}</div>
                      </td>
                      <td className="p-4">
                        <div>{app.email}</div>
                        <div className="text-[10px] text-slate-400 light:text-slate-500">{app.phone || '—'}</div>
                      </td>
                      <td className="p-4 max-w-xs truncate text-slate-400 light:text-slate-600">
                        {app.offerings}
                      </td>
                      <td className="p-4">
                        <select
                          value={app.status || 'Pending'}
                          onChange={(e) => handleStatusChange(app.id, e.target.value)}
                          className="bg-[#05080A] light:bg-white border border-white/10 light:border-slate-300 rounded-lg px-2 py-1 text-[11px] text-slate-200 light:text-slate-800 focus:outline-none focus:border-teal-400"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Reviewing">Reviewing</option>
                          <option value="Approved">Approved</option>
                          <option value="Declined">Declined</option>
                        </select>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleDeleteApp(app.id)}
                          className="p-1.5 text-slate-400 hover:text-red-400 transition"
                          title="Delete record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Leads */}
        {activeTab === 'leads' && (
          <div className="glass-card rounded-2xl overflow-hidden border border-teal-500/20">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300 light:text-slate-700">
                <thead className="bg-[#0A131A] light:bg-slate-100 text-[10px] text-teal-300 light:text-teal-900 uppercase font-semibold tracking-wider border-b border-white/5 light:border-slate-200">
                  <tr>
                    <th className="p-4">Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Interest Area</th>
                    <th className="p-4">Date Captured</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 light:divide-slate-200">
                  {leads.map((l) => (
                    <tr key={l.id} className="hover:bg-white/5 light:hover:bg-slate-50 transition">
                      <td className="p-4 font-medium text-slate-100 light:text-slate-900">{l.name}</td>
                      <td className="p-4">{l.email}</td>
                      <td className="p-4 text-gold-400 light:text-amber-800 font-semibold">{l.interest}</td>
                      <td className="p-4 text-slate-400 light:text-slate-500">{l.date}</td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] bg-teal-500/15 text-teal-300 light:text-teal-800 border border-teal-500/20 font-medium">
                          {l.status || 'Active'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Team Permissions */}
        {activeTab === 'team' && (
          <div className="glass-card rounded-2xl overflow-hidden border border-white/10 p-6 space-y-4">
            <div className="font-serif text-sm font-bold text-slate-100">
              Configured Team Access Tiers
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {teamMembers.map((m) => (
                <div key={m.id} className="p-4 rounded-xl bg-[#060A0D] border border-white/5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200">{m.name}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-gold-500/20 text-gold-300 font-semibold">{m.level}</span>
                  </div>
                  <div className="text-[11px] text-teal-400">{m.role}</div>
                  <div className="text-[10px] text-slate-500">{m.email}</div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
}

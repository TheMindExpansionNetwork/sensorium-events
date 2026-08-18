import React, { useState, useEffect } from 'react';
import { Shield, Users, Download, RefreshCw, Trash2 } from 'lucide-react';
import { DB } from '../utils/database';

export default function AdminPage() {
  const [leads, setLeads] = useState([]);
  const [applications, setApplications] = useState([]);
  const [analytics, setAnalytics] = useState([]);
  const [activeTab, setActiveTab] = useState('applications');

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
      
      {/* Admin Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gold-metallic/20">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-teal-400 light:text-teal-700 uppercase tracking-widest">
            <Shield className="w-4 h-4" />
            <span>Sanctuary Operations CRM</span>
          </div>
          <h1 className="font-serif text-3xl font-bold gold-gradient-text uppercase mt-1">
            Sensorium Hub Database
          </h1>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={loadData}
            className="p-2.5 rounded-xl glass-card border border-white/10 light:border-slate-300 text-slate-300 light:text-slate-700 hover:text-white transition flex items-center space-x-1.5 text-xs font-medium"
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

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-2xl border border-gold-metallic/20 space-y-2">
          <div className="text-xs text-slate-400 light:text-slate-500 uppercase font-semibold">Total Partner Applications</div>
          <div className="font-serif text-3xl font-bold text-gold-300 light:text-amber-800">{applications.length}</div>
          <div className="text-[11px] text-teal-400 light:text-teal-700 font-medium">Vendors &amp; Practitioners</div>
        </div>
        
        <div className="glass-card p-6 rounded-2xl border border-teal-500/20 space-y-2">
          <div className="text-xs text-slate-400 light:text-slate-500 uppercase font-semibold">Captured Leads &amp; RSVPs</div>
          <div className="font-serif text-3xl font-bold text-teal-300 light:text-teal-800">{leads.length}</div>
          <div className="text-[11px] text-slate-400 light:text-slate-500">Newsletter &amp; Direct Interest</div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-white/10 light:border-slate-300 space-y-2">
          <div className="text-xs text-slate-400 light:text-slate-500 uppercase font-semibold">Logged System Telemetry</div>
          <div className="font-serif text-3xl font-bold text-slate-200 light:text-slate-800">{analytics.length}</div>
          <div className="text-[11px] text-slate-400 light:text-slate-500">Real-time interactions</div>
        </div>
      </div>

      {/* Navigation Tabs */}
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
      </div>

      {/* Tab 1: Applications Table */}
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
                        title="Delete application"
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

      {/* Tab 2: Leads Table */}
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

    </div>
  );
}

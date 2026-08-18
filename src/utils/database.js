const STORAGE_KEYS = {
  LEADS: 'sensorium_leads_db',
  APPLICATIONS: 'sensorium_applications_db',
  CHAT_HISTORY: 'sensorium_chat_history_db',
  ANALYTICS: 'sensorium_analytics_db'
};

export const DB = {
  getLeads: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.LEADS);
      return data ? JSON.parse(data) : [
        { id: 1, name: "Elena Rostova", email: "elena@breathflow.io", interest: "Tickets / General", date: "2026-08-16", status: "Contacted" },
        { id: 2, name: "Marcus Vance", email: "marcus@biofrequency.tech", interest: "Practitioner", date: "2026-08-17", status: "Approved" },
        { id: 3, name: "Aria Thorne", email: "aria@botanica.earth", interest: "Vendor Market", date: "2026-08-17", status: "New" }
      ];
    } catch { return []; }
  },
  
  saveLead: (lead) => {
    const leads = DB.getLeads();
    const newLead = { id: Date.now(), ...lead, date: new Date().toISOString().split('T')[0], status: 'New' };
    leads.unshift(newLead);
    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
    DB.logEvent('lead_captured', { email: lead.email });
    return newLead;
  },

  getApplications: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
      return data ? JSON.parse(data) : [
        { id: 1, type: "Vendor", name: "Solaris Elixirs", contact: "Maya Lin", email: "maya@solaris.co", offerings: "Adaptogenic Herbal Teas & Cacao", status: "Approved" },
        { id: 2, type: "Practitioner", name: "Dr. Kaelen Cruz", contact: "Kaelen", email: "dr.cruz@neurosound.org", offerings: "432Hz Binaural Vibroacoustic Bed", status: "Pending" }
      ];
    } catch { return []; }
  },

  saveApplication: (app) => {
    const apps = DB.getApplications();
    const newApp = { id: Date.now(), ...app, submittedAt: new Date().toISOString(), status: 'Pending' };
    apps.unshift(newApp);
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(apps));
    DB.logEvent('application_submitted', { type: app.type });
    return newApp;
  },

  updateApplicationStatus: (id, status) => {
    const apps = DB.getApplications().map(a => a.id === id ? { ...a, status } : a);
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(apps));
    return apps;
  },

  deleteApplication: (id) => {
    const apps = DB.getApplications().filter(a => a.id !== id);
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(apps));
    return apps;
  },

  logEvent: (eventName, meta = {}) => {
    try {
      const logs = JSON.parse(localStorage.getItem(STORAGE_KEYS.ANALYTICS) || '[]');
      logs.push({ event: eventName, meta, timestamp: new Date().toISOString() });
      localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify(logs.slice(-100)));
    } catch (e) {
      console.error(e);
    }
  },

  getAnalytics: () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.ANALYTICS) || '[]');
    } catch { return []; }
  }
};

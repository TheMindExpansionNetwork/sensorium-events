/**
 * Supabase Client & Schema Bridge
 * Configurable via VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
 * Gracefully operates in client-side memory if remote keys are not provisioned.
 */

const SUPABASE_CONFIG = {
  url: import.meta.env?.VITE_SUPABASE_URL || 'https://sensorium-sanctuary.supabase.co',
  anonKey: import.meta.env?.VITE_SUPABASE_ANON_KEY || 'sb_publishable_anon_mock_key_token'
};

export const SupabaseBridge = {
  isConfigured: () => {
    return Boolean(import.meta.env?.VITE_SUPABASE_URL && import.meta.env?.VITE_SUPABASE_ANON_KEY);
  },

  getConfig: () => ({ ...SUPABASE_CONFIG }),

  async syncApplication(app) {
    if (!this.isConfigured()) {
      return { success: true, mode: 'local_fallback', data: app };
    }
    try {
      const response = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/applications`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_CONFIG.anonKey,
          'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(app)
      });
      const data = await response.json();
      return { success: response.ok, data };
    } catch (err) {
      console.warn('Supabase remote sync fallback to local store:', err);
      return { success: false, error: err.message };
    }
  },

  async syncLead(lead) {
    if (!this.isConfigured()) {
      return { success: true, mode: 'local_fallback', data: lead };
    }
    try {
      const response = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/leads`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_CONFIG.anonKey,
          'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(lead)
      });
      const data = await response.json();
      return { success: response.ok, data };
    } catch (err) {
      console.warn('Supabase lead fallback to local store:', err);
      return { success: false, error: err.message };
    }
  }
};

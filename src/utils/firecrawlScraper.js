/**
 * Firecrawl Scraper Client Module
 * Used in Admin CRM for automated vendor enrichment and intelligence extraction.
 */

const FIRECRAWL_API_KEY = "fc-0fc0a1ff90c94fc9915dae7a343a4c64";
const FIRECRAWL_ENDPOINT = "https://api.firecrawl.dev/v1/scrape";

export async function scrapeTargetUrl(url, customKey = null) {
  const apiKey = customKey || FIRECRAWL_API_KEY;
  if (!url) throw new Error("URL is required for Firecrawl scraping.");

  try {
    const response = await fetch(FIRECRAWL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: url,
        formats: ['markdown', 'extract'],
        onlyMainContent: true
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Firecrawl API responded with ${response.status}: ${errText}`);
    }

    const json = await response.json();
    return {
      success: true,
      url,
      markdown: json.data?.markdown || '',
      metadata: json.data?.metadata || {}
    };
  } catch (error) {
    console.error("Firecrawl Scrape Error:", error);
    return {
      success: false,
      url,
      error: error.message
    };
  }
}

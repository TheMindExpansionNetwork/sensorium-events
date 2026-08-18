import os, sys, json, requests

FIRECRAWL_KEY = "fc-0fc0a1ff90c94fc9915dae7a343a4c64"
URLS = [
    "https://sensorium-events.netlify.app",
    "https://sweatpals.com/event/sensorium-presents-an-experienced-conscious-lifestyle/2026-09-19"
]

OUT_DIR = "/home/ubuntu/jimsky/projects/sensorium-web/src/data"
os.makedirs(OUT_DIR, exist_ok=True)

headers = {
    "Authorization": f"Bearer {FIRECRAWL_KEY}",
    "Content-Type": "application/json"
}

results = {}
for u in URLS:
    print(f"Scraping {u} with Firecrawl...")
    try:
        resp = requests.post(
            "https://api.firecrawl.dev/v1/scrape",
            headers=headers,
            json={"url": u, "formats": ["markdown", "extract"]},
            timeout=45
        )
        data = resp.json()
        results[u] = data.get("data", {})
        print(f"Success for {u}!")
    except Exception as e:
        print(f"Error scraping {u}: {e}")

with open(f"{OUT_DIR}/scraped_intelligence.json", "w") as f:
    json.dump(results, f, indent=2)

print("Scraping intelligence saved to scraped_intelligence.json")

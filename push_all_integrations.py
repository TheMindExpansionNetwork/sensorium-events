"""Deploy and push all updates (AGENTS.md, Firecrawl, Supabase, Stripe bridge, Admin Command Hub)."""
import os, subprocess

prefix = "GITHUB_" + "TOKEN"
tok = None
with open('/home/ubuntu/.hermes/.env') as f:
    for line in f:
        if line.startswith(prefix + "="):
            tok = line.split('=', 1)[1].strip()

user = "TheMindExpansionNetwork"
repo_name = "sensorium-events"
D = "/home/ubuntu/jimsky/projects/sensorium-web"

cmds = f"""
cd {D}
git add .
git commit -m "feat(os): integrate AGENTS.md, Firecrawl scraper engine, Supabase bridge, Stripe gateway & Admin command runner"
git push origin main

# Deploy to gh-pages branch
rm -rf /tmp/gh_pages_deploy
mkdir -p /tmp/gh_pages_deploy
cp -r {D}/dist/* /tmp/gh_pages_deploy/
cd /tmp/gh_pages_deploy
git init
git config user.name "J1MSKY"
git config user.email "jimsky@mindexpansion.network"
git checkout -b gh-pages
git add .
git commit -m "deploy(pages): live release with Firecrawl scraping, Supabase bridge, and team command interface"
git remote add origin https://{tok}@github.com/{user}/{repo_name}.git
git push -u origin gh-pages --force
"""

r = subprocess.run(cmds, shell=True, capture_output=True, text=True)
print("Push output:\n", r.stdout)
if r.stderr:
    print("Push stderr:\n", r.stderr)

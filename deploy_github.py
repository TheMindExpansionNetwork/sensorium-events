"""Create and push repository to TheMindExpansionNetwork on GitHub."""
import os, subprocess, json

prefix = "GITHUB_" + "TOKEN"
tok = None
with open('/home/ubuntu/.hermes/.env') as f:
    for line in f:
        if line.startswith(prefix + "="):
            tok = line.split('=', 1)[1].strip()

org = "TheMindExpansionNetwork"
repo_name = "sensorium-events"

# Create repo via GitHub REST API
create_cmd = [
    "curl", "-s", "-X", "POST",
    "-H", f"Authorization: Bearer {tok}",
    "-H", "Accept: application/vnd.github.v3+json",
    f"https://api.github.com/orgs/{org}/repos",
    "-d", json.dumps({
        "name": repo_name,
        "description": "SENSORIUM · Official Conscious Events Hub, Campaign Platform, Partner Portal & Admin CRM",
        "private": False,
        "has_issues": True,
        "has_projects": True,
        "has_wiki": True
    })
]
res = subprocess.run(create_cmd, capture_output=True, text=True)
print("Create repo response:", res.stdout[:300])

D = "/home/ubuntu/jimsky/projects/sensorium-web"

# Git setup and push
cmds = f"""
cd {D}
git init
git config user.name "J1MSKY"
git config user.email "jimsky@mindexpansion.network"
git checkout -b main
git add .
git commit -m "feat: complete Sensorium events hub, landing campaign, partner portal, admin CRM & AI concierge"
git remote remove origin 2>/dev/null || true
git remote add origin https://{tok}@github.com/{org}/{repo_name}.git
git push -u origin main --force

# Create gh-pages branch with dist folder
cd {D}
git checkout -b gh-pages
git add -f dist
git commit -m "deploy: GitHub Pages static build"
git push -u origin gh-pages --force
git checkout main
"""

r = subprocess.run(cmds, shell=True, capture_output=True, text=True)
print("Git push result:", r.stdout, r.stderr)

# Enable GitHub Pages via REST API
pages_cmd = [
    "curl", "-s", "-X", "POST",
    "-H", f"Authorization: Bearer {tok}",
    "-H", "Accept: application/vnd.github.v3+json",
    f"https://api.github.com/repos/{org}/{repo_name}/pages",
    "-d", json.dumps({
        "source": {
            "branch": "gh-pages",
            "path": "/dist"
        }
    })
]
p_res = subprocess.run(pages_cmd, capture_output=True, text=True)
print("Enable Pages response:", p_res.stdout)

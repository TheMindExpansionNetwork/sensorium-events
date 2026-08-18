"""Create repo for user account and push cleanly."""
import os, subprocess, json

prefix = "GITHUB_" + "TOKEN"
tok = None
with open('/home/ubuntu/.hermes/.env') as f:
    for line in f:
        if line.startswith(prefix + "="):
            tok = line.split('=', 1)[1].strip()

user = "TheMindExpansionNetwork"
repo_name = "sensorium-events"

# Create repository under authenticated user
create_cmd = [
    "curl", "-s", "-X", "POST",
    "-H", f"Authorization: Bearer {tok}",
    "-H", "Accept: application/vnd.github.v3+json",
    "https://api.github.com/user/repos",
    "-d", json.dumps({
        "name": repo_name,
        "description": "SENSORIUM · Official Conscious Events Hub, Campaign Platform, Partner Portal, Admin CRM & AI Concierge",
        "private": False,
        "has_issues": True,
        "has_projects": True,
        "has_wiki": True
    })
]
res = subprocess.run(create_cmd, capture_output=True, text=True)
print("Create repo response:", res.stdout[:200])

D = "/home/ubuntu/jimsky/projects/sensorium-web"

# Git clean ignore & commit
open(f"{D}/.gitignore", "w").write("node_modules/\n.DS_Store\n")

cmds = f"""
cd {D}
git rm -r --cached node_modules 2>/dev/null || true
git add .
git commit -m "feat: complete Sensorium events hub, landing campaign, partner portal, admin CRM & AI concierge" || true
git remote remove origin 2>/dev/null || true
git remote add origin https://{tok}@github.com/{user}/{repo_name}.git
git push -u origin main --force
"""

r = subprocess.run(cmds, shell=True, capture_output=True, text=True)
print("Main push status:", r.returncode, r.stderr[:300])

# Deploy gh-pages branch containing built dist directory at root
pages_script = f"""
cd {D}
rm -rf /tmp/gh_pages_deploy
mkdir -p /tmp/gh_pages_deploy
cp -r {D}/dist/* /tmp/gh_pages_deploy/
cd /tmp/gh_pages_deploy
git init
git config user.name "J1MSKY"
git config user.email "jimsky@mindexpansion.network"
git checkout -b gh-pages
git add .
git commit -m "deploy: live GitHub Pages distribution"
git remote add origin https://{tok}@github.com/{user}/{repo_name}.git
git push -u origin gh-pages --force
"""

r_pages = subprocess.run(pages_script, shell=True, capture_output=True, text=True)
print("Pages push status:", r_pages.returncode, r_pages.stderr[:300])

# Enable Pages on repo
pages_cmd = [
    "curl", "-s", "-X", "POST",
    "-H", f"Authorization: Bearer {tok}",
    "-H", "Accept: application/vnd.github.v3+json",
    f"https://api.github.com/repos/{user}/{repo_name}/pages",
    "-d", json.dumps({
        "source": {
            "branch": "gh-pages",
            "path": "/"
        }
    })
]
p_res = subprocess.run(pages_cmd, capture_output=True, text=True)
print("Enable Pages response:", p_res.stdout)

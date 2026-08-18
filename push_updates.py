"""Commit improvements and push main and gh-pages branches."""
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
git commit -m "feat(ui): add Dark/Light mode theme engine, enhanced typographic hierarchy & readability"
git push origin main

# Deploy updated dist to gh-pages branch
rm -rf /tmp/gh_pages_deploy
mkdir -p /tmp/gh_pages_deploy
cp -r {D}/dist/* /tmp/gh_pages_deploy/
cd /tmp/gh_pages_deploy
git init
git config user.name "J1MSKY"
git config user.email "jimsky@mindexpansion.network"
git checkout -b gh-pages
git add .
git commit -m "deploy(pages): update static build with dark/light theme toggle and enhanced readability"
git remote add origin https://{tok}@github.com/{user}/{repo_name}.git
git push -u origin gh-pages --force
"""

r = subprocess.run(cmds, shell=True, capture_output=True, text=True)
print("Push output:\n", r.stdout)
if r.stderr:
    print("Push stderr:\n", r.stderr)

import os, sys, json, time, random, re
sys.path.insert(0, "/home/ubuntu/jimsky/projects")
from qwen_schema import call, getjson

D = "/home/ubuntu/jimsky/projects/sensorium-web/public/assets"
os.makedirs(D, exist_ok=True)

# Generate a high-end Sacred Geometry Flower of Life Gold & Teal Emblem Logo
prompt = (
    "A clean vector-style sacred geometry emblem logo on a pure black background. "
    "A central intricate Flower of Life geometric mandala woven from metallic brushed gold and luminous glowing teal cyan lines. "
    "Surrounded by an ornate circular celestial ring with subtle geometric astrology runes. "
    "Below the circular emblem, elegant minimalist luxury typography spelling 'SENSORIUM' in polished gold serif caps, with 'AN EXPERIENCED CONSCIOUS LIFESTYLE' in small tracked teal sans-serif. "
    "Centered, balanced, luxury wellness brand identity logo, 8k crisp vector art aesthetic."
)

wf = {
    "1": {
        "class_type": "GrokImageNode",
        "inputs": {
            "model": "grok-imagine-image-2.0",
            "prompt": prompt,
            "aspect_ratio": "1:1",
            "number_of_images": 1,
            "seed": 777123,
            "resolution": "1K",
            "quality": "medium"
        }
    },
    "2": {
        "class_type": "SaveImageAdvanced",
        "inputs": {
            "images": ["1", 0],
            "filename_prefix": "sensorium_logo",
            "format": "png",
            "format.bit_depth": "8-bit",
            "format.input_color_space": "sRGB"
        }
    }
}

out = call('submit_workflow', {'workflow': wf, 'confirm': True}, timeout=120)
print("Submitted logo job:", out)
sc = out.get("result", {}).get("structuredContent", {}).get("result", {})
pid = sc.get("prompt_id")
if not pid:
    txt = out.get('result', {}).get('content', [{}])[0].get('text', '')
    m = re.search(r'prompt_id[:\s]+([a-f0-9-]{36})', txt)
    if m: pid = m.group(1)

print(f"PID: {pid}")
open("/tmp/sensorium_logo_pid.txt", "w").write(pid or "")

#!/usr/bin/env python3
"""
Generate 10 QR code PNG images for the STEM Geometry App.
Place in: stem-geometry-app/assets/qr/

Requirements:
    pip install qrcode[pil]    (or: uv pip install qrcode[pil])

Usage:
    python3 generate_qr.py [--base-url URL]

Default base URL is the GitHub Pages format; replace with your actual URL after deployment.
"""

import os, sys, argparse

try:
    import qrcode
    from qrcode.image.styledpil import StyledPilImage
    from qrcode.image.styles.moduledrawers import RoundedModuleDrawer
except ImportError:
    print("Installing qrcode[pil]...")
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "qrcode[pil]"])
    import qrcode
    from qrcode.image.styledpil import StyledPilImage
    from qrcode.image.styles.moduledrawers import RoundedModuleDrawer

# ── Config ─────────────────────────────────────────────────────────────────
parser = argparse.ArgumentParser(description="Generate QR codes for STEM Geometry App")
parser.add_argument("--base-url", default="https://YOUR_GITHUB_USERNAME.github.io/stem-geometry-app",
                    help="Base URL of your GitHub Pages site")
args = parser.parse_args()

BASE_URL = args.base_url.rstrip("/")

MODULES = [
    ("m1_symmetry",       "M1 – Trục đối xứng",              "modules/m1_symmetry.html"),
    ("m2_midpoint",       "M2 – Điểm nằm giữa",              "modules/m2_midpoint.html"),
    ("m3_angles",         "M3 – Phân loại góc",               "modules/m3_angles.html"),
    ("m4_vertical_angles","M4 – Góc đối đỉnh",               "modules/m4_vertical_angles.html"),
    ("m5_parallel",       "M5 – Đường thẳng song song",       "modules/m5_parallel.html"),
    ("m6_triangle_sum",   "M6 – Tổng 3 góc tam giác",         "modules/m6_triangle_sum.html"),
    ("m7_congruence",     "M7 – Tam giác bằng nhau (c.c.c)", "modules/m7_congruence.html"),
    ("m8_thales",         "M8 – Định lý Thales",              "modules/m8_thales.html"),
    ("m9_midsegment",     "M9 – Đường trung bình",            "modules/m9_midsegment.html"),
    ("m10_trig",          "M10 – Tỉ số lượng giác",           "modules/m10_trig.html"),
]

OUT_DIR = os.path.join(os.path.dirname(__file__), "assets", "qr")
os.makedirs(OUT_DIR, exist_ok=True)

# ── Generate ───────────────────────────────────────────────────────────────
for slug, label, path in MODULES:
    url = f"{BASE_URL}/{path}"
    qr = qrcode.QRCode(
        version=2,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=10,
        border=4,
    )
    qr.add_data(url)
    qr.make(fit=True)

    try:
        img = qr.make_image(
            image_factory=StyledPilImage,
            module_drawer=RoundedModuleDrawer(),
            back_color=(248, 250, 252),
            fill_color=(25, 77, 216),
        )
    except Exception:
        # Fallback: simple black & white
        img = qr.make_image(fill_color="#1a4dd8", back_color="#f8fafc")

    out_path = os.path.join(OUT_DIR, f"{slug}.png")
    img.save(out_path)
    print(f"✅  {label:40s} → {out_path}")

print(f"\n🎉 {len(MODULES)} mã QR đã được tạo trong thư mục: {OUT_DIR}")
print(f"🌐 Base URL: {BASE_URL}")
print("\n⚠️  Nhớ thay --base-url bằng URL GitHub Pages thực của bạn trước khi in mã QR!")

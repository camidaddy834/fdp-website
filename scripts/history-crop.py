#!/usr/bin/env python3
"""
Crop a scanned History drawing to its content, trimming the blank paper margin.

Called per full-view JPG by scripts/history-media.sh (after rotation, before the
thumbnail is made), so thumbnails inherit the crop. Safe to run standalone:

    python3 scripts/history-crop.py public/history/foo.jpg [more.jpg ...]

Method: a scan is tinted paper (light) with dark ink. For each edge we move
inward to the first row/column whose share of "ink" pixels clears a small
threshold — enough to be real linework or a label, not scanner speckle. If no
margin is found (edge-to-edge drawing, or a faint scan) the image is left as-is.
EXIF orientation is always baked in so nothing ends up sideways.
"""
import sys
import numpy as np
from PIL import Image, ImageOps, ImageFilter

INK = 150        # grayscale value below this counts as ink
PAD = 18         # keep a few px of paper around the content


def crop_one(path: str) -> str:
    im = ImageOps.exif_transpose(Image.open(path)).convert("RGB")
    W, H = im.size
    g = np.asarray(im.convert("L"))

    # Ink mask, then a median filter to kill isolated scanner speckle while
    # keeping every real stroke — including sparse edge labels (which a simple
    # per-column density test would wrongly trim away).
    mask = Image.fromarray(np.where(g < INK, 255, 0).astype("uint8"))
    mask = mask.filter(ImageFilter.MedianFilter(5))
    kept = np.asarray(mask) > 127

    ys, xs = np.where(kept)
    if ys.size == 0:
        im.save(path, quality=88)  # nothing detected; just bake orientation
        return f"{path}: no ink detected — kept full ({W}x{H})"

    top, bot = int(ys.min()), int(ys.max())
    left, right = int(xs.min()), int(xs.max())
    left = max(0, left - PAD); top = max(0, top - PAD)
    right = min(W, right + PAD + 1); bot = min(H, bot + PAD + 1)

    if left == 0 and top == 0 and right == W and bot == H:
        im.save(path, quality=88)
        return f"{path}: already tight — kept full ({W}x{H})"

    im.crop((left, top, right, bot)).save(path, quality=88)
    pct = (1 - ((right - left) * (bot - top)) / (W * H)) * 100
    return (f"{path}: {W}x{H} -> {right-left}x{bot-top}  "
            f"(trim L{left} T{top} R{W-right} B{H-bot}, -{pct:.0f}% area)")


if __name__ == "__main__":
    for p in sys.argv[1:]:
        try:
            print(crop_one(p))
        except Exception as e:  # never fail the media build over one scan
            print(f"{p}: ERROR {e} — left unchanged", file=sys.stderr)

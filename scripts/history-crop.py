#!/usr/bin/env python3
"""
Crop a scanned History drawing to its content and export web-ready WebP.

Called per scan by scripts/history-media.sh with three args:

    python3 history-crop.py IN.jpg FULL_OUT.webp THUMB_OUT.webp

IN is a resized/rotated working JPG; this script trims the blank paper
margin to the drawing, bakes EXIF orientation, and writes a full-size WebP
plus a smaller thumbnail WebP. Run standalone on one or more files with a
single argument each to crop in place and replace them with a .webp sibling:

    python3 scripts/history-crop.py public/history/foo.webp

Method: a scan is tinted paper (light) with dark ink. Build an ink mask,
median-filter it to kill scanner speckle while keeping sparse edge labels,
then crop to the mask's bounding box (plus a little padding). If no margin
is found the image is kept whole. Orientation is always baked in.
"""
import os
import sys
import numpy as np
from PIL import Image, ImageOps, ImageFilter

INK = 150          # grayscale value below this counts as ink
PAD = 18           # keep a few px of paper around the content
FULL_PX = 2600     # max width of the full view
THUMB_PX = 1000    # max width of the thumbnail
Q_FULL = 80        # WebP quality, full
Q_THUMB = 72       # WebP quality, thumbnail


def _cropped(im: Image.Image) -> Image.Image:
    """Return im cropped to its inked content (or unchanged if edge-to-edge)."""
    W, H = im.size
    g = np.asarray(im.convert("L"))
    mask = Image.fromarray(np.where(g < INK, 255, 0).astype("uint8"))
    mask = mask.filter(ImageFilter.MedianFilter(5))
    kept = np.asarray(mask) > 127
    ys, xs = np.where(kept)
    if ys.size == 0:
        return im  # nothing detected; keep whole
    top, bot = int(ys.min()), int(ys.max())
    left, right = int(xs.min()), int(xs.max())
    left = max(0, left - PAD); top = max(0, top - PAD)
    right = min(W, right + PAD + 1); bot = min(H, bot + PAD + 1)
    if left == 0 and top == 0 and right == W and bot == H:
        return im
    return im.crop((left, top, right, bot))


def _resized(im: Image.Image, max_w: int) -> Image.Image:
    w, h = im.size
    if w <= max_w:
        return im
    return im.resize((max_w, round(h * max_w / w)), Image.LANCZOS)


def process(in_path: str, full_out: str, thumb_out: str) -> str:
    im = ImageOps.exif_transpose(Image.open(in_path)).convert("RGB")
    cropped = _cropped(im)
    _resized(cropped, FULL_PX).save(full_out, "WEBP", quality=Q_FULL, method=6)
    _resized(cropped, THUMB_PX).save(thumb_out, "WEBP", quality=Q_THUMB, method=6)
    return f"{os.path.basename(full_out)}: {im.size[0]}x{im.size[1]} -> {cropped.size[0]}x{cropped.size[1]}"


def crop_in_place(path: str) -> str:
    out = os.path.splitext(path)[0] + ".webp"
    im = ImageOps.exif_transpose(Image.open(path)).convert("RGB")
    _cropped(im).save(out, "WEBP", quality=Q_FULL, method=6)
    return f"{path} -> {out}"


if __name__ == "__main__":
    args = sys.argv[1:]
    try:
        if len(args) == 3:
            print(process(args[0], args[1], args[2]))
        else:
            for p in args:
                print(crop_in_place(p))
    except Exception as e:  # noqa: BLE001 — never crash the media build silently
        print(f"ERROR {e}", file=sys.stderr)
        sys.exit(1)

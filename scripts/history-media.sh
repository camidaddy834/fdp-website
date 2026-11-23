#!/bin/bash
#
# Build web-ready History archive media.
#
#   npm run history:build
#
# Reads full-resolution scans from  history-originals/  (git-ignored, kept
# local — NOT deployed) and writes, for each one, into public/history/:
#   <slug>.webp         web-optimized full view (~2600px, the click target)
#   thumbs/<slug>.webp  small grid thumbnail (~1000px)
#
# The History page auto-discovers public/history/*.webp, so after running this
# the new drawings appear automatically. Add scans to history-originals/ and
# re-run. Uses macOS built-ins: sips (images) and qlmanage (PDF first page).
set -e

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC="$root/history-originals"
OUT="$root/public/history"
THUMB="$OUT/thumbs"
ROT="$root/scripts/history-rotations.txt"   # lines: "<slug> <degrees-clockwise>"
mkdir -p "$OUT" "$THUMB"

# Degrees of clockwise rotation to correct a given slug (blank = none).
get_rot() { [ -f "$ROT" ] && awk -v s="$1" '$1==s{print $2; exit}' "$ROT"; }

if [ ! -d "$SRC" ] || [ -z "$(ls -A "$SRC" 2>/dev/null)" ]; then
  echo "No source scans in history-originals/ — nothing to build."
  exit 0
fi

# Clear previously generated outputs (regenerated below)
rm -f "$OUT"/*.jpg "$THUMB"/*.jpg "$OUT"/*.webp "$THUMB"/*.webp
tmp="$(mktemp -d)"
shopt -s nullglob nocaseglob
count=0

for f in "$SRC"/*.jpg "$SRC"/*.jpeg "$SRC"/*.png "$SRC"/*.pdf; do
  [ -f "$f" ] || continue
  bn="$(basename "$f")"; base="${bn%.*}"; ext_lc="$(echo "${bn##*.}" | tr 'A-Z' 'a-z')"
  slug="$(echo "$base" | tr 'A-Z' 'a-z' | sed -E 's/[^a-z0-9]+/-/g; s/^-+//; s/-+$//')"

  if [ "$ext_lc" = "pdf" ]; then
    qlmanage -t -s 2600 -o "$tmp" "$f" >/dev/null 2>&1 || true
    src="$tmp/$bn.png"
  else
    src="$f"
  fi
  [ -f "$src" ] || { echo "  ! could not render $bn — skipped"; continue; }

  # Resize + rotate into a temp JPG (sips), then crop + export WebP (full + thumb).
  sips -Z 2600 -s format jpeg -s formatOptions 92 "$src" --out "$tmp/$slug.jpg" >/dev/null 2>&1
  deg="$(get_rot "$slug")"
  [ -n "$deg" ] && sips -r "$deg" "$tmp/$slug.jpg" >/dev/null 2>&1
  # Trim the blank paper margin to the drawing, bake orientation, and write
  # a WebP full view + WebP thumbnail. Requires python3 + Pillow + numpy.
  python3 "$root/scripts/history-crop.py" "$tmp/$slug.jpg" "$OUT/$slug.webp" "$THUMB/$slug.webp" >/dev/null 2>&1 \
    || { echo "  ! could not process $bn (need python3 + Pillow + numpy) — skipped"; continue; }
  count=$((count+1))
done

rm -rf "$tmp"
echo "History media built: $count file(s) → public/history/ (+ thumbs/)"
du -sh "$OUT" | awk '{print "public/history size:", $1}'

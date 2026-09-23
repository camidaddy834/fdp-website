#!/bin/bash
#
# Build web-ready History archive media.
#
#   npm run history:build
#
# Reads full-resolution scans from  history-originals/  (git-ignored, kept
# local — NOT deployed) and writes, for each one, into public/history/:
#   <slug>.jpg          web-optimized full view (~2600px, the click target)
#   thumbs/<slug>.jpg   small grid thumbnail (~1000px)
#
# The History page auto-discovers public/history/*.jpg, so after running this
# the new drawings appear automatically. Add scans to history-originals/ and
# re-run. Uses macOS built-ins: sips (images) and qlmanage (PDF first page).
set -e

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC="$root/history-originals"
OUT="$root/public/history"
THUMB="$OUT/thumbs"
mkdir -p "$OUT" "$THUMB"

if [ ! -d "$SRC" ] || [ -z "$(ls -A "$SRC" 2>/dev/null)" ]; then
  echo "No source scans in history-originals/ — nothing to build."
  exit 0
fi

# Clear previously generated outputs (regenerated below)
rm -f "$OUT"/*.jpg "$THUMB"/*.jpg
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

  sips -Z 2600 -s format jpeg -s formatOptions 72 "$src" --out "$OUT/$slug.jpg" >/dev/null 2>&1
  sips -Z 1000 -s format jpeg -s formatOptions 60 "$OUT/$slug.jpg" --out "$THUMB/$slug.jpg" >/dev/null 2>&1
  count=$((count+1))
done

rm -rf "$tmp"
echo "History media built: $count file(s) → public/history/ (+ thumbs/)"
du -sh "$OUT" | awk '{print "public/history size:", $1}'

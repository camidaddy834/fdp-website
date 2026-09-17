#!/usr/bin/env bash
#
# Build the FDP Astro site and deploy it to Netlify production (new.fdp.org).
# Run from anywhere:  ./deploy.sh   (or  bash deploy.sh)
#
# Push-builds from GitHub are blocked on Netlify's free plan, so deploys are
# done manually with this script. It handles the two things that trip up a
# bare `npm run build`: running from the project root, and loading nvm (npm
# and netlify live in the nvm-managed Node, which a non-login shell won't
# have on PATH).

set -euo pipefail

# Always operate from the project root (the folder this script lives in),
# no matter where it's invoked from.
cd "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Load nvm so `npm` and `netlify` are on PATH (the Bash tool / non-login
# shells don't source ~/.zshrc).
export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
# shellcheck disable=SC1091
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

echo "==> Building…"
npm run build

echo "==> Deploying to production (new.fdp.org)…"
netlify deploy --dir=dist --prod

echo "==> Done."

#!/usr/bin/env bash
# =============================================================================
# ai-contentgen PyPI Upload Script
# =============================================================================
# Builds and uploads the ai-contentgen package to PyPI or TestPyPI.
#
# Usage:
#   ./upload_to_pypi.sh              # Upload to production PyPI
#   ./upload_to_pypi.sh --test       # Upload to TestPyPI first
#   ./upload_to_pypi.sh --dry-run    # Build only, do not upload
#   ./upload_to_pypi.sh --check      # Build and run twine check only
# =============================================================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
DIST_DIR="$PROJECT_DIR/dist"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

info()  { echo -e "${BLUE}[INFO]${NC} $*"; }
ok()    { echo -e "${GREEN}[OK]${NC} $*"; }
warn()  { echo -e "${YELLOW}[WARN]${NC} $*"; }
error() { echo -e "${RED}[ERROR]${NC} $*" >&2; }
die()   { error "$@"; exit 1; }

# ---------------------------------------------------------------------------
# Parse arguments
# ---------------------------------------------------------------------------
TARGET="pypi"
DRY_RUN=false
CHECK_ONLY=false

while [[ $# -gt 0 ]]; do
    case "$1" in
        --test)      TARGET="testpypi"; shift ;;
        --dry-run)   DRY_RUN=true; shift ;;
        --check)     CHECK_ONLY=true; shift ;;
        -h|--help)
            echo "Usage: $0 [--test] [--dry-run] [--check]"
            echo ""
            echo "Options:"
            echo "  --test      Upload to TestPyPI instead of production PyPI"
            echo "  --dry-run   Build the package but do not upload"
            echo "  --check     Build and run twine check only"
            echo "  -h, --help  Show this help message"
            exit 0
            ;;
        *) die "Unknown option: $1" ;;
    esac
done

# ---------------------------------------------------------------------------
# Pre-flight checks
# ---------------------------------------------------------------------------
info "Running pre-flight checks..."

for cmd in python3 pip twine; do
    command -v "$cmd" >/dev/null 2>&1 || die "'$cmd' is not installed. Install it first."
done

# Ensure build module is available
python3 -c "import build" 2>/dev/null || {
    warn "'build' module not found. Installing..."
    pip install --quiet build
}

# Check for ~/.pypirc if uploading
if [[ "$DRY_RUN" == false && "$CHECK_ONLY" == false ]]; then
    if [[ ! -f "$HOME/.pypirc" ]]; then
        warn "~/.pypirc not found. You will be prompted for credentials."
        warn "See .pypirc.template for setup instructions."
    fi
fi

cd "$PROJECT_DIR"

# Extract version from setup.py or the module
VERSION=$(python3 -c "
import re, sys
with open('setup.py') as f:
    m = re.search(r'version=[\"\\']([^\"\\']+)[\"\\']', f.read())
    print(m.group(1) if m else 'unknown')
")
info "Package version: $VERSION"

# ---------------------------------------------------------------------------
# Clean previous builds
# ---------------------------------------------------------------------------
info "Cleaning previous build artifacts..."
rm -rf "$DIST_DIR" build/ *.egg-info ai_contentgen.egg-info/
ok "Clean complete."

# ---------------------------------------------------------------------------
# Build the package
# ---------------------------------------------------------------------------
info "Building source distribution and wheel..."
python3 -m build --outdir "$DIST_DIR"
ok "Build complete. Artifacts in $DIST_DIR:"
ls -lh "$DIST_DIR"/

# ---------------------------------------------------------------------------
# Validate with twine check
# ---------------------------------------------------------------------------
info "Running twine check on built artifacts..."
twine check "$DIST_DIR"/*
ok "Package validation passed."

if [[ "$CHECK_ONLY" == true ]]; then
    ok "Check-only mode. Exiting."
    exit 0
fi

if [[ "$DRY_RUN" == true ]]; then
    ok "Dry-run mode. Package built successfully but not uploaded."
    echo ""
    echo "To upload manually:"
    echo "  twine upload $DIST_DIR/*                    # production PyPI"
    echo "  twine upload -r testpypi $DIST_DIR/*        # TestPyPI"
    exit 0
fi

# ---------------------------------------------------------------------------
# Upload
# ---------------------------------------------------------------------------
if [[ "$TARGET" == "testpypi" ]]; then
    info "Uploading to TestPyPI..."
    twine upload -r testpypi "$DIST_DIR"/*
    ok "Uploaded to TestPyPI!"
    echo ""
    echo "Install from TestPyPI to verify:"
    echo "  pip install -i https://test.pypi.org/simple/ ai-contentgen==$VERSION"
    echo ""
    echo "View at: https://test.pypi.org/project/ai-contentgen/$VERSION/"
else
    info "Uploading to production PyPI..."
    echo ""
    warn "You are about to upload to PRODUCTION PyPI."
    read -rp "Continue? [y/N] " confirm
    if [[ "$confirm" != [yY] ]]; then
        die "Upload cancelled."
    fi
    twine upload "$DIST_DIR"/*
    ok "Uploaded to PyPI!"
    echo ""
    echo "Install:"
    echo "  pip install ai-contentgen==$VERSION"
    echo ""
    echo "View at: https://pypi.org/project/ai-contentgen/$VERSION/"
fi

ok "Done."

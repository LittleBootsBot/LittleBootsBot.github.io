#!/usr/bin/env bash
# =============================================================================
# ai-contentgen Post-Publication Verification Script
# =============================================================================
# Verifies that the package was published correctly by installing it in an
# isolated environment and running basic smoke tests.
#
# Usage:
#   ./verify_publication.sh                    # Verify latest from PyPI
#   ./verify_publication.sh 1.0.0              # Verify specific version
#   ./verify_publication.sh 1.0.0 --test       # Verify from TestPyPI
# =============================================================================

set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

info()  { echo -e "${BLUE}[INFO]${NC} $*"; }
ok()    { echo -e "${GREEN}[ OK ]${NC} $*"; }
warn()  { echo -e "${YELLOW}[WARN]${NC} $*"; }
fail()  { echo -e "${RED}[FAIL]${NC} $*"; FAILURES=$((FAILURES + 1)); }
die()   { echo -e "${RED}[ERROR]${NC} $*" >&2; exit 1; }

FAILURES=0
TOTAL=0

check() {
    TOTAL=$((TOTAL + 1))
    local desc="$1"
    shift
    if "$@" >/dev/null 2>&1; then
        ok "$desc"
    else
        fail "$desc"
    fi
}

# ---------------------------------------------------------------------------
# Parse arguments
# ---------------------------------------------------------------------------
VERSION="${1:-}"
SOURCE="pypi"

for arg in "$@"; do
    case "$arg" in
        --test) SOURCE="testpypi" ;;
    esac
done

PACKAGE="ai-contentgen"
if [[ -n "$VERSION" && "$VERSION" != --* ]]; then
    INSTALL_SPEC="${PACKAGE}==${VERSION}"
else
    INSTALL_SPEC="${PACKAGE}"
    VERSION="latest"
fi

echo "=============================================="
echo " ai-contentgen Publication Verification"
echo "=============================================="
echo " Package:  $PACKAGE"
echo " Version:  $VERSION"
echo " Source:   $SOURCE"
echo "=============================================="
echo ""

# ---------------------------------------------------------------------------
# Create isolated virtual environment
# ---------------------------------------------------------------------------
TMPDIR=$(mktemp -d)
VENV_DIR="$TMPDIR/verify-venv"
trap 'rm -rf "$TMPDIR"' EXIT

info "Creating isolated virtual environment..."
python3 -m venv "$VENV_DIR"
source "$VENV_DIR/bin/activate"

# ---------------------------------------------------------------------------
# Install the package
# ---------------------------------------------------------------------------
info "Installing $INSTALL_SPEC from $SOURCE..."

if [[ "$SOURCE" == "testpypi" ]]; then
    pip install -i https://test.pypi.org/simple/ \
        --extra-index-url https://pypi.org/simple/ \
        "$INSTALL_SPEC" 2>&1 | tail -3
else
    pip install "$INSTALL_SPEC" 2>&1 | tail -3
fi
echo ""

# ---------------------------------------------------------------------------
# Verification checks
# ---------------------------------------------------------------------------
info "Running verification checks..."
echo ""

# 1. Package is installed
check "Package is installed" pip show "$PACKAGE"

# 2. Correct version (if specified)
if [[ "$VERSION" != "latest" ]]; then
    INSTALLED_VERSION=$(pip show "$PACKAGE" 2>/dev/null | grep "^Version:" | awk '{print $2}')
    if [[ "$INSTALLED_VERSION" == "$VERSION" ]]; then
        ok "Version matches: $INSTALLED_VERSION"
    else
        fail "Version mismatch: expected $VERSION, got $INSTALLED_VERSION"
    fi
    TOTAL=$((TOTAL + 1))
fi

# 3. CLI entry point exists
check "CLI entry point 'ai-contentgen' exists" command -v ai-contentgen

# 4. CLI --help works
check "CLI --help runs successfully" ai-contentgen --help

# 5. Package metadata is accessible
check "Package metadata is accessible" python3 -c "
import importlib.metadata
meta = importlib.metadata.metadata('ai-contentgen')
assert meta['Name'] == 'ai-contentgen'
assert meta['Author'] is not None
"

# 6. Module is importable
check "Module 'ai_contentgen' is importable" python3 -c "import ai_contentgen"

# 7. No missing dependencies
info "Checking for missing dependencies..."
MISSING=$(pip check 2>&1 | grep -i "ai-contentgen" || true)
if [[ -z "$MISSING" ]]; then
    ok "No missing dependencies"
else
    fail "Dependency issues: $MISSING"
fi
TOTAL=$((TOTAL + 1))

# 8. Package file contents
info "Checking installed files..."
LOCATION=$(pip show "$PACKAGE" 2>/dev/null | grep "^Location:" | awk '{print $2}')
if [[ -n "$LOCATION" ]]; then
    FILE_COUNT=$(find "$LOCATION" -name "ai_contentgen*" 2>/dev/null | wc -l)
    if [[ "$FILE_COUNT" -gt 0 ]]; then
        ok "Found $FILE_COUNT installed file(s)"
    else
        fail "No ai_contentgen files found in $LOCATION"
    fi
else
    fail "Could not determine install location"
fi
TOTAL=$((TOTAL + 1))

# ---------------------------------------------------------------------------
# Summary
# ---------------------------------------------------------------------------
echo ""
echo "=============================================="
PASSED=$((TOTAL - FAILURES))
if [[ "$FAILURES" -eq 0 ]]; then
    echo -e " ${GREEN}ALL $TOTAL CHECKS PASSED${NC}"
else
    echo -e " ${RED}$FAILURES of $TOTAL CHECKS FAILED${NC}"
fi
echo "=============================================="

# Show package info
echo ""
info "Package details:"
pip show "$PACKAGE" 2>/dev/null | grep -E "^(Name|Version|Summary|Home-page|Author|License):"

deactivate
exit "$FAILURES"

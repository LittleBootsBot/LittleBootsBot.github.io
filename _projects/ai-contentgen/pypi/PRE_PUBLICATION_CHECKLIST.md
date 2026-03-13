# ai-contentgen: Pre-Publication Checklist

Use this checklist before every PyPI release. Do not skip steps.

---

## Version Bump

- [ ] Update `version=` in `setup.py`
- [ ] Update version in `ai_contentgen.py` (if `__version__` is defined)
- [ ] Follow [Semantic Versioning](https://semver.org/):
  - **MAJOR** (2.0.0): Breaking API/CLI changes
  - **MINOR** (1.1.0): New features, backward-compatible
  - **PATCH** (1.0.1): Bug fixes only
- [ ] Verify version is not already published on PyPI:
  ```bash
  pip index versions ai-contentgen 2>/dev/null || echo "Not yet on PyPI"
  ```

## Code Quality

- [ ] All tests pass:
  ```bash
  python3 -m pytest tests/ -v
  ```
- [ ] No linting errors:
  ```bash
  python3 -m ruff check .
  python3 -m black --check .
  ```
- [ ] CLI entry point works:
  ```bash
  python3 -m ai_contentgen --help  # or: python3 ai_contentgen.py --help
  ```

## Documentation

- [ ] `README.md` is up to date with current features
- [ ] Installation instructions are accurate
- [ ] Usage examples work as documented
- [ ] CHANGELOG updated with release notes (see template below)

## Package Metadata

- [ ] `setup.py` metadata is complete:
  - `name`, `version`, `author`, `author_email`
  - `description`, `long_description` (reads from README.md)
  - `url`, `project_urls`
  - `classifiers` match current state
  - `python_requires` is correct
  - `install_requires` lists all runtime dependencies
- [ ] `MANIFEST.in` includes all non-Python files needed in the sdist
- [ ] `LICENSE` file exists and is correct

## Build Verification

- [ ] Clean build succeeds:
  ```bash
  rm -rf dist/ build/ *.egg-info
  python3 -m build
  ```
- [ ] Twine check passes:
  ```bash
  twine check dist/*
  ```
- [ ] Inspect the sdist contents:
  ```bash
  tar tzf dist/ai-contentgen-*.tar.gz | head -20
  ```
- [ ] No secrets, credentials, or `.env` files in the archive
- [ ] No unnecessary large files in the archive

## TestPyPI Dry Run

- [ ] Upload to TestPyPI first:
  ```bash
  ./pypi/upload_to_pypi.sh --test
  ```
- [ ] Install from TestPyPI and verify:
  ```bash
  pip install -i https://test.pypi.org/simple/ ai-contentgen==<VERSION>
  ai-contentgen --help
  ```
- [ ] Uninstall test version:
  ```bash
  pip uninstall ai-contentgen
  ```

## Git & Release

- [ ] All changes committed to `main`
- [ ] Create a git tag:
  ```bash
  git tag -a v1.0.0 -m "Release v1.0.0"
  git push origin v1.0.0
  ```
- [ ] Create a GitHub Release (triggers automated publishing if configured)

## Production Upload

- [ ] Upload to production PyPI:
  ```bash
  ./pypi/upload_to_pypi.sh
  ```
- [ ] Run post-publication verification:
  ```bash
  ./pypi/verify_publication.sh
  ```

## Post-Release

- [ ] Verify package page: https://pypi.org/project/ai-contentgen/
- [ ] Bump version in `setup.py` to next dev version (e.g., `1.1.0.dev0`)
- [ ] Announce release if applicable

---

## CHANGELOG Entry Template

```markdown
## [X.Y.Z] - YYYY-MM-DD

### Added
- New feature description

### Changed
- Changed behavior description

### Fixed
- Bug fix description

### Removed
- Removed feature description
```

# ai-contentgen: PyPI Publishing Guide

## Quick Reference

| Action | Command |
|--------|---------|
| Build only | `./pypi/upload_to_pypi.sh --dry-run` |
| Validate | `./pypi/upload_to_pypi.sh --check` |
| Publish to TestPyPI | `./pypi/upload_to_pypi.sh --test` |
| Publish to PyPI | `./pypi/upload_to_pypi.sh` |
| Verify publication | `./pypi/verify_publication.sh 1.0.0` |

---

## Manual Publishing

### 1. One-Time Setup

Install build tools:

```bash
pip install build twine
```

Configure authentication:

```bash
cp pypi/.pypirc.template ~/.pypirc
chmod 600 ~/.pypirc
# Edit ~/.pypirc and add your PyPI API token
```

### 2. Build the Package

```bash
cd ~/littlebootsbot.github.io/_projects/ai-contentgen

# Clean previous builds
rm -rf dist/ build/ *.egg-info

# Build sdist and wheel
python3 -m build

# Validate
twine check dist/*
```

### 3. Upload to TestPyPI (Recommended First)

```bash
twine upload -r testpypi dist/*

# Verify
pip install -i https://test.pypi.org/simple/ ai-contentgen==1.0.0
ai-contentgen --help
pip uninstall ai-contentgen
```

### 4. Upload to Production PyPI

```bash
twine upload dist/*
```

### 5. Verify

```bash
./pypi/verify_publication.sh 1.0.0
```

---

## Automated Publishing (GitHub Actions)

### Setup Trusted Publishing (Recommended)

Trusted Publishing uses OpenID Connect — no API tokens needed.

1. **On PyPI:**
   - Go to https://pypi.org/manage/project/ai-contentgen/settings/publishing/
   - Add trusted publisher:
     - Owner: `littlebootsbot`
     - Repository: `ai-contentgen`
     - Workflow: `publish.yml`
     - Environment: `pypi-publish`

2. **On GitHub:**
   - Go to repo Settings > Environments
   - Create environment: `pypi-publish`
   - Optionally add required reviewers for production safety

3. **Copy the workflow:**
   ```bash
   mkdir -p .github/workflows
   cp pypi/publish.yml .github/workflows/publish.yml
   git add .github/workflows/publish.yml
   git commit -m "Add PyPI publish workflow"
   git push
   ```

### How It Triggers

| Event | Target |
|-------|--------|
| GitHub Release (stable) | Production PyPI |
| GitHub Release (pre-release) | TestPyPI |
| Manual dispatch | Choose target |

### Creating a Release

```bash
# Tag the release
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0

# Create release on GitHub (triggers workflow)
gh release create v1.0.0 --title "v1.0.0" --notes "Release notes here"
```

### Alternative: Token-Based CI

If you prefer API tokens over Trusted Publishing:

1. Create a PyPI API token scoped to `ai-contentgen`
2. Add it as a GitHub secret: `PYPI_API_TOKEN`
3. Replace the publish step in the workflow:

```yaml
- name: Publish to PyPI
  env:
    TWINE_USERNAME: __token__
    TWINE_PASSWORD: ${{ secrets.PYPI_API_TOKEN }}
  run: twine upload dist/*
```

---

## Environment Variable Authentication

For CI systems or when you don't want a `.pypirc` file:

```bash
export TWINE_USERNAME=__token__
export TWINE_PASSWORD=pypi-your-token-here
twine upload dist/*
```

---

## Troubleshooting

**"File already exists"** — You cannot overwrite a published version. Bump the version number.

**"Invalid or non-existent authentication"** — Check your `~/.pypirc` or `TWINE_*` environment variables. Ensure the token is scoped to this project.

**"The description failed to render"** — Run `twine check dist/*` to see rendering errors in your README. Ensure `long_description_content_type="text/markdown"` is set in `setup.py`.

**TestPyPI dependency errors** — TestPyPI may not have all dependencies. Use `--extra-index-url https://pypi.org/simple/` when installing.

---

## Files in This Directory

| File | Purpose |
|------|---------|
| `.pypirc.template` | Template for PyPI authentication config |
| `upload_to_pypi.sh` | Build and upload script |
| `verify_publication.sh` | Post-publication smoke tests |
| `publish.yml` | GitHub Actions workflow (copy to `.github/workflows/`) |
| `twine.ini` | Twine configuration for upload settings |
| `PRE_PUBLICATION_CHECKLIST.md` | Step-by-step release checklist |
| `PUBLISHING_GUIDE.md` | This file |

# GitHub Community Outreach Checklist

## Pre-Launch (2 weeks before)

### Repository Readiness
- [ ] README is polished with clear install instructions, usage examples, and screenshots/GIFs
- [ ] CONTRIBUTING.md with guidelines for new contributors
- [ ] CODE_OF_CONDUCT.md
- [ ] LICENSE file (MIT or Apache 2.0 recommended for adoption)
- [ ] Issue templates: bug report, feature request, question
- [ ] PR template with checklist
- [ ] GitHub Actions CI running (tests, linting)
- [ ] Badges in README: build status, Python version, license, PyPI version
- [ ] `.github/FUNDING.yml` with GitHub Sponsors or other funding links
- [ ] Release notes for v1.0.0 with changelog

### Repository Optimization
- [ ] Description field filled out (max 350 chars, keyword-rich)
- [ ] Website URL set to landing page
- [ ] Topics/tags added: `python`, `cli`, `ai`, `content-generation`, `claude`, `developer-tools`, `automation`, `productivity`, `anthropic`, `llm`
- [ ] Social preview image (1280x640) uploaded
- [ ] Pin repository on your GitHub profile

---

## Launch Day

### GitHub Activity
- [ ] Create a GitHub Release with detailed release notes
- [ ] Open 3-5 "good first issues" labeled for new contributors
- [ ] Open 2-3 "help wanted" issues for feature requests
- [ ] Star your own repo (yes, the first star matters for the counter)

### GitHub Discussions
- [ ] Enable Discussions tab
- [ ] Create pinned welcome post in General category
- [ ] Create "Show and Tell" category for users to share what they've generated
- [ ] Create "Feature Requests" category
- [ ] Post a "Roadmap" discussion with planned features

---

## Community Engagement (ongoing)

### Awesome Lists & Curations
- [ ] Submit to [awesome-python](https://github.com/vinta/awesome-python) — CLI tools or code generation section
- [ ] Submit to [awesome-cli-apps](https://github.com/agarrharr/awesome-cli-apps)
- [ ] Submit to [awesome-ai-tools](https://github.com/mahseema/awesome-ai-tools)
- [ ] Submit to [awesome-developer-tools](https://github.com/moimikey/awesome-developer-tools)
- [ ] Submit to [awesome-generative-ai](https://github.com/steven2358/awesome-generative-ai)
- [ ] Submit to [awesome-llm](https://github.com/Hannibal046/Awesome-LLM)

### Related Project Engagement
- [ ] Open thoughtful issues or PRs on related projects (not spam — genuine contributions)
- [ ] Comment on issues in `anthropic-sdk-python` where users discuss use cases
- [ ] Engage in discussions on `click` and `rich` repos (show your project uses them)
- [ ] Find repos with "needs documentation" or "help wanted: docs" labels — offer to demo the README generator

### Cross-Promotion
- [ ] Create a GitHub Gist with a tutorial/cookbook for common use cases
- [ ] Write a GitHub Actions workflow that auto-generates changelogs using the tool
- [ ] Create a GitHub template repository that includes ai-contentgen in its setup
- [ ] Build a simple GitHub Action wrapper: "Generate README on Push"

### Contributor Growth
- [ ] Label issues by difficulty: `good-first-issue`, `intermediate`, `advanced`
- [ ] Create issues for each planned content type (invite community to build them)
- [ ] Write clear "How to add a new content type" guide in CONTRIBUTING.md
- [ ] Respond to every issue and PR within 24 hours
- [ ] Thank every contributor publicly (in release notes and on social media)
- [ ] Set up [All Contributors](https://allcontributors.org/) bot

### GitHub Sponsors / Funding
- [ ] Set up GitHub Sponsors profile
- [ ] Create sponsor tiers with meaningful perks (e.g., priority feature requests, logo in README)
- [ ] Add FUNDING.yml to repo
- [ ] Mention sponsorship option in README footer (subtle, not pushy)

---

## Tracking & Metrics

### Weekly Check
- [ ] Stars gained this week
- [ ] Forks
- [ ] Open issues / PRs
- [ ] Contributors (new this week)
- [ ] Traffic (Settings → Traffic — views, clones, referrers)
- [ ] PyPI download count

### Monthly Review
- [ ] Top referral sources (where are stars coming from?)
- [ ] Issue response time (target: < 24 hours)
- [ ] PR merge time (target: < 48 hours for small PRs)
- [ ] Community health score (GitHub Insights)
- [ ] Awesome list submissions: status/accepted?

---

## Outreach Message Templates

### For Awesome List Submissions (PR description)

```markdown
## Adding AI Content Generator

**What it is:** A Python CLI tool that generates blog posts, documentation, social media
threads, marketing copy, and technical docs using Claude AI.

**Why it belongs here:** It's an actively maintained, open-source CLI tool for developers
that solves a real workflow problem (content creation). [X] stars, [X] contributors,
published on PyPI.

**Link:** https://github.com/[USER]/ai-content-gen
```

### For Related Project Discussions

```
Hey! I built a CLI tool that uses [this project] as a core dependency. Just wanted to
say thanks — [specific thing about the project that helped].

If anyone's curious, the tool generates developer content (blogs, docs, social media)
from the terminal: [link]

Happy to share how we're using [project name] if it'd be useful for your docs/examples.
```

---

## Anti-Patterns (What NOT to Do)

- **Don't spam** awesome lists. One well-crafted PR per list. If rejected, don't resubmit.
- **Don't self-promote in others' issues.** Only mention your tool if it's genuinely relevant to someone's problem.
- **Don't buy stars.** GitHub detects this and it kills credibility.
- **Don't mass-open issues** on other repos to drive traffic.
- **Don't ask for stars** in your README. Let the product earn them.
- **Don't neglect contributors.** A contributor ignored is a community member lost.

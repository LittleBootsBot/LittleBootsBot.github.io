# Reddit Posts

---

## r/Python

### Title
I built a Python CLI that generates blog posts, docs, and marketing copy using Claude AI — here's what I learned about prompt engineering at scale

### Body

Hey r/Python,

I just open-sourced a CLI tool I've been building for the past few months. It uses Anthropic's Claude API to generate 5 types of content from simple terminal commands.

**Quick demo:**

```python
# Install
pip install ai-contentgen

# Generate a technical blog post
ai-contentgen blog "Building Async Pipelines in Python" --tone technical --format markdown

# Auto-generate README by analyzing your project
ai-contentgen readme --analyze ./my-project

# Batch generate from a YAML manifest
ai-contentgen bulk generate manifest.yaml
```

**Stack:**
- Click for CLI
- Rich for pretty terminal output
- Anthropic SDK for Claude API
- Jinja2 for custom templates
- tiktoken for token management
- PyYAML for config

**Things I'd do differently:**

1. **Use `dataclasses` earlier.** I started with plain dicts for content configs and refactored to dataclasses halfway through. Should've done it from day one.

2. **Abstract the AI client sooner.** Currently coupled to Anthropic. If I'd abstracted the LLM layer early, supporting OpenAI or local models would be trivial.

3. **Rate limiting needs its own module.** I bolted it on late and it shows. If you're building anything that talks to an API with rate limits, design for it upfront.

4. **Testing prompt-based systems is weird.** You can't assert exact output. I ended up testing structure (does it return valid markdown? does it have the right sections?) rather than content.

The architecture uses a BaseGenerator pattern — each content type (blog, social, readme, marketing, docs) extends it with custom system prompts, token budgets, and output formatters. Adding a new content type is about 100 lines.

**What I'd love feedback on:**
- The template system uses Jinja2. Is that overkill? Would something simpler work?
- Brand voice profiles are stored as YAML. Better format suggestions?
- What content types should I add next?

GitHub: [link]

Happy to answer questions about the implementation.

---

## r/DevTools

### Title
Built a dev tool that generates 5 types of content from the CLI — blog posts, social threads, READMEs, marketing copy, and docs

### Body

I kept running into the same problem: I'd ship a feature and then spend 2-3x longer writing about it. Blog post, tweet thread, docs update, changelog, landing page copy — the "content tax" on shipping is brutal when you're a solo dev.

So I built AI Content Generator. It's a Python CLI that uses Claude AI to handle the writing while I handle the building.

**What I use it for daily:**

```bash
# After pushing a feature
ai-contentgen blog "New Feature: Real-time Webhooks" --tone announcement
ai-contentgen social twitter "Just shipped webhooks" --tweets 6

# Before a launch
ai-contentgen marketing landing-page "Developer Webhook Platform"
ai-contentgen marketing press-release "Launching v2.0"

# For new projects
ai-contentgen readme --analyze . --detail comprehensive
```

**The features that actually matter:**

- **Brand voice profiles**: I trained it on my writing style. Now everything it generates sounds like me, not a generic AI.
- **Bulk generation**: YAML manifest → 15 pieces of content in one command. This is the launch day superpower.
- **README analyzer**: Point it at a project directory. It reads the structure and generates docs that actually reflect what's in the code.

**The features I thought would matter but don't:**

- Multiple output formats (everyone just uses markdown)
- Verbose progress bars (people want speed, not animations)

**Pricing:** Free (5/day), Pro ($19/mo), Enterprise ($49/mo).

What's your content workflow look like? Curious if other devs feel the same pain or if I'm solving a problem only I have.

---

## r/SideProjects

### Title
From frustration to $19/mo SaaS: I built a CLI that writes your blog posts, docs, and marketing copy so you can keep coding

### Body

**The origin story:**

3 months ago I launched a side project. The code took 2 weeks. The marketing content took 3 weeks. Blog posts, landing page, social media, documentation, email sequences — I spent more time writing than building.

I'm a developer, not a copywriter. So I built a tool to fix this.

**AI Content Generator** is a Python CLI that generates 5 types of content:

1. Blog posts (technical, tutorial, announcement, listicle)
2. Social media (Twitter threads, LinkedIn, Mastodon)
3. README files (auto-analyzes your project structure)
4. Marketing copy (landing pages, emails, press releases, pitch decks)
5. Technical docs (API references, user guides, runbooks)

**Revenue model:**

| Tier | Price | Limit |
|------|-------|-------|
| Free | $0 | 5 generations/day |
| Pro | $19/mo | 100/day + templates + brand voice |
| Enterprise | $49/mo | Unlimited |

**What's working:**
- Developers actually want this. The README generator is the unexpected hit.
- The free tier drives adoption. Pro conversion is ~8% of active free users (early numbers).
- Brand voice profiles are the sticky feature — once someone trains it, they don't churn.

**What's not working:**
- Marketing the marketing tool is ironic and hard. "I use my tool to market my tool" doesn't inspire confidence (even though I do).
- Enterprise tier is too cheap. Nobody paying $49/mo expects "enterprise." Considering rebranding to "Team."
- Content quality for 2000+ word pieces needs work.

**Lessons for other side project builders:**

1. Build the tool you need, not the tool you think others need
2. CLI-first products have a smaller but more loyal audience than web apps
3. Freemium works when the free tier is genuinely useful, not crippled
4. Your first 10 users will tell you which feature is actually your product

Would love feedback from other side project folks. What would make this useful for your workflow?

**GitHub**: [link]
**Landing page**: [link]

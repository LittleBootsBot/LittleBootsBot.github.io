# Landing Page Copy — A/B Test Variants

---

## VARIANT A: Pain-First Approach

### Hero Section

**Headline:** Stop writing about your code. Start shipping it.

**Subheadline:** AI Content Generator is a Python CLI that produces blog posts, docs, social threads, and marketing copy from simple terminal commands. First draft in seconds, not hours.

**CTA:** `pip install ai-contentgen` — Free, no signup required

**Social proof line:** Used by [X] developers | [X] pieces of content generated

---

### Problem Section

**Header:** The content tax is killing your velocity

Every feature you ship needs:
- A blog post explaining it → **2-4 hours**
- A Twitter thread announcing it → **30-60 minutes**
- Updated documentation → **1-3 hours**
- Landing page copy → **2-4 hours**
- An email to your list → **1-2 hours**

**Total: 7-14 hours of writing per feature.**

That's more time writing than coding. And you're not even a writer.

---

### Solution Section

**Header:** One tool. Five content types. Seconds each.

```bash
ai-contentgen blog "Your Topic" --tone technical
ai-contentgen social twitter "Launch day" --tweets 8
ai-contentgen readme --analyze ./your-project
ai-contentgen marketing landing-page "Your Product"
ai-contentgen docs api-reference --analyze ./src/
```

**Feature cards:**

| Feature | Description |
|---------|-------------|
| Blog Posts | Technical articles, tutorials, announcements. Set the tone, set the length, get a draft. |
| Social Media | Platform-formatted threads for Twitter, LinkedIn, Mastodon. Not generic — actually structured for engagement. |
| README Generator | Analyzes your project structure. Generates docs that reflect your actual code, not a template. |
| Marketing Copy | Landing pages, email campaigns, press releases, pitch decks. Conversion-focused by default. |
| Technical Docs | API references, user guides, runbooks. Reads your source files for accuracy. |

---

### Differentiator Section

**Header:** Not another chatbot. A content workflow.

**Brand Voice Profiles**
Train it on your writing style once. Every piece sounds like you, not a robot. Stored as YAML, version-controlled with your code.

**Bulk Generation**
Define a YAML manifest. Generate your entire launch content kit in one command. Blog + threads + landing page + press release = 5 minutes.

**Custom Templates**
Jinja2-based templates for your specific formats. Investor updates, sprint retrospectives, release notes — if you write it repeatedly, templatize it.

---

### Pricing Section

**Header:** Start free. Upgrade when it saves you time.

| | Free | Pro | Enterprise |
|---|------|-----|-----------|
| Price | $0 | $19/mo | $49/mo |
| Daily generations | 5 | 100 | Unlimited |
| Content types | Blog, Social | All 5 | All 5 |
| Brand voice | — | 1 profile | Unlimited |
| Custom templates | — | 10 max | Unlimited |
| Bulk generation | — | 10 items | Unlimited |
| Support | Community | Community | Priority |

**CTA:** Get started free →

---

### Final CTA Section

**Header:** Your next feature deserves a blog post. Let's write it in 30 seconds.

```bash
pip install ai-contentgen
ai-contentgen blog "Why I Built [Your Feature]" --tone conversational
```

**CTA button:** Install now — it's free

---
---

## VARIANT B: Outcome-First Approach

### Hero Section

**Headline:** Generate your entire launch content kit from the terminal

**Subheadline:** Blog post. Twitter thread. Landing page. Docs. Email sequence. One CLI tool, five content types, powered by Claude AI.

**CTA:** Try it free → `pip install ai-contentgen`

**Social proof line:** Developers save an average of [X] hours per launch

---

### Demo Section (lead with the product, not the problem)

**Header:** See it in action

```bash
$ ai-contentgen blog "Building Real-Time Webhooks" --tone technical

✓ Generating blog post...
✓ Title: "Building Real-Time Webhooks: A Practical Guide"
✓ Length: 1,247 words
✓ Saved to: ./output/webhooks-blog.md

$ ai-contentgen social twitter "Just shipped webhooks" --tweets 6

✓ Generating Twitter thread...
✓ 6 tweets generated
✓ Saved to: ./output/webhooks-thread.md
```

**Two columns:**

**Without AI Content Generator**
- Write blog post: 3 hours
- Craft tweet thread: 45 min
- Update README: 1 hour
- Write landing copy: 2 hours
- Draft email sequence: 2 hours
- **Total: ~9 hours**

**With AI Content Generator**
- Generate blog draft: 30 seconds
- Generate tweet thread: 15 seconds
- Generate README: 20 seconds
- Generate landing copy: 30 seconds
- Generate email sequence: 45 seconds
- **Total: ~2.5 minutes + editing**

---

### Feature Spotlight Section

**Header:** Built for developers who'd rather ship than write

**Card 1: README Analyzer**
Point it at any project directory. It reads your file structure, understands the codebase, and generates documentation that actually matches your code. Not a generic template — real analysis.
```bash
ai-contentgen readme --analyze ./my-api --detail comprehensive
```

**Card 2: Brand Voice**
Your content should sound like you, not ChatGPT. Define your tone, preferred vocabulary, and writing style once. Every piece it generates stays on-brand.

**Card 3: Bulk Generation**
Launch day? Define everything you need in a YAML manifest. Blog + social + landing page + press release + emails. One command. Five minutes.

**Card 4: Custom Templates**
Jinja2-based templates for formats you use repeatedly. Weekly updates, release notes, sprint retros — templatize once, generate forever.

---

### Trust Section

**Header:** Open source. Transparent pricing. No lock-in.

- Source code on GitHub — read every line
- Uses your own Anthropic API key — no data middleman
- Export to Markdown, HTML, text, or JSON — your content, your format
- Cancel anytime, keep everything you generated

---

### Pricing Section

**Header:** Generous free tier. No credit card required.

| | Free | Pro | Enterprise |
|---|------|-----|-----------|
| | $0/mo | $19/mo | $49/mo |
| Generations/day | 5 | 100 | Unlimited |
| Content types | 2 | 5 | 5 |
| Brand voice | — | ✓ | ✓ |
| Templates | — | 10 | Unlimited |
| Bulk generation | — | ✓ | ✓ |

**CTA:** Start free — no signup required →

**Note below pricing:** Pro pays for itself if it saves you 1 hour of writing per month.

---

### Final CTA Section

**Header:** Install in 10 seconds. Generate your first content in 30.

```bash
pip install ai-contentgen
ai-contentgen blog "My First Post" --tone conversational
```

No account. No credit card. No browser.

**CTA button:** Get started →

---

## A/B Test Plan

| Element | Variant A | Variant B |
|---------|-----------|-----------|
| Approach | Pain-first (problem → solution) | Outcome-first (demo → results) |
| Hero focus | Emotional pain point | Product in action |
| Lead section | Problem stats | Live demo output |
| Tone | Empathetic, frustrated dev | Confident, show-don't-tell |
| Primary CTA | "Install now" | "Try it free" |

**Metrics to track:**
- Conversion rate (visitor → pip install)
- Time on page
- Scroll depth
- CTA click rate
- Bounce rate

**Test duration:** 2 weeks minimum, 1,000 visitors per variant minimum for statistical significance.

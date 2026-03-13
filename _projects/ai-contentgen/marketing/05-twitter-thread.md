# Twitter/X Launch Thread

---

## Tweet 1 (Hook)
I spent 3 weeks writing about a project that took 2 weeks to build.

Blog posts, landing pages, docs, social threads, email campaigns — the content tax on shipping is brutal.

So I built a CLI tool that handles it.

Introducing AI Content Generator. Here's what it does 🧵

---

## Tweet 2 (The Problem)
Every developer launch needs:

- Blog post ✍️
- Twitter thread 🐦
- README 📄
- Landing page 🌐
- API docs 📚
- Email sequence 📧

That's 20-40 hours of writing.

Most of us are builders, not copywriters. We either skip the content or burn out producing it.

---

## Tweet 3 (The Solution)
AI Content Generator is a Python CLI.

One tool. Five content types. Seconds per piece.

```
pip install ai-contentgen
ai-contentgen blog "Your Topic" --tone technical
ai-contentgen social twitter "Launch Day" --tweets 8
ai-contentgen readme --analyze ./project
```

That's it. Content in your terminal, ready to publish.

---

## Tweet 4 (Feature: README Analyzer)
The feature people love most: the README analyzer.

Point it at your project directory. It reads the file structure, understands the codebase, and generates docs that actually reflect your code.

```
ai-contentgen readme --analyze ./my-api --detail comprehensive
```

No more staring at a blank README.

---

## Tweet 5 (Feature: Brand Voice)
"But AI content sounds generic."

Not with brand voice profiles.

Train it on your writing style once. Every piece it generates sounds like you.

```yaml
tone: "conversational but precise"
vocabulary:
  prefer: ["ship", "build"]
  avoid: ["leverage", "synergy"]
```

One config. Consistent voice everywhere.

---

## Tweet 6 (Feature: Bulk Generation)
Launch day secret weapon: bulk generation.

Write a YAML manifest. Generate 15 pieces of content in one command.

Blog post + tweet thread + landing page + press release + email sequence = one `ai-contentgen bulk generate manifest.yaml`

That's your entire launch content in under 5 minutes.

---

## Tweet 7 (Honest Limitations)
Being honest about what it's NOT:

- Not a replacement for a human editor
- Long-form (2000+ words) can get repetitive
- You need your own Anthropic API key (~$0.01-0.05/generation)
- Garbage prompts = garbage output

It's a first draft machine. A very fast one.

---

## Tweet 8 (Who It's For)
Built for:

→ Solo founders who can't afford a content team
→ Dev teams shipping faster than they can document
→ Indie hackers who'd rather code than write marketing copy
→ Anyone who's ever stared at a blank blog post for 45 minutes

If you live in the terminal, this is your content workflow.

---

## Tweet 9 (Pricing)
Pricing:

Free — 5 generations/day (blog + social)
Pro — $19/mo for 100/day + all content types + brand voice + templates
Enterprise — $49/mo for unlimited everything

Free tier is genuinely useful, not a demo. Start there.

---

## Tweet 10 (Technical Credibility)
Tech stack for the curious:

- Python 3.9+
- Claude AI (Anthropic)
- Click CLI framework
- Rich for terminal UI
- Jinja2 custom templates
- tiktoken for token budgeting
- ~2,500 lines of Python
- ~75% test coverage

Open to contributions.

---

## Tweet 11 (CTA)
Try it now:

```
pip install ai-contentgen
```

GitHub: [link]
Docs: [link]

Free tier. No credit card. No signup wall.

If it saves you even one hour of writing this week, it's done its job.

What content type should I add next? Reply and tell me.

---

## Tweet 12 (Engagement Hook)
Challenge: reply with your project name and I'll show you what the README analyzer generates for it.

Serious offer. First 20 replies get a sample README generated live.

Let's go. 👇

---

## Scheduling Notes
- Post Tweet 1 at 9:00 AM ET (peak dev Twitter)
- Space tweets 10-15 minutes apart
- Pin the thread to profile for launch week
- Quote-tweet Tweet 1 with the Product Hunt link when it goes live
- Engage with every reply for the first 2 hours

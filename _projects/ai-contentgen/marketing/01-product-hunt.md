# Product Hunt Submission

## Tagline (60 chars max)
**Turn CLI commands into blog posts, docs, and marketing copy**

## One-liner
AI Content Generator is a Python CLI that uses Claude AI to produce blog posts, social media threads, README files, marketing copy, and technical docs from simple terminal commands.

## Description

### The Problem
You're a developer shipping a product. You need a landing page, a blog post, social threads, API docs, and a press release — yesterday. But you're a builder, not a copywriter. Hiring one costs thousands. ChatGPT copy-paste loops eat hours.

### The Solution
AI Content Generator is a single CLI tool that handles all of it. Run a command, get polished content in seconds.

```bash
pip install ai-contentgen
ai-contentgen blog "Why We Built a Faster Cache Layer" --tone technical --length long
ai-contentgen social twitter "Launching v2.0 today" --tweets 10
ai-contentgen readme --analyze ./my-project
ai-contentgen marketing landing-page "Developer Analytics Platform"
```

### What makes it different

- **5 content types, 1 tool**: Blog posts, social media, READMEs, marketing copy, technical docs
- **Brand voice profiles**: Train it once on your tone. Every piece sounds like you, not a robot.
- **Bulk generation**: Define a YAML manifest, generate 20 pieces in one batch
- **Custom templates**: Jinja2-based templates for repeatable formats your team actually uses
- **Developer-first**: Built for people who live in the terminal. No browser tabs, no drag-and-drop editors.

### Pricing
- **Free**: 5 generations/day (blog + social)
- **Pro ($19/mo)**: 100/day, all content types, brand voice, templates
- **Enterprise ($49/mo)**: Unlimited everything + priority support

### Tech
Python 3.9+ | Claude AI (Anthropic) | Click CLI | Rich terminal output | Jinja2 templates

---

## Maker Comment (first comment on the post)

Hey Product Hunt! I'm the maker of AI Content Generator.

I built this because I kept hitting the same wall: I'd finish building a feature, then spend 3x longer writing about it than actually coding it. Blog post, tweet thread, docs update, changelog — the content tax on shipping is real.

So I built a CLI tool that handles the writing while I handle the building.

A few things I'm proud of:
- The README generator actually analyzes your project structure before writing
- Brand voice profiles mean you train it once and everything sounds consistent
- Bulk generation via YAML manifests is a game-changer for launch days

It's not trying to replace great writing. It's trying to eliminate the 80% of content work that's formulaic so you can focus on the 20% that needs a human touch.

Would love your feedback. What content types would you want to see next?

---

## Assets Needed
- [ ] Logo (1240x600 gallery image)
- [ ] 4 gallery screenshots showing CLI output
- [ ] 30-second demo GIF
- [ ] Maker headshot
- [ ] Social proof: early user testimonials

## Launch Timing
- **Best days**: Tuesday, Wednesday, Thursday
- **Post at**: 12:01 AM PT (Product Hunt resets at midnight)
- **Hunter**: Recruit a top hunter 2 weeks before launch
- **Prep**: Have 50+ upvotes ready from community in first 2 hours

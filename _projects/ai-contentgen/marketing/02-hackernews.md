# Show HN: AI Content Generator — CLI tool that turns commands into blog posts, docs, and marketing copy

**URL**: https://github.com/littlebootsbot/ai-content-gen

---

## Post Text

I got tired of spending more time writing about features than building them. So I built a Python CLI that generates content using Claude AI.

**What it does:**

```
ai-contentgen blog "Building a Rate Limiter from Scratch" --tone technical
ai-contentgen readme --analyze ./my-project
ai-contentgen marketing email-campaign "Product Launch" --emails 3
ai-contentgen social twitter "Shipped dark mode" --tweets 8
ai-contentgen docs api-reference --analyze ./src/api/
```

Five content types: blog posts, social media, READMEs, marketing copy, and technical docs.

**Technical details:**

- Python 3.9+, built with Click for the CLI and Rich for terminal output
- Uses Anthropic's Claude API (claude-sonnet-4-6 by default)
- Jinja2 templating for custom content formats
- tiktoken for token counting and budget management
- Built-in rate limiting (30 calls/min) with usage tracking
- Brand voice profiles stored as YAML — train once, consistent output everywhere
- Bulk generation via YAML manifests for batch operations

**Architecture:**

The generator system uses a BaseGenerator class that each content type extends. Content types define their own system prompts, token limits, and output formatting. Adding a new content type is ~100 lines of Python.

Config lives in `~/.ai-content-gen/` as YAML. Templates use Jinja2 with variable substitution. Nothing fancy — it's intentionally simple.

**What I learned building it:**

1. Prompt engineering is 80% of the work. The actual API calls are trivial. Getting Claude to produce consistently useful output across different content types took weeks of iteration.

2. Brand voice profiles were harder than expected. You can't just say "write like this." You need to capture tone, vocabulary preferences, sentence structure patterns, and what to avoid.

3. The README analyzer that reads your project structure before generating docs was the feature people actually got excited about, not the marketing copy generator I thought would be the killer feature.

**Honest limitations:**

- Output quality depends on your prompts. Garbage in, garbage out still applies.
- Long-form content (2000+ words) can get repetitive. I chunk it but it's not perfect.
- You need your own Anthropic API key. Costs ~$0.01-0.05 per generation depending on length.
- Not a replacement for a human editor. It's a first draft machine.

**Pricing:** Free tier (5/day), Pro ($19/mo, 100/day), Enterprise ($49/mo, unlimited).

Built this as a solo developer. Feedback welcome — especially on what content types to add next. Changelog entries? Investor updates? Git commit messages?

---

## Pre-written responses to likely HN comments

### "Why not just use ChatGPT/Claude directly?"
You can. This tool is for people who want repeatable, consistent output without copy-pasting prompts. Brand voice profiles, custom templates, and bulk generation are the differentiators. If you generate content once a month, this isn't for you. If you generate it daily, the workflow savings add up.

### "Why charge for a wrapper around an API?"
Fair question. The value isn't the API call — it's the prompt engineering, template system, brand voice training, and workflow automation. You're paying $19/mo to not spend hours tuning prompts yourself. Same reason people pay for Copilot instead of calling the OpenAI API directly.

### "What about hallucinations?"
It's a content generator, not a fact checker. Blog post structure, marketing frameworks, social media formatting — these are pattern-matching tasks where Claude excels. If you're generating a technical blog post, you should still review the technical claims. The tool handles the writing; you handle the truth.

### "Why Python CLI and not a web app?"
Because the target audience (developers) lives in the terminal. A web app means context switching. A CLI means you generate content in the same window where you just pushed code. Web version might come later, but CLI-first is intentional.

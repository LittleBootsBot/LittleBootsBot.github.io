---
title: "I Built a CLI That Writes My Blog Posts, Docs, and Marketing Copy — Here's What I Learned"
published: true
description: "How I built AI Content Generator: a Python CLI that uses Claude AI to produce 5 types of content. Lessons on prompt engineering, CLI design, and building developer tools."
tags: python, ai, cli, productivity
cover_image: # TODO: Add cover image URL
canonical_url: # TODO: Add canonical URL
---

## The Problem That Started It All

I shipped a side project in January. The code took two weeks. Then I sat down to write about it.

- Blog post announcing the launch
- Twitter thread with a hook
- README that didn't embarrass me
- Landing page copy
- 3-email drip sequence for the waitlist
- API documentation

Three weeks later, I still wasn't done writing. I'd spent more time on content than on code.

I'm a developer. I build things in the terminal. So I built a terminal tool that builds content.

## What AI Content Generator Does

It's a Python CLI that uses Claude AI to generate content from simple commands:

```bash
# A technical blog post
ai-contentgen blog "Building Rate Limiters with Redis" --tone technical --length long

# A Twitter launch thread
ai-contentgen social twitter "Launching AI Content Generator" --tweets 10

# README by analyzing your project
ai-contentgen readme --analyze ./my-project --detail comprehensive

# Full landing page copy
ai-contentgen marketing landing-page "Developer Content Tool"

# API reference docs
ai-contentgen docs api-reference --analyze ./src/api/
```

Five content types. One tool. Output in markdown, HTML, plain text, or JSON.

## The Architecture

I wanted this to be dead simple to extend. Here's the core pattern:

```python
class BaseGenerator:
    """Every content type extends this."""

    def __init__(self, client, config):
        self.client = client  # Anthropic API client
        self.config = config

    @property
    def system_prompt(self) -> str:
        """Each generator defines its own system prompt."""
        raise NotImplementedError

    @property
    def max_tokens(self) -> int:
        """Token budget per content type."""
        raise NotImplementedError

    def generate(self, topic: str, **kwargs) -> str:
        """Build the prompt, call Claude, format output."""
        prompt = self.build_prompt(topic, **kwargs)
        response = self.client.messages.create(
            model=self.config.model,
            max_tokens=self.max_tokens,
            system=self.system_prompt,
            messages=[{"role": "user", "content": prompt}]
        )
        return self.format_output(response)

    def build_prompt(self, topic, **kwargs) -> str:
        raise NotImplementedError

    def format_output(self, response) -> str:
        raise NotImplementedError
```

Each content type (BlogGenerator, SocialGenerator, ReadmeGenerator, MarketingGenerator, DocsGenerator) implements its own prompts, formatting, and options. Adding a new content type is ~100 lines.

### Brand Voice Profiles

This was the hardest feature to build. Stored as YAML:

```yaml
name: "my-brand"
tone: "conversational but technically precise"
values:
  - clarity over cleverness
  - show don't tell
  - respect the reader's time
vocabulary:
  prefer: ["ship", "build", "craft"]
  avoid: ["leverage", "synergy", "disrupt"]
sentence_style: "short and direct. vary length for rhythm."
```

The profile gets injected into every system prompt. Getting this to produce consistently voiced output took weeks of prompt iteration.

### Bulk Generation

The feature nobody asked for but everyone uses:

```yaml
# manifest.yaml
project: "My SaaS Launch"
pieces:
  - type: blog
    topic: "Why We Built This"
    tone: technical
  - type: social
    platform: twitter
    topic: "Launch day"
    tweets: 8
  - type: marketing
    subtype: landing-page
    topic: "Developer Analytics Platform"
  - type: marketing
    subtype: press-release
    topic: "Launching v1.0"
```

```bash
ai-contentgen bulk generate manifest.yaml
# → Generates all 4 pieces, respecting rate limits
```

## 5 Things I Learned Building This

### 1. Prompt Engineering Is the Real Product

The API call is 10 lines of code. The prompt engineering is 10 weeks of work.

Every content type needs:
- A system prompt that establishes format, tone, and constraints
- Few-shot examples for edge cases
- Guardrails against common failure modes (repetition, generic intros, filler)
- Token budget tuning (too low = truncated, too high = rambling)

I have a `prompts/` directory with more lines than my `generators/` directory. That's where the value lives.

### 2. Testing AI Output Is a Different Discipline

You can't `assert output == expected`. The output is non-deterministic by design.

What you *can* test:
- **Structure**: Does a blog post have a title, introduction, body sections, and conclusion?
- **Format**: Is the output valid markdown? Does the HTML render?
- **Constraints**: Is it within the token budget? Does it include required sections?
- **Negative tests**: Does it refuse to generate harmful content?

```python
def test_blog_has_required_sections():
    output = blog_generator.generate("Test Topic")
    assert "# " in output  # Has a title
    assert output.count("## ") >= 2  # Has subsections
    assert len(output.split()) > 200  # Minimum length
```

I wrote ~40 structural tests. Zero content assertion tests.

### 3. The Feature You Think Is Your Product Usually Isn't

I built this for the marketing copy generator. Landing pages, email campaigns, press releases — that's what *I* needed.

But the feature people actually get excited about? The README analyzer. Point it at a project directory, it reads the structure, and generates documentation that reflects the actual code. Developers light up when they see it.

**Lesson**: Ship fast, watch what people use, then double down on that.

### 4. CLI Design Is UX Design

Terminal tools need UX thinking just like web apps.

Things that matter:
- **Progressive disclosure**: `ai-contentgen blog "Topic"` works with zero config. Advanced options are there but not required.
- **Feedback**: Rich library gives you progress bars, colored output, formatted tables. Don't dump raw text.
- **Error messages**: "Invalid API key" is better than a stack trace. "Rate limit exceeded, retry in 32s" is better than a 429 error.
- **Defaults that work**: The default tone, length, and format should produce usable output. Users customize later.

### 5. Rate Limiting Should Be a Day-One Concern

I added rate limiting in week 3. Mistake. By then, my architecture assumed unlimited API calls, and bolting on limits required touching every generator.

If you're building anything that calls an external API:
1. Design for rate limits from the start
2. Track usage per user, per day, per content type
3. Give clear feedback when limits are hit
4. Make the limits configurable (different tiers, different limits)

## The Numbers (Early Days)

- **Development time**: ~3 months part-time
- **Lines of Python**: ~2,500
- **Test coverage**: ~75%
- **API cost per generation**: $0.01-0.05 depending on content length
- **Free tier users**: Growing (exact numbers TBD)
- **Pro conversion rate**: ~8% of active free users

## What's Next

1. **More content types**: Changelog entries, investor updates, release notes
2. **LLM abstraction**: Support for OpenAI, local models via Ollama
3. **Web interface**: For non-CLI users (but CLI stays first-class)
4. **Team features**: Shared templates, shared brand voices, usage analytics
5. **VS Code extension**: Generate content without leaving the editor

## Try It

```bash
pip install ai-contentgen
ai-contentgen --help
```

Free tier gives you 5 generations per day. No credit card required.

**GitHub**: [link]
**Docs**: [link]

---

*If you're a developer who spends too much time writing about what you build instead of building, give it a try. And if you have feedback, open an issue — I read every one.*

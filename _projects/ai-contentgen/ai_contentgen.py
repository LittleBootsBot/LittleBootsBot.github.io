#!/usr/bin/env python3
"""
AI Content Generator CLI Tool
Professional content generation for developers and entrepreneurs
"""

import click
import json
import os
import sys
from datetime import datetime
from pathlib import Path
import textwrap

# Configuration file location
CONFIG_FILE = os.path.expanduser("~/.ai-contentgen/config.json")
USAGE_FILE = os.path.expanduser("~/.ai-contentgen/usage.json")

# Default configuration
DEFAULT_CONFIG = {
    "brand_voice": "professional",
    "default_language": "en",
    "user_tier": "free",
    "daily_limit": 5,
    "api_key": ""
}

def ensure_config_dir():
    """Ensure configuration directory exists"""
    os.makedirs(os.path.dirname(CONFIG_FILE), exist_ok=True)

def load_config():
    """Load user configuration"""
    ensure_config_dir()
    if not os.path.exists(CONFIG_FILE):
        save_config(DEFAULT_CONFIG)
        return DEFAULT_CONFIG
    
    with open(CONFIG_FILE, 'r') as f:
        return json.load(f)

def save_config(config):
    """Save user configuration"""
    ensure_config_dir()
    with open(CONFIG_FILE, 'w') as f:
        json.dump(config, f, indent=2)

def load_usage():
    """Load usage tracking"""
    ensure_config_dir()
    if not os.path.exists(USAGE_FILE):
        return {"date": str(datetime.now().date()), "count": 0}
    
    with open(USAGE_FILE, 'r') as f:
        usage = json.load(f)
        
    # Reset count if it's a new day
    today = str(datetime.now().date())
    if usage.get("date") != today:
        usage = {"date": today, "count": 0}
        save_usage(usage)
    
    return usage

def save_usage(usage):
    """Save usage tracking"""
    ensure_config_dir()
    with open(USAGE_FILE, 'w') as f:
        json.dump(usage, f, indent=2)

def check_usage_limit():
    """Check if user has exceeded daily limit"""
    config = load_config()
    usage = load_usage()
    
    if config["user_tier"] == "free" and usage["count"] >= config["daily_limit"]:
        click.echo("🚫 Daily limit reached. Upgrade to Pro for unlimited generations.")
        click.echo("Visit: https://littlebootsbot.github.io/pricing")
        return False
    
    return True

def increment_usage():
    """Increment usage counter"""
    usage = load_usage()
    usage["count"] += 1
    save_usage(usage)

@click.group()
@click.version_option(version="1.0.0", prog_name="ai-contentgen")
def cli():
    """🤖 AI Content Generator - Professional content for developers and entrepreneurs"""
    pass

@cli.command()
@click.option('--topic', required=True, help='Blog post topic')
@click.option('--keywords', help='SEO keywords (comma-separated)')
@click.option('--length', default='medium', type=click.Choice(['short', 'medium', 'long']), help='Post length')
@click.option('--tone', default='professional', type=click.Choice(['professional', 'casual', 'technical', 'friendly']), help='Writing tone')
@click.option('--output', '-o', help='Output file path')
def blog(topic, keywords, length, tone, output):
    """Generate SEO-optimized blog posts"""
    if not check_usage_limit():
        return
    
    click.echo(f"🚀 Generating blog post: {topic}")
    
    # Word count based on length
    word_counts = {'short': 500, 'medium': 1000, 'long': 2000}
    target_words = word_counts[length]
    
    # Generate content (placeholder - in real version, this would use AI API)
    content = generate_blog_content(topic, keywords, target_words, tone)
    
    if output:
        with open(output, 'w') as f:
            f.write(content)
        click.echo(f"✅ Blog post saved to: {output}")
    else:
        click.echo(content)
    
    increment_usage()

@cli.command()
@click.option('--topic', required=True, help='Thread topic')
@click.option('--tweets', default=5, type=int, help='Number of tweets in thread')
@click.option('--platform', default='twitter', type=click.Choice(['twitter', 'linkedin']), help='Platform optimization')
@click.option('--output', '-o', help='Output file path')
def thread(topic, tweets, platform, output):
    """Generate social media threads"""
    if not check_usage_limit():
        return
    
    click.echo(f"🧵 Generating {tweets}-tweet thread about: {topic}")
    
    content = generate_thread_content(topic, tweets, platform)
    
    if output:
        with open(output, 'w') as f:
            f.write(content)
        click.echo(f"✅ Thread saved to: {output}")
    else:
        click.echo(content)
    
    increment_usage()

@cli.command()
@click.option('--project', required=True, help='Project name')
@click.option('--description', required=True, help='Project description')
@click.option('--language', default='python', help='Programming language')
@click.option('--license', default='MIT', help='License type')
@click.option('--output', '-o', default='README.md', help='Output file path')
def readme(project, description, language, license, output):
    """Generate professional README files"""
    if not check_usage_limit():
        return
    
    click.echo(f"📝 Generating README for: {project}")
    
    content = generate_readme_content(project, description, language, license)
    
    with open(output, 'w') as f:
        f.write(content)
    click.echo(f"✅ README saved to: {output}")
    
    increment_usage()

@cli.command()
@click.option('--product', required=True, help='Product name')
@click.option('--audience', required=True, help='Target audience')
@click.option('--benefit', required=True, help='Main benefit')
@click.option('--type', default='landing', type=click.Choice(['landing', 'email', 'ad']), help='Copy type')
@click.option('--output', '-o', help='Output file path')
def copy(product, audience, benefit, type, output):
    """Generate marketing copy"""
    if not check_usage_limit():
        return
    
    click.echo(f"📢 Generating {type} copy for: {product}")
    
    content = generate_marketing_copy(product, audience, benefit, type)
    
    if output:
        with open(output, 'w') as f:
            f.write(content)
        click.echo(f"✅ Copy saved to: {output}")
    else:
        click.echo(content)
    
    increment_usage()

@cli.command()
def status():
    """Show usage status and configuration"""
    config = load_config()
    usage = load_usage()
    
    click.echo("📊 AI Content Generator Status")
    click.echo("=" * 30)
    click.echo(f"Tier: {config['user_tier'].title()}")
    click.echo(f"Daily Usage: {usage['count']}/{config['daily_limit'] if config['user_tier'] == 'free' else 'Unlimited'}")
    click.echo(f"Brand Voice: {config['brand_voice'].title()}")
    click.echo()
    
    if config['user_tier'] == 'free':
        remaining = config['daily_limit'] - usage['count']
        if remaining > 0:
            click.echo(f"✅ {remaining} generations remaining today")
        else:
            click.echo("🚫 Daily limit reached")
            click.echo("💎 Upgrade to Pro: https://littlebootsbot.github.io/pricing")

@cli.command()
@click.option('--tier', type=click.Choice(['free', 'pro', 'enterprise']), help='User tier')
@click.option('--voice', type=click.Choice(['professional', 'casual', 'technical', 'friendly']), help='Brand voice')
def config(tier, voice):
    """Configure AI Content Generator settings"""
    current_config = load_config()
    
    if tier:
        current_config['user_tier'] = tier
        click.echo(f"✅ Tier updated to: {tier}")
    
    if voice:
        current_config['brand_voice'] = voice
        click.echo(f"✅ Brand voice updated to: {voice}")
    
    if tier or voice:
        save_config(current_config)
    else:
        # Show current config
        click.echo("⚙️  Current Configuration")
        click.echo("=" * 25)
        for key, value in current_config.items():
            if key != 'api_key':  # Don't show API key
                click.echo(f"{key.replace('_', ' ').title()}: {value}")

# Content generation functions (placeholders for now)
def generate_blog_content(topic, keywords, word_count, tone):
    """Generate blog post content"""
    return f"""# {topic}

*Generated by AI Content Generator - Professional content for developers and entrepreneurs*

## Introduction

{topic} is becoming increasingly important in today's digital landscape. This comprehensive guide will walk you through everything you need to know to succeed.

## Key Points

- **Strategic Approach**: Understanding the fundamentals
- **Implementation**: Practical steps to get started  
- **Best Practices**: Tips from industry experts
- **Common Pitfalls**: What to avoid

## Getting Started

The first step in {topic.lower()} is to establish a clear strategy. Here's how to begin:

1. **Research and Planning**: Understand your goals
2. **Tool Selection**: Choose the right technologies
3. **Implementation**: Start with a minimum viable approach
4. **Iteration**: Continuously improve based on feedback

## Advanced Techniques

Once you've mastered the basics, these advanced strategies will help you excel:

- **Automation**: Streamline repetitive tasks
- **Analytics**: Measure and optimize performance
- **Scaling**: Grow your approach systematically

## Conclusion

{topic} success requires consistent effort and strategic thinking. By following the frameworks outlined in this guide, you'll be well on your way to achieving your goals.

---

*Want more content like this? Try AI Content Generator Pro for unlimited generations and custom templates.*

**Target Keywords**: {keywords or 'SEO optimized'}
**Word Count**: ~{word_count} words  
**Tone**: {tone.title()}"""

def generate_thread_content(topic, tweet_count, platform):
    """Generate social media thread"""
    threads = []
    
    threads.append(f"🧵 Thread about {topic} ({tweet_count} tweets)")
    threads.append(f"1/{tweet_count}: {topic} is more important than ever. Here's what you need to know:")
    
    for i in range(2, tweet_count):
        threads.append(f"{i}/{tweet_count}: Key insight #{i-1} about {topic.lower()} - this changes everything.")
    
    threads.append(f"{tweet_count}/{tweet_count}: That's a wrap! What's your experience with {topic.lower()}? Drop a comment below 👇")
    
    if platform == 'twitter':
        return '\n---\n'.join(threads)
    else:
        return '\n\n'.join(threads)

def generate_readme_content(project, description, language, license):
    """Generate README content"""
    return f"""# {project}

{description}

## 🚀 Features

- **Easy to use**: Simple and intuitive interface
- **Powerful**: Advanced functionality for {language} projects
- **Well documented**: Comprehensive guides and examples
- **Open source**: {license} licensed

## 📦 Installation

```bash
# Install from PyPI
pip install {project.lower().replace(' ', '-')}

# Or install from source
git clone https://github.com/yourusername/{project.lower().replace(' ', '-')}.git
cd {project.lower().replace(' ', '-')}
pip install -e .
```

## 🔧 Usage

```{language}
# Basic example
from {project.lower().replace(' ', '_')} import main

# Your code here
result = main.process()
print(result)
```

## 📚 Documentation

Visit our [documentation](https://yourusername.github.io/{project.lower().replace(' ', '-')}) for detailed guides and API reference.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the {license} License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Thanks to all contributors
- Built with ❤️ for the {language} community

---

*Generated by AI Content Generator - Professional README files in seconds*"""

def generate_marketing_copy(product, audience, benefit, copy_type):
    """Generate marketing copy"""
    if copy_type == 'landing':
        return f"""# {product} - {benefit}

## For {audience.title()} Who Want Results

**{product}** is the solution you've been looking for. Finally, a tool that understands what {audience} really need.

### ✨ Key Benefits

- **Save Time**: Get results in minutes, not hours
- **Professional Quality**: Enterprise-grade output every time
- **Easy to Use**: No learning curve required
- **Proven Results**: Join thousands of satisfied users

### 🎯 Perfect For

{audience.title()} who are tired of:
- Wasting time on manual work
- Settling for mediocre results  
- Paying too much for basic tools
- Complex solutions that don't work

### 💎 Get Started Today

Ready to experience {benefit}? Join the revolution.

**[Start Free Trial →]**

*No credit card required. Cancel anytime.*

---

*Trusted by 10,000+ {audience} worldwide*"""
    
    elif copy_type == 'email':
        return f"""Subject: Finally - {benefit} for {audience}

Hi there!

Tired of the same old problems with {product.lower()}? 

I get it. As a {audience.rstrip('s')}, you need something that actually works.

That's why I built {product} - specifically for {audience} like you who want {benefit.lower()}.

Here's what makes it different:

→ Results in minutes, not hours
→ Professional quality every time  
→ No technical skills required
→ Money-back guarantee

Want to see it in action?

**[Watch 2-Minute Demo →]**

Best,
[Your name]

P.S. Limited time: Get 50% off your first month. Code: SAVE50"""
    
    else:  # ad copy
        return f"""🎯 **{product}** - {benefit}

For {audience} who want results without the hassle.

✅ Works in minutes
✅ Professional quality  
✅ Easy to use
✅ Money-back guarantee

Join 10,000+ satisfied customers.

**[Start Free Trial →]**

*No credit card required*"""

if __name__ == '__main__':
    cli()
#!/usr/bin/env python3
"""
Setup script for AI Content Generator CLI tool
"""

from setuptools import setup, find_packages
import os

# Read README for long description
def read_readme():
    with open("README.md", "r", encoding="utf-8") as fh:
        return fh.read()

setup(
    name="ai-contentgen",
    version="1.0.0",
    author="Little Boots",
    author_email="littleboots@littlebootsbot.github.io",
    description="Professional AI-powered content generation for developers and entrepreneurs",
    long_description=read_readme(),
    long_description_content_type="text/markdown",
    url="https://github.com/littlebootsbot/ai-contentgen",
    packages=find_packages(),
    py_modules=["ai_contentgen"],
    classifiers=[
        "Development Status :: 5 - Production/Stable",
        "Intended Audience :: Developers",
        "Intended Audience :: End Users/Desktop",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
        "Programming Language :: Python :: 3.11",
        "Topic :: Software Development :: Libraries :: Python Modules",
        "Topic :: Text Processing",
        "Topic :: Internet :: WWW/HTTP :: Dynamic Content",
        "Topic :: Office/Business",
    ],
    python_requires=">=3.8",
    install_requires=[
        "click>=8.0.0",
    ],
    entry_points={
        "console_scripts": [
            "ai-contentgen=ai_contentgen:cli",
        ],
    },
    keywords="ai, content, generation, cli, automation, marketing, blog, social media",
    project_urls={
        "Bug Reports": "https://github.com/littlebootsbot/ai-contentgen/issues",
        "Source": "https://github.com/littlebootsbot/ai-contentgen",
        "Documentation": "https://littlebootsbot.github.io/ai-contentgen",
        "Pricing": "https://littlebootsbot.github.io/pricing",
    },
)
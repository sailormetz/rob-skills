#!/usr/bin/env python3
"""
Count characters per slide in a carousel script markdown file.
Strips all markup (HTML spans, color tags, section tags) and counts
raw text + whitespace per slide.

Usage: python3 count_chars.py <path_to_carousel_script.md>

Output: JSON array of { slide, chars, over } objects.
Exit code 0 = all slides pass, 1 = at least one slide over limit.
"""

import re
import sys
import json

CHAR_LIMIT = 400


def strip_markup(text: str) -> str:
    """Remove all carousel markup, leaving only readable text + whitespace."""
    # Remove <sectionLabel>...</sectionLabel>
    text = re.sub(r'<sectionLabel>.*?</sectionLabel>', '', text)
    # Remove <topicName>...</topicName> tags but keep inner text
    text = re.sub(r'</?topicName>', '', text)
    # Remove color tags: [blue: text] → text
    text = re.sub(r'\[(blue|amber|green|coral|lavender):\s*', '', text)
    # Remove the closing ] from color tags (match lone ] not part of markdown)
    # We need to be careful — after removing [color: prefix, the ] remains
    text = re.sub(r'\](?!\()', '', text)
    # Remove bold/italic markdown markers
    text = re.sub(r'\*+', '', text)
    # Remove any remaining HTML tags (e.g. <span>, </span>, <em>, etc.)
    text = re.sub(r'<[^>]+>', '', text)
    return text


def parse_slides(script_text: str) -> list:
    """Split script into slides on [N] markers. Returns list of raw slide texts."""
    # Split on slide markers like [1], [2], etc.
    parts = re.split(r'^\[(\d+)\]', script_text, flags=re.MULTILINE)
    # parts[0] is before first marker (empty/whitespace), then alternating: number, content
    slides = []
    i = 1
    while i < len(parts) - 1:
        slide_num = int(parts[i])
        slide_text = parts[i + 1]
        slides.append((slide_num, slide_text))
        i += 2
    return slides


def count_slide_chars(slide_text: str) -> int:
    """Strip markup, normalize whitespace (collapse runs, strip leading/trailing), count chars."""
    clean = strip_markup(slide_text)
    # Normalize: collapse all whitespace runs to single space, strip ends
    clean = ' '.join(clean.split())
    return len(clean)


def main():
    if len(sys.argv) < 2:
        print("Usage: python3 count_chars.py <carousel_script.md>", file=sys.stderr)
        sys.exit(2)

    script_path = sys.argv[1]
    with open(script_path, 'r') as f:
        script_text = f.read()

    slides = parse_slides(script_text)
    results = []
    any_over = False

    for slide_num, slide_text in slides:
        chars = count_slide_chars(slide_text)
        over = chars - CHAR_LIMIT if chars > CHAR_LIMIT else 0
        results.append({
            "slide": slide_num,
            "chars": chars,
            "over": over
        })
        if over > 0:
            any_over = True

    print(json.dumps(results, indent=2))
    sys.exit(1 if any_over else 0)


if __name__ == '__main__':
    main()

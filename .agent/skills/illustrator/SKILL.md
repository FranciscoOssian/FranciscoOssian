---
name: illustrator
description: A context-aware brand illustration system using Google Imagen 4.0. It discovers branding from the current project to generate visual assets. Supports specific aspect ratios: 1:1, 9:16, 16:9, 4:3, 3:4. Focuses exclusively on image creation.
license: MIT
metadata:
  author: Francisco Ossian
  version: "2.1"
---

# Illustrator

Brand-consistent image generation via Google Imagen 4.0. It discovers project mood (CSS, configs) to ensure visual harmony.

## Usage Triggers
- Generating images matching project UI/UX.
- Creating assets for landing pages, blogs, or components.

## Workflow
1. **Discovery**: Inspect `tailwind.config`, CSS variables (`--primary`), and existing assets for "vibe" (glassmorphism, vintage, flat).
2. **Alignment**: Clarify Theme (e.g., "Cyberpunk"), Context (Hero, Icon), and Metaphor.
3. **Execution**: Run generation script.
   ```bash
   python .ai/skills/illustrator/scripts/generate.py --prompt "[PROMPT]" --aspect_ratio "[1:1|9:16|16:9|4:3|3:4]" --output "assets/[NAME].jpg"
   ```
4. **Handover**: Use `uploader` to move assets if needed.

## Directory Structure
- See [Implementation logic for image generation](scripts/generate.py)
- See [General design principles](references/GENERAL_PRINCIPLES.md)
- See [Temporary local cache for generated images](assets/)

## Constraints
- **Discovery First**: Never assume a color palette; always try to discover it.

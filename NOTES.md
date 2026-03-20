# Future Feature: Team Group Picture

## The Idea
After individuals generate their AI selves, there's a shared "wall" or "group photo" where people from the same team can see all their characters together — a team personality portrait.

## How it could work
- Each character is fully encoded in URL params (`?c=3&e=1&a=1`) — shareable with no backend
- A `/group` page accepts multiple character param sets: `?chars=3-1-1,7-0-0,1-4-1,...`
- It renders all characters together in a grid or playful arrangement
- Could be seeded by a team lead who collects everyone's share links and combines them

## Why it's interesting
- Zero backend needed (all state in URL)
- Natural team ritual: "do the quiz, share your character, see your team"
- Group picture creates a social artifact — feels different from an individual result

## What to build
1. `/group.html` — accepts `chars` param, renders a grid of SVG blobs
2. Character name tags (color name) under each blob
3. "Add yourself" CTA that generates a new URL with your character appended
4. Export as image (html-to-canvas or just screenshot guidance)

## Build priority: after core quiz is working and deployed

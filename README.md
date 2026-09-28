# SimpleNews — Modern Accessible News Portal

A clean, distraction-free digital newspaper built for learners, avid readers, and anyone seeking concise, beginner-friendly journalism.

Published by **SimpleNews Media Group**.

---

## Key Features

### 1. Adaptive Reading Levels
Toggle between **Easy** and **Standard** reading modes.

- **Easy Mode** — simplified explanations for beginners and learners.
- **Standard Mode** — more detailed and in-depth coverage.

### 2. Adjustable Text Sizing
Dynamic typography controls for improved accessibility.

- Normal
- Large

### 3. Distraction-Free Reader
A focused article reading experience through a dedicated reader modal.

Features include:

- Clean article layout
- Vocabulary breakdown
- Highlighted key terms
- Focused reading experience

### 4. Word of the Day
Build your vocabulary with a daily curated word featuring:

- Word pronunciation
- Phonetics
- Definition
- Contextual usage example

### 5. Instant Search & Category Filtering
Search and filter news in real time across:

- Article titles
- Summaries
- Key terms
- Topics

Available categories:

- Science
- Technology
- World
- Health
- Environment

### 6. Personal Reading List
Save interesting articles for later reading.

- Bookmark articles
- Persistent localStorage storage
- Access saved articles across sessions
- Offline-friendly reading list

### 7. Resilient Media Architecture
Editorial photography with reliable fallback handling.

- High-resolution editorial images
- Automatic SVG fallback
- Prevents broken image layouts
- Consistent visual presentation

### 8. Professional Editorial UI
A clean, accessible interface designed around distraction-free reading.

- Zero-emoji professional interface
- Lucide SVG icons
- Subtle animations
- Editorial newsprint-inspired color palette
- Responsive design

---

## Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 15** | React framework with App Router |
| **TypeScript** | Type-safe development |
| **Tailwind CSS** | Styling and responsive UI |
| **Lucide React** | Interface icons |
| **React 19 Hooks** | State and UI management |
| **localStorage** | Persistent bookmarks and reading list |

### React Hooks Used

- `useState`
- `useEffect`
- `useMemo`

---

## Project Structure

```text
simple-news/
├── public/
│   └── images/
│       └── # Local editorial photo assets
│
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components/
│   │   ├── AboutModal.tsx
│   │   ├── ArticleCard.tsx
│   │   ├── ArticleModal.tsx
│   │   ├── CategoryNav.tsx
│   │   ├── FeaturedArticle.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   └── WordOfTheDay.tsx
│   │
│   ├── data/
│   │   └── newsData.ts
│   │
│   └── types.ts
│
├── .env.example
├── .gitignore
├── next.config.mjs
├── package.json
├── postcss.config.mjs
└── tsconfig.json
# Frontend Development Plan

This document outlines the plan for overhauling the frontend of the Kontext application. The goal is to create a modern, dark-themed, and user-friendly interface with a focus on a great reading experience.

## Phase 1: Foundation & Core Layout

-   [x] **Global Styling & Dark Theme:**
    -   [x] Enforce a dark theme as the default and primary theme using `next-themes`.
    -   [x] Update `src/app/globals.css` with a dark color palette and base styles.
    -   [x] Adopt a "dark-first" approach for all new components.

-   [x] **Create `components` Directory:**
    -   [x] Create a `src/components` directory for all reusable UI components.

-   [x] **Glassmorphism Sticky Navbar:**
    -   [x] Design and build a new `Navbar` component.
    -   [x] Implement `sticky` positioning.
    -   [x] Apply a "glassmorphism" effect with `backdrop-blur`.
    -   [x] Include logo, navigation links, and a login button.

-   [x] **Modern Footer:**
    -   [x] Create a `Footer` component.
    -   [x] Include essential links, copyright info, and social media icons.

-   [x] **Update Main Layout:**
    -   [x] Integrate the new `Navbar` and `Footer` into `src/app/layout.tsx`.

## Phase 2: Page Redesigns

-   [x] **New Landing Page (`/`):**
    -   [x] Redesign the homepage with a "hero" section and a clear CTA.
    -   [x] Add a section for "Featured" or "Latest" articles.

-   [x] **Dedicated News Feed Page (`/news`):**
    -   [x] Move the news browsing functionality to a `/news` route.
    -   [x] Redesign article cards to be more visually appealing with rounded corners and hover effects.

-   [x] **Enhanced Article Reading Page (`/news/[id]`):**
    -   [x] Redesign the article detail page for an optimal reading experience.
    -   [x] Improve typography and layout for readability.
    -   [x] Redesign and reposition bookmark and share buttons.
    -   [x] Add smooth animations using `framer-motion`.

## Phase 3: UI/UX Enhancements

-   [x] **Animations & Transitions:**
    -   [x] Use `framer-motion` for page transitions and micro-interactions.

-   [x] **Skeleton Loaders:**
    -   [x] Implement skeleton loading screens for a better data fetching experience.

-   [x] **Consistent Rounded Design:**
    -   [x] Ensure all elements use rounded corners for a soft, modern aesthetic.

## Phase 4: Content & UI Polish

-   [x] **Refine Generation Prompts:**
    -   [x] Removed conversational "call-to-action" phrases from AI generation prompts to ensure a more professional tone.
    -   [x] Rewrote prompts to encourage more varied and structured markdown, including lists and blockquotes.
    -   [x] Added instructions to include relevant emojis to add personality and visual appeal.

-   [x] **Improve Article Readability:**
    -   [x] Fixed paragraph spacing issues in generated articles by customizing `ReactMarkdown` rendering to add bottom margins.
    -   [x] Added custom styling to `globals.css` for markdown elements to improve visual hierarchy and appeal.

-   [x] **Integrate Icons:**
    -   [x] Added `lucide-react` icons for author and date information on the article page to improve visual context.
    -   [x] Ensured consistent use of icons for actions like bookmarking and sharing.

## Phase 5: Major UI/UX & Performance Refactor

-   [x] **UI Refresh: Flat, Modern, & Animated:**
    -   [x] Systematically removed all gradient styles in favor of a clean, flat design.
    -   [x] Heavily integrated `framer-motion` for fluid page transitions, staggered list animations, and engaging micro-interactions.
    -   [x] Enhanced the UI with a more pervasive and creative use of `lucide-react` icons.

-   [x] **Total Responsiveness:**
    -   [x] Reviewed and ensured every page and component is fully responsive and intuitive on all screen sizes.

## Phase 6: Advanced Data Fetching & Optimization

-   [x] **Modernized TanStack Query Implementation:**
    -   [x] Researched and implemented the latest TanStack Query v5 patterns for the Next.js App Router.
    -   [x] Created a singleton `QueryClient` to ensure a consistent cache instance across the application.
    -   [x] Refactored data fetching to use a server-first approach with `HydrationBoundary`, pre-fetching data on the server and passing it to client components.
    -   [x] Installed and configured `@tanstack/react-query-devtools` for debugging and cache inspection.
    -   [x] Optimized component rendering with `React.memo` to prevent unnecessary re-renders.
    -   [x] **Bug Fix:** Corrected a runtime error by implementing a dedicated `fetchArticleById` query and adding defensive checks to prevent crashes when relational data is not yet loaded in the cache.

## Phase 7: Advanced Animation Overhaul

-   [x] **Comprehensive Animation Integration:**
    -   [x] Implemented `AnimatePresence` to create smooth, fading transitions between all pages.
    -   [x] Enhanced the `NewsFeed` with `layout` animations for fluid filtering and more dynamic hover effects on article cards.
    -   [x] Refined the `ArticleClientView` with staggered entrance animations for a more polished and engaging reading experience.
    -   [x] Added `whileHover` and `whileTap` gesture animations to all interactive elements (buttons, links) for improved user feedback.
    -   [x] **Bug Fix:** Resolved a React hydration error by enforcing a consistent date format between the server and client renders.

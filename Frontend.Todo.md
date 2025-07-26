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

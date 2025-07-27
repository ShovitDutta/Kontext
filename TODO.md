# Todo - Frontend Implementation

This Document Outlines The Plan For Implementing The Frontend For The Kontext Application.

## 1. Project Setup & Tooling

- [x] **Framework:** Next.Js Is Already Set Up.
- [x] **Linting & Formatting:** Eslint And Prettier Are Already Configured.
- [x] **Icon Library:** `react-icons` is installed.
- [x] **State Management:** `@tanstack/react-query` is installed.
- [x] **Animation:** `framer-motion` is installed.
- [x] **Environment Variables:** Create A `.env.local` File For Frontend-Specific Environment Variables.

## 2. Authentication

- [x] **Login Page:** Create a login page at `/auth/signin` with a Google login button.
- [x] **Logout Functionality:** Add a logout button to the user profile menu.
- [x] **Protected Routes:** Use NextAuth.js middleware to protect routes that require authentication.
- [x] **User Profile Page:** Create a page where users can view their profile information.

## 3. UI Components

- [x] **Navbar:**
    - [x] Logo
    - [x] Search Bar
    - [x] Navigation Links (Home, Categories)
    - [x] User Profile Dropdown (if logged in) or Login Button (if not).
- [x] **Footer:**
    - [x] Links to Social Media
    - [x] Copyright Information
    - [x] Links to Terms of Service and Privacy Policy.
- [x] **Article Card:** A reusable component to display an article preview with an image, title, description, and source.
- [x] **Article View:** A component to display the full article with the generated content.
- [x] **Generated Content Viewer:** A component to display the AI-generated content with options to switch between "SHORT", "MEDIUM", and "EXPLAINED" lengths.
- [x] **Category Filter:** A component to filter articles by category.
- [x] **Search Bar:** A component for searching articles.
- [ ] **Pagination:** A component for paginating through long lists of articles.
- [ ] **Loading Skeletons:** Create loading skeletons for the article cards and article view.
- [ ] **Modals:** A reusable modal component.
- [ ] **Buttons:** A set of reusable button components.

## 4. Pages & Routing

- [x] **Home Page (`/`):**
    - [x] Display a list of the latest articles.
    - [x] Include a search bar and category filters.
    - [ ] Implement infinite scrolling or pagination.
- [x] **Article Page (`/article/[id]`):**
    - [x] Display the full article content.
    - [x] Display the AI-generated content with length options.
    - [ ] Show related articles.
- [x] **Category Page (`/category/[name]`):**
    - [x] Display all articles belonging to a specific category.
- [x] **Search Results Page (`/search?q=[query]`):**
    - [x] Display search results for the given query.
- [x] **User Profile Page (`/profile`):**
    - [x] Display user information.
- [x] **Not Found Page (404):** A custom 404 page.

## 5. API Integration

- [x] **Article API:**
    - [x] Fetch a list of articles (`/api/news`).
    - [x] Fetch a single article by id (`/api/news/[id]`).
- [x] **Generated Content API:**
    - [x] Fetch generated content for an article (`/api/gen`).
- [x] **Authentication API:**
    - [x] Integrate with `next-auth` for login, logout, and session management.
- [ ] **Error Handling:** Implement global error handling for API requests.

## 6. State Management

- [x] **React Query:** Use `@tanstack/react-query` for server-side state management.
- [x] **Client-Side State:** Use React's built-in state management (`useState`, `useReducer`, `useContext`).

## 7. Styling & Theming

- [x] **Theming:** Implement a dark-only mode theme.
- [x] **Tailwind CSS:** Use Tailwind CSS for styling.
- [x] **Framer-Motion:** Use Framer Motion for animations.
- [x] **Responsive Design:** Ensure the application is fully responsive.

# Todo - Frontend Implementation

This Document Outlines The Plan For Implementing The Frontend For The Kontext Application. I Will Continously Update This File After Each Changes Made By Me In The Current Project.

## 1. Project Setup & Tooling

- [x] **Framework:** Next.Js Is Already Set Up.
- [x] **Linting & Formatting:** Configure Eslint And Prettier To Enforce Consistent Code Style.
- [x] **Icon Library:** `React-Icons` Is Already Installed. We Should Use It For All Icons.
- [x] **Environment Variables:** Create A `.Env.Local` File For Frontend-Specific Environment Variables.

## 2. Authentication

- [ ] **Login Page:** Create A Login Page At `/Auth/Signin` With Options For Different Providers (E.G., Google).
- [ ] **Sign-Up Flow:** Implement The Sign-Up Flow.
- [ ] **Logout Functionality:** Add A Logout Button To The User Profile Menu.
- [ ] **Protected Routes:** Create A Middleware To Protect Routes That Require Authentication.
- [ ] **User Profile Page:** Create A Page Where Users Can View And Manage Their Profile Information.

## 3. Ui Components

- [ ] **Navbar:**
    - [ ] Logo
    - [ ] Search Bar
    - [ ] Navigation Links (Home, Categories, Etc.)
    - [ ] User Profile Dropdown (If Logged In) Or Login Button (If Not).
- [ ] **Footer:**
    - [ ] Links To Social Media
    - [ ] Copyright Information
    - [ ] Links To Terms Of Service And Privacy Policy.
- [ ] **Article Card:** A Reusable Component To Display An Article Preview With An Image, Title, Description, And Source.
- [ ] **Article View:** A Component To Display The Full Article With The Generated Content.
- [ ] **Generated Content Viewer:** A Component To Display The Ai-Generated Content With Options To Switch Between "Short", "Medium", And "Explained" Lengths.
- [ ] **Category Filter:** A Component To Filter Articles By Category.
- [ ] **Search Bar:** A Component For Searching Articles.
- [ ] **Pagination:** A Component For Paginating Through Long Lists Of Articles.
- [ ] **Loading Skeletons:** Create Loading Skeletons For The Article Cards And Article View To Improve User Experience.
- [ ] **Modals:** A Reusable Modal Component For Various Purposes (E.G., Confirmation Dialogs).
- [ ] **Buttons:** A Set Of Reusable Button Components With Different Styles (Primary, Secondary, Etc.).

## 4. Pages & Routing

- [ ] **Home Page (`/`):**
    - [ ] Display A List Of The Latest Articles.
    - [ ] Include A Search Bar And Category Filters.
    - [ ] Implement Infinite Scrolling Or Pagination.
- [ ] **Article Page (`/Article/[Id]`):**
    - [ ] Display The Full Article Content.
    - [ ] Display The Ai-Generated Content With Length Options.
    - [ ] Show Related Articles.
    - [ ] Allow Users To Share The Article.
- [ ] **Category Page (`/Category/[Name]`):**
    - [ ] Display All Articles Belonging To A Specific Category.
- [ ] **Search Results Page (`/Search?Q=[Query]`):**
    - [ ] Display Search Results For The Given Query.
- [ ] **User Profile Page (`/Profile`):**
    - [ ] Display User Information.
    - [ ] Allow Users To Update Their Profile.
    - [ ] Show A List Of Saved/Bookmarked Articles (If We Add This Feature).
- [ ] **Not Found Page (404):** A Custom 404 Page.

## 5. Api Integration

- [ ] **Article Api:**
    - [ ] Fetch A List Of Articles (`/Api/News`).
    - [ ] Fetch A Single Article By Id (`/Api/News/[Id]`).
- [ ] **Generated Content Api:**
    - [ ] Fetch Generated Content For An Article (`/Api/Gen`).
- [ ] **Authentication Api:**
    - [ ] Integrate With `Next-Auth` For Login, Logout, And Session Management (`/Api/Auth/...`).
- [ ] **Error Handling:** Implement Global Error Handling For Api Requests.

## 6. State Management

- [ ] **React Query:** Use `@Tanstack/React-Query` (Already Installed) For Server-Side State Management (Fetching, Caching, And Updating Data From The Api).
- [ ] **Client-Side State:** For Client-Side State (E.G., Ui State, Form State), Use React's Built-In State Management (`Usestate`, `Usereducer`, `Usecontext`).

## 7. Styling & Theming

- [ ] **Theming:** Implement A Dark-Only Mode Theme.
- [ ] **Tailwind Css:** Use Tailwind Css (Already Installed) For Styling.
- [ ] **Framer-Motion:** Use Framer Motion (Already Installed) For Animations.
- [ ] **Responsive Design:** Ensure The Application Is Fully Responsive And Works Well On All Screen Sizes.
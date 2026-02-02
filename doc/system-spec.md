# System Specification — Francisco Ossian Portfolio

## 1) System Boundaries
- **Internal:** Next.js Application (App Router), React Components, GitHub Integration Services, Tailwind CSS / SCSS styling.
- **External:**
    - **GitHub GraphQL API:** Source of truth for content and settings.
    - **`foln-cms-md` Repository:** Private/Public repo containing Markdown and YAML files.
    - **Firebase Storage:** Hosting for specific media/images.
    - **Starlight CMS (Media):** External host for specific project images.
    - **GitHub (Social):** Redirects for social profiles and project links.

## 2) High-Level Architecture
- **Framework:** Next.js 14 (App Router) utilizing Server Components for data fetching.
- **Layered Structure:**
    - **App Layer:** Defines routes, layouts, and page-level data requirements.
    - **Component Layer:** Reusable UI units divided into `common` (layout, formatting) and `pages` (feature-specific).
    - **Service Layer:** Encapsulates external API calls (GitHub GraphQL, YAML parsing).
    - **CMS Proxy:** The system acts as a frontend for a file-based CMS stored in Git.

## 3) Data Flow
1. **Request:** User requests a page (e.g., `/` or `/blog/[id]`).
2. **Fetch:** Server Components call GitHub Services to fetch raw Markdown/YAML from the `foln-cms-md` repository.
3. **Parse:** RAW data (YAML) is converted to JSON; Markdown is prepared for rendering.
4. **Render:** Components receive the JSON data and render the UI. Markdown is processed into HTML via `unified` (remark/rehype) during rendering.
5. **Hydrate:** Client-side components (Framer Motion, toggles) hydrate for interactivity.

## 4) Core Components
- **GitHub Services:** Set of functions using GraphQL to fetch pages, posts, settings, and repo data.
- **MdToHTML:** Complex processor using `unified`, `remark`, and `rehype` to transform Markdown into styled HTML, including LaTeX and code highlighting.
- **Projects Component:** A "client-side" interactive list managing local state for selected project details.
- **DynamicLib Hook:** A custom hook to lazy-load heavy libraries like `motion/react` only when needed in the client.

## 5) Integration Points
- **API:** `https://api.github.com/graphql` (Authenticated via personal access token).
- **Rendering Engines:** `rehype-katex`, `highlight.js`, `marked`.
- **Media Hosting:** `media.starlightcms.io`, `firebasestorage.googleapis.com`.

## 6) State & Persistence
- **Content State:** Persisted in the `foln-cms-md` GitHub repository.
- **Application State:** Primarily stateless on the server; minimal UI state (like `selectedProject`) managed locally in React `useState`.
- **Caching:** Uses Next.js `fetch` cache with a `revalidate` period of 86400 seconds (24 hours).

## 7) Execution Model
- **Server-Side Rendering (SSR/ISR):** Data fetching happens on the server. Pages are pre-rendered.
- **Dynamic Client Interactivity:** Animations and specific UI toggles are handled by Client Components.
- **Async Data Fetching:** Sequential and parallel `await` calls in Server Components for initial page data.

## 8) Error Handling
- **API Failures:** Errors during GraphQL requests are logged to the console and thrown, typically resulting in Next.js error boundaries or failed build/render.
- **Parsing Errors:** Try-catch blocks in YAML parsing and Markdown processing return empty objects or fallback content.
- **Missing Content:** Fallback values (e.g., `?? 'francisco ossian'`) are used for metadata and titles when settings are missing.

## 9) System Constraints
- **API Rate Limits:** Dependent on GitHub GraphQL API limits (mitigated by 24h caching).
- **Build-time Dependency:** Metadata generation and page rendering require a valid GitHub token and network access.
- **Client Bundling:** Use of heavy libraries for rendering (unified) and animation (framer-motion) requires careful handling (e.g., lazy loading).

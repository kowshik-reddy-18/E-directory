index.ftl                 → Freemarker dashboard with mock data
form.ftl                  → Freemarker form page (edit support)

style/
└── main.css              → CSS styling

js/
├── data.js               → In-memory employee data (localStorage based)
├── render.js             → DOM rendering
├── form.js               → Form logic
├── filters.js            → Search/filter/sort
└── utils.js              → Helpers


# Employee Directory – Frontend UI Assignment

## Setup & Run Instructions


1. This project is designed using Freemarker templating. The `.ftl` files (`index.ftl`, `form.ftl`) contain Freemarker syntax such as `<#assign>` and `<#list>` to demonstrate integration.

2. To run in a Freemarker-compatible environment:
   - Use any lightweight Java server setup (e.g., Spring Boot).
   - Serve `index.ftl` and `form.ftl` from your templates directory with mock employee data injected at runtime.

3. If previewing statically during development:
   - You may view the rendered structure by using browser DevTools or use static `.html` for layout reference only (though Freemarker logic will not execute in browser).

## Project Structure Overview
```
E-DIRECTORY/
index.ftl                 → Freemarker dashboard with mock data
form.ftl                  → Freemarker form page (edit support)

style/
└── main.css              → CSS styling

js/
├── data.js               → In-memory employee data (localStorage based)
├── render.js             → DOM rendering
├── form.js               → Form logic
├── filters.js            → Search/filter/sort
└── utils.js              → Helpers


### Challenges Faced
- Freemarker cannot run natively in browsers, so dynamic data had to be demonstrated using Freemarker-compatible syntax with mock values.
- Managing form state and persisting it across sessions with `localStorage` required custom logic.
- Ensuring fully responsive UI with pure CSS required careful layout handling.

### Improvements if Given More Time
- Set up a working Java+Freemarker runtime to enable live rendering of `.ftl` files.
- Add proper routing and data persistence across pages.
- Implement additional filters, sort animations, and accessibility enhancements.
- Support for dark mode toggle, bulk actions, and CSV export.

---

> Designed and built to fulfill the Ajackus frontend UI challenge with clarity, simplicity, and a touch of product-grade polish.

# Dynamic CSS Flow Diagram

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        TENANT REQUEST                                │
│                    (example.weblet.com)                              │
└─────────────────────────┬───────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    MIDDLEWARE: Load Tenant                           │
│  • Fetches tenant data from Payload API by domain                   │
│  • Stores in Astro.locals.tenant                                    │
└─────────────────────────┬───────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────────┐
│                 MIDDLEWARE: Apply Theme                              │
│  • Extracts themeConfig from tenant                                 │
│  • Generates CSS variables                                          │
│  • Stores in Astro.locals.themeCSSVars                             │
└─────────────────────────┬───────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────────┐
│                  COMPONENT: TenantTheme                              │
│                    (Priority Decision)                               │
└─────────────────────────┬───────────────────────────────────────────┘
                          │
        ┌─────────────────┼─────────────────┬─────────────────┐
        │                 │                 │                 │
        ▼                 ▼                 ▼                 ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│   Priority 1 │  │   Priority 2 │  │   Priority 3 │  │   Priority 4 │
│              │  │              │  │              │  │              │
│ themeCssUrl? │  │themeCssContent│  │ Static File? │  │  themeConfig │
│              │  │              │  │              │  │              │
│     YES      │  │     YES      │  │     YES      │  │    Fallback  │
│      │       │  │      │       │  │      │       │  │      │       │
│      ▼       │  │      ▼       │  │      ▼       │  │      ▼       │
│   <link>     │  │   <style>    │  │   <link>     │  │   <style>    │
│   External   │  │   Inline     │  │   /themes/   │  │ CSS Vars     │
└──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘
        │                 │                 │                 │
        └─────────────────┴─────────────────┴─────────────────┘
                                    │
                                    ▼
                        ┌───────────────────────┐
                        │   RENDERED PAGE       │
                        │   (with theme CSS)    │
                        └───────────────────────┘
```

## Priority Flow Chart

```
START: Tenant data loaded
        │
        ▼
    ┌───────────────────┐
    │ Has themeCssUrl?  │
    └─────┬─────────────┘
          │
    ┌─────┴─────┐
    │YES        │NO
    ▼           ▼
┌──────┐   ┌───────────────────┐
│ LOAD │   │ Has themeCssContent│
│ URL  │   └─────┬─────────────┘
└──┬───┘         │
   │       ┌─────┴─────┐
   │       │YES        │NO
   │       ▼           ▼
   │   ┌────────┐  ┌────────────────────┐
   │   │INJECT  │  │ File exists:       │
   │   │CONTENT │  │ /themes/{id}.css?  │
   │   └───┬────┘  └─────┬──────────────┘
   │       │             │
   │       │       ┌─────┴─────┐
   │       │       │YES        │NO
   │       │       ▼           ▼
   │       │   ┌──────┐   ┌─────────┐
   │       │   │ LOAD │   │  Has    │
   │       │   │STATIC│   │themeConfig
   │       │   └───┬──┘   └────┬────┘
   │       │       │           │
   │       │       │      ┌────┴────┐
   │       │       │      │YES      │NO
   │       │       │      ▼         ▼
   │       │       │  ┌──────┐  ┌──────┐
   │       │       │  │ CSS  │  │ USE  │
   │       │       │  │ VARS │  │DEFAULT
   │       │       │  └───┬──┘  └───┬──┘
   │       │       │      │         │
   └───┬───┴───┬───┴──────┴─────────┘
       │       │
       ▼       ▼
   ┌──────────────┐
   │  CSS LOADED  │
   └──────────────┘
```

## Data Flow

```
┌───────────────────────────────────────────────────────────────┐
│                     PAYLOAD API                                │
│                                                                 │
│  GET /tenants/by-domain?domain=example.com                     │
│                                                                 │
│  Response:                                                      │
│  {                                                              │
│    "id": "tenant-123",                                         │
│    "name": "My Tenant",                                        │
│    "themeCssUrl": "https://cdn.site.com/themes/123.css",      │
│    "themeCssContent": ":root { ... }",        ← NEW!          │
│    "themeConfig": { "colors": {...} }         ← Existing      │
│  }                                                              │
└────────────────────────┬──────────────────────────────────────┘
                         │
                         ▼
┌───────────────────────────────────────────────────────────────┐
│                  ASTRO MIDDLEWARE                              │
│                                                                 │
│  Astro.locals.tenant = {                                       │
│    themeCssUrl: "https://cdn.site.com/themes/123.css",        │
│    themeCssContent: ":root { ... }",                          │
│    themeConfig: {...}                                          │
│  }                                                              │
└────────────────────────┬──────────────────────────────────────┘
                         │
                         ▼
┌───────────────────────────────────────────────────────────────┐
│                TENANTTHEME.ASTRO                               │
│                                                                 │
│  const themeCssUrl = Astro.locals.tenant?.themeCssUrl;        │
│  const themeCssContent = Astro.locals.tenant?.themeCssContent;│
│                                                                 │
│  if (themeCssUrl) {                                            │
│    <link rel="stylesheet" href={themeCssUrl} />               │
│  }                                                              │
│  else if (themeCssContent) {                                   │
│    <style>{themeCssContent}</style>                           │
│  }                                                              │
│  // ... fallback logic                                         │
└────────────────────────┬──────────────────────────────────────┘
                         │
                         ▼
┌───────────────────────────────────────────────────────────────┐
│                    BROWSER                                     │
│                                                                 │
│  <head>                                                         │
│    <link rel="stylesheet"                                      │
│          href="https://cdn.site.com/themes/123.css">          │
│  </head>                                                        │
│                                                                 │
│  OR                                                             │
│                                                                 │
│  <head>                                                         │
│    <style>                                                      │
│      :root { --color-primary-500: 255, 69, 0; }               │
│    </style>                                                     │
│  </head>                                                        │
└───────────────────────────────────────────────────────────────┘
```

## CSS Loading Methods Comparison

```
┌─────────────────────────────────────────────────────────────────────┐
│                        METHOD COMPARISON                             │
├──────────────┬──────────────┬───────────────┬─────────────┬─────────┤
│   Method     │   Priority   │   Cacheable   │  Best For   │  Size   │
├──────────────┼──────────────┼───────────────┼─────────────┼─────────┤
│ themeCssUrl  │      1       │      YES      │ Production  │  Large  │
│              │  (Highest)   │  (by browser) │ Complete    │  Files  │
│              │              │               │ Tailwind    │         │
├──────────────┼──────────────┼───────────────┼─────────────┼─────────┤
│themeCssContent│     2       │      NO       │ Small       │  Small  │
│              │              │  (inline)     │ Overrides   │  < 10KB │
├──────────────┼──────────────┼───────────────┼─────────────┼─────────┤
│ Static File  │      3       │      YES      │ Pre-built   │  Any    │
│ /themes/     │              │  (by browser) │ Themes      │         │
├──────────────┼──────────────┼───────────────┼─────────────┼─────────┤
│ themeConfig  │      4       │      NO       │ Simple      │  Tiny   │
│ (CSS Vars)   │  (Fallback)  │  (inline)     │ Colors      │ < 5KB   │
└──────────────┴──────────────┴───────────────┴─────────────┴─────────┘
```

## Backend Implementation Flow

```
┌─────────────────────────────────────────────────────────────────┐
│              BACKEND/PAYLOAD CSS GENERATION                      │
└─────────────────────────────────────────────────────────────────┘

    ┌────────────────────┐
    │ Tenant Updates     │
    │ Theme in Admin     │
    └─────────┬──────────┘
              │
              ▼
    ┌────────────────────────────────┐
    │  Generate Custom CSS           │
    │  • Build Tailwind config       │
    │  • Add custom fonts            │
    │  • Include animations          │
    │  • Add utility classes         │
    └─────────┬──────────────────────┘
              │
              ▼
    ┌────────────────────────────────┐
    │  Upload to CDN                 │
    │  • File: tenant-{id}-v{ver}.css│
    │  • Set cache headers           │
    │  • Get CDN URL                 │
    └─────────┬──────────────────────┘
              │
              ▼
    ┌────────────────────────────────┐
    │  Update Tenant Record          │
    │  • Set themeCssUrl = cdn_url   │
    │  • Increment themeVersion      │
    │  • Set lastUpdated             │
    └─────────┬──────────────────────┘
              │
              ▼
    ┌────────────────────────────────┐
    │  Frontend Automatically        │
    │  Loads New Theme               │
    │  (No Deploy Needed!)           │
    └────────────────────────────────┘
```

## Request Timeline

```
Time    │ Activity
────────┼────────────────────────────────────────────────────────
  0ms   │ Browser requests: example.weblet.com
        │
 10ms   │ Server: Load tenant middleware
        │   ↳ Fetch tenant from Payload API
        │
 50ms   │ Payload API responds with tenant data
        │   {
        │     "themeCssUrl": "https://cdn.site.com/themes/123.css"
        │   }
        │
 60ms   │ Server: Theme middleware
        │   ↳ Process theme config (if needed)
        │
 70ms   │ Server: Render page
        │   ↳ TenantTheme.astro detects themeCssUrl
        │   ↳ Injects <link rel="stylesheet" href="...">
        │
100ms   │ Server sends HTML to browser
        │
110ms   │ Browser parses HTML
        │   ↳ Finds <link> tag
        │   ↳ Requests CSS from CDN
        │
150ms   │ CDN responds with CSS (cached!)
        │
160ms   │ Browser applies CSS
        │   ↳ Page rendered with tenant theme
        │
────────┴────────────────────────────────────────────────────────
```

## Cache Strategy

```
┌─────────────────────────────────────────────────────────────────┐
│                      CACHING LAYERS                              │
└─────────────────────────────────────────────────────────────────┘

  Browser Cache
  ┌──────────────────────────────────────┐
  │ https://cdn.site.com/themes/123.css  │
  │ Cache-Control: max-age=31536000      │ ← Cached 1 year
  │ (CSS file with version in URL)       │
  └──────────────────────────────────────┘
              ▲
              │ Cache Miss
              ▼
  CDN Cache (Cloudflare/CloudFront)
  ┌──────────────────────────────────────┐
  │ Edge locations worldwide             │
  │ 50-200ms from any user               │ ← Fast global access
  └──────────────────────────────────────┘
              ▲
              │ Cache Miss
              ▼
  Origin Server (Your Backend)
  ┌──────────────────────────────────────┐
  │ Generated CSS files                  │
  │ Stored in S3/Storage                 │ ← Source of truth
  └──────────────────────────────────────┘

  Cache Invalidation Strategy:
  • Use versioned URLs: themes/123-v5.css
  • Update tenant.themeCssUrl when version changes
  • Old versions auto-expire (no traffic)
```

## Error Handling

```
┌─────────────────────────────────────────────────────────────────┐
│                      ERROR SCENARIOS                             │
└─────────────────────────────────────────────────────────────────┘

Scenario 1: CSS URL 404
┌────────────────────┐
│ themeCssUrl fails  │
│ to load (404)      │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│ Browser shows 404  │
│ in Network tab     │
└─────────┬──────────┘
          │
          ▼
┌────────────────────────────┐
│ Page uses default styles   │
│ (no theme override)        │
│                            │
│ SOLUTION:                  │
│ • Provide themeConfig as   │
│   fallback                 │
│ • Monitor 404 errors       │
└────────────────────────────┘

Scenario 2: Malformed CSS
┌────────────────────┐
│ CSS has syntax     │
│ errors             │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│ Browser ignores    │
│ invalid rules      │
└─────────┬──────────┘
          │
          ▼
┌────────────────────────────┐
│ Partial theme applied      │
│                            │
│ SOLUTION:                  │
│ • Validate CSS before      │
│   uploading                │
│ • Use CSS linter           │
└────────────────────────────┘

Scenario 3: CORS Error
┌────────────────────┐
│ Cross-origin CSS   │
│ blocked by CORS    │
└─────────┬──────────┘
          │
          ▼
┌────────────────────────────┐
│ Console shows CORS error   │
│                            │
│ SOLUTION:                  │
│ • Add CORS headers on CDN: │
│   Access-Control-Allow-    │
│   Origin: *                │
└────────────────────────────┘
```

## Performance Comparison

```
Old Method (themeConfig only):
┌────────┬────────┬────────┬────────┐
│ Request│Middleware Theme │ Render │
│ Tenant │Generate Inject  │  Page  │
│  API   │CSS Vars Inline  │        │
└────────┴────────┴────────┴────────┘
0ms     50ms    60ms    70ms    100ms
                              ↑
                         Page Ready

New Method (themeCssUrl):
┌────────┬────────┬────────┬────────┬────────┐
│ Request│Middleware Render│ Request│  CSS   │
│ Tenant │  Pass  │  Page  │CSS CDN │ Apply  │
│  API   │  URL   │+<link> │(cached)│        │
└────────┴────────┴────────┴────────┴────────┘
0ms     50ms    60ms    100ms   150ms   160ms
                      ↑                    ↑
                 HTML Ready          Full Theme
                 
Benefits:
• Parallel loading (CSS while HTML renders)
• Browser caching (CDN cache hit = 10ms)
• No server-side CSS generation overhead
```

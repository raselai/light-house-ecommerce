# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Light House E-commerce is a Next.js 14 e-commerce website for AL MESBAH ALABYAD LIGHTS TRADING L.L.C, a lighting products business in UAE. Products are stored in Firebase Firestore with images in Firebase Storage. There are no automated tests.

## Commands

```bash
npm run dev     # Start development server on localhost:3000
npm run build   # Build for production (run this to verify changes before committing)
npm start       # Start production server
npm run lint    # Run ESLint
```

## Architecture

### Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Database**: Firebase Firestore
- **Storage**: Firebase Storage (primary); Cloudinary SDK installed but no longer the primary storage
- **Styling**: Tailwind CSS + inline styles (mixed pattern throughout)

### Data Flow

1. Admin submits form → `AddProductForm`/`EditProductForm` → `productService.ts` → `/api/products` → `lib/firestore.ts` → Firestore
2. Images uploaded via `ImageUpload.tsx` → `/api/upload` → `lib/storage.ts` → Firebase Storage (path: `products/{category}/{subcategory}/{timestamp}_{filename}`)
3. Frontend fetches via `productService.ts` → `/api/products` → Firestore → displayed with `getProductImagePath()` from `lib/utils.ts`

### API Routes

Only use `/api/products` (Firestore-backed). The other routes are legacy and unused:
- `/api/products-hybrid`, `/api/products-new`, `/api/products-vercel` — do not use

### Product Type — Dual Fields

`src/types/product.ts` and `src/lib/firestore.ts` define overlapping fields for backward compatibility. When the POST route writes to Firestore it maps: `isFeatured` → `featured`, `isOnSale` → `seasonal`. Firestore queries in `firestore.ts` filter on `featured` and `seasonal` (not `isFeatured`/`isOnSale`). Always populate both variants:

| Frontend/API field | Firestore field |
|--------------------|-----------------|
| `isFeatured`       | `featured`      |
| `isOnSale`         | `seasonal`      |
| `images`           | `images`        |
| `galleryImages`    | `galleryImages` |

### Image Resolution Order

`getProductImagePath()` in `src/lib/utils.ts` resolves image URLs in this priority:
1. `product.image` (any URL — Firebase Storage or Cloudinary)
2. `product.mainImage`
3. `product.images[0]`
4. `product.galleryImages[0]`
5. `product.imagePath` → `/images/products/{path}`
6. Category fallback from hardcoded map → `/images/categories/...`

`next.config.js` allows only `firebasestorage.googleapis.com` as an image domain, but `unoptimized: true` means Next.js Image does no server-side optimization.

### Category System

Categories have a `type` field (`'indoor'` | `'outdoor'`) defined in `src/app/data/categories.ts`. The homepage also filters for an `'others'` tab by checking `product.category.toLowerCase().includes('others')` — this is not in `categories.ts` and must be set manually on products.

Standard subcategories (used for Firestore queries): `chandeliers`, `ceiling-lights`, `wall-lamps`, `pendant-lights`, `garden-lights`, `street-lamps`, `flood-lights`, `wall-fixtures`.

### Admin Authentication

Auth is localStorage-only (`adminAuth: 'true'`), implemented in `src/hooks/useAuth.ts`. Credentials are hardcoded:
- Username: `admin`
- Password: `lighting2024`

The "Inquiries" tab in the admin panel shows hardcoded mock data — there is no real inquiry tracking system.

### Firestore Timestamp Gotcha

`getAllProducts()` in `firestore.ts` avoids `orderBy` in the Firestore query to prevent errors on documents missing `createdAt`. It fetches all docs then sorts in JavaScript, checking whether `createdAt` is a Firestore `Timestamp` object (`{ seconds, nanoseconds }`) or a regular Date before comparing.

## Key Files

| File | Purpose |
|------|---------|
| `src/lib/firestore.ts` | Firestore CRUD — defines its own `Product` interface (different from `src/types/product.ts`) |
| `src/lib/productService.ts` | Client-side API wrapper used by all frontend components |
| `src/lib/utils.ts` | `getProductImagePath()` image resolution + `cn()` Tailwind helper |
| `src/lib/storage.ts` | Firebase Storage upload/delete helpers |
| `src/hooks/useAuth.ts` | Admin auth (localStorage) with hardcoded credentials |
| `src/app/data/categories.ts` | Static category list with name, image, href, type |

## Deployment

Hosted on Hostinger. `next.config.js` uses `output: 'standalone'`. Node.js 18.x or 20.x required. See `DEPLOYMENT.md` for full instructions.

## Important Notes

- **Path aliases**: Use `@/` for imports from `src/` (configured in `tsconfig.json`)
- **No test suite**: There are no unit or integration tests
- **`src/lib/staticData.ts`**: Contains static fallback product/category data; not used in the main product flow
- **WhatsApp number**: `971506970154` — hardcoded in multiple places including `src/app/page.tsx`
- **Legacy scripts**: `scripts/` contains one-time migration scripts; do not re-run them

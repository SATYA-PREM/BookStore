# BookFlow

BookFlow is a frontend-only bookstore SaaS demo built with Next.js and React. It simulates both a retail storefront and a seller operations dashboard for a modern digital book commerce brand.

The app is designed to feel like a real e-commerce product: customers can browse books, add items to cart or wishlist, apply coupons, complete checkout, and track orders; sellers can monitor revenue, inventory, order fulfillment, and customer activity from a dashboard.

## Overview

This project combines two experiences in one app:

- Customer storefront at `/`
- Seller dashboard at `/seller`

It uses a shared reactive store with browser localStorage persistence, so the app behaves like a complete SaaS prototype without a backend service.

## Features

### Customer experience
- Book catalog with curated hero section and category filtering
- Search, browse, and quick-view product modals
- Wishlist and cart management
- Coupon-based discounts with validation
- Checkout flow with mock payment modal
- Order confirmation and tracking timeline
- Downloadable invoice modal for completed orders

### Seller experience
- Revenue and order performance cards
- Inventory and low-stock monitoring
- Book catalog management workflows
- Order lifecycle updates and fulfillment tracking
- Customer analytics and recent activity
- Transactions, coupons, reviews, and notifications panels
- Store settings and KPI dashboard

### Frontend-only architecture
- React Context state management
- Browser persistence via localStorage
- Mock payment engine simulation
- No database or API server required

## Tech Stack

- Next.js 14
- React 18
- Tailwind CSS
- Recharts
- Lucide React

## Detailed Implementation Manual

For a complete walkthrough of all workflows, checkout & payment engine simulations, seller/admin portals, database schemas, and state architecture, see:
👉 **[SYSTEM_IMPLEMENTATION.md](file:///d:/PROJECTS/New%20folder/Saas/BookStore/SYSTEM_IMPLEMENTATION.md)**

## Project Structure

```bash
src/
├── app/
│   ├── book/[id]/page.jsx
│   ├── books/page.jsx
│   ├── cart/page.jsx
│   ├── checkout/page.jsx
│   ├── orders/page.jsx
│   ├── seller/
│   │   ├── analytics/page.jsx
│   │   ├── books/page.jsx
│   │   ├── coupons/page.jsx
│   │   ├── customers/page.jsx
│   │   ├── inventory/page.jsx
│   │   ├── orders/page.jsx
│   │   ├── payments/page.jsx
│   │   ├── reviews/page.jsx
│   │   ├── settings/page.jsx
│   │   └── page.jsx
│   ├── success/page.jsx
│   ├── wishlist/page.jsx
│   ├── layout.jsx
│   └── page.jsx
├── components/
│   ├── charts/
│   ├── invoice/
│   ├── payment/
│   ├── seller/
│   ├── storefront/
│   └── ui/
├── context/
│   ├── BookStoreContext.jsx
│   └── ToastContext.jsx
├── lib/
│   ├── initialData.js
│   └── mockPaymentEngine.js
├── styles/
│   └── globals.css
└── ...
```

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open the app in your browser:

```bash
http://localhost:3000
```

## Production Build

```bash
npm run build
```

To start the production build locally:

```bash
npm run start
```

## Demo Coupons

The storefront includes working sample coupons:

- `BOOK10`: 10% off on orders above ₹400
- `WELCOME100`: ₹100 off on orders above ₹500
- `READ20`: 20% off on bundle purchases above ₹800

## Mock Payment Test Cards

Use these values in the checkout payment modal:

- Success card: `4242 4242 4242 4242` | Expiry: `12/28` | CVV: `123`
- Declined card: `4000 0000 0000 0002` | Expiry: `05/27` | CVV: `999`
- Insufficient funds: `4000 0000 0000 9995` | Expiry: `08/29` | CVV: `777`

## Notes

- The app is intentionally frontend-only and does not require a backend database.
- Store state persists in the browser through localStorage, which makes the experience interactive and persistent during testing.
- Clearing browser storage resets the demo data.

## License

This project is for demo and learning purposes.


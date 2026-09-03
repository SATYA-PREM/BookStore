# BookFlow — SaaS Platform for Book Commerce Management

> **Everything You Need to Sell Books Online.**
> Complete Frontend-Only SaaS Platform with Connected Reactive State, Mock Payment Simulator, and Enterprise Seller Dashboard.

---

## 🚀 Key Highlights & Architecture

- **Dual Persona Interfaces**:
  - **Customer Storefront (`/`)**: Discover books, search & filter, wishlist, interactive shopping cart, working coupon system (`BOOK10`, `WELCOME100`, `READ20`), two-column checkout, mock payment gateway modal (Cards, UPI, Netbanking), order confirmed receipt, live delivery tracking timeline, and downloadable tax invoices.
  - **Seller SaaS Center (`/seller`)**: Executive revenue metrics (₹82,450+), book catalog manager (Add/Edit/Delete), inventory monitoring with low-stock alerts, order fulfillment lifecycle (updates customer tracking in real time), customer CRM directory, payment transactions ledger, coupon manager, review moderation, and store settings.
- **Pure Frontend Runtime**:
  - **No Backend Database Required**: Powered by a unified reactive React Context + persistent `localStorage` synchronization.
  - **Mock Payment Engine**: Simulates client-side payment verification with real-world test cards (Success: `4242 4242 4242 4242`, Declined: `4000 0000 0000 0002`, Insufficient Funds: `4000 0000 0000 9995`).
- **Interconnected Data Flow**:
  - Customer purchase $\rightarrow$ Cart cleared $\rightarrow$ Stock decremented $\rightarrow$ Revenue & Orders incremented $\rightarrow$ Transaction logged $\rightarrow$ Seller notification created $\rightarrow$ Customer order tracking activated.

---

## 📦 How to Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Open browser at http://localhost:3000
```

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router) + React 18
- **Styling**: Tailwind CSS + Custom Glassmorphism & Animations
- **Icons**: Lucide React
- **Charts**: Recharts (Revenue Area Charts, Category Donut, Top Books Progress)
- **State & Storage**: React Context + Browser `localStorage`
- **Shortcuts**: Global Command Palette (`Ctrl + K` or `Cmd + K`)

---

## 🏷️ Test Coupons for Shopping Cart

- `BOOK10`: 10% Discount on orders above ₹400
- `WELCOME100`: Flat ₹100 Off on orders above ₹500
- `READ20`: 20% Discount on bundles above ₹800

---

## 💳 Demo Payment Test Cards

- **Success**: `4242 4242 4242 4242` | Expiry: `12/28` | CVV: `123`
- **Declined**: `4000 0000 0000 0002` | Expiry: `05/27` | CVV: `999`
- **Insufficient Funds**: `4000 0000 0000 9995` | Expiry: `08/29` | CVV: `777`


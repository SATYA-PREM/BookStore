/**
 * Mock Payment Engine for BookFlow SaaS
 * Simulates client-side payment verification (Razorpay/Stripe modal)
 * without external gateway dependency.
 */

export const DEMO_CARDS = {
  SUCCESS: "4242424242424242",
  DECLINED: "4000000000000002",
  INSUFFICIENT_FUNDS: "4000000000009995"
};

export async function processDemoPayment({
  method = "card",
  cardNumber = "",
  upiId = "",
  amount = 0,
  delayMs = 1500
}) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const cleanCard = cardNumber.replace(/\s+/g, "");

      if (method === "card") {
        if (cleanCard === DEMO_CARDS.DECLINED) {
          resolve({
            success: false,
            error: "Payment Declined by Issuer (Demo Test Card: 4000...0002)",
            code: "CARD_DECLINED"
          });
          return;
        }

        if (cleanCard === DEMO_CARDS.INSUFFICIENT_FUNDS) {
          resolve({
            success: false,
            error: "Insufficient Funds in Account (Demo Test Card: 4000...9995)",
            code: "INSUFFICIENT_FUNDS"
          });
          return;
        }
      }

      if (method === "upi" && upiId.toLowerCase().includes("fail")) {
        resolve({
          success: false,
          error: "UPI Transaction Rejected by Bank App",
          code: "UPI_REJECTED"
        });
        return;
      }

      // Default to Success
      const txnId = `TXN-${Math.floor(100000 + Math.random() * 900000)}`;
      resolve({
        success: true,
        transactionId: txnId,
        amount,
        method: method.toUpperCase(),
        timestamp: new Date().toISOString()
      });
    }, delayMs);
  });
}


// src/lib/shopify.ts

const SHOP_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
const STOREFRONT_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;
const API_VERSION = import.meta.env.VITE_SHOPIFY_API_VERSION;

// ✅ Fail early if env vars are missing (important for Vercel)
if (!SHOP_DOMAIN || !STOREFRONT_TOKEN || !API_VERSION) {
  throw new Error("Missing Shopify environment variables");
}

const endpoint = `https://${SHOP_DOMAIN}/api/${API_VERSION}/graphql.json`;

/**
 * Base fetch helper for Shopify Storefront API
 */
export async function shopifyFetch(
  query: string,
  variables?: Record<string, any>
) {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();

  if (json.errors) {
    console.error("Shopify API Errors:", json.errors);
    throw new Error("Shopify API error");
  }

  return json.data;
}

/**
 * Create Shopify Checkout and return checkout URL
 */
export async function createShopifyCheckout(items: {
  id: string;        // Shopify VARIANT ID
  quantity: number;
}[]) {
  const lineItems = items.map((item) => ({
    variantId: item.id,
    quantity: item.quantity,
  }));

  const mutation = `
    mutation checkoutCreate($lineItems: [CheckoutLineItemInput!]!) {
      checkoutCreate(input: { lineItems: $lineItems }) {
        checkout {
          webUrl
        }
        checkoutUserErrors {
          message
        }
      }
    }
  `;

  const data = await shopifyFetch(mutation, { lineItems });

  const checkout = data?.checkoutCreate?.checkout;

  if (!checkout?.webUrl) {
    throw new Error("Failed to create Shopify checkout");
  }

  return checkout.webUrl;
}

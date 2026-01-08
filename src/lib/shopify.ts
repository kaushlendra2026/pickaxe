// src/lib/shopify.ts

const SHOP_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
const STOREFRONT_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;
const API_VERSION = import.meta.env.VITE_SHOPIFY_API_VERSION;

if (!SHOP_DOMAIN || !STOREFRONT_TOKEN || !API_VERSION) {
  console.warn("Shopify env vars missing — check Vercel settings");
}


const endpoint = `https://${SHOP_DOMAIN}/api/${API_VERSION}/graphql.json`;

async function shopifyFetch(query: string, variables?: any) {
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
    throw new Error(JSON.stringify(json.errors));
  }

  return json.data;
}

export async function createShopifyCheckout(items: {
  id: string;
  quantity: number;
}[]) {
  const lineItems = items.map((item) => ({
    variantId: item.id,
    quantity: item.quantity,
  }));

  const query = `
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

  const data = await shopifyFetch(query, { lineItems });

  const checkout = data.checkoutCreate.checkout;

  if (!checkout?.webUrl) {
    throw new Error("Failed to create Shopify checkout");
  }

  return checkout.webUrl;
}

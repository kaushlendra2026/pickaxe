import { shopifyFetch } from "@/lib/shopify";
import { CartItem } from "@/contexts/CartContext";

const CREATE_CART = `
mutation CreateCart($lines: [CartLineInput!]!) {
  cartCreate(input: { lines: $lines }) {
    cart {
      checkoutUrl
    }
  }
}
`;

export async function createShopifyCheckout(items: CartItem[]) {
  const lines = items.map((item) => ({
    merchandiseId: item.variantId,
    quantity: item.quantity,
  }));

  const data = await shopifyFetch<any>(CREATE_CART, { lines });
  return data.cartCreate.cart.checkoutUrl;
}

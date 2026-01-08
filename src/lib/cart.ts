import { shopifyFetch } from "@/lib/shopify"

const CREATE_CART = `
mutation CreateCart($variantId: ID!) {
  cartCreate(
    input: {
      lines: [{ quantity: 1, merchandiseId: $variantId }]
    }
  ) {
    cart {
      id
      checkoutUrl
    }
  }
}
`

export async function addToCart(variantId: string) {
  const data = await shopifyFetch<any>(CREATE_CART, { variantId })
  window.location.href = data.cartCreate.cart.checkoutUrl
}

const domain = import.meta.env.VITE_SHOPIFY_DOMAIN
const token = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN

const endpoint = `https://${domain}/api/2024-01/graphql.json`

export async function shopifyFetch<T>(
  query: string,
  variables?: Record<string, any>
): Promise<T> {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
  })

  const json = await res.json()

  if (json.errors) {
    console.error(json.errors)
    throw new Error("Shopify API error")
  }

  return json.data
}

import { useQuery } from "@tanstack/react-query"
import { shopifyFetch } from "@/lib/shopify"

const QUERY = `
query Products {
  products(first: 50) {
    edges {
      node {
        id
        title
        description
        productType
        images(first: 1) {
          edges {
            node {
              url
            }
          }
        }
        variants(first: 1) {
          edges {
            node {
              id
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  }
}
`

export function useShopifyProducts() {
  return useQuery({
    queryKey: ["shopify-products"],
    queryFn: async () => {
      const data = await shopifyFetch<any>(QUERY)

      return data.products.edges.map((e: any) => {
        const p = e.node
        return {
          id: p.id,
          name: p.title,
          description: p.description,
          category: p.productType || "Other",
          image: p.images.edges[0]?.node.url,
          price: p.variants.edges[0].node.price.amount,
          currency: p.variants.edges[0].node.price.currencyCode,
          variantId: p.variants.edges[0].node.id,
        }
      })
    },
  })
}

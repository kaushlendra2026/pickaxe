import { useQuery } from "@tanstack/react-query"
import { shopifyFetch } from "@/lib/shopify"

const PRODUCTS_QUERY = `
query Products {
  products(first: 12) {
    edges {
      node {
        id
        title
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

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const data = await shopifyFetch<any>(PRODUCTS_QUERY)
      return data.products.edges.map((e: any) => e.node)
    },
  })
}

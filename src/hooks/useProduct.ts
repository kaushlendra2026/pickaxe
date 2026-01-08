import { useEffect, useState } from "react"
import { shopifyFetch } from "@/lib/shopify"
import { PRODUCTS_QUERY } from "@/lib/queries"

export function useProducts() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    shopifyFetch<any>(PRODUCTS_QUERY).then((data) => {
      setProducts(data.products.edges.map((e: any) => e.node))
      setLoading(false)
    })
  }, [])

  return { products, loading }
}

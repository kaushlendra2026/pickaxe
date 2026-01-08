import { useProducts } from "@/hooks/useProducts"
import { addToCart } from "@/lib/cart"

export default function ProductGrid() {
  const { products, loading } = useProducts()

  if (loading) return <p>Loading products...</p>

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map((product) => {
        const variant = product.variants.edges[0].node

        return (
          <div key={product.id} className="border p-4 rounded-xl">
            <img
              src={product.images.edges[0]?.node.url}
              alt={product.title}
              className="rounded mb-3"
            />

            <h3 className="font-semibold">{product.title}</h3>
            <p className="text-sm opacity-70 mb-2">
              {variant.price.amount} {variant.price.currencyCode}
            </p>

            <button
              onClick={() => addToCart(variant.id)}
              className="bg-black text-white px-4 py-2 rounded"
            >
              Add to cart
            </button>
          </div>
        )
      })}
    </div>
  )
}

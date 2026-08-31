import { getAllProducts } from "@/lib/shopify";

export default async function HomePage() {
  // This fetches the live data from your Shopify store
  const products = await getAllProducts();

  return (
    <main className="min-h-screen p-10 bg-aurel-cream text-aurel-charcoal">
      <h1 className="text-4xl font-serif mb-8 text-aurel-dark">
        AUREL Skincare
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product: any) => {
          const imageUrl = product.images.edges[0]?.node?.url;

          return (
            <div
              key={product.id}
              className="border border-aurel-beige p-4 bg-white rounded-lg shadow-sm animate-fade-in"
            >
              {imageUrl && (
                <div className="relative w-full aspect-square mb-4">
                  {/* Using a standard HTML img tag for quick testing */}
                  <img
                    src={imageUrl}
                    alt={product.title}
                    className="object-cover w-full h-full rounded-md"
                  />
                </div>
              )}
              <h2 className="font-semibold text-lg font-sans">
                {product.title}
              </h2>
              <p className="text-gray-600 mt-2">
                {product.priceRange.minVariantPrice.currencyCode}{" "}
                {product.priceRange.minVariantPrice.amount}
              </p>
            </div>
          );
        })}
      </div>
    </main>
  );
}
// app/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import { getAllProducts } from '@/lib/shopify';
import { formatPrice } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

export default async function Home() {
  const products = await getAllProducts();
  
  // Get first 8 products for the grid
  const featuredProducts = products.slice(0, 8);

  return (
    <main className="min-h-screen">
      {/* HERO SECTION - We'll build this properly on Day 3 */}
      <section className="relative h-[70vh] bg-aurel-beige/30 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-5xl md:text-7xl text-aurel-dark tracking-wider">
            AUREL
          </h1>
          <p className="mt-4 text-lg text-gray-600 tracking-wide">
            Modern skincare. Simple routines. Premium ingredients.
          </p>
          <Link
            href="/products"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-aurel-dark px-8 py-3 text-sm font-medium text-white hover:bg-aurel-gold transition-colors"
          >
            Explore the Collection
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-serif text-3xl text-aurel-dark">Featured Products</h2>
              <p className="mt-1 text-sm text-gray-500">Our most loved skincare essentials</p>
            </div>
            <Link
              href="/products"
              className="flex items-center gap-1 text-sm font-medium text-aurel-dark hover:text-aurel-gold transition-colors"
            >
              View All
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featuredProducts.map((product: any) => {
              const image = product.images.edges[0]?.node;
              const price = product.priceRange.minVariantPrice;
              
              return (
                <Link
                  key={product.id}
                  href={`/products/${product.handle}`}
                  className="group"
                >
                  <div className="relative overflow-hidden rounded-lg bg-aurel-beige/10 transition-transform duration-300 group-hover:scale-[1.02]">
                    {image ? (
                      <div className="relative aspect-[3/4]">
                        <Image
                          src={image.url}
                          alt={image.altText || product.title}
                          fill
                          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          priority={false}
                        />
                      </div>
                    ) : (
                      <div className="aspect-[3/4] bg-aurel-beige/20 flex items-center justify-center">
                        <span className="text-sm text-gray-400">No image</span>
                      </div>
                    )}
                    
                    {/* Quick Add Button (appears on hover) */}
                    <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/60 via-black/30 to-transparent p-4 transition-transform duration-300 group-hover:translate-y-0">
                      <button
                        className="w-full rounded-full bg-white px-4 py-2 text-sm font-medium text-aurel-dark hover:bg-aurel-gold hover:text-white transition-colors"
                      >
                        Quick Add
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 space-y-1">
                    <h3 className="text-sm font-medium text-aurel-dark group-hover:text-aurel-gold transition-colors line-clamp-1">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {formatPrice(price.amount, price.currencyCode)}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* BRAND PHILOSOPHY - Quick preview for Day 3 */}
      <section className="bg-aurel-beige/20 py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl text-aurel-dark">Simple. Effective. Premium.</h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            AUREL is built on the belief that great skincare doesn't need to be complicated. 
            We combine premium ingredients with minimalist routines for real results.
          </p>
        </div>
      </section>
    </main>
  );
}
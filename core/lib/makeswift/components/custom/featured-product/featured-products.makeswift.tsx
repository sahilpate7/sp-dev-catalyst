'use client';

import useSWR from 'swr';
import { z } from 'zod';

import { Image } from '~/components/image';
import { Link } from '~/components/link';

interface props {
  entityId?: string;
}

interface ProductData {
  name: string;
  defaultImage: {
    altText: string;
    url: string;
  } | null;
  path: string;
}

interface ProductItem {
  entityId?: string;
}

interface ProductsProp {
  products: ProductItem[];
  heading: string;
}

const ProductDataSchema = z.object({
  name: z.string(),
  path: z.string(),
  defaultImage: z
    .object({
      altText: z.string(),
      url: z.string(),
    })
    .nullable(),
});

function ProductCard({ entityId }: props) {
  const { data, isLoading } = useSWR<ProductData | null>(
    entityId ? `/api/products/${entityId}` : null,
    async (url: string) => {
      const response = await fetch(url);
      const result = ProductDataSchema.safeParse(await response.json());

      return result.success ? result.data : null;
    },
  );

  if (!entityId || isLoading || !data) {
    return <p>Product not found</p>;
  }

  return (
    <article data-entity-id={entityId}>
      <Link className="relative block aspect-square overflow-hidden rounded-lg" href={data.path}>
        {data.defaultImage && (
          <Image
            alt={data.defaultImage.altText}
            className="w-full transition hover:scale-125"
            fill
            src={data.defaultImage.url}
          />
        )}
      </Link>
      <div className="mt-2 block px-1 text-center text-2xl font-medium">{data.name}</div>
    </article>
  );
}

export function FeatureProducts({ products, heading }: ProductsProp) {
  return (
    <div className="mx-auto w-full max-w-[var(--section-max-width-2xl,1536px)] px-4 py-10 @4xl:px-8 @4xl:py-20 lg:px-6 xl:py-14">
      <h2 className="mb-5 text-5xl font-bold">{heading}</h2>
      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard entityId={product.entityId} key={product.entityId} />
        ))}
      </div>
    </div>
  );
}

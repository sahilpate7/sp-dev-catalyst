import { Combobox, Group, List, TextInput } from '@makeswift/runtime/controls';

import { runtime } from '~/lib/makeswift/runtime';

import { searchProducts } from '../../../utils/search-products';

import { FeatureProducts } from './featured-products.makeswift';

interface ProductControlItem {
  entityId?: {
    label?: string;
  };
}

const isProductControlItem = (value: unknown): value is ProductControlItem => {
  return typeof value === 'object' && value !== null;
};

runtime.registerComponent(FeatureProducts, {
  type: 'custom-my-feature-products',
  label: 'Custom / Feature Products',
  props: {
    heading: TextInput({ label: 'Heading', defaultValue: 'Feature Products' }),
    products: List({
      label: 'Add product',
      type: Group({
        label: 'Product details',
        props: {
          entityId: Combobox({
            label: 'Select product',
            async getOptions(query) {
              const products = await searchProducts(query);

              return products.map((product) => ({
                id: product.entityId.toString(),
                label: product.name,
                value: product.entityId.toString(),
              }));
            },
          }),
        },
      }),
      getItemLabel(item: unknown) {
        if (!isProductControlItem(item)) {
          return 'No product Selected';
        }

        return typeof item.entityId?.label === 'string'
          ? item.entityId.label
          : 'No product Selected';
      },
    }),
  },
});

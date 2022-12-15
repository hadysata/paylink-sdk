import { Product } from '../../types/product';

export class Database {
  static products: Product[] = [
    {
      id: '1',
      name: 'Pineapple Ice cream',
      description: 'Very nice pineapple ice cream!',
      price: 10.00,
    },

    {
        id: '2',
        name: 'Mango Ice cream',
        description: 'Very nice ice cream!',
        price: 8.00,
      },

      {
        id: '3',
        name: 'Water bottle',
        description: 'Just a little bottle of water',
        price: 5.5,
      },
  ];
}

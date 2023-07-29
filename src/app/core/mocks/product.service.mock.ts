import { Product } from "@core/models/product";
import { ProductService } from "@core/services";

export const productServiceMock: Partial<ProductService> = {
    mapBookToProduct: jest.fn()
  };

  export const mockProduct: Product = {
    name: 'Ciudad de Hueso',
    description: 'Una emocionante historia de fantasía llena de aventuras y misterios.',
    regular_price: 12.99,
    stock_quantity: 10,
    stock_status: 'En Stock',
    images: {
      cover: 'assets/images/ciudad-de-hueso.jpg',
      otherImages: ['assets/images/ciudad-de-hueso.jpg', 'assets/images/ciudad-de-hueso-2.jpg'],
    },
    meta_data: {
      ISBN: '9788408172619',
      Author: 'Cassandra Clare',
      Publisher: 'Destino',
      isNew: true,
      isHardcover: false,
      isActive: true,
    },
    attributes: {
      genre: [],
    },
    manage_stock: true,
    status: 'publish',
  };
  

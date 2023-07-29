import { Book } from "@core/models/book";
import { BookService } from "@core/services";

export const bookServiceMock: Partial<BookService> = {
    getInventorySeverity: jest.fn(),
    mapProductToBook: jest.fn()
  };

export const mockBook1: Book = {
    isbn: '9788408172619',
    title: 'Ciudad de Hueso',
    author: 'Cassandra Clare',
    genre: [],
    publisher: 'Destino',
    price: 12.99,
    inventoryStatus: 'En Stock',
    id: 1,
    synopsis: 'Una emocionante historia de fantasía llena de aventuras y misterios.',
    availableUnits: 10,
    cover: 'assets/images/ciudad-de-hueso.jpg',
    images: ['assets/images/ciudad-de-hueso.jpg', 'assets/images/ciudad-de-hueso-2.jpg'],
    isNew: true,
    isHardcover: false,
    isActive: true
  }

export const mockBook2: Book =   {
    isbn: '9788416858246',
    title: 'El Hobbit',
    author: 'J.R.R. Tolkien',
    genre: [],
    publisher: 'Minotauro',
    price: 9.99,
    inventoryStatus: 'En Stock',
    id: 2,
    synopsis: 'Un relato épico de aventuras y valentía en un mundo fantástico.',
    availableUnits: 5,
    cover: 'assets/images/el-hobbit.jpg',
    images: ['assets/images/el-hobbit.jpg', 'assets/images/el-hobbit-2.jpg'],
    isNew: false,
    isHardcover: true,
    isActive: true
  }

export const mockBook3: Book = {
    isbn: '9788423348738',
    title: 'Coraline',
    author: 'Neil Gaiman',
    genre: [],
    publisher: 'Bloomsbury',
    price: 7.99,
    inventoryStatus: 'Sin Stock',
    id: 3,
    synopsis: 'Una cautivadora y misteriosa historia sobre una niña que descubre una puerta misteriosa.',
    availableUnits: 0,
    cover: 'assets/images/coraline.jpg',
    images: ['assets/images/coraline.jpg'],
    isNew: false,
    isHardcover: false,
    isActive: false
  }

  
  
import { Book } from "@core/models/book";
import { Genre } from "@core/models/genre";
import { BookPropertyOption } from "@core/models/option";
import { BookService } from "@core/services";
import { of } from "rxjs";

export const mockGenres: Genre[] = [
  { id: 1, name: 'Fantasy', slug: 'fantasy' },
  { id: 2, name: 'Adventure', slug: 'adventure' },
]

export const mockBookProperyOptions: BookPropertyOption[] = [
  { key: 'TITLE', value: 'Titulo',required: true},
  { key: 'AUTHOR', value: 'Autor',required: false},
]

export const bookServiceMock: Partial<BookService> = {
  genreOptions: mockGenres,
  setBookData: jest.fn(),
  getInventorySeverity: jest.fn(),
  mapProductToBook: jest.fn(),
  createBook: jest.fn(),
  deactivateBook: jest.fn(),
  getAllBooks: jest.fn().mockReturnValue(of([])),
  getBookById: jest.fn(),
  getBookData: jest.fn(),
  getBookPropertyOptions: jest.fn().mockReturnValue(mockBookProperyOptions),
  getBooks: jest.fn().mockReturnValue(of([])),
  getFilteredBooks: jest.fn(),
  getGenreOptions: jest.fn(),
  postBatchOfBooks: jest.fn(),
  postBook: jest.fn(),
  postBooksInBatches: jest.fn(),

};

export const mockBook1: Book = {
    isbn: '9788408172619',
    title: 'Ciudad de Hueso',
    author: 'Cassandra Clare',
    genre: mockGenres,
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

  
  
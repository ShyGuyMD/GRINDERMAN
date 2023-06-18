export interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  publicationYear: number;
  publisher: string;
  price: number;
  inventoryStatus: string;
  cover?: string;
  images?: string[];
}

  
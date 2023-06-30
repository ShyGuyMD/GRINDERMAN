export interface Book {
  isbn: string;
  title: string;
  author: string;
  genre: string;
  publisher: string;
  price: number;
  inventoryStatus?: string;  // good to have

  id?: number;
  synopsis?: string;
  availableUnits?: number;
  cover?: string;
  images?: string[];

  isNew: boolean;
  isHardcover: boolean;
  isActive: boolean;
}
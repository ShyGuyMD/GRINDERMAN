import { Component, OnInit } from '@angular/core';
import { Book } from '@core/models/book';
import { InventoryStatus } from '@shared/constants';

@Component({
  selector: 'app-book-catalog',
  templateUrl: './book-catalog.component.html',
  styleUrls: ['./book-catalog.component.css']
})
export class BookCatalogComponent implements OnInit {
  books: Book[] = []; // Replace with your own book array

  constructor() { }

  ngOnInit() {
    // Initialize your books array with data
    this.books = [
      {isbn: '1234567890',
      title: 'Book Title',
      author: 'Author Name',
      //genre: 'Book Genre',
      publisher: 'Publisher Name',
      price: 9.99,
      inventoryStatus: InventoryStatus.IN_STOCK,
      id: 1,
      synopsis: 'Book synopsis...',
      availableUnits: 10,
      cover: 'assets/images/placeholder.png',
      images: ['assets/images/placeholder.png', 'assets/images/placeholder.png'],
      isNew: true,
      isHardcover: false,
      isActive: true},
      {isbn: '1234567890',
      title: 'Book Title',
      author: 'Author Name',
      //genre: 'Book Genre',
      publisher: 'Publisher Name',
      price: 9.99,
      inventoryStatus: InventoryStatus.IN_STOCK,
      id: 1,
      synopsis: 'Book synopsis...',
      availableUnits: 10,
      cover: 'assets/images/placeholder.png',
      images: ['assets/images/placeholder.png', 'assets/images/placeholder.png'],
      isNew: true,
      isHardcover: false,
      isActive: true},
      {isbn: '1234567890',
      title: 'Book Title',
      author: 'Author Name',
      //genre: 'Book Genre',
      publisher: 'Publisher Name',
      price: 9.99,
      inventoryStatus: InventoryStatus.IN_STOCK,
      id: 1,
      synopsis: 'Book synopsis...',
      availableUnits: 10,
      cover: 'assets/images/placeholder.png',
      images: ['assets/images/placeholder.png', 'assets/images/placeholder.png'],
      isNew: true,
      isHardcover: false,
      isActive: true},
      {isbn: '1234567890',
      title: 'Book Title',
      author: 'Author Name',
     //genre: 'Book Genre',
      publisher: 'Publisher Name',
      price: 9.99,
      inventoryStatus: InventoryStatus.IN_STOCK,
      id: 1,
      synopsis: 'Book synopsis...',
      availableUnits: 10,
      cover: 'assets/images/placeholder.png',
      images: ['assets/images/placeholder.png', 'assets/images/placeholder.png'],
      isNew: true,
      isHardcover: false,
      isActive: true},
      {isbn: '1234567890',
      title: 'Book Title',
      author: 'Author Name',
      //genre: 'Book Genre',
      publisher: 'Publisher Name',
      price: 9.99,
      inventoryStatus: InventoryStatus.IN_STOCK,
      id: 1,
      synopsis: 'Book synopsis...',
      availableUnits: 10,
      cover: 'assets/images/placeholder.png',
      images: ['assets/images/placeholder.png', 'assets/images/placeholder.png'],
      isNew: true,
      isHardcover: false,
      isActive: true},
      {isbn: '1234567890',
      title: 'Book Title',
      author: 'Author Name',
      //genre: 'Book Genre',
      publisher: 'Publisher Name',
      price: 9.99,
      inventoryStatus: InventoryStatus.IN_STOCK,
      id: 1,
      synopsis: 'Book synopsis...',
      availableUnits: 10,
      cover: 'assets/images/placeholder.png',
      images: ['assets/images/placeholder.png', 'assets/images/placeholder.png'],
      isNew: true,
      isHardcover: false,
      isActive: true},
      
      // Add more books as needed
    ];
  }

  addToCart(book: Book) {
    // Implement your logic to add the book to the cart
    console.log('Book added to cart:', book);
  }
}

import { Component } from '@angular/core';
import { Book } from '@core/models/book';

@Component({
  selector: 'app-style-template',
  templateUrl: './style-template.component.html',
  styleUrls: ['./style-template.component.css']
})
export class StyleTemplateComponent {

  public checked: boolean = false;
  public items!: any[];
  public images!: any[];
  public books!: Book[];
  public formData: any = {};

  ngOnInit() {
    this.items = [
      { label: 'Inicio' },
      { label: 'Productos' },
      { label: 'Libros' },
      { label: 'Ficción' },
      { label: 'Ciencia Ficción' }
    ];

    this.images = [
      { source: 'assets/images/placeholder-small.jpg', alt: 'Imagen 1', title: 'Imagen 1' },
      { source: 'assets/images/placeholder-small.jpg', alt: 'Imagen 2', title: 'Imagen 2' },
      { source: 'assets/images/placeholder-small.jpg', alt: 'Imagen 3', title: 'Imagen 3' },
      { source: 'assets/images/placeholder-small.jpg', alt: 'Imagen 4', title: 'Imagen 4' }
    ];

    this.books = [
      {
        id: 1,
        title: 'One Hundred Years of Solitude',
        author: 'Gabriel Garcia Marquez',
        genre: 'Novel',
        publicationYear: 1967,
        publisher: 'Harper Perennial',
        price: 15.99,
        inventoryStatus: 'IN_STOCK',
        cover: 'assets/images/placeholder-small.jpg'
      },
      {
        id: 2,
        title: 'Don Quixote',
        author: 'Miguel de Cervantes Saavedra',
        genre: 'Novel',
        publicationYear: 1605,
        publisher: 'Penguin Classics',
        price: 12.99,
        inventoryStatus: 'OUT_OF_STOCK',
        cover: 'assets/images/placeholder-small.jpg'
      },
      {
        id: 3,
        title: 'Catch-22',
        author: 'Joseph Heller',
        genre: 'Satire',
        publicationYear: 1961,
        publisher: 'Simon & Schuster',
        price: 9.99,
        inventoryStatus: 'IN_STOCK',
        cover: 'assets/images/placeholder-small.jpg'
      },
      {
        id: 4,
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        genre: 'Novel',
        publicationYear: 1960,
        publisher: 'Harper Perennial',
        price: 14.99,
        inventoryStatus: 'IN_STOCK',
        cover: 'assets/images/placeholder-small.jpg'
      },
      {
        id: 5,
        title: '1984',
        author: 'George Orwell',
        genre: 'Dystopian Fiction',
        publicationYear: 1949,
        publisher: 'Penguin Books',
        price: 11.99,
        inventoryStatus: 'IN_STOCK',
        cover: 'assets/images/placeholder-small.jpg'
      }
    ];
    
  }

  confirmDialog() {
    // Implement your confirm dialog logic here
  }

  getSeverity(book: Book): string {
    if (book.inventoryStatus === 'OUTOFSTOCK') {
      return 'danger';
    } else if (book.inventoryStatus === 'LOWSTOCK') {
      return 'warn';
    } else {
      return 'success';
    }
  }

  submitForm() {
    // Handle form submission logic here
    console.log('Form submitted:', this.formData);
  }
  
}

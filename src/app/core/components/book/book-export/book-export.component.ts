import { Component } from '@angular/core';
import { Book } from '@core/models/book';
import { BookService } from '@core/services';
import { ExcelService } from '@core/services/excel-service/excel.service';

@Component({
  selector: 'app-book-export',
  templateUrl: './book-export.component.html',
  styleUrls: ['./book-export.component.css']
})
export class BookExportComponent {
  books : Book[] = []
  totalRecords: number = 0;
  rowsPerPage: number = 10;
  currentPage: number = 1;
  isLoading : boolean = true; 
  constructor(private _excelService: ExcelService, private _bookService: BookService) {}

  ngOnInit(){
    this._bookService.getAllBooks().subscribe( (response) => {
      console.log(response);
      this.books = response;
      this.totalRecords = response.length;
      this.isLoading = false;
    })
  }
  onPageChange(event: any): void {
    this.currentPage = event.page + 1;
  }
  exportToExcel(): void {
    this._excelService.exportBooksToExcel(this.books);
  }
  listGenres(book:Book) {
    return book.genre.map((obj: any) => obj.name).join(', ');
  }
}

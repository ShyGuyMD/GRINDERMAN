import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Book } from '@core/models/book';
import {
  BookService,
  NavigationService,
} from '@core/services';
import { WordpressService } from '@core/services/wp-service/wordpress.service';
import { BOOK_DETAIL, Severity } from '@shared/constants';
import { MessageService } from 'primeng/api';
import { lastValueFrom } from 'rxjs';
@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css'],
})
export class BookCreateComponent {
  public bookForm!: FormGroup;

  public genreOptions: any[] = [];
  public uploadedFiles: any[] = [];
  
  public isLoading: boolean = true;
  public multipleAdd: boolean = false;

  public book: Book = {
    isbn: '',
    title: '',
    author: '',
    genre: [],
    publisher: '',
    price: 0,
    availableUnits: 1,
    isActive: true,
    isHardcover: false,
    isNew: false,
  };


  constructor(
    private _formBuilder: FormBuilder,
    private _navigationService: NavigationService,
    private _bookService: BookService,
    private _wpService: WordpressService,
    private _messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this._bookService.getGenreOptions().subscribe((response) => {
      this.genreOptions = response;
      this.isLoading = false;
    });
  }

  private initForm(): void {
    this.bookForm = this._formBuilder.group({
      isbn: [''],
      title: ['', Validators.required],
      author: ['', Validators.required],
      genre: [[]],
      publisher: [''],
      synopsis: [''],
      price: [0, Validators.required],
      availableUnits: [1],
      isHardcover: [false],
      isNew: [false],
      isActive: [true],
      cover: [''],
    });
  }

  public async save() {
    if (this.bookForm.invalid) {
      this._messageService.add({
        severity: Severity.WARNING,
        summary: 'Advertencia',
        detail: 'Asegúrate de completar los campos obligatorios.',
      });
      return;
    }
    this.isLoading = true;
    this.bookForm.disable();
    this.assignInputToBook();
    if(this.uploadedFiles.length > 0) {
      await this.assignImagesToBook();
    }
    this.post();
  }

  private post() {
    this._bookService.postBook(this.book).subscribe({
      next: (v) => {
        if (!this.multipleAdd) {
          const url = BOOK_DETAIL.slice(0, -3);
          this._navigationService.navigateTo(`${url}${v.id}`);
        }
      },
      error: (e) => {
        this._messageService.add({
          severity: Severity.ERROR,
          summary: '¡Upss!',
          detail: 'Ha ocurrido un error.',
        });
      },
      complete: () => {
        this._messageService.add({
          severity: Severity.SUCCESS,
          summary: '',
          detail: `${this.book.title} ha sido ingresado al sistema.`,
        });
        this.cleanup();
      },
    });
  }

  public saveAndContinue(){
    this.multipleAdd = true;
    this.save();
  }

  private cleanup() {
    this.bookForm.enable();
    this.bookForm.reset();
    this.uploadedFiles = [];
    this.isLoading = false;
    this.multipleAdd = false;
  }

  onFileSelect(event: any) {
    if (event.target.files && event.target.files.length) {
      for (let file of event.target.files) {
        file.objectURL = URL.createObjectURL(file);
        if (this.uploadedFiles.length === 0) {
          file.isCover = true;
        }
        this.uploadedFiles.push(file);
      }
    }
  }

  setAsCover(file: any): void {
    this.uploadedFiles.forEach((uploadedFile) => {
      uploadedFile.isCover = false;
    });

    file.isCover = true;

    const index = this.uploadedFiles.indexOf(file);
    if (index !== -1) {
      this.uploadedFiles.splice(index, 1);
      this.uploadedFiles.unshift(file);
    }
  }

  removeFile(file: any): void {
    const index = this.uploadedFiles.indexOf(file);
    if (index !== -1) {
      this.uploadedFiles.splice(index, 1);
    }
  }

  private assignInputToBook(): void {
    this.book.title = this.bookForm.value.title;
    this.book.isbn = this.bookForm.value.isbn;
    this.book.author = this.bookForm.value.author;
    this.book.publisher = this.bookForm.value.publisher;
    this.book.synopsis = this.bookForm.value.synopsis;
    this.book.price = this.bookForm.value.price;
    this.book.availableUnits = this.bookForm.value.availableUnits;
    this.book.genre = this.bookForm.value.genre;
    this.book.isActive = this.bookForm.value.isActive;
    this.book.isHardcover = this.bookForm.value.isHardcover;
    this.book.isNew = this.bookForm.value.isNew;
  }
  private async assignImagesToBook(): Promise<void> {
    const srcImages: any[] = [];
    try {
      const responses = await lastValueFrom(this._wpService.uploadImagesToWordpress(this.uploadedFiles));
      console.log('upload images response: ', responses);
      if (responses) {
        srcImages.push(...responses.map((response) => ({ id: response?.id })));
      }
    } catch (error) {
      this._messageService.add({
        icon: 'pi pi-images',
        severity: Severity.WARNING,
        summary: 'Advertencia',
        detail: `Error en el procesamiento de las imágenes.`,
      });
    }

    this.book.images = srcImages;
  }
}

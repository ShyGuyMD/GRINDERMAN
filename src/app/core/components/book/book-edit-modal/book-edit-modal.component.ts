import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from '@core/models/book';
import { Genre } from '@core/models/genre';
import {
  BookService,
  ProductService,
  UtilsService,
  WooCommerceApiService,
} from '@core/services';
import { WordpressService } from '@core/services/wp-service/wp-service.service';
import { Severity } from '@shared/constants';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FileUpload } from 'primeng/fileupload';
import { lastValueFrom, map } from 'rxjs';

@Component({
  selector: 'app-book-edit-modal',
  templateUrl: './book-edit-modal.component.html',
  styleUrls: ['./book-edit-modal.component.css'],
})
export class BookEditModalComponent {
  public bookForm!: FormGroup;
  public uploadedFiles: any[] = [];

  id!: number;
  book!: Book;
  isLoading: boolean = true;
  isSaving: boolean = false;

  genreOptions: Genre[] = [];

  @ViewChild('fileUpload') fileUpload!: FileUpload;

  constructor(
    private _bookService: BookService,
    private _formBuilder: FormBuilder,
    private _utilService: UtilsService,
    private _ref: DynamicDialogRef,
    private _config: DynamicDialogConfig,
    private _wpService: WordpressService,
    private _messageService: MessageService
  ) {}

  ngOnInit() {
    this.id = this._config.data.bookId;
    this.book = this._utilService.cloneObject(this._config.data.bookData);
    this.initForm();
    this.bookForm.disable();
    this.initImages();
    this.bookForm.enable();

    this._bookService.getGenreOptions().subscribe((response : Genre[]) => {
        this.genreOptions = response;
        if(response.length > 0) {
          const mappedGenres = this.book.genre.map((genre: any) => {
            const matchedGenre = this.genreOptions.find(g => g.name === genre.name);
            return matchedGenre ? { id: matchedGenre.id, name: matchedGenre.name, slug: matchedGenre.slug } : null;
          }).filter(Boolean);
          this.book.genre = mappedGenres.length > 0 ? mappedGenres : [];
          this.bookForm.get('genre')?.setValue(this.book.genre);
          this.isLoading = false;
        }

    });
  }

  private initImages(): void {
    const fileImgs: any[] = []
    this.book.images.forEach((img: any) => {
      if(img.name !== 'placeholder'){
        let file : any = new File([img], img.name);
        file.id = img.id;
        file.objectURL = img.src;
        console.log(file);
        fileImgs.push(file)
      }
    });
    if(fileImgs.length > 0){
      fileImgs[0].isCover = true;
    }
    this.uploadedFiles = fileImgs;
  }

  private initForm(): void {
    this.bookForm = this._formBuilder.group({
      isbn: [this.book.isbn],
      title: [this.book.title, Validators.required],
      author: [this.book.author, Validators.required],
      genre: [this.book.genre],
      publisher: [this.book.publisher],
      synopsis: [this.book.synopsis],
      price: [this.book.price, Validators.required],
      availableUnits: [this.book.availableUnits],
      isHardcover: [this.book.isHardcover],
      isNew: [this.book.isHardcover],
      isActive: [this.book.isActive],
    });
  }

  async save() {
    if (this.bookForm.invalid) {
      this._messageService.add({
        severity: Severity.WARNING,
        summary: 'Advertencia',
        detail: 'Asegúrate de completar los campos obligatorios.',
      });
      return;
    }

    this.isSaving= true;
    this.bookForm.disable();
    this.assignInputToBook();
    await this.assignImagesToBook();
    console.log("book", this.book);
    this.put();
  }

  private put(){
    this._bookService.putBook(this.book).subscribe({
      next: (v) => {
        this._messageService.add({
          severity: Severity.SUCCESS,
          summary: '',
          detail: `Se han guardado los cambios a ${this.book.title}.`,
        });
      },
      error: (e) => {
        this._messageService.add({
          severity: Severity.ERROR,
          summary: '¡Upss!',
          detail: 'Ha ocurrido un error.',
        });
      },
      complete: () => {

        this.isSaving = false;
        this._ref.close(true);
      }
    }
    
  )}
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
    this.book.price = this.bookForm.value.price;
    this.book.synopsis = this.bookForm.value.synopsis;
    this.book.availableUnits = this.bookForm.value.availableUnits;
    this.book.genre = this.bookForm.value.genre;
    this.book.isActive = this.bookForm.value.isActive;
    this.book.isHardcover = this.bookForm.value.isHardcover;
    this.book.isNew = this.bookForm.value.isNew;
    this.book.publisher = this.bookForm.value.publisher;
  }
  private async assignImagesToBook(): Promise<void> {
    const srcImages: any[] = [];
    try {
      for (const uploadedFile of this.uploadedFiles) {
        if (uploadedFile.id) {
            // If the file already has an 'id', use it.
            srcImages.push({ id: uploadedFile.id });
        } else {
            // If the file doesn't have an 'id', upload it and get the response.
            const response = await lastValueFrom(this._wpService.uploadImagesToWordpress([uploadedFile]));
            if (response[0]?.id) {
                srcImages.push({ id: response[0]?.id });
            }
        }
    }
    } catch (error) {
      console.log(error);
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

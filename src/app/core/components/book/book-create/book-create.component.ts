import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '@core/models/book';
import { WooCommerceApiService } from '@core/services';
import { Attributes } from '@shared/constants';
import { mergeMap } from 'rxjs/operators';
@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css'],
})
export class BookCreateComponent {

  @ViewChild('bookForm') bookForm!: NgForm;

  genreOptions: any[] = [];
  uploadedFiles: any[] = [];
  book: Book = {
    isbn: '',
    title: '',
    author: '',
    genre: [],
    publisher: '',
    price: 0,
    isActive: true,
    isHardcover: false,
    isNew: false
  };

  isLoading: boolean = true;

  constructor(
    private _wooCommerceAPIService: WooCommerceApiService,
    private _route: ActivatedRoute,
    private _router: Router,) {}

  ngOnInit() : void {

      this._wooCommerceAPIService.getProductAttributes().pipe(
          mergeMap((productAttributesResponse: any) => {
              const genreAttr = productAttributesResponse.find((item: any) => item.name = Attributes.ATTR_GENRE);
              return this._wooCommerceAPIService.getProductAttributeTerms(genreAttr.id);
          })
      ).subscribe({
          next: (productAttrTermsResponse) => {
            const transformedTerms = productAttrTermsResponse.map(
                ({id, name, slug} : any) => ({id, name, slug})
            );
            
            this.genreOptions = [...transformedTerms];
            this.isLoading = false;
          },
          error: (e) => {
              console.log('Error in getting Terms: ', e);
          }
      });
  }

  save(redirect: boolean = true) {
    console.log('clicked on save!');
    this._wooCommerceAPIService.postProduct(this.book).subscribe({
      next: (v) => {
        console.log('submitting: ', this.book);
        console.log('response: ', v);
        // TODO: REDIRECT TO DETAIL?
      },
      error: (e) => {
        const errorMessage = 'Error retrieving product.';
        console.log('error: ', e);
        this._router.navigate(['/blank'], { queryParams: { error: errorMessage } });
      }
    });
  }

  cleanup() {
    console.log('clicked on save and new!');
    this.save(false);
    this.bookForm.resetForm();
  }

  onFileSelect(event: any) {
    if (event.files && event.files.length) {
      for (let file of event.files) {
        if (this.book.images) {
          this.book.images.push(file);
        }
      }
    }
  }

}

import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { Subcategory } from '../../models/subcategory';
import { SubcategoryService } from '../../services/subcategory.service';
import { AngularFireStorage } from "@angular/fire/compat/storage"
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-updateproduct',
  templateUrl: './updateproduct.component.html',
  styleUrls: ['./updateproduct.component.css']
})


export class UpdateproductComponent {

  newproduct: Product = new Product();
  categories: Category[];
  subcategories: Subcategory[];
  colors = ["white", "black", "blue", "red", "green", "orange", "yellow", "grey"];
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '12rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',

  };
  filesImageCover: File[] = [];
  files: File[] = [];
  urls: string[] = [];
  id: object;
  subcategoriesFiltred: Subcategory[];
  htmlContent = "";
  imageUrls: string[]




  constructor(private proserv: ProductService,
    private router: Router,
    private catserv: CategoryService,
    private subcatser: SubcategoryService,
    private route: ActivatedRoute,
    private fireStorage: AngularFireStorage,
    private http: HttpClient) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.proserv.GetProduct(this.id).subscribe
      (data => {
        this.newproduct = data
        this.imageUrls = this.newproduct.images;
        this.imageUrls.forEach(imageUrl => {
          this.loadImage(imageUrl).subscribe(blob => {
            const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
            this.files.push(file);
          }); });

            this.loadImage(this.newproduct.imageCover.toString()).subscribe(blob => {
              const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
              this.filesImageCover.push(file);
            });

      });
    this.Loadcategories();
    this.Loadsubcategories();

  }

  loadImage(imageUrl: string): Observable<Blob> {
    return this.http.get(imageUrl, { responseType: 'blob' });
  }


  updateproduct() {
    let priceAfterSold = this.newproduct.price * (1 - (this.newproduct.sold / 100));
    this.newproduct.priceAfterDiscount = parseFloat(priceAfterSold.toFixed(2));
    return this.proserv.UpdateProduct(this.id, this.newproduct).subscribe(data => { this.router.navigate(['/products']) ;
    Swal.fire({
      title: 'Product Updated',
      icon: 'success',
      confirmButtonText: 'OK'
    }) });
  }

  Loadcategories() {
    return this.catserv.LoadCategories().subscribe(data => this.categories = data),
      (err: any) => console.log(err)
  }
  Loadsubcategories() {
    return this.subcatser.LoadSubcategories().subscribe(data => this.subcategories = data),
      (err: any) => console.log(err)
  }

  onSubcategoryChange(event: Event) {
    // add a null check before accessing the value property of event.target
    const target = event.target as HTMLSelectElement;
    if (target) {
      const subcategoryId = target.value;
      // find the selected subcategory
      const selectedSubcategory = this.subcategories.find(subcategory => subcategory._id.toString() === subcategoryId);
      // update newproduct.category
      if (selectedSubcategory) {
        this.newproduct.category = selectedSubcategory.category;
      }
    }
  }


  onCategoryChange(event: Event) {
    // add a null check before accessing the value property of event.target
    const target = event.target as HTMLSelectElement;
    if (target) {
      const categoryId = target.value;
      console.log(categoryId)
      // find subcategories of category selected
      this.subcategoriesFiltred = this.subcategories.filter(subcategory => subcategory.category.toString() == categoryId);

    }
  }

  async onSelectImageCover(event: any) {
    console.log(event);
    this.filesImageCover = event.addedFiles;

    const urls: string[] = [];

    // Perform any actions with the selected files
    // For example, upload them to Firebase Storage
    for (const file of this.filesImageCover) {
      const path = `productimages/${file.name}-${Math.random()}`;
      const uploadTask = await this.fireStorage.upload(path, file);
      const url = await uploadTask.ref.getDownloadURL();
      console.log(url);

      // Add the download URL to the array
      urls.push(url);
    }

    // Assign the array of URLs to the newproduct.images property
    this.newproduct.imageCover = urls[0];
  }


  onSelectImages(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  async FireBaseUploadImages() {
    // Perform any actions with the selected files
    // For example, upload them to Firebase Storage
    for (const file of this.files) {
      const path = `productimages/${file.name}-${Math.random()}`;
      const uploadTask = await this.fireStorage.upload(path, file);
      const url = await uploadTask.ref.getDownloadURL();
      console.log(url);

      // Add the download URL to the array
      this.urls.push(url);
    }

  }


  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  onRemoveImageCover(event: any) {
    console.log(event);
    this.filesImageCover.splice(this.filesImageCover.indexOf(event), 1);
  }


}


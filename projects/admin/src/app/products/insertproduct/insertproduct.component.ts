import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { Subcategory } from '../../models/subcategory';
import { SubcategoryService } from '../../services/subcategory.service';
import { AngularFireStorage } from "@angular/fire/compat/storage"
import { AngularEditorConfig } from '@kolkov/angular-editor';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-insertproduct',
  templateUrl: './insertproduct.component.html',
  styleUrls: ['./insertproduct.component.css']
})

export class InsertproductComponent {
  newproduct: Product = new Product();
  categories: Category[];
  subcategories: Subcategory[];
  subcategoriesFiltred: Subcategory[];
  colors = ["white", "black", "blue", "red", "green", "orange", "yellow", "grey"];
  htmlContent = "";
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
  submitButton : boolean=true;


  constructor(private proserv: ProductService,
    private router: Router,
    private catserv: CategoryService,
    private subcatser: SubcategoryService,
    private fireStorage: AngularFireStorage) { }

  ngOnInit() {
    this.Loadcategories();
    this.Loadsubcategories();
  }


async  Addproduct() {

    let priceAfterSold = this.newproduct.price * (1 - (this.newproduct.sold / 100));
    this.newproduct.priceAfterDiscount = parseFloat(priceAfterSold.toFixed(2));
     await this.FireBaseUploadImages();
    this.newproduct.images = this.urls;
   this.proserv.AddProduct(this.newproduct).subscribe(data => { this.router.navigate(['/products']) ;
   Swal.fire({
    title: 'Product Added',
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

 async onSelectImageCover(event:any) {
  console.log(event);
  this.filesImageCover=event.addedFiles;
  this.submitButton = false;
console.log( this.filesImageCover)
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
  this.newproduct.imageCover =urls[0];
  this.submitButton = true;
}


 onSelectImages(event:any) {
  console.log(event);

  this.files.push(...event.addedFiles);
 
  
}

 async FireBaseUploadImages(){
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



onRemove(event:any) {
  console.log(event);
  this.files.splice(this.files.indexOf(event), 1);
}






}
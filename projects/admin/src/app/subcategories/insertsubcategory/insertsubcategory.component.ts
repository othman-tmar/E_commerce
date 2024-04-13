import { Component } from '@angular/core';
import { Subcategory } from '../../models/subcategory';
import { Category } from '../../models/category';
import { SubcategoryService } from '../../services/subcategory.service';
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-insertsubcategory',
  templateUrl: './insertsubcategory.component.html',
  styleUrls: ['./insertsubcategory.component.css']
})
export class InsertsubcategoryComponent {
  newsubcategory: Subcategory = new Subcategory();
  categories: Category[];
  files: File[] = [];
  submitButton : boolean=true;
 

 

  constructor(private subcserv: SubcategoryService,
     private router: Router,
      private catserv: CategoryService,
       private fireStorage:AngularFireStorage) { }
  
     ngOnInit() {
    this.Loadcategories();
  
  }

 
  Addsubcategory() {

   
    return this.subcserv.AddSubcategory(this.newsubcategory).subscribe(data => { this.router.navigate(['/subcategories'])  ;
     Swal.fire({
      title: 'Subcategory Added',
      icon: 'success',
      confirmButtonText: 'OK'
    }) });
  
  }


  Loadcategories() {
    return this.catserv.LoadCategories().subscribe(data => this.categories = data),
      (err: any) => console.log(err)
  }


  async onSelect(event:any) {
    console.log(event);
    this.files=event.addedFiles;
    this.submitButton = false;
    const urls: string[] = [];
  
    // Perform any actions with the selected files
    // For example, upload them to Firebase Storage
    for (const file of this.files) {
      const path = `subcategoriesimages/${file.name}-${Math.random()}`;
      const uploadTask = await this.fireStorage.upload(path, file);
      const url = await uploadTask.ref.getDownloadURL();
      console.log(url);
  
      // Add the download URL to the array
      this.newsubcategory.image = url;
    }
    this.submitButton = true;
  }

  onRemove(event:any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  
    
  }

  

  
  

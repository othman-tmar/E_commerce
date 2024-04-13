import { Component } from '@angular/core';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from "@angular/fire/compat/storage";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-insertcategory',
  templateUrl: './insertcategory.component.html',
  styleUrls: ['./insertcategory.component.css']
})
export class InsertcategoryComponent {
  newcategory: Category = new Category();
  categories: Category[];
  files: File[] = [];
  submitButton : boolean=true;


 

  constructor(private serv: CategoryService, private router: Router,private fireStorage:AngularFireStorage) { }
  


 
  Addcategory() {

    return this.serv.AddCategory(this.newcategory).subscribe(data => { this.router.navigate(['/listcategories']);
    Swal.fire({
      title: 'Category Added',
      icon: 'success',
      confirmButtonText: 'OK'
    }) });
  }
  






  async onSelect(event:any) {
    console.log(event);
    this.files=event.addedFiles;
    this.submitButton = false;
    const urls: string[] = [];
  
    // Perform any actions with the selected files
    // For example, upload them to Firebase Storage
    for (const file of this.files) {
      const path = `categoriesimages/${file.name}-${Math.random()}`;
      const uploadTask = await this.fireStorage.upload(path, file);
      const url = await uploadTask.ref.getDownloadURL();
      console.log(url);
  
      // Add the download URL to the array
      this.newcategory.image = url;
    }
    this.submitButton = true;
  }

  onRemove(event:any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  
 
}

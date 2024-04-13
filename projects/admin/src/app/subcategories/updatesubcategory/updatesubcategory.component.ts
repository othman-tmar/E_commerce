import { Component } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Subcategory } from '../../models/subcategory';
import { SubcategoryService } from '../../services/subcategory.service';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-updatesubcategory',
  templateUrl: './updatesubcategory.component.html',
  styleUrls: ['./updatesubcategory.component.css']
})
export class UpdatesubcategoryComponent {
  newsubcategory: Subcategory = new Subcategory();
  categories: Category[];
  id:object;
  files: File[] = [];
  submitButton : boolean=true;
  imageSubcategoryUrl:string
  constructor(
    private subcatserv: SubcategoryService,
    private catserv: CategoryService,
     private router: Router,
        private route: ActivatedRoute,
        private fireStorage:AngularFireStorage,
        private http: HttpClient) { }

  ngOnInit() {
    this.Loadcategories();
    this.id=this.route.snapshot.params['id'];
    this.subcatserv.GetSubcategory(this.id).subscribe(data=>{this.newsubcategory=data;
      this.imageSubcategoryUrl=this.newsubcategory.image.toString();
      this.loadImage(this.imageSubcategoryUrl).subscribe(blob =>{
         const file = new File ([blob], 'image.jpg', { type: 'image/jpeg' });
         this.files.push(file);});
      });
}

loadImage(imageUrl: string): Observable<Blob> {
  return this.http.get(imageUrl, { responseType: 'blob' });
}


  Loadcategories() {
    return this.catserv.LoadCategories().subscribe(data => this.categories = data),
      (err: any) => console.log(err)
  }

  updatesubcategory() {
    return this.subcatserv.UpdateSubcategory(this.id,this.newsubcategory).subscribe(data => { this.router.navigate(['/subcategories']) });
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


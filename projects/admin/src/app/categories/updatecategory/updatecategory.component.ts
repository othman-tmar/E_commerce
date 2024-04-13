
import { Component } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-updatecategory',
  templateUrl: './updatecategory.component.html',
  styleUrls: ['./updatecategory.component.css']
})
export class UpdatecategoryComponent {
  newcategory: Category = new Category();
  id:object;
  files: File[] = [];
  imageCategoryUrl:string
  submitButton : boolean=true;

  constructor(
    private catserv: CategoryService,
     private router: Router,
        private route: ActivatedRoute,
        private fireStorage:AngularFireStorage,
        private http: HttpClient) { }

  ngOnInit() {
    this.id=this.route.snapshot.params['id'];
    this.catserv.GetCategory(this.id).subscribe(data=>{this.newcategory=data;
      this.imageCategoryUrl=this.newcategory.image.toString();
     this.loadImage(this.imageCategoryUrl).subscribe(blob =>{
        const file = new File ([blob], 'image.jpg', { type: 'image/jpeg' });
        this.files.push(file);
     })});
  }


  updatecategory() {
    return this.catserv.UpdateCategory(this.id,this.newcategory).subscribe(data => { this.router.navigate(['/subcategories']) ;
    Swal.fire({
      title: 'Category Updated',
      icon: 'success',
      confirmButtonText: 'OK'
    })});
  }

  loadImage(imageUrl: string): Observable<Blob> {
    return this.http.get(imageUrl, { responseType: 'blob' });
  }



  async onFileChange(event:any){
    const file = event.target.files[0]
    if(file){
      const path = `images/${file.name}-${Math.random()}`
      const uploadTask =await this.fireStorage.upload(path,file)
      const url = await uploadTask.ref.getDownloadURL()
      console.log(url)
      this.newcategory.image=url;
    }

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



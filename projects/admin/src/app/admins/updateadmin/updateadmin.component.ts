import { Component } from '@angular/core';
import { Admin } from '../../models/admin';
import { AdminService } from '../../services/admin.service';
import { HttpClient } from '@angular/common/http';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-updateadmin',
  templateUrl: './updateadmin.component.html',
  styleUrls: ['./updateadmin.component.css']
})
export class UpdateadminComponent {
  newAdmin: Admin = new Admin();
  id:string;
  submitButton : boolean=true;
  imageCategoryUrl:string
  files: File[] = [];
  roles  =["admin","vendor"]
  ID:object;
  constructor(
    private adminserv: AdminService,
     private router: Router,
        private route: ActivatedRoute,
        private fireStorage:AngularFireStorage,
        private http: HttpClient) { }

        ngOnInit() {
          this.ID=this.route.snapshot.params['id'];
    this.id=this.route.snapshot.params['id'];
    this.adminserv.GetAdmin(this.id).subscribe(data=>{this.newAdmin=data;
      this.imageCategoryUrl=this.newAdmin.avatar.toString();
      
     this.loadImage(this.imageCategoryUrl).subscribe(blob =>{
        const file = new File ([blob], 'image.jpg', { type: 'image/jpeg' });
        this.files.push(file);
     })})};

     ApdateAdmin() {
      return this.adminserv.UpdateAdmin(this.ID,this.newAdmin).subscribe(data => { this.router.navigate(['/admins&vendor']).then(f=>{location.reload()}) ;
      Swal.fire({
        title: 'Admin Updated',
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
        this.newAdmin.avatar=url;
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
        const path = `adminsimages/${file.name}-${Math.random()}`;
        const uploadTask = await this.fireStorage.upload(path, file);
        const url = await uploadTask.ref.getDownloadURL();
        console.log(url);
  
        // Add the download URL to the array
        this.newAdmin.avatar = url;
      }
      this.submitButton = true;
    }
  
    onRemove(event:any) {
      console.log(event);
      this.files.splice(this.files.indexOf(event), 1);
    }
  
}

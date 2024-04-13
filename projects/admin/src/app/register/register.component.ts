import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { AdminAuthService } from '../services/admin-auth.service';
import { NgForm } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Admin } from '../models/admin';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
    newAdmin: Admin = new Admin();
    files: File[] = [];
    submitButton : boolean=true;
    roles  =["admin","vendor"]
    constructor(
       
     
        private router: Router,
        private adminService: AdminService,
        private fireStorage:AngularFireStorage
        
      
    ) { }

    ngOnInit(): void  {}


  

    onSubmit() {
      console.log(this.newAdmin)
        this.adminService.singup(this.newAdmin)
            
             .subscribe({
                next: () => {
                    this.router.navigate(['/admins&vendor'], { queryParams: { registered: true }});
                    console.log(this.newAdmin)
                },
               
                
            });
            Swal.fire({
              title: 'Admin Added',
              icon: 'success',
              confirmButtonText: 'OK'
            }) 
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

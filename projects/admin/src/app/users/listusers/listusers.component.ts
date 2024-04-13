import { Component } from '@angular/core';
import { UserService } from 'projects/user/src/app/services/user.service';
import { User } from 'projects/user/src/app/models/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listusers',
  templateUrl: './listusers.component.html',
  styleUrls: ['./listusers.component.css']
})
export class ListusersComponent {
  users: User[];
  permission:string
  admin="admin";
  constructor(

    private userserv: UserService,
    ) { };

    ngOnInit(){
      this.ListUsers()
      setInterval(() => {
        this.permission =JSON.parse(localStorage.getItem("roles")|| '')
        },500)
    }

    ListUsers(){
      return this.userserv.LoadUsers().subscribe(data => {
         this.users = data;}),
         (err: any) => console.log(err);
     }


 
    
    deleteUser = (id: object) => {
      Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, cancel!'
      }).then((result) => {
          if (result.isConfirmed) {
            this.userserv.DeleteUser(id).subscribe(data =>{this.ListUsers();
                  Swal.fire(
                      'Deleted!',
                      'Your file has been deleted.',
                      'success'
                  )
              })
          }
      })
  }


}

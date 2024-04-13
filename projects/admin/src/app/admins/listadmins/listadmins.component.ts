import { Component } from '@angular/core';
import { Admin } from '../../models/admin';
import { AdminService } from '../../services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listadmins',
  templateUrl: './listadmins.component.html',
  styleUrls: ['./listadmins.component.css']
})
export class ListadminsComponent {
  admins :Admin[];

  dtOptions: DataTables.Settings = {
    searching: true,
  paging: true
  };




constructor( private adminserv: AdminService
 ) { };

ngOnInit() {

  this.LoadAdmins()

}

LoadAdmins() {
    return this.adminserv.LoadAdmins().subscribe(data =>
      this.admins = data),
      (err: any) => console.log(err)
  }
 
  DeleteAdmin = (id: object) => {
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
          this.adminserv.DeleteAdmin(id).subscribe(data =>{this.LoadAdmins();
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

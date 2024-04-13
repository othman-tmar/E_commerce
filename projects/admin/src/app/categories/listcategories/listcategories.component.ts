import { Component } from '@angular/core';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { SubcategoryService } from '../../services/subcategory.service';
import { DataTablesModule } from 'angular-datatables';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listcategories',
  templateUrl: './listcategories.component.html',
  styleUrls: ['./listcategories.component.css']
})
export class ListcategoriesComponent  {
  categories :Category[];
  permission:string
  admin="admin";
    dtOptions: DataTables.Settings = {
      searching: true,
    paging: true
    };




  constructor( private catserv: CategoryService,
    private subcserv: SubcategoryService) { };

  ngOnInit() {
    setInterval(() => {
      this.permission =JSON.parse(localStorage.getItem("roles")|| '')
      },500)
    this.Loadcategories()

  }



  Loadcategories() {
    return this.catserv.LoadCategories().subscribe(data =>
      this.categories = data),
      (err: any) => console.log(err)
  }




  deletecategory = (id: object) => {
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
          this.catserv.DeleteCategory(id).subscribe(data =>{this.Loadcategories();
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


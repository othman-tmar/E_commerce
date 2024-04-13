import { Component } from '@angular/core';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { Subcategory } from '../../models/subcategory';
import { SubcategoryService } from '../../services/subcategory.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listsubcategories',
  templateUrl: './listsubcategories.component.html',
  styleUrls: ['./listsubcategories.component.css']
})
export class ListsubcategoriesComponent {

  categories :Category[];
  subcategories :Subcategory[];
  categoryName : String;
  permission:string
  admin="admin";


  constructor( private catserv: CategoryService,
    private subcserv: SubcategoryService,
     private subcatserv: SubcategoryService) { };

  ngOnInit() {
    setInterval(() => {
      this.permission =JSON.parse(localStorage.getItem("roles")|| '')
      },500)
    this.Loadcategories()
    this.Loadsubcategories()
  }



  Loadcategories() {
    return this.catserv.LoadCategories().subscribe(data =>
      this.categories = data),
      (err: any) => console.log(err)
  }

  Loadsubcategories() {
    return this.subcatserv.LoadSubcategories().subscribe(data =>
      this.subcategories = data
      /* .map((item) => ({ ...item, updatedAt: new Date(item.updatedAt) }))
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())  */ ),
      (err: any) => console.log(err)
  }


  deletesubcategory = (id: object) => {
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
            this.subcserv.DeleteSubcategory(id).subscribe(data => {
                this.Loadsubcategories();
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            })
        }
    })
}
  getCategory(y:object){

if(this.categories){
  let cat = this.categories.find(x=> x._id == y);
  if(cat){
  this.categoryName= cat?.name;
}
}
  return this.categoryName;

}


}


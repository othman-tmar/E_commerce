import { Component } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { Subcategory } from '../../models/subcategory';
import { SubcategoryService } from '../../services/subcategory.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-listproducts',
  templateUrl: './listproducts.component.html',
  styleUrls: ['./listproducts.component.css']
})
export class ListproductsComponent {
  products: Product[];
  categories :Category[];
  subcategories :Subcategory[];
  permission:string
  admin="admin";


  constructor(private serv: ProductService, private catserv: CategoryService, private subcatserv: SubcategoryService) { };

  ngOnInit() {
    this.ListProducts()
    this.ListCategories()
    this.ListsubCategories()
    setInterval(() => {
    this.permission =JSON.parse(localStorage.getItem("roles")|| '')
    },500)
  }

  ListProducts() {
    return this.serv.LoadProducts().subscribe(data =>{
      this.products = data
      .map((item) => ({ ...item, createdAt: new Date(item.createdAt) }))
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }),
      (err: any) => console.log(err)
  }

  ListCategories() {
    return this.catserv.LoadCategories().subscribe(data =>
      this.categories = data),
      (err: any) => console.log(err)
  }

  ListsubCategories() {
    return this.subcatserv.LoadSubcategories().subscribe(data =>
      this.subcategories = data),
      (err: any) => console.log(err)
  }



  deleteproduct = (id: object) => {
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
          this.serv.DeleteProduct(id).subscribe(data =>{this.ListProducts();
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

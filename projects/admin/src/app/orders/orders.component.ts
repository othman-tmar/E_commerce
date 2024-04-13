import { Component, ViewChild } from '@angular/core';
import { Order } from '../models/order';
import { OrderService } from '../services/order.service';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { Cartitem } from 'projects/user/src/app/models/cartitem';
import { CartitemService } from 'projects/user/src/app/services/cartitem.service';
import { UserService } from 'projects/user/src/app/services/user.service';
import { User } from 'projects/user/src/app/models/user';
import Swal from 'sweetalert2';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {

  products: Product[];
  cartitem: Cartitem;
  cartitems: Cartitem[];
  orders : Order[];
  users: User[];





  constructor(private serv: ProductService,
    private cartitemserv: CartitemService,
    private orderserv :OrderService,
    private userserv: UserService,



    ) { };

  ngOnInit(){
    this.ListProducts()
    this.ListCartitems()
     this.ListOrders()
    this.ListUsers()


  }

  ListOrders() {
    this.orderserv.LoadOrders().subscribe(data =>{
      this.orders = data
     /*  .map((item) => ({ ...item, createdAt: new Date(item.createdAt) }))
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());  */
    }),
      (err: any) => console.log(err)
  }

  ListProducts() {
    return this.serv.LoadProducts().subscribe(data =>
      this.products = data),
      (err: any) => console.log(err)
  }

  ListCartitems() {
    return this.cartitemserv.LoadCartitems().subscribe(data => {
      this.cartitems = data;}),
    (err: any) => console.log(err);
  }

  toString(str:object){
    return str.toString();
  }


  deleteOrder = (id: object) => {
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
          this.orderserv.DeleteOrder(id).subscribe(data =>{this.ListOrders();
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            })
        }
    })
}

ListUsers(){
 return this.userserv.LoadUsers().subscribe(data => {
    this.users = data;}),
    (err: any) => console.log(err);
}



}









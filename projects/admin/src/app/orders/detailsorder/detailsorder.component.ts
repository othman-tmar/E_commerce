import { Component } from '@angular/core';
import { Order } from '../../models/order';
import { OrderService } from '../../services/order.service';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { Cartitem } from 'projects/user/src/app/models/cartitem';
import { CartitemService } from 'projects/user/src/app/services/cartitem.service';
import { UserService } from 'projects/user/src/app/services/user.service';
import { User } from 'projects/user/src/app/models/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detailsorder',
  templateUrl: './detailsorder.component.html',
  styleUrls: ['./detailsorder.component.css']
})
export class DetailsorderComponent {
  products: Product[];
  cartitem: Cartitem;
  cartitems: Cartitem[];
  order : Order;
  users: User[];
  id: object;
 
  



  constructor(private serv: ProductService,
    private cartitemserv: CartitemService,
    private orderserv :OrderService,
    private userserv: UserService,
    private route: ActivatedRoute,
  
   

    ) { };

  ngOnInit(){
    this.ListProducts()
    this.ListCartitems()
     this.id = this.route.snapshot.params['id'];
     this.orderserv.GetOrder(this.id).subscribe(data => this.order = data);
    this.ListUsers()


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

 /*  deleteOrder=(id:object)=>{
    return this.orderserv.DeleteOrder(id).subscribe(data =>{this.ListOrders()})

  } */

ListUsers(){
 return this.userserv.LoadUsers().subscribe(data => {
    this.users = data;}),
    (err: any) => console.log(err);
}

}

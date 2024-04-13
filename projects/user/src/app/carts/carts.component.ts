import { Component } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';
import { Subcategory } from '../models/subcategory';
import { SubcategoryService } from '../services/subcategory.service';
import { Cartitem } from '../models/cartitem';
import { CartitemService } from '../services/cartitem.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Order } from '../models/order';
import { OrderService } from '../services/order.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NotificationService } from '../services/notification.service';
import { Notification } from '../models/notification';

import { ButtonManager, Config} from '../../assets/google pay button/lib/button-manager';
import {  ElementRef, Input } from '@angular/core';
import { debounce } from '../../assets/google pay button/lib/debounce';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.css'],

})


export class CartsComponent {
  products: Product[];
  categories: Category[];
  subcategories: Subcategory[];
  cartitem: Cartitem;
  cartitems: Cartitem[];
  userUID: string;
  userName: string;
  userproducts: Product[];
  totalprice: number;
  discount: number; d=7;
  tax: number; tva = 19;
  total: number;
  neworder: Order = new Order();
  orderItems : object[];
  showMyMessage = false;
  cartitemsCheck=false;
  notification: Notification = new Notification();



  constructor(private serv: ProductService,
    private catserv: CategoryService,
    private subcatserv: SubcategoryService,
    private cartitemserv: CartitemService,
    private authserv: AuthService,
    private orderserv :OrderService,
    private notifserv :NotificationService,
    private router: Router,
    public afAuth: AngularFireAuth,
    private elementRef: ElementRef) { };



  ngOnInit() {
    this.ListProducts()
    this.ListCategories()
    this.ListsubCategories()
    this.ListCartitems()
    this.getuserID()
    this.getuserName()
    this.manager.mount(this.elementRef.nativeElement);
  }

  ListProducts() {
    return this.serv.LoadProducts().subscribe(data =>
      this.products = data),
      (err: any) => console.log(err)
  }


  ListCartitems() {
    return this.cartitemserv.LoadCartitems().subscribe(data => {
      this.cartitems = data.filter(item => item.useruid == this.userUID);
      this.totalprice = 0;
      this.cartitems.forEach(item => {
        if (typeof item.price === 'number') {
          this.totalprice += item.price;

        } else {
          console.log(`Invalid price for item: ${item}`);
        }
      });
      if(this.cartitems.length>0){this.cartitemsCheck=true};

      this.totalprice =parseFloat(this.totalprice.toFixed(2))
      this.discount = this.totalprice*(this.d/100);
      this.discount =parseFloat(this.discount.toFixed(2));
      this.tax = this.totalprice*(this.tva/100);
      this.tax =parseFloat(this.tax.toFixed(2));
      this.total = this.totalprice- this.discount + this.tax;
      this.total =parseFloat(this.total.toFixed(2));

    }),
      (err: any) => console.log(err);
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

  getuserID() {
    this.userUID = this.authserv.GetUserUID();
  }

  getuserName() {
    let x = this.authserv.GetUserData();
    this.userName =x.displayName;

  }



  qtyprice(id: object, a: number, event: any) {
    const target = event.target as HTMLSelectElement;
    if (target) {
      const x = parseInt(target.value);
      const m = this.cartitems.find(item => item._id == id);
      if (m) {
        this.cartitem = m;
        this.cartitem.quantity = x;
        this.cartitem.price = x * a;


      }
      this.cartitemserv.UpdateCartitem(id, this.cartitem).subscribe(data => { this.ListCartitems(); });
    }

  }

  deleteproductitem = (id: object) => {

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
        this.cartitemserv.DeleteCartitem(id).subscribe(data => { this.ListCartitems();
              Swal.fire(
                  'Deleted!',
                  'Your item has been deleted.',
                  'success'
              )
          })
      }
  })


  }

  deleteUserCart(){
          this.cartitems.forEach(x =>{
            this.cartitemserv.DeleteCartitem(x._id).subscribe(data => { this.ListCartitems(); })
          })

  }

  showMessageSoon() {
    setTimeout(() => {
      this.showMyMessage = true
    }, 1000)
  }


   order(){
  this.neworder.productsNumber = this.cartitems.length;
  this.neworder.useruid = this.userUID;
  this.neworder.totalOrderPrice = this.totalprice;
  this.neworder.discount= this.discount;
  this.neworder.tax = this.tax;
  this.neworder.finalPrice = this.total;

  this.orderItems = [];
  this.cartitems.forEach( x=> {
    if(typeof x ==='object'){
      let object = {
        product : x.product,
        quantity : x.quantity,
        price : x.price
      }
    this.orderItems.push(object);}
  })
    this.neworder.orderItems = this.orderItems;
    this.orderserv.AddOrder(this.neworder).subscribe( data =>{
      this.deleteUserCart();
      this.showMessageSoon();
      this.AddNotification(data._id);
    }, (err: any) => console.log(err));

    this.cartitemsCheck=false;

  }

AddNotification(id:object){
this.notification.elementID=id.toString();
this.notification.type="order";
return this.notifserv.AddNotification(this.notification).subscribe( data =>{console.log(data)});
}


private manager = new ButtonManager({
  cssSelector: 'google-pay-button',
  softwareInfoId: "google-pay-button",
  softwareInfoVersion: "3.0.10",
});

@Input() paymentRequest!: google.payments.api.PaymentDataRequest;
@Input() environment!: google.payments.api.Environment;
@Input() existingPaymentMethodRequired!: boolean;
@Input() buttonColor?: google.payments.api.ButtonColor;
@Input() buttonType?: google.payments.api.ButtonType;
@Input() buttonSizeMode?: google.payments.api.ButtonSizeMode;
@Input() buttonLocale?: string;
@Input() paymentDataChangedCallback?: google.payments.api.PaymentDataChangedHandler;
@Input() paymentAuthorizedCallback?: google.payments.api.PaymentAuthorizedHandler;
@Input() readyToPayChangeCallback?: (result: any) => void;
@Input() loadPaymentDataCallback?: (paymentData: google.payments.api.PaymentData) => void;
@Input() cancelCallback?: (reason: google.payments.api.PaymentsError) => void;
@Input() errorCallback?: (error: Error | google.payments.api.PaymentsError) => void;
@Input() clickCallback?: (event: Event) => void;



get isReadyToPay(): boolean | undefined {
  return this.manager.isReadyToPay;
}






ngOnChanges(): Promise<void> {
  return this.initializeButton();
}

private initializeButton = debounce(() => {
  if (!this.assertRequiredProperty('paymentRequest')) {
    return;
  }

  if (!this.assertRequiredProperty('environment')) {
    return;
  }

  const config: Config = {
    paymentRequest: this.paymentRequest,
    environment: this.environment,
    existingPaymentMethodRequired: this.existingPaymentMethodRequired,
    onPaymentDataChanged: this.paymentDataChangedCallback,
    onPaymentAuthorized: this.paymentAuthorizedCallback,
    buttonColor: this.buttonColor,
    buttonType: this.buttonType,
    buttonSizeMode: this.buttonSizeMode,
    buttonLocale: this.buttonLocale,
    onReadyToPayChange (result:any) {
      if (super.readyToPayChangeCallback) {
        super.readyToPayChangeCallback(result);
      }
      super.dispatch('readytopaychange', result);
    },
    onCancel(reason:any) {
      if (super.cancelCallback) {
        super.cancelCallback(reason);
      }
      super.dispatch('cancel', reason);
    },
    onError(error:any) {
      if (super.errorCallback) {
        super.errorCallback?.(error);
      }
      super.elementRef.nativeElement.dispatchEvent(new ErrorEvent('error', { error }));
    },
    onLoadPaymentData(paymentData:any){
      if (super.loadPaymentDataCallback) {
        super.loadPaymentDataCallback(paymentData);
      }
      super.dispatch('loadpaymentdata', paymentData);
    },
    onClick(event:any) {
      if (super.clickCallback) {
        super.clickCallback?.(event);
      }
    },
  };

  this.manager.configure(config);
});

private assertRequiredProperty(name: string): boolean {
  const value = (this as any)[name];
  if (value === null || value === undefined) {
    this.throwError(Error(`Required property not set: ${name}`));
    return false;
  }

  return true;
}

private throwError(error: Error): never {
  throw error;
}

private dispatch<T>(type: string, detail: T): void {
  this.elementRef.nativeElement.dispatchEvent(
    new CustomEvent(type, {
      bubbles: true,
      cancelable: false,
      detail,
    }),
  );
}


}

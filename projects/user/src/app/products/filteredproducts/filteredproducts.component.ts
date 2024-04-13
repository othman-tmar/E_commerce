import { Component} from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { Subcategory } from '../../models/subcategory';
import { SubcategoryService } from '../../services/subcategory.service';
import { Cartitem } from '../../models/cartitem';
import { CartitemService } from '../../services/cartitem.service';
import { Router,ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-filteredproducts',
  templateUrl: './filteredproducts.component.html',
  styleUrls: ['./filteredproducts.component.css']
})
export class FilteredproductsComponent {
  products: Product[];
  categories :Category[];
  subcategories :Subcategory[];
 id:object;
  cartitem: Cartitem = new Cartitem();
  cartitems: Cartitem[];
  productselectedID: object;
  productselectedPrice: number;
  userUID: string;
  searchText:any;
  p: number = 1;

  constructor(private serv: ProductService,
     private catserv: CategoryService,
      private subcatserv: SubcategoryService,
      private cartitemserv: CartitemService,
       private router: Router,
       private authserv: AuthService,
       private route: ActivatedRoute) { };

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.ListProducts();
      this.ListCategories();
      this.ListsubCategories();
      this.ListCartitems();
      this.getuserID();
    });
    setInterval(()=>{this.getSearch();},1000)
  }




  ListProducts() {
    return this.serv.LoadProducts().subscribe(data =>
      this.products = data.filter(product=> product.category==this.id)),
      (err: any) => console.log(err)
  }

  ListCartitems() {
    return this.cartitemserv.LoadCartitems().subscribe(data => {
      this.cartitems = data.filter(item=>item.useruid==this.userUID);

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

  filtercategories(id: any) {
    this.router.navigate(['/productsfiltered', id]);
  }

  filtersubcategories(id: any) {
    this.router.navigate(['/productsfilteredbysub', id]);
  }

  getuserID(){
    this.userUID = this.authserv.GetUserUID();
  }



  AddToCart(x: object, y: number) {

    const xx = this.verifyAddToCart(x);

    if (this.userUID && x && y && xx) {
      this.productselectedID = x;
      this.productselectedPrice = y;


      if (this.productselectedID && this.productselectedPrice) {
        this.cartitem.product = this.productselectedID;
        this.cartitem.price = this.productselectedPrice;
        this.cartitem.useruid = this.userUID;
        this.cartitem.quantity=1;
        this.cartitemserv.AddCartitem(this.cartitem).subscribe(data => { this.ListCartitems();});
        Swal.fire({
          title: 'Product Added',
          text: 'Product successufully added to cart',
          html:
      '<b>Click here to view </b>, ' +
      '<a href="/cart">My Cart</a>  ',
          icon: 'success',
          confirmButtonText: 'keep exploring'
        })
      }
    }else if(!this.userUID){
      Swal.fire({
        title: 'Account not connected',
        text: '',
        html:
      '<b>To make purshase</b>, ' +
      '<a href="/sign-in">Login</a> or <a href="/register-user">Sign up</a>  ',
        icon: 'error',
        confirmButtonText: 'cancel'
      })
    }
  }

  verifyAddToCart(y: object) {
    let B = true;

    if (y) {
      const check = this.cartitems.find(item => item.product === y);
      if (check) {

        B = false
      };

    }

    return B;

  }


  getSearch(){
    this.searchText = this.serv.getSearchText();

  }

  ProductToCartChecking(x: object){
    let check = false;
    this.cartitems.forEach(item => {
      if(item.product==x && item.useruid == this.userUID){
        check = true
      }
    });

    return check;
  }

  FilterProductPerPrice(){

let minInput = document.getElementById('minInput') as HTMLInputElement;
let maxInput = document.getElementById('maxInput') as HTMLInputElement;

      let minPrice = parseFloat(minInput.value);
     let maxPrice = parseFloat(maxInput.value);

    if(!minPrice){minPrice=0};
    if(!maxPrice){maxPrice=10000000};
    console.log(minPrice)
    console.log(maxPrice)
    this.products = this.products.filter(item=> item.priceAfterDiscount>minPrice && item.priceAfterDiscount<maxPrice);

  }


  FilterProductPerRate(rate:number){
 this.products = this.products.filter(item=> item.ratingsAverage>rate);
  }

}

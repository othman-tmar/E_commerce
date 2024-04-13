import { Component } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { Subcategory } from '../../models/subcategory';
import { SubcategoryService } from '../../services/subcategory.service';
import { Cartitem } from '../../models/cartitem';
import { CartitemService } from '../../services/cartitem.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { OrderService } from '../../services/order.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-listproducts',
  templateUrl: './listproducts.component.html',
  styleUrls: ['./listproducts.component.css']
})
export class ListproductsComponent {
  products: Product[];
  categories: Category[];
  subcategories: Subcategory[];
  cartitem: Cartitem = new Cartitem();
  cartitems: Cartitem[];
  productselectedID: object;
  productselectedPrice: number;
  userUID: string;
  searchText: any;
  p: number = 1;





  constructor(private serv: ProductService,
    private catserv: CategoryService,
    private subcatserv: SubcategoryService,
    private cartitemserv: CartitemService,
    private authserv :AuthService,
    private router: Router,
    private route: ActivatedRoute
   ) { };

  async ngOnInit() {

    this.ListProducts()
    this.ListCategories()
    this.ListsubCategories()
    this.ListCartitems()
    this.getuserID()

    setInterval(() => {
      this.getSearch();
    }, 1000);

    this.route.queryParams.subscribe(params => {
      this.p = +params['page'] || 1; // Set the current page based on the query parameter
    });

  }


  changePage(page: number) {
    this.p = page;
    window.scrollTo(0, 0); // Scroll to top of page
    this.router.navigate([], { queryParams: { page: this.p } }); // Update the query parameter
  }
  ListProducts() {
    return this.serv.LoadProducts().subscribe(data =>
      this.products = data),
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
      '<a href="/mycart">My Cart</a>  ',
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




  ProductToCartChecking(x: object){
    let check = false;
    this.cartitems.forEach(item => {
      if(item.product==x && item.useruid == this.userUID){
        check = true
      }
    });

    return check;
  }

getSearch(){
    this.searchText = this.serv.getSearchText();

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
    this.serv.LoadProducts().subscribe(data =>
      this.products = data.filter(item=> item.priceAfterDiscount>minPrice && item.priceAfterDiscount<maxPrice)),
      (err: any) => console.log(err)

  }


  FilterProductPerRate(rate:number){
    this.serv.LoadProducts().subscribe(data =>
      this.products = data.filter(item=> item.ratingsAverage>rate)),
      (err: any) => console.log(err)

  }






}

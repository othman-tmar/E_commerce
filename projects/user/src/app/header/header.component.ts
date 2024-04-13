

import { Component } from '@angular/core';
import { CartitemService } from '../services/cartitem.service';
import { Cartitem } from '../models/cartitem';
import { AuthService } from '../services/auth.service';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { SubcategoryService } from '../services/subcategory.service';
import { Subcategory } from '../models/subcategory';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {

  cartCounter: number;
  userUID: string;
  cartitems: Cartitem[];
  categories: Category[];
  subcategories:Subcategory[];
  products: Product[];
  user: User = new User();
  users: User[];
  CurrentUser: any;
  x: number;
  searchText: any;



  constructor(private cartitemserv: CartitemService,
    private authserv: AuthService,
    private catserv: CategoryService,
    private subcatserv : SubcategoryService,
    private prodserv: ProductService,
    private userserv: UserService,
    private router: Router,
    public afAuth: AngularFireAuth,
    private loadingBar:LoadingBarService
  ) { }

  ngOnInit() {

    this.ListCategories()
    this.getuserID()
    this.GetCurrentUser()
    this.cartCounting()
this.ListProducts()
this.ListSubcategories()

    setInterval(() => {

      this.cartCounting();

    }, 1000)

    setInterval(() => {

      this.getSearch();

    }, 1000)

    this.UpdateUsers()
    this.loadingBar.useRef('http').disable()
  }

  ListProducts() {
    return this.prodserv.LoadProducts().subscribe(data =>{
      this.products = data}),
      (err: any) => console.log(err)
  }

  ListSubcategories() {
    return this.subcatserv.LoadSubcategories().subscribe(data =>{
      this.subcategories = data}),
      (err: any) => console.log(err)
  }

  cartCounting() {

    return this.cartitemserv.LoadCartitems().subscribe(data => {
      if(this.userUID){
      this.cartCounter = data.filter(item => item.useruid == this.userUID).length;
          }
    }),
      (err: any) => console.log(err);
  }


  filtercategories(event: any) {
    const target = event.target as HTMLSelectElement;
    if (target) {
      if (target.value == '') {
        this.router.navigate(['discover/products']);

      } else {
        this.router.navigate(['/productsfiltered', target.value]);

      }
    }
  }

  filtersubcategories(id: any) {
    this.router.navigate(['/productsfilteredbysub', id]);

  }


  ListCartitems() {
    return this.cartitemserv.LoadCartitems().subscribe(data => {
      this.cartitems = data.filter(item => item.useruid.toString() == this.userUID);

    }),
      (err: any) => console.log(err);
  }


  getuserID() {
    if(JSON.parse(localStorage.getItem('user')!)){
      this.userUID = JSON.parse(localStorage.getItem('user')!).uid;
    }


  }

  ListCategories() {
    return this.catserv.LoadCategories().subscribe(data =>
      this.categories = data),
      (err: any) => console.log(err)
  }


  GetCurrentUser() {
    return this.userserv.LoadUsers().subscribe(data => {
      this.CurrentUser = data.find(item => item.uid.toString() == this.userUID);

    }),
      (err: any) => console.log(err);
  }


  UpdateUsers() {
    return this.userserv.LoadUsers().subscribe(data => {
      this.x = data.filter(y => y.uid == this.userUID).length;

      let userdata = this.authserv.GetUserData();

      if(userdata){
      if (this.x == 0) {

        if (userdata.displayName) {
          this.user.displayName = userdata.displayName;
        } else { this.user.displayName = `user-${Math.random()}` }

        if (userdata.photoURL) {
          this.user.photoURL = userdata.photoURL;
        } else { this.user.photoURL = "https://firebasestorage.googleapis.com/v0/b/profound-ripsaw-367620.appspot.com/o/images%2Fuser%20(1).png?alt=media&token=d240e2cd-ec95-4f05-982f-d516b1756eb8" }

        if (userdata.email) {
          this.user.email = userdata.email;
        }

        if (userdata.uid) {
          this.user.uid = userdata.uid;
        }

        console.log(this.user);
        this.AddUser();
      }}

    }),
      (err: any) => console.log(err)
  }


  AddUser(){
    return this.userserv.AddUser(this.user).subscribe(data => { this.router.navigate(['']) });
  }

  setSearch(event: any) {
    const target = event.target as HTMLSelectElement;
    if (target) {
      this.prodserv.setSearchText(target.value);
    }
  }


  getSearch(){
    this.searchText = this.prodserv.getSearchText();
  }


  hideSearch(){
    this.prodserv.setSearchText(null)

  }



  async SignOut() {
    await this.afAuth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['sign-in']);
  }



}

import { Component } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { HostListener } from '@angular/core';
import { SubcategoryService } from '../services/subcategory.service';
import { Subcategory } from '../models/subcategory';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  products: Product[];
  subcategories: Subcategory[];
  faturedSubcategories: Subcategory[];
  productsFlash: Product[];
  productsFlashDisplay: Product[];
  mostRatedProducts: Product[];
  mostRatedProductsDisplay: Product[];
  startFlashDisplay = 0;
  endFlashDisplay = 2;
  startMostRatedProductsDisplay = 0;
  endMostRatedProductsDisplay = 2;
  startFaturedSubcategories=0;
  endFaturedSubcategories=2;
  ScreenWidth = document.documentElement.clientWidth;
  thisYear = (new Date()).getFullYear();



  constructor(private serv: ProductService,
    private router: Router,
    private subcatserv: SubcategoryService) { };



  ngOnInit() {
    this.ListProducts()
    this.ListProductsFlashDisplay()
    this.ListMostRatedProductsDisplay()
    this.listFaturedSubcategories()
    if (this.ScreenWidth>1000){
      this.endFlashDisplay =6;
      this.endMostRatedProductsDisplay =6;
      this.endFaturedSubcategories=6;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.ScreenWidth = event.target.innerWidth;
    if (this.ScreenWidth>1000){
      this.endMostRatedProductsDisplay =6;
      this.endFlashDisplay =6;
      this.endFaturedSubcategories=6;
      location.reload()
    }else{
      this.endMostRatedProductsDisplay =2;
      this.endFlashDisplay =2;
      this.endFaturedSubcategories=2;
      location.reload();}

  }

  ListProducts() {
    return this.serv.LoadProducts().subscribe(data =>
      this.products = data),
      (err: any) => console.log(err)
  }

  ListProductsFlashDisplay() {
    return this.serv.LoadProducts().subscribe(data =>{
      this.productsFlash = data.filter(item => (new Date(item.createdAt)).getFullYear() == (new Date()).getFullYear());
      this.productsFlashDisplay= this.productsFlash.slice(this.startFlashDisplay, this.endFlashDisplay) }),
      (err: any) => console.log(err)
  }

  ListMostRatedProductsDisplay() {

    return this.serv.LoadProducts().subscribe(data => {
      this.mostRatedProducts = data.filter(item => item.ratingsAverage >= 4);
     this.mostRatedProductsDisplay = this.mostRatedProducts.slice(this.startMostRatedProductsDisplay, this.endMostRatedProductsDisplay );
    }),
      (err: any) => console.log(err)
  }

  listFaturedSubcategories(){
    return this.subcatserv.LoadSubcategories().subscribe(
        data => {
            this.subcategories=data
            this.faturedSubcategories = this.subcategories.slice(this.startFaturedSubcategories,this.endFaturedSubcategories);

        },
        (err: any) => console.log(err)
    );
  }





  nextFlash() {
    if (this.endFlashDisplay < this.productsFlash.length) {
      this.startFlashDisplay += 1;
      this.endFlashDisplay += 1;
     this.ListProductsFlashDisplay();
    } else {
      this.startFlashDisplay = 0;
      if (this.ScreenWidth > 1000) {
      this.endFlashDisplay = 6;
      this.ListProductsFlashDisplay();}
    else {
      this.endFlashDisplay = 2;
      this.ListProductsFlashDisplay();
    }
  }
  }


  previousFlash() {
    if (this.startFlashDisplay > 0) {
      this.startFlashDisplay -= 1;
      this.endFlashDisplay -= 1;
      this.ListProductsFlashDisplay();
    }
    else {
      if (this.ScreenWidth > 1000) {
      this.startFlashDisplay = this.productsFlash.length - 6;
    }
    else {this.startFlashDisplay = this.productsFlash.length - 2}
      this.endFlashDisplay = this.productsFlash.length;
      this.ListProductsFlashDisplay();
    }
  }



  nextMostRatedProductsDisplay() {
    if (this.endMostRatedProductsDisplay  < this.mostRatedProducts.length) {
      this.startMostRatedProductsDisplay += 1;
      this.endMostRatedProductsDisplay  += 1;
      this.ListMostRatedProductsDisplay();
    }
    else {
      this.startMostRatedProductsDisplay = 0;
      if (this.ScreenWidth > 1000) {
        this.endMostRatedProductsDisplay  = 6;
        this.ListMostRatedProductsDisplay();      }
      else {
        this.endMostRatedProductsDisplay  = 2;
        this.ListMostRatedProductsDisplay();      }
    }
  }


  previousMostRatedProductsDisplay() {
    if (this.startMostRatedProductsDisplay > 0) {
      this.startMostRatedProductsDisplay -= 1;
      this.endMostRatedProductsDisplay -= 1;
      this.ListMostRatedProductsDisplay();
    }
    else {
      if (this.ScreenWidth > 1000) {
        this.startMostRatedProductsDisplay = this.mostRatedProducts.length - 6;
      }
      else { this.startMostRatedProductsDisplay = this.mostRatedProducts.length - 2; }
      this.endMostRatedProductsDisplay = this.mostRatedProducts.length;
     this.ListMostRatedProductsDisplay();
    }
  }



nextFaturedSubcategories() {
if (this.endFaturedSubcategories < this.subcategories.length) {
  this.startFaturedSubcategories += 1;
  this.endFaturedSubcategories += 1;
this.listFaturedSubcategories();
}else{
  this.startFaturedSubcategories = 0;

  if (this.ScreenWidth > 1000) {
  this.endFaturedSubcategories = 6;
  this.listFaturedSubcategories();}
  else {this.endFaturedSubcategories = 2;
    this.listFaturedSubcategories();}

}
}

previousFaturedSubcategories() {
if (this.startFaturedSubcategories > 0) {
  this.startFaturedSubcategories -= 1;
  this.endFaturedSubcategories -= 1;
  this.listFaturedSubcategories();

}else{
  if (this.ScreenWidth > 1000) {
  this.startFaturedSubcategories = this.subcategories.length-6;}
  else{this.startFaturedSubcategories = this.subcategories.length-2;}
  this.endFaturedSubcategories = this.subcategories.length;
  this.listFaturedSubcategories();
}
}







}

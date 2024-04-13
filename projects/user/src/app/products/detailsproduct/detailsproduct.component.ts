import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { Cartitem } from '../../models/cartitem';
import { CartitemService } from '../../services/cartitem.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-detailsproduct',
  templateUrl: './detailsproduct.component.html',
  styleUrls: ['./detailsproduct.component.css']
})

export class DetailsproductComponent {
  product: Product = new Product();
  id: object;
  cartitem: Cartitem = new Cartitem();
  cartitems: Cartitem[];
  productselectedID: object;
  productselectedPrice: number;
  userUID: string;
  comment="";
  rate: number;
  users: User[];
  commentsUpdated: Product["comments"];
  RateCheck:Boolean =false;
  CommentCheck:Boolean =false;







  constructor(private serv: ProductService,
    private cartitemserv: CartitemService,
    private authserv: AuthService,
    private route: ActivatedRoute,
    private userserv: UserService) { }

  ngOnInit() {
    this.getuserID()
    this.ListCartitems()
    this.ListUsers()
    this.id = this.route.snapshot.params['id'];
    this.serv.GetProduct(this.id).subscribe(data => this.product = data);
    this.StarRating();
    this.checkExistedRate();
    this.checkExistedComment();

  }

  ListCartitems() {
    return this.cartitemserv.LoadCartitems().subscribe(data => {
      this.cartitems = data.filter(item => item.useruid == this.userUID);
    }),
      (err: any) => console.log(err);
  }

  ListUsers() {
    return this.userserv.LoadUsers().subscribe(data => {
      this.users = data;
    }),
      (err: any) => console.log(err);
  }


  getuserID() {
    this.userUID = this.authserv.GetUserUID();

  }

  toCover(y: String) {
    this.product.imageCover = y;

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
    else if(!xx){
      Swal.fire({
        title: 'Already in cart',
        text: 'Product already in cart',

        icon: 'info',
        confirmButtonText: 'OK'
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




  /* ProductToCartChecking(x: object){
    let check = false;
    this.cartitems.forEach(item => {
      if(item.product==x && item.useruid == this.userUID){
        check = true
      }
    });

    return check;
  } */


  AddUserComment() {
    if (this.userUID && !this.CommentCheck) {
      let x = {
        _id:uuidv4(),
        user: this.userUID,
        comment: this.comment,
        date: Date.now()
      }
      this.product.comments.push(x);
      console.log(x);

      this.serv.UpdateProduct(this.id, this.product).subscribe(data => { document.location.reload() });
      Swal.fire({
        title: 'Comment Added',
        text: 'thank you to review our product',
        icon: 'success',
        confirmButtonText: 'OK'
      })
    }
    else if (!this.userUID) { Swal.fire({
      title: 'Account not connected',
      text: '',
      html:
    '<b>To make comment</b>, ' +
    '<a href="/sign-in">Login</a> or <a href="/register-user">Sign up</a>  ',
      icon: 'error',
      confirmButtonText: 'cancel'
    }) }
    else if (this.CommentCheck) { Swal.fire({
      title: 'Already commented',
      text: 'you have already commentes this product',
      icon: 'error',
      confirmButtonText: 'OK'
    }) };
  }


  AddUserRate() {

    let RatingElement = document.querySelector('#rating-value');
    let RatingValue: number

    if (RatingElement && !this.RateCheck) {

      if (RatingElement.textContent) {
        RatingValue = parseFloat(RatingElement.textContent);
        console.log(RatingValue);
        this.rate = RatingValue;


      }
    }


    if (this.userUID && !this.RateCheck ) {

      let x = {
        _id: uuidv4(),
        user: this.userUID,

        rate: this.rate,

        date: Date.now(),

      }
      this.product.ratings.push(x);
      let ratingsSum = this.product.ratingsAverage * this.product.ratingsQuantity;
      this.product.ratingsQuantity += 1;
      this.product.ratingsAverage = parseFloat(((ratingsSum + this.rate) / this.product.ratingsQuantity).toFixed(1));
      console.log(x)
      this.serv.UpdateProduct(this.id, this.product).subscribe(data => { document.location.reload() });
      Swal.fire({
        title: 'Rate Added',
        text: 'thank you to review our product',
        icon: 'success',
        confirmButtonText: 'OK'
      })
    }

    else if (!this.userUID) { Swal.fire({
      title: 'Account not connected',
      text: '',
      html:
    '<b>to rate, please</b>, ' +
    '<a href="/sign-in">Login</a> or <a href="/register-user">Sign up</a>  ',
      icon: 'error',
      confirmButtonText: 'cancel'
    }) }
    else if (this.RateCheck) { Swal.fire({
      title: 'Already rated',
      text: 'you have already rated this product',
      icon: 'error',
      confirmButtonText: 'OK'
    })};

  }




  checkExistedRate(){
    let ratings1 :Product["ratings"];
    this.serv.GetProduct(this.id).subscribe(data => {
        ratings1 = data.ratings;
        let existedRate = ratings1?.find(item => item.user == this.userUID);
        if (existedRate){
            this.RateCheck = true;
        }
    });

}

checkExistedComment(){
    let comments1 :Product["comments"];
    this.serv.GetProduct(this.id).subscribe(data => {
      comments1 = data.comments;
        let existedComment = comments1?.find(item => item.user == this.userUID);
        if (existedComment){
            this.CommentCheck = true;
        }
    });
    console.log(this.CommentCheck)
}




  StarRating() {
    let star = document.querySelectorAll('input');
    let showValue = document.querySelector('#rating-value');


    for (let i = 0; i < star.length; i++) {
      star[i].addEventListener('click', function () {
        i = parseFloat(this.value);

        if (showValue) {
          showValue.innerHTML = i.toString();
        }

      });

    }

  }

  DeleteComment(CommentID: any) {

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
        this.commentsUpdated = this.product.comments;
        let CommentToDeleteIndex = this.commentsUpdated.findIndex(comment => comment._id == CommentID)
        this.commentsUpdated.splice(CommentToDeleteIndex, 1)
        this.product.comments = this.commentsUpdated;
        this.serv.UpdateProduct(this.id, this.product).subscribe(data => { document.location.reload(); })
          Swal.fire(
            'Deleted!',
            'Your item has been deleted.',
            'success'
        );
      }
  })


  }



}

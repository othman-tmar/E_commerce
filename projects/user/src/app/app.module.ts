import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriesComponent } from './categories/categories.component';
import { SubcategoriesComponent } from './subcategories/subcategories.component';
import { CartsComponent } from './carts/carts.component';
import { ListproductsComponent } from './products/listproducts/listproducts.component';
import { DetailsproductComponent } from './products/detailsproduct/detailsproduct.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { FilteredproductsComponent } from './products/filteredproducts/filteredproducts.component';
import { FilteredproductsBySubComponent } from './products/filteredproducts-by-sub/filteredproducts-by-sub.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './user/verify-email/verify-email.component';
import { AuthService } from "./services/auth.service";

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';


import { GooglePayButtonModule } from '@google-pay/button-angular';

import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import {NgxPaginationModule} from 'ngx-pagination';
import { OrderTrackComponent } from './orders/order-track/order-track.component';


@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    SubcategoriesComponent,
    CartsComponent,
    ListproductsComponent,
    DetailsproductComponent,
    HeaderComponent,
    FilteredproductsComponent,
    FilteredproductsBySubComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    HomeComponent,
    FooterComponent,
    OrderTrackComponent,
  


  ],


  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,

    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),

    Ng2SearchPipeModule,
    GooglePayButtonModule,

    LoadingBarRouterModule,
    LoadingBarHttpClientModule,
    NgxPaginationModule,

  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

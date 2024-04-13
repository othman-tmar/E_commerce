import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartsComponent } from './carts/carts.component';
import { DetailsproductComponent } from './products/detailsproduct/detailsproduct.component';
import { ListproductsComponent } from './products/listproducts/listproducts.component';
import { FilteredproductsComponent } from './products/filteredproducts/filteredproducts.component';
import { FilteredproductsBySubComponent } from './products/filteredproducts-by-sub/filteredproducts-by-sub.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './user/verify-email/verify-email.component';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './home/home.component';
import { OrderTrackComponent } from './orders/order-track/order-track.component';





const routes: Routes = [
  {path:"product/:id"  , component:DetailsproductComponent},
  {path:"mycart"  , component:CartsComponent},
  {path:"discover/products"  , component:ListproductsComponent},
  {path:""  , component:HomeComponent},
  {path:"productsfiltered/:id"  , component:FilteredproductsComponent},
  {path:"productsfilteredbysub/:id"  , component:FilteredproductsBySubComponent},
  {path:"orders"  , component:OrderTrackComponent},

   { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled', 
  } )],
  exports: [RouterModule]
})
export class AppRoutingModule { }

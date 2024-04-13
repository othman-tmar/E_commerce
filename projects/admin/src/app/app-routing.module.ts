import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsertcategoryComponent } from './categories/insertcategory/insertcategory.component';
import { UpdatecategoryComponent } from './categories/updatecategory/updatecategory.component';
import { DetailsproductComponent } from './products/detailsproduct/detailsproduct.component';
import { InsertproductComponent } from './products/insertproduct/insertproduct.component';
import { ListproductsComponent } from './products/listproducts/listproducts.component';
import { UpdateproductComponent } from './products/updateproduct/updateproduct.component';
import { InsertsubcategoryComponent } from './subcategories/insertsubcategory/insertsubcategory.component';
import { ListsubcategoriesComponent } from './subcategories/listsubcategories/listsubcategories.component';
import { UpdatesubcategoryComponent } from './subcategories/updatesubcategory/updatesubcategory.component';
import { OrdersComponent } from './orders/orders.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { ListcategoriesComponent } from './categories/listcategories/listcategories.component';
import { DetailsorderComponent } from './orders/detailsorder/detailsorder.component';
import { ListusersComponent } from './users/listusers/listusers.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './authGuard/auth.guard';
import { ListadminsComponent } from './admins/listadmins/listadmins.component';
import { UpdateadminComponent } from './admins/updateadmin/updateadmin.component';
import { ForbiddenComponent } from './forbidden/forbidden/forbidden.component';


const routes: Routes = [
{path: "", component:DashboardComponent},
  {path: "products", component:ListproductsComponent},
  {path: "insertproduct", component:InsertproductComponent },
  {path: "update/:id", component:UpdateproductComponent ,canActivate:[AuthGuard], data:{roles:'admin'}},
  {path: "more/:id", component:DetailsproductComponent},
  {path: "subcategories", component:ListsubcategoriesComponent},
  {path: "insertsubcategory", component:InsertsubcategoryComponent },
  {path: "updatesubcategory/:id", component:UpdatesubcategoryComponent ,canActivate:[AuthGuard], data:{roles:'admin'}},
  {path: "insertcategory", component:InsertcategoryComponent },
  {path: "updatecategory/:id", component:UpdatecategoryComponent ,canActivate:[AuthGuard], data:{roles:'admin'}},
  {path: "orders", component:OrdersComponent},
  {path: "listcategories", component:ListcategoriesComponent},
  {path: "order/:id", component:DetailsorderComponent},
  {path: "subscribers", component:ListusersComponent},
  {path: "admins&vendor", component:ListadminsComponent ,canActivate:[AuthGuard], data:{roles:'admin'}},
  {path: "updateadmins&vendor/:id", component:UpdateadminComponent ,canActivate:[AuthGuard], data:{roles:'admin'}},
  { path: 'register', component: RegisterComponent,canActivate:[AuthGuard], data:{roles:'admin'}},
  {path: "forbidden", component:ForbiddenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

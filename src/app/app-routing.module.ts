import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { LoginComponent } from './login/login.component';
import { SuccessfullOrderComponent } from './successfull-order/successfull-order.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartComponent } from './cart/cart.component';
import { ProductsComponent } from './products/products.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AuthGuardService } from './auth-guard.service';
import { AdminAuthGuardService } from './admin-auth-guard.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';


const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginComponent },
  
  { path: 'checkout', component: CheckoutComponent, canActivate:[AuthGuardService] },
  { path: 'successfulorder/:id', component: SuccessfullOrderComponent , canActivate:[AuthGuardService] },
  { path: 'my/orders', component: MyOrdersComponent, canActivate:[AuthGuardService]  },
  
  { path: 'admin/products/new', component: ProductFormComponent, canActivate:[AuthGuardService,AdminAuthGuardService]  },
  { path: 'admin/products/:id', component: ProductFormComponent, canActivate:[AuthGuardService,AdminAuthGuardService]  },
  { path: 'admin/products', component: AdminProductsComponent, canActivate:[AuthGuardService,AdminAuthGuardService]  },
  { path: 'admin/orders', component: AdminOrdersComponent , canActivate:[AuthGuardService,AdminAuthGuardService] }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

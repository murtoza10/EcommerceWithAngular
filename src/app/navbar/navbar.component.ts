import { ShoppingCartService } from './../shopping-cart.service';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { AppUser } from '../models/app-user';
import { map, take } from 'rxjs/operators';
import { AppShoppingCart } from '../models/shoppingcart';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  appUser: AppUser;
  ShoppingCartItemCount: number;
  cart;

  constructor(private auth: AuthService,private shoppingCartService: ShoppingCartService) {
    
   }

   async ngOnInit(){
    this.auth.appUser$.subscribe(appUser=> this.appUser = appUser);
    let cart$ = await this.shoppingCartService.getCart();
    cart$.snapshotChanges().pipe(
      map(action => {
        const $key = action.payload.key;
        const data = { $key, ...action.payload.val() };
        return data;
      })
    ).subscribe(cart=>{
      this.cart =cart;
      this.ShoppingCartItemCount=0;
        for(let productId in cart.items) 
          this.ShoppingCartItemCount += cart.items[productId].quantity;     
    });
   }
  
    logout(){
      this.auth.logout();
    }

}

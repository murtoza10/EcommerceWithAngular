import { AppShoppingCart } from './../models/shoppingcart';
import { take, map } from 'rxjs/operators';
import { ShoppingCartService } from './../shopping-cart.service';
import { AppProducts } from './../models/app-products';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AppItems } from '../models/app-items';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit,OnDestroy{
  @Input('product') product:AppProducts;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart:AppShoppingCart;
  subscription: Subscription;
  items: AppItems=null;
  cartId;
  quantity:number;
  constructor(private cartService: ShoppingCartService) { 
    
  }
  ngOnInit(){
    
    // this.cartId =  this.cartService.getOrCreateCartId();
    // this.subscription= this.cartService.getItem(this.cartId,this.product.key).snapshotChanges().pipe(
    //   // take(1),
    //   map(action => {
    //     const $key = action.payload.key;
    //     const data = { $key, ...action.payload.val() };
    //     return data;
    //   })
    // ).subscribe(items=> {
    //   this.items= items;
    //   if(this.items.quantity==null) this.items.quantity=0;
    //   // console.log('items ',items);
    //   // console.log('this items ',this.items);
    //   });
  }
  getQuantity(){
    if(typeof this.shoppingCart.items==='undefined'||typeof this.shoppingCart==='undefined') return 0;
    let item = this.shoppingCart.items[this.product.key];
    return item ? item.quantity : 0;
  }
  
  addToCart(){
    this.cartService.updateCartItem(this.product,1);
}

  ngOnDestroy(){
    // this.subscription.unsubscribe();
  }

}

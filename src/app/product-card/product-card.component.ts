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
  @Input('shopping-cart') shoppingCart;
  subscription: Subscription;
  items: AppItems=null;
  cartId;
  constructor(private cartService: ShoppingCartService) { 
    
  }
  ngOnInit(){
    this.cartId =  this.cartService.getOrCreateCartId();
    this.subscription= this.cartService.getItem(this.cartId,this.product.key).snapshotChanges().pipe(
      // take(1),
      map(action => {
        const $key = action.payload.key;
        const data = { $key, ...action.payload.val() };
        return data;
      })
    ).subscribe(items=> {
      this.items= items;
      if(this.items.quantity==null) this.items.quantity=0;
      // console.log('items ',items);
      // console.log('this items ',this.items);
      });
  }

  removeFromCart(){
    this.cartService.getItem(this.cartId,this.product.key).update({product:this.product, quantity: ( this.items.quantity|| 0) -1});
  }
  addToCart(){
    
      this.cartService.getItem(this.cartId,this.product.key).update({product:this.product, quantity: ( this.items.quantity|| 0) +1});
  }


  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}

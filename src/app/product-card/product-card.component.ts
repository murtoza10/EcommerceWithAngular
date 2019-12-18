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
  subscription: Subscription;
  items: AppItems=null;
  item={};
  constructor(private cartService: ShoppingCartService) { }
  ngOnInit(){
    
  }

  addToCart(product: AppProducts){
    let cartId =  this.cartService.getOrCreateCartId();
    this.subscription= this.cartService.getItem(cartId,product.key).snapshotChanges().pipe(
      take(1),
      map(action => {
        const $key = action.payload.key;
        const data = { $key, ...action.payload.val() };
        return data;
      })
    ).subscribe(items=> {
      this.items= items;
      console.log('items ',items);
      console.log('this items ',this.items);
      this.cartService.getItem(cartId,product.key).update({product:product, quantity: ( this.items.quantity|| 0) +1});
  
      });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}

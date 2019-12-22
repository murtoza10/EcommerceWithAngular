import { Component, OnInit, Input } from '@angular/core';
import { AppProducts } from '../models/app-products';
import { AppShoppingCart } from '../models/shoppingcart';
import { AppItems } from '../models/app-items';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent{
  @Input('product') product:AppProducts;
  @Input('shopping-cart') shoppingCart:AppShoppingCart;
  
  constructor(private cartService: ShoppingCartService) { }
  
  getQuantity(){
    if(typeof this.shoppingCart.items==='undefined'||typeof this.shoppingCart==='undefined') return 0;
    let item = this.shoppingCart.items[this.product.key];
    // console.log('pro',this.product);
    // console.log('prokey',this.product.key);
    // console.log('cart',this.shoppingCart);
    return item ? item.quantity : 0;
  }
  removeFromCart(){
    this.cartService.updateCartItem(this.product,-1);
  }
  addToCart(){
      this.cartService.updateCartItem(this.product,1);
  }

}

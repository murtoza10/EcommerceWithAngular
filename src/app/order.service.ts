import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase,private shoppingCartService: ShoppingCartService) { }

  async placeOrder(order){
    let result= this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }
}

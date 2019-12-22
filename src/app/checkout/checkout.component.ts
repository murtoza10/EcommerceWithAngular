import { UserService } from './../user.service';
import { AuthService } from './../auth.service';
import { OrderService } from './../order.service';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map, concatAll } from 'rxjs/operators';

@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  items={};
  TotalItemPrice:number[]=[];
  TotalPrice:number;
  userId;
  subscription:Subscription;
  subscription1: Subscription;
  shipping = {};

  constructor(private authService: AuthService, private userService: UserService,
    private shoppingCartService: ShoppingCartService, private orderService: OrderService) { }

  ngOnInit() {
   this.getItems();

   this.authService.user$.subscribe(user=> {
     this.userService.get(user.uid).snapshotChanges().pipe(
      map(action => {
        const $key = action.payload.key;
        const data = { $key, ...action.payload.val() };
        return data;
      })
     ).subscribe(user=> this.userId=user.$key);
     
    });
    
  }

  async getItems(){
    let cart$ = await this.shoppingCartService.getAllItem();
    this.subscription = cart$.snapshotChanges().pipe(
      // take(1),
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(cart=>{
      this.items =cart;     
      // this.TotalCartItemCount=0;
      // this.TotalItemPrice=0;
      this.TotalPrice=0;
        for(let productId in cart) {
          // this.TotalCartItemCount += this.items[productId].quantity;
          this.TotalItemPrice[productId]= this.items[productId].quantity * this.items[productId].price;
          this.TotalPrice += this.TotalItemPrice[productId];
          console.log('totalprice', this.TotalPrice);
          console.log('t_itemprice',this.TotalItemPrice);
        }
        console.log('cart items',this.items);
    });
    console.log(this.items);
  }

  clearCart(){
    this.shoppingCartService.clearCart();
  }

  placeOrder() {
    let order={
      userId: this.userId,
      datePlaced: new Date().getTime(),
      shipping: this.shipping,
      items: this.items,
      totalPrice: this.TotalPrice    
    }
    this.orderService.storeOrder(order);
  } 
  
  ngOnDestroy(){
    if(this.subscription) this.subscription.unsubscribe();
    if(this.subscription1) this.subscription1.unsubscribe();
  }

}

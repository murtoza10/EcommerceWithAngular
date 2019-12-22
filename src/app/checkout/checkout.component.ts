import { OrderService } from './../order.service';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  shipping = {}; 

  constructor(private shoppingCartService: ShoppingCartService, private orderService: OrderService) { }

  ngOnInit() {
  }
  
  
  placeOrder() {
    let order={
      datePlaced: new Date().getTime(),
      shipping: this.shipping
      
    }
    this.orderService.storeOrder(order);
  }  

}

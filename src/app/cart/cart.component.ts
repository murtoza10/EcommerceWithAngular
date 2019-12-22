import { ProductService } from './../product.service';
import { AppItems } from './../models/app-items';
import { ShoppingCartService } from './../shopping-cart.service';
import { NavbarComponent } from './../navbar/navbar.component';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { AppShoppingCart } from '../models/shoppingcart';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import { AppProducts } from '../models/app-products';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [NavbarComponent]
})
export class CartComponent implements OnInit,OnDestroy {

  displayedColumns = ['title','quantity', 'price'];
  dataSource: MatTableDataSource<AppItems>;

  // @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  //items: AppItems=null;
  TotalCartItemCount: number;
  cart: AppShoppingCart;
  products: AppProducts[]=[];
  items;
  TotalItemPrice:number[]=[];
  TotalPrice:number;

  subscription:Subscription;
  subscription1: Subscription;
  subscription2:Subscription;

  constructor(private shoppingCartService: ShoppingCartService) { }

 async ngOnInit() {
   this.getCart();
   this.getItems();   
    this.dataSource = new MatTableDataSource(this.items);
  }

  async getCart(){
    this.subscription1= (await this.shoppingCartService.getCart()).snapshotChanges().pipe(
      map(action => {
        const $key = action.payload.key;
        const data = { $key, ...action.payload.val() };
        return data;
      })
    ).subscribe(cart=>
      this.cart=cart);
  }
  async getItems(){
    let cart$ = await this.shoppingCartService.getAllItem();
    this.subscription2 = cart$.snapshotChanges().pipe(
      // take(1),
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(cart=>{
      this.items =cart;     
      this.TotalCartItemCount=0;
      //this.TotalItemPrice=0;
      this.TotalPrice=0;
        for(let productId in cart) {
          this.TotalCartItemCount += this.items[productId].quantity;
          this.TotalItemPrice[productId]= this.items[productId].quantity * this.items[productId].price;
          // this.items[productId].price =this.TotalItemPrice[productId];
          this.TotalPrice += this.TotalItemPrice[productId];
          console.log('totalprice', this.TotalPrice);
          console.log('t_itemprice',this.TotalItemPrice);
        }
        //this.items =cart.items;
        this.dataSource.data= this.items;
        console.log('datasource',this.dataSource.data);
        console.log('cart items',this.items);
    });
    console.log(this.items);
  }

  clearCart(){
    this.shoppingCartService.clearCart();
  }

  ngOnDestroy(){
    if(this.subscription) this.subscription.unsubscribe();
    if(this.subscription1) this.subscription1.unsubscribe();
    if(this.subscription2) this.subscription2.unsubscribe();
  }

}
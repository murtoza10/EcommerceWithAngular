import { take, map } from 'rxjs/operators';
import { AppProducts } from './models/app-products';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { AppItems } from './models/app-items';
import { AppShoppingCart } from './models/shoppingcart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  itemsRef: AngularFireList<AppItems> = null;
  items: AppItems=null;
  quantity:number;

  constructor(private db:AngularFireDatabase) { }

  async clearCart(){
    let cartId = await this.getOrCreateCartId();
    this.db.list('/shopping-cart/'+cartId).remove();
  }
  create(){
    return this.db.list('/shopping-cart').push({
      date : new Date().getTime()
    });
  }

  async getCart(): Promise<AngularFireObject<AppShoppingCart>>{
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-cart/'+cartId);
  }

  async getCartfor(){
    let cartId = await this.getOrCreateCartId();
    return this.itemsRef=this.db.list('/shopping-cart/'+cartId);
  }

  async getAllItem(){
    let cartId = await this.getOrCreateCartId();
    return this.db.list('/shopping-cart/'+cartId+ '/items/');
  }
  getItem(cartId: string,productId:string): AngularFireObject<AppItems>{
    return this.db.object('/shopping-cart/'+cartId+ '/items/' +productId);
  }
  getItemForUpdate(cartId: string,productId:string){
    return this.db.object('/shopping-cart/'+cartId+ '/items/' +productId);
  }

  getOrCreateCartId(){
    let cartId = localStorage.getItem('cartId');
    if(cartId) return cartId;

    let result = this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  getOrCreateCartIdForInit(){
    let cartId = localStorage.getItem('cartId');
    if(cartId) return cartId;

    // let result = this.create();
    // localStorage.setItem('cartId', result.key);
    // return result.key;
  }

  // private getOrCreateCart(){
  //   let cartId = localStorage.getItem('cartId');
  //   if(!cartId){
  //     this.create().then(result=>{
  //       localStorage.setItem('cartId',result.key);
  //       return this.getCart(result.key);
  //     });
  //   }else return this.getCart(cartId);  
  // }

  updateCartItem(product:AppProducts,change:number){
    let cartId =  this.getOrCreateCartId();
    let item$= this.getItem(cartId,product.key);

    item$.snapshotChanges().pipe(
      take(1),
      map(action => {
        const $key = action.payload.key;
        const data = { $key, ...action.payload.val() };
        return data;
      })
    ).subscribe(items=> {
      this.items= items;
      // if(this.items.quantity===null) this.items.quantity=0;
      this.quantity =(this.items.quantity || 0)+change;
      if(this.quantity===0) item$.remove();
      else item$.update({
          title: product.title,
          price: product.price,
          quantity: this.quantity,
          imageUrl: product.imageUrl
      });
      
      });
  }

  getQuantity(product: AppProducts){
    let cartId =  this.getOrCreateCartId();
    let item$= this.getItem(cartId,product.key);
    var quantity;
    return item$.snapshotChanges().pipe(
      take(1),
      map(action => {
        const $key = action.payload.key;
        const data = { $key, ...action.payload.val() };
        return data;
      })
    ).subscribe(items=> {
      this.items= items;
      quantity =(this.items.quantity || 0);  
       return quantity;
      });
      // console.log('from service quantity',this.items);  
      // return this.items;
  }
  
  

}

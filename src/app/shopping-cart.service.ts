import { take } from 'rxjs/operators';
import { AppProducts } from './models/app-products';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { AppItems } from './models/app-items';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  itemsRef: AngularFireList<AppItems> = null;

  constructor(private db:AngularFireDatabase) { }

  create(){
    return this.db.list('/shopping-cart').push({
      date : new Date().getTime()
    });
  }

  getCart(cartId: string){
    return this.db.object('/shopping-cart/'+cartId);
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

  // private getOrCreateCart(){
  //   let cartId = localStorage.getItem('cartId');
  //   if(!cartId){
  //     this.create().then(result=>{
  //       localStorage.setItem('cartId',result.key);
  //       return this.getCart(result.key);
  //     });
  //   }else return this.getCart(cartId);  
  // }
  
  async addToCart(product:AppProducts){
    
  }

}

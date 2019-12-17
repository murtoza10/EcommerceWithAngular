import { AppProducts } from './models/app-products';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  PRODUCTS: AppProducts[]=[];

  private dbPath = '/products';

  productsRef: AngularFireList<AppProducts> = null;

  constructor(private  db: AngularFireDatabase) {
    this.productsRef = db.list(this.dbPath);
  }

  create(product){
    return this.db.list('/products').push(product);
  }

  getAll(){
    return this.productsRef;
  }

  get(productId){
    return this.db.object('/products/'+productId);
  }

  update(productId, product){
    return this.db.object('/products/'+productId).update(product);
  }

  delete(productId){
    return this.db.object('/products/'+productId).remove();
  }

}

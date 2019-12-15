import { AppProducts } from './../../models/app-products';
import { Subscription } from 'rxjs';
import { ProductService } from './../../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit,OnDestroy {

  subscription:Subscription;
  products: AppProducts[]=[];
  filteredProducts: AppProducts[]=[];
  constructor(private productService: ProductService) {
    //this.products = this.productService.getAll();
   }

  ngOnInit() {
    this.subscription=this.getProductsList();
  }
  getProductsList() {
    return this.productService.getAll().snapshotChanges().pipe(
      take(1),
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(products => {
      this.filteredProducts= this.products = products;
      console.log('products',products)
    });
  }

  filter(query:string){
    this.filteredProducts = (query) ?
    this.products.filter(p=> p.title.toLowerCase().includes(query.toLowerCase())): this.products;
  }

  ngOnDestroy(){
    if(this.subscription) this.subscription.unsubscribe();
  }

}

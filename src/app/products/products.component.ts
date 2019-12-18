import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../category.service';
import { ProductService } from './../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { map, take, filter, switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AppProducts } from '../models/app-products';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit,OnDestroy {

  subscription:Subscription;
  subscription1:Subscription;
  products: AppProducts[]=[];
  category:string;
  filteredProducts: AppProducts[]=[];
  constructor(private route:ActivatedRoute, private productService: ProductService) { 
    
  }

  ngOnInit() {
    this.subscription=this.getProductsList();
    
  }

  filter(){
    this.filteredProducts=(this.category)?
    this.products.filter(p=> p.category===this.category):this.products;
    console.log('filter ',this.filteredProducts);
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
      this.products = products;
      this.subscription1=this.route.queryParamMap.subscribe(params=>{
        this.category=params.get('category');
        console.log(this.category);
        this.filter();
      });
      //console.log('products',products)
    });
  }

  ngOnDestroy(){
    if(this.subscription) this.subscription.unsubscribe();
    if(this.subscription1) this.subscription1.unsubscribe();
  }

}

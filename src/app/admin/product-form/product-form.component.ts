import { ProductService } from './../../product.service';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { CategoryService } from './../../category.service';
import { Component, OnInit, OnDestroy,Input } from '@angular/core';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit ,OnDestroy{

  categories;
  product ={};
  subscription: Subscription;
  subscription1: Subscription;
  id;
  constructor(private route: ActivatedRoute,
    private router: Router, 
    private categoryService: CategoryService, 
    private productService: ProductService) {
     
   }

  ngOnInit() {
    this.subscription= this.getCategoriesList();
    this.subscription1= this.getId();
  }

  getId(){
    this.id= this.route.snapshot.paramMap.get('id');
    console.log('id',this.id);
     if(this.id) return this.productService.get(this.id).snapshotChanges().pipe(
      map(action => {
        const $key = action.payload.key;
        const data = { $key, ...action.payload.val() };
        return data;
      }))
      .subscribe(p=>{ this.product =p; console.log(p);});
  }
  // getCategoriesList() {
  //   this.categoryService.getCategories().valueChanges().
  //   subscribe(categories => {
  //     this.categories = categories;
  //     console.log('categories',categories);
  //   });
  // }

  //snapshotChanges allows to access the key
  getCategoriesList() {
    return this.categoryService.getCategories().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(categories => {
      this.categories = categories;
      console.log('categories',categories);
    });
  }


  save(product){
    if(this.id) this.productService.update(this.id, product);
    else this.productService.create(product);

    this.router.navigate(['/admin/products']);
  }

  delete(){
    if(!confirm('Are you sure you wanna delete this product?')) return;

    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }

  ngOnDestroy(){
    if(this.subscription) this.subscription.unsubscribe();
    if(this.subscription1) this.subscription1.unsubscribe();
  }


  



}

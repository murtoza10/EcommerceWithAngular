import { ProductService } from './../../product.service';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { CategoryService } from './../../category.service';
import { Component, OnInit, OnDestroy,Input } from '@angular/core';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AppCategory } from 'src/app/models/app-category';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit ,OnDestroy{

  categories;
  private subscription: Subscription;
  constructor(private router: Router, private categoryService: CategoryService, private productService: ProductService) {
    
   }

  ngOnInit() {
    this.getCategoriesList();
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
    this.categoryService.getCategories().snapshotChanges().pipe(
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
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }


  



}

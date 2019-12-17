import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/category.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit,OnDestroy {
  subscription:Subscription;
  categories;
  @Input('category') category;
  constructor(private categoryService: CategoryService) { }

  

  ngOnInit() {
    this.subscription= this.getCategoriesList();
  }

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

  ngOnDestroy(){
    if(this.subscription) this.subscription.unsubscribe();
  }

}

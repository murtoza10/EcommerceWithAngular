import { AppProducts } from './../../models/app-products';
import { Subscription } from 'rxjs';
import { ProductService } from './../../product.service';
import { Component, OnInit, OnDestroy,ViewChild } from '@angular/core';
import { map, take } from 'rxjs/operators';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
})
export class AdminProductsComponent implements OnInit,OnDestroy {

  displayedColumns = ['title', 'price','edit'];
  dataSource: MatTableDataSource<AppProducts>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  subscription:Subscription;
  products: AppProducts[]=[];
  filteredProducts: AppProducts[]=[];
  
  constructor(public productService: ProductService) {}

  ngOnInit() {
    this.subscription=this.getProductsList();
    this.dataSource = new MatTableDataSource(this.products);
    this.ngAfterViewInit();
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
      this.dataSource.data = products;
      //console.log('products',products)
    });
  }

  // filter(query:string){
  //   this.filteredProducts = (query) ?
  //   this.products.filter(p=> p.title.toLowerCase().includes(query.toLowerCase())): this.products;
  // }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy(){
    if(this.subscription) this.subscription.unsubscribe();
  }

}

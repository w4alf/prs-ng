import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { Product } from 'src/app/model/product.class';
import { JsonResponse } from 'src/app/model/json-response.class';
import { ProductService } from 'src/app/service/product.service';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent extends BaseComponent implements OnInit {

  
  products: Product[] = [];
  jr: JsonResponse;
  title: string = "Product List";


  constructor(private productSvc: ProductService,protected sysSvc: SystemService) {
    super(sysSvc);
  }

  ngOnInit() {

    super.ngOnInit();

    // verify that the user is logged in
    this.sysSvc.checkLogin();
      
    console.log("calling product service list");

      this.productSvc.list().subscribe(jr=> {
      this.products = jr.data as Product[];
      
    });


  }

}

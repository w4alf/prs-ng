import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.class';
import { Vendor } from 'src/app/model/vendor.class';
import { VendorService } from 'src/app/service/vendor.service';
import { ProductService } from 'src/app/service/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SystemService } from 'src/app/service/system.service';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent extends BaseComponent implements OnInit {

  product: Product = new Product();
  title: string = "Product Detail";
  id: number = 0;
  vendors: Vendor[] = [];



  constructor(protected sysSvc: SystemService, private vendorSvc: VendorService, private productSvc: ProductService, private router:Router, private route: ActivatedRoute, private loc: Location) { 
    super(sysSvc);
  }

  ngOnInit() {

    super.ngOnInit();

    // verify that the user is logged in
    this.sysSvc.checkLogin();
    
 

    
    //get product
    this.route.params.subscribe(parms=>this.id=parms['id']);
    this.productSvc.get(this.id).subscribe(jr=>{
      this.product = jr.data as Product;  


    }); 

    //get list of vendors
    this.vendorSvc.list().subscribe(jr=> {
      this.vendors = jr.data as Vendor[];
      console.log("vendors: ", this.vendors);

    }); 


  }


  delete(): void {

    this.productSvc.delete(this.id).subscribe(jr=>{
      console.log("deleting product..");

   
      this.router.navigateByUrl("/products/list")

      //sean need to fix

     });

  }

  compVendor(a: Vendor, b: Vendor): boolean {
    return  a && b && a.id === b.id;
  }

  backClicked() {

    this.loc.back();
  }
  
}

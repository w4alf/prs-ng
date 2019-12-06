import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.class';
import { Vendor } from 'src/app/model/vendor.class';
import { Location } from '@angular/common';
import { VendorService } from 'src/app/service/vendor.service';
import { ProductService } from 'src/app/service/product.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {


  product: Product = new Product();
  title: string = "Product Create";
  id: number = 0;
  vendors: Vendor[] = [];

  constructor(private vendorSvc: VendorService, private productSvc: ProductService, private router:Router, private route: ActivatedRoute, private loc: Location) { }

  ngOnInit() {
    
    //get list of vendors
      this.vendorSvc.list().subscribe(jr=> {
        this.vendors = jr.data as Vendor[];
        console.log("vendors: ", this.vendors);
  
      }); 
  
      
      //get product
      this.route.params.subscribe(parms=>this.id=parms['id']);
      this.productSvc.get(this.id).subscribe(jr=>{
        this.product = jr.data as Product;  
  
  
      });   
  
   }

   save(): void {

    this.productSvc.save(this.product).subscribe(jresp=>{
      console.log("Created product..");
  
      console.log(this.product);
      this.router.navigateByUrl("/products/list")
    });
  }
  
  backClicked() {

    this.loc.back();
    
  }

}

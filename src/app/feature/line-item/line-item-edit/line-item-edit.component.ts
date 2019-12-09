import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { LineItemService } from 'src/app/service/line-item.service';
import { SystemService } from 'src/app/service/system.service';
import { ProductService } from 'src/app/service/product.service';
import { RequestService } from 'src/app/service/request.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { LineItem } from 'src/app/model/line-item.class';
import { Request } from 'src/app/model/request.class';
import { Product } from 'src/app/model/product.class';

@Component({
  selector: 'app-line-item-edit',
  templateUrl: './line-item-edit.component.html',
  styleUrls: ['./line-item-edit.component.css']
})
export class LineItemEditComponent extends BaseComponent implements OnInit {

  constructor(private lineItemSvc: LineItemService, protected sysSvc: SystemService, private productSvc: ProductService, private requestSvc: RequestService, private router: Router, private route: ActivatedRoute, private loc: Location) {
    super(sysSvc);
  }

  lineItem: LineItem = new LineItem();
  products: Product[]= [];
  title: string = "Line Item Edit";
  request: Request = new Request();
  id: number = 0;



  ngOnInit() {

    super.ngOnInit();

    // verify that the user is logged in
    this.sysSvc.checkLogin();

    //get lineItem
    this.route.params.subscribe(parms => this.id = parms['id']);
    this.lineItemSvc.get(this.id).subscribe(jr => {
    this.lineItem = jr.data as LineItem;

    });

    
    //get list of products
    this.productSvc.list().subscribe(jr => {
      this.products = jr.data as Product[];
      console.log("products: ", this.products);
    });

  }


  save(): void {

    this.lineItemSvc.update(this.lineItem).subscribe(jresp=>{
      
      console.log("edit LineItem..");
      console.log(this.lineItem);

      this.router.navigateByUrl("/requests/lines/"+this.request.id)
    });
  }
  
  backClicked() {

    this.loc.back();
  }


  compProduct(a: Product, b: Product): boolean {
    return  a && b && a.id === b.id;
  }


}

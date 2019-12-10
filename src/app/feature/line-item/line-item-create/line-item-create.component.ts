import { Component, OnInit } from '@angular/core';
import { LineItem } from 'src/app/model/line-item.class';
import { SystemService } from 'src/app/service/system.service';
import { RequestService } from 'src/app/service/request.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BaseComponent } from '../../base/base.component';
import { LineItemService } from 'src/app/service/line-item.service';
import { ProductService } from 'src/app/service/product.service';
import { Product } from 'src/app/model/product.class';
import { Request } from 'src/app/model/request.class';


@Component({
  selector: 'app-line-item-create',
  templateUrl: './line-item-create.component.html',
  styleUrls: ['./line-item-create.component.css']
})
export class LineItemCreateComponent extends BaseComponent implements OnInit {


  lineItem: LineItem = new LineItem();
  products: Product[] = [];
  title: string = "Line Item Create";
  request: Request = new Request();
  id: number = 0;

  constructor(private lineItemSvc: LineItemService, protected sysSvc: SystemService, private productSvc: ProductService, private requestSvc: RequestService, private router: Router, private route: ActivatedRoute, private loc: Location) {
    super(sysSvc);
  }


  ngOnInit() {

    super.ngOnInit();

    // verify that the user is logged in
    this.sysSvc.checkLogin();

    //get list of products
    this.productSvc.list().subscribe(jr => {
      this.products = jr.data as Product[];

    });

    //get request
    this.route.params.subscribe(parms => this.id = parms['id']);
    this.requestSvc.get(this.id).subscribe(jr => {
      this.request = jr.data as Request;
      this.lineItem.request = this.request;

    });


  }

  save(): void {

    this.lineItemSvc.save(this.lineItem).subscribe(jresp => {

    
      this.router.navigateByUrl("/requests/lines/" + this.id);

    });
  }

  backClicked() {

    this.loc.back();

  }



}

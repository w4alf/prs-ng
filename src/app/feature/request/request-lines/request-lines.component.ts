import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/service/request.service';
import { SystemService } from 'src/app/service/system.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Request } from '../../../model/request.class';
import { BaseComponent } from '../../base/base.component';
import { LineItem } from 'src/app/model/line-item.class';
import { LineItemService } from 'src/app/service/line-item.service';


@Component({
  selector: 'app-request-lines',
  templateUrl: './request-lines.component.html',
  styleUrls: ['./request-lines.component.css']
})
export class RequestLinesComponent extends BaseComponent implements OnInit {

  lines: LineItem[] = [];
  lineItem: LineItem = new LineItem();

  title: string = "Line Item ";
  request: Request = new Request();
  id: number = 0;


  constructor(private lineItemSvc: LineItemService, private requestSvc: RequestService, protected sysSvc: SystemService, private router: Router, private route: ActivatedRoute, private loc: Location) {
    super(sysSvc);
  }

  ngOnInit() {

    super.ngOnInit();


    //get request
    this.route.params.subscribe(parms => this.id = parms['id']);


    // //get line item id
    //     this.route.params.subscribe(parms=>this.id=parms['id']);
    //     this.lineItemSvc.get(this.id).subscribe(jr=>{
    //     this.lineItem = jr.data as LineItem;  

    // });

    console.log("request id: " + this.request.id);

    this.refresh();

  }

  refresh(): void {

    this.requestSvc.get(this.id).subscribe(jr => {
      this.request = jr.data as Request;

    });


    // get the line Items
    this.lineItemSvc.getByReqId(this.id).subscribe(jr => {
      this.lines = jr.data as LineItem[];
      console.log(this.lines);

    });

  }


  delete(id: number): void {

    this.lineItemSvc.delete(id).subscribe(jr => {
      console.log("deleting line item..");
      //get lines again to refresh after delete
      this.refresh();

    });

  }

  review(): void {

    this.requestSvc.submitForReview(this.request).subscribe(jresp => {

      console.log("Review Request..");
      console.log(this.request);

      this.router.navigateByUrl("/requests/list")

    });

  }



}

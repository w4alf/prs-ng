import { Component, OnInit } from '@angular/core';
import { LineItem } from 'src/app/model/line-item.class';
import { Request } from '../../../model/request.class';
import { BaseComponent } from '../../base/base.component';
import { LineItemService } from 'src/app/service/line-item.service';
import { RequestService } from 'src/app/service/request.service';
import { SystemService } from 'src/app/service/system.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-request-approve',
  templateUrl: './request-approve.component.html',
  styleUrls: ['./request-approve.component.css']
})
export class RequestApproveComponent extends BaseComponent implements OnInit {

  lines: LineItem[] = [];
  lineItem: LineItem = new LineItem();

  title: string = "Request Approve/Reject ";
  request: Request = new Request();
  id: number = 0;


  constructor(private lineItemSvc: LineItemService, private requestSvc: RequestService, protected sysSvc: SystemService, private router: Router, private route: ActivatedRoute, private loc: Location) {
    super(sysSvc);
   }

  ngOnInit() {

    super.ngOnInit();

    // verify that the user is logged in
    this.sysSvc.checkLogin();

    this.refresh();

  }

  refresh(): void {
    
     //get product
     this.route.params.subscribe(parms=>this.id=parms['id']);
     this.requestSvc.get(this.id).subscribe(jr=>{
     this.request = jr.data as Request;  

    }); 

    // get the line Items
    this.lineItemSvc.getByReqId(this.id).subscribe(jr => {
      this.lines = jr.data as LineItem[];
      console.log(this.lines);

    });

  }  

  approve(): void {
   
    this.requestSvc.approve(this.request).subscribe(jresp=>{
      console.log("approved request:");
      console.log(this.request);
      this.router.navigateByUrl("/requests/request-review")
    });



  }

  reject(): void {

    this.requestSvc.reject(this.request).subscribe(jresp=>{
      console.log("rejected request:");
      console.log(this.request);
      this.router.navigateByUrl("/requests/request-review")
    });  
   
  } 

}

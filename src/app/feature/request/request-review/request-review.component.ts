import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/service/request.service';
import { SystemService } from 'src/app/service/system.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BaseComponent } from '../../base/base.component';


@Component({
  selector: 'app-request-review',
  templateUrl: './request-review.component.html',
  styleUrls: ['./request-review.component.css']
})
export class RequestReviewComponent extends BaseComponent implements OnInit {

  requests: Request[] = [];
  title: string = "Request Review";
 


  constructor( private requestSvc: RequestService, protected sysSvc: SystemService,private router:Router, private route: ActivatedRoute, private loc: Location) {
    super(sysSvc);
   }

  ngOnInit() {

    super.ngOnInit();
   
    console.log("id: " + this.loggedInUser.id);
      

    //get requests for Review
    this.requestSvc.requestForReview(this.loggedInUser.id).subscribe(jr=> {
  

      this.requests = jr.data as Request[];
    
    });



  }

}

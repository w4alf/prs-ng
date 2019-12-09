import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.class';
import { Location } from '@angular/common';
import { UserService } from 'src/app/service/user.service';
import { RequestService } from 'src/app/service/request.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Request } from '../../../model/request.class';
import { SystemService } from 'src/app/service/system.service';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent extends BaseComponent implements OnInit {
  
  request: Request = new Request();
  title: string = "Request Detail";
  id: number = 0;
  users: User[] = [];



  constructor(protected sysSvc: SystemService, private userSvc: UserService, private requestSvc: RequestService, private router:Router, private route: ActivatedRoute, private loc: Location) { 
    super(sysSvc);
  }

  ngOnInit() {

    super.ngOnInit();

    // verify that the user is logged in
    this.sysSvc.checkLogin();

    //get request
    this.route.params.subscribe(parms=>this.id=parms['id']);
    this.requestSvc.get(this.id).subscribe(jr=>{
    this.request = jr.data as Request;  


    }); 



  }

  delete(): void {

    this.requestSvc.delete(this.id).subscribe(jr=>{
      console.log("deleting request..");

   
      this.router.navigateByUrl("/requests/list")

    
     });

  }

  backClicked() {

    this.loc.back();
  }


}

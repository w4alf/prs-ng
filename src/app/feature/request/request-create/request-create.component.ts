import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.class';
import { RequestService } from 'src/app/service/request.service';
import { UserService } from 'src/app/service/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Request } from '../../../model/request.class';
import { BaseComponent } from '../../base/base.component';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-request-create',
  templateUrl: './request-create.component.html',
  styleUrls: ['./request-create.component.css']
})
  export class RequestCreateComponent extends BaseComponent implements OnInit {

    
  request: Request = new Request();
  title: string = "Request Create";
 
 

  constructor(protected sysSvc: SystemService, private requestSvc: RequestService, private userSvc: UserService, private router:Router, private route: ActivatedRoute, private loc: Location) { 
    super(sysSvc);
  }

  ngOnInit() {

    super.ngOnInit();

    // verify that the user is logged in
    this.sysSvc.checkLogin();

    this.request.user = this.sysSvc.loggedInUser;

  }

  save(): void {

    this.requestSvc.save(this.request).subscribe(jresp=>{
      console.log("Created Request..");
  
      console.log(this.request);
      this.router.navigateByUrl("/requests/list")
    });
  }
  
  backClicked() {

    this.loc.back();
    
  }





}

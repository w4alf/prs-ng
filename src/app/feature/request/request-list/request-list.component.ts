import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/service/request.service';
import { SystemService } from 'src/app/service/system.service';
import { BaseComponent } from '../../base/base.component';
import { Request } from '../../../model/request.class';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/model/user.class';


@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent extends BaseComponent implements OnInit {

  requests: Request[] = [];
  title: string = "Request List";


  constructor(private requestSvc: RequestService, protected sysSvc: SystemService, private router: Router, private route: ActivatedRoute, private loc: Location) {
    super(sysSvc);
  }

  ngOnInit() {

    super.ngOnInit();

    // verify that the user is logged in
    this.sysSvc.checkLogin();
    
    //get request list
    this.requestSvc.list().subscribe(jr => {
      this.requests = jr.data as Request[];

    });


  }

}

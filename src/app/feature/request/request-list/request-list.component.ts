import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/service/request.service';
import { SystemService } from 'src/app/service/system.service';
import { BaseComponent } from '../../base/base.component';
import { Request } from '../../../model/request.class';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent extends BaseComponent implements OnInit {

  requests: Request[] = [];
 
  title: string = "Request List";


  constructor( private requestSvc: RequestService, protected sysSvc: SystemService,private router:Router, private route: ActivatedRoute, private loc: Location) { 
    super(sysSvc);
  }

  ngOnInit() {

    super.ngOnInit();
      
      this.requestSvc.list().subscribe(jr=> {
      this.requests = jr.data as Request[];
      
    });


  }

}

import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.class';
import { Location } from '@angular/common';
import { UserService } from 'src/app/service/user.service';
import { RequestService } from 'src/app/service/request.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Request } from '../../../model/request.class';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent implements OnInit {
  
  request: Request = new Request();
  title: string = "Request Detail";
  id: number = 0;
  users: User[] = [];



  constructor(private userSvc: UserService, private requestSvc: RequestService, private router:Router, private route: ActivatedRoute, private loc: Location) { }

  ngOnInit() {

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

}

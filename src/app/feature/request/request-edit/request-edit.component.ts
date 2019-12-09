import { Component, OnInit } from '@angular/core';
import { Request } from '../../../model/request.class';
import { SystemService } from 'src/app/service/system.service';
import { RequestService } from 'src/app/service/request.service';
import { UserService } from 'src/app/service/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BaseComponent } from '../../base/base.component';
import { User } from 'src/app/model/user.class';

@Component({
  selector: 'app-request-edit',
  templateUrl: './request-edit.component.html',
  styleUrls: ['./request-edit.component.css']
})
export class RequestEditComponent extends BaseComponent implements OnInit {


  request: Request = new Request();
  title: string = "Request Edit";
  id: number = 0;
  users: User[] = [];


  constructor(protected sysSvc: SystemService, private requestSvc: RequestService, private userSvc: UserService, private router: Router, private route: ActivatedRoute, private loc: Location) {
    super(sysSvc);
  }

  ngOnInit() {

    super.ngOnInit();

    // verify that the user is logged in
    this.sysSvc.checkLogin();

    //get list of users
    this.userSvc.list().subscribe(jr => {
      this.users = jr.data as User[];
      console.log("users: ", this.users);

    });

    //get request
    this.route.params.subscribe(parms => this.id = parms['id']);
    this.requestSvc.get(this.id).subscribe(jr => {
      this.request = jr.data as Request;

    });

  }

  save(): void {

    this.requestSvc.update(this.request).subscribe(jresp => {
      console.log("edit Request..");

      console.log(this.request);
      this.router.navigateByUrl("/requests/list")
    });
  }

  backClicked() {

    this.loc.back();
  }

  compUser(a: User, b: User): boolean {
    return a && b && a.id === b.id;
  }

}

import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { User } from 'src/app/model/user.class';
import { JsonResponse } from 'src/app/model/json-response.class';
import { UserService } from 'src/app/service/user.service';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent extends BaseComponent implements OnInit {

  users: User[] = [];
  jr: JsonResponse;
  title: string = "User List";



  constructor(private userSvc: UserService, protected sysSvc: SystemService) {
    super(sysSvc);
  }

  ngOnInit() {

    super.ngOnInit();
    console.log("verify logged in user");
    console.log("User", this.loggedInUser);
    console.log("admin?", this.isAdmin);
    console.log("reviewer?", this.isReviewer);  


    console.log("calling user service list");

      this.userSvc.list().subscribe(jr=> {
      this.users = jr.data as User[];
    
    });




  }

}

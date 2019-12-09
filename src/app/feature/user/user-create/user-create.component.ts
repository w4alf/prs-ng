import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.class';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { SystemService } from 'src/app/service/system.service';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent extends BaseComponent implements OnInit {

  user: User = new User();
  title: string ="User Create";



  constructor(protected sysSvc: SystemService, private userSvc: UserService, private router:Router) {
    super(sysSvc);
   }

  ngOnInit() {
    super.ngOnInit();

    // verify that the user is logged in
    this.sysSvc.checkLogin();


  }


  save(): void {

    this.userSvc.save(this.user).subscribe(jresp=>{
      console.log("saved user..");

      console.log(this.user);
      this.router.navigateByUrl("/users/list")
    });
  }


}

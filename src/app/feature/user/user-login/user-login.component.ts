import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { SystemService } from 'src/app/service/system.service';
import { User } from 'src/app/model/user.class';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent extends BaseComponent implements OnInit {

  message: string = '';
  user: User = new User()


  constructor(private userSvc: UserService, protected sysSvc: SystemService, private router: Router) {
    super(sysSvc);
  }

  ngOnInit() {
    this.user.userName = 'system';
    this.user.password = 'sesame';

    // admin and reviewer option for testing
    //this.user.userName = 'sblessing';
    //this.user.password = 'login';

    //  
    this.sysSvc.loggedInUser =null;

  }

  login() {
    console.log("login called for user:", this.user);
    this.userSvc.login(this.user)
      .subscribe(jr => {
        console.log("jr:", jr);
        if (jr.errors == null) {
          if (jr.data == null) {
            // no error but still no user???
            this.message = "Invalid Username/Password combo.  Retry";
          }
          else {
            // should be g2g!
            this.user = jr.data as User;
            this.sysSvc.loggedInUser = this.user;
            //good login, it should navigate to a HOME page or landing page.
            this.router.navigateByUrl('/users/list');
          }
        }
        else {
          this.message = "Invalid Username/Password combo.  Retry";
        }
      })
  };



}

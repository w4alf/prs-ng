import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.class';
import { UserService } from 'src/app/service/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SystemService } from 'src/app/service/system.service';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent extends BaseComponent implements OnInit {

  user: User = new User();
  title: string = "User Edit";
  id: number = 0;

  constructor(protected sysSvc: SystemService, private userSvc: UserService, private router:Router, private route: ActivatedRoute, private loc: Location) {
    super(sysSvc);
   }
  ngOnInit() {

    super.ngOnInit();

    // verify that the user is logged in
    this.sysSvc.checkLogin();

    //get the id from the URL
    this.route.params.subscribe(parms=>this.id=parms['id']);
    
    // get the movie from the movie service
    this.userSvc.get(this.id).subscribe(jr=> {

      this.user = jr.data as User;
    });


  }

  delete(): void {

    this.userSvc.delete(this.id).subscribe(jr=>{
      console.log("deleting user..");

   
      this.router.navigateByUrl("/users/list")

      //sean need to fix

      

    });

  }

  backClicked() {

    this.loc.back();
  }

}

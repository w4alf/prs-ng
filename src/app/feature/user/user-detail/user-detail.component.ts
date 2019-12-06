import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.class';
import { UserService } from 'src/app/service/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user: User = new User();
  title: string = "User Edit";
  id: number = 0;

  constructor(private userSvc: UserService, private router:Router, private route: ActivatedRoute, private loc: Location) { }
  ngOnInit() {

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

}

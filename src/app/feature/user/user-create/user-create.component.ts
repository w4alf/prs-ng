import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.class';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  user: User = new User();
  title: string ="User Create";



  constructor(private userSvc: UserService, private router:Router) { }

  ngOnInit() {
  }


  save(): void {

    this.userSvc.save(this.user).subscribe(jresp=>{
      console.log("saved user..");

      console.log(this.user);
      this.router.navigateByUrl("/users/list")
    });
  }


}

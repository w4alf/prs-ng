import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/model/menu-item.class';
import { BaseComponent } from 'src/app/feature/base/base.component';
import { SystemService } from 'src/app/service/system.service';
import { User } from 'src/app/model/user.class';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent extends BaseComponent implements OnInit {

  menuItems: MenuItem[] = [];
  userName: String;

  constructor(protected sysSvc: SystemService) { 
      super(sysSvc);
  }

  ngOnInit() {

    super.ngOnInit();

    this.userName = this.sysSvc.loggedInUser.firstName;
    

    this.menuItems= [

      new MenuItem("User", "/users/list","Users List"),
      new MenuItem("Vendor", "/vendors/list","Vendors List"),
      new MenuItem("Product", "/products/list","Products List"),
      new MenuItem("Request", "/requests/list","Requests List"),
    ]
    
    console.log(this.sysSvc.isReviewer());
    if(this.sysSvc.isReviewer()){
       this.menuItems.push(new MenuItem("Review", "/requests/request-review","Review List") );
    }

    this.menuItems.push(new MenuItem("Log Off", "/users/login","Log in"));
 

  }

}

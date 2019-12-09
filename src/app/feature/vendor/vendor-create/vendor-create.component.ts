import { Component, OnInit } from '@angular/core';
import { Vendor } from 'src/app/model/vendor.class';
import { VendorService } from 'src/app/service/vendor.service';
import { Router } from '@angular/router';
import { SystemService } from 'src/app/service/system.service';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-vendor-create',
  templateUrl: './vendor-create.component.html',
  styleUrls: ['./vendor-create.component.css']
})
export class VendorCreateComponent extends BaseComponent implements OnInit {

  vendor: Vendor = new Vendor();
  title: string ="Vendor Create";



  constructor(protected sysSvc:SystemService, private vendorSvc: VendorService, private router:Router) {
    super(sysSvc);
   }

  ngOnInit() {

    super.ngOnInit();

    // verify that the user is logged in
    this.sysSvc.checkLogin();

  }

  save(): void {

    this.vendorSvc.save(this.vendor).subscribe(jresp=>{
      console.log("saved vendor..");

      console.log(this.vendor);
      this.router.navigateByUrl("/vendors/list")
    });
    
  }


}

import { Component, OnInit } from '@angular/core';
import { Vendor } from 'src/app/model/vendor.class';
import { VendorService } from 'src/app/service/vendor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SystemService } from 'src/app/service/system.service';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-vendor-edit',
  templateUrl: './vendor-edit.component.html',
  styleUrls: ['./vendor-edit.component.css']
})
export class VendorEditComponent extends BaseComponent implements OnInit {

  vendor: Vendor = new Vendor();
  title: string = "Vendor Edit";
  id: number = 0;



  constructor(protected sysSvc: SystemService, private vendorSvc: VendorService, private router:Router, private route: ActivatedRoute, private loc: Location) { 
    super(sysSvc);
  }

  ngOnInit() {

    super.ngOnInit();

    // verify that the user is logged in
    this.sysSvc.checkLogin();
    
    this.route.params.subscribe(parms=>this.id=parms['id']);
    this.vendorSvc.get(this.id).subscribe(jr=>{
      this.vendor = jr.data as Vendor;

    });  

  }

  save(): void {

    this.vendorSvc.update(this.vendor).subscribe(jresp=>{
      console.log("edited vendor..");

      console.log(this.vendor);
      this.router.navigateByUrl("/vendors/list")
    });
  }

  backClicked() {

    this.loc.back();
    
  }


}

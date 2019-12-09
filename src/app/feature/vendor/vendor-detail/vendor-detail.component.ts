import { Component, OnInit } from '@angular/core';
import { Vendor } from 'src/app/model/vendor.class';
import { VendorService } from 'src/app/service/vendor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SystemService } from 'src/app/service/system.service';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-vendor-detail',
  templateUrl: './vendor-detail.component.html',
  styleUrls: ['./vendor-detail.component.css']
})
export class VendorDetailComponent extends BaseComponent implements OnInit {

  vendor: Vendor = new Vendor();
  title: string = "Vendor Detail";
  id: number = 0;

  constructor(protected sysSvc: SystemService, private vendorSvc: VendorService, private router: Router, private route: ActivatedRoute, private loc: Location) {
    super(sysSvc);
  }

  ngOnInit() {

    super.ngOnInit();

    // verify that the user is logged in
    this.sysSvc.checkLogin();

    //get the id from the URL
    this.route.params.subscribe(parms => this.id = parms['id']);


    this.vendorSvc.get(this.id).subscribe(jr => {

      this.vendor = jr.data as Vendor;
    });

  }

  delete(): void {

    this.vendorSvc.delete(this.id).subscribe(jr => {

      this.router.navigateByUrl("/vendors/list")

      
    });

  }

  backClicked() {

    this.loc.back();
  }

}

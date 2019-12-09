import { Component, OnInit } from '@angular/core';
import { Vendor } from 'src/app/model/vendor.class';
import { JsonResponse } from 'src/app/model/json-response.class';
import { VendorService } from 'src/app/service/vendor.service';
import { BaseComponent } from '../../base/base.component';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent extends BaseComponent implements OnInit {

  vendors: Vendor[] = [];
  jr: JsonResponse;
  title: string = "Vendor List";



  constructor(private vendorSvc: VendorService, protected sysSvc: SystemService) {
    super(sysSvc);
  }

  ngOnInit() {

    super.ngOnInit();

    // verify that the user is logged in
    this.sysSvc.checkLogin();


    this.vendorSvc.list().subscribe(jr => {
      this.vendors = jr.data as Vendor[];

    });


  }

}

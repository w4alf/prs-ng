import { Component, OnInit } from '@angular/core';
import { Vendor } from 'src/app/model/vendor.class';
import { VendorService } from 'src/app/service/vendor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-vendor-detail',
  templateUrl: './vendor-detail.component.html',
  styleUrls: ['./vendor-detail.component.css']
})
export class VendorDetailComponent implements OnInit {
  
  vendor: Vendor = new Vendor();
  title: string = "Vendor Detail";
  id: number = 0;

  constructor(private vendorSvc: VendorService, private router:Router, private route: ActivatedRoute, private loc: Location) { }

  ngOnInit() {

    //get the id from the URL
    this.route.params.subscribe(parms=>this.id=parms['id']);
    
    
    this.vendorSvc.get(this.id).subscribe(jr=> {

      this.vendor = jr.data as Vendor;
    });

  }

  delete(): void {

    this.vendorSvc.delete(this.id).subscribe(jr=>{
      console.log("deleting vendor..");

   
      this.router.navigateByUrl("/vendors/list")

      //sean need to fix

     });

  }

}

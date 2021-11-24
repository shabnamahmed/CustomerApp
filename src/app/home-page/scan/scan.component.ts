import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css']
})
export class ScanComponent implements OnInit {
  customerId: any;
  constructor(private order: OrderService,
    private route: ActivatedRoute, private router: Router) {
    this.customerId = this.route.snapshot.params['id'];
   
  }

  ngOnInit(): void {

  }


  qrResultString: any;
  visit: any = {};
  clearResult(): void {
    this.qrResultString = null;
  }

  onCodeResult(resultString: any) {
    this.qrResultString = resultString;
    let id = this.qrResultString.split('=');
    this.qrResultString = id[1];
    if (this.qrResultString != null) {
      this.visit.customer = { "id": JSON.parse(this.customerId) };
      this.visit.tableMaster = { "id": JSON.parse(this.qrResultString) };
      this.visit.rating = 4.5;
      this.visit.ratingComment = null;
      this.visit.comeOrLeave = "come";
      this.visit.payStatus = "UnPaid";
      this.order.addVisit(this.visit).subscribe((data: any) => {
        console.log(data);
        this.router.navigate(['../orders'], { relativeTo: this.route });
      });
    }  
  }  
}






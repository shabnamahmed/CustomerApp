import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { DatePipeService } from 'src/app/services/date-pipe.service';
import { Subscription } from 'rxjs';
import { interval } from 'rxjs/internal/observable/interval';
import { startWith,switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})

export class OrdersComponent implements OnInit {
  timeInterval!: Subscription;
  Month: any;
  dateday: any;
  dateMonth: any;
  dateYear: any;
  MonthNames: any;
  hours: any;
  minutes: any;
  amount:any;
  constructor(
    private http: HttpClient, public OrderService: OrderService,
    private router: Router, private route: ActivatedRoute, private datePipe: DatePipeService
  ) { 
    this.OrderService.getName().subscribe(data => {
      this.name = data.name;
      
    
    });
  }
  table = "";
  id: any = JSON.parse(this.route.snapshot.params['id']);

  time: any;
  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  name: any;
  dateTime: any;
  orderInfo: any;
  order = false;
  visitId: any;
  ngOnInit() {
    this.getVisitData();
    this.getOrders();
   this.pollUntillCompleted();
  }

  getOrders() {
    this.OrderService.getCurrentVisitOrders(this.id).subscribe((data: any) => {
      this.order = true;
      this.orderInfo = data.list;
      this.amount =0;
      this.orderInfo.forEach((element: any) => {
        let temp = element.createdDateTime;
        element.createdDateTime = this.transformDate(temp);
        // this.Month = this.dateday + " " + this.dateMonth + " " + this.dateYear + "," + this.hours + ":" + this.minutes;
        this.amount += element.totalAmount
      });
    },err=>{
      this.order = false;
      this.orderInfo = [];
      this.amount =0;
      this.getVisitData();
    }
    )
  }

  // Go to Checkout Page
  checkOut() {
    let payment: any = {};
    payment.visitId = JSON.parse(this.visitId);
    console.log(this.visitId);
    this.OrderService.checkoutPayment(payment).subscribe(data => {
      localStorage.removeItem("order");
      this.router.navigate(['../orders/checkout', this.visitId,this.table], { relativeTo: this.route });
    });
  }

  // Get Open visit Data

  getVisitData() {
    this.OrderService.getOpenVisitByCustomer(this.id).subscribe((res: any) => {
      let temp: any = res;
      temp.forEach((element: any) => {
        let data = element;
        console.log(data);
        this.visitId = data.id;
        this.OrderService.getVisit(data.id).subscribe((data1: any) => {
          console.log(data1)
          this.table = data1.tableMaster.name;
          console.log(data1.fromDateTime);
          this.Month = this.transformDate(data1.fromDateTime);
        });
      });
    },err=>{
      this.router.navigate(['../dashboard'], { relativeTo: this.route });  
    });

  }

  transformDate(obj: any) {
    let date = obj.split(' ');
    let day = date[0];
    let time = date[1];
    let dayArray = day.split('/');
    this.dateday = dayArray[0];
    this.dateMonth = dayArray[1];
    this.dateYear = dayArray[2];
    for (let i = 1; i <= this.months.length; i++) {
      if (this.dateMonth == i) {
        this.dateMonth = this.months[i - 1];
      }
    }
    let fullTime = time.split(":");
    this.hours = fullTime[0];
    this.minutes = fullTime[1];
    let TranformDate = this.dateday + " " + this.dateMonth + " " + this.dateYear + "," + this.hours + ":" + this.minutes;
    return TranformDate;
  }

  // Destroy Subscription for the interval
  ngOnDestroy()
    {
     this.timeInterval.unsubscribe();
    }

     // Assign a Poll
  
  pollUntillCompleted() {
    this.timeInterval= interval(8000)
      .pipe(
        switchMap(async () => this.getOrders()
        ),)
      .subscribe(_ => {},_ => {},);
  }

  // Get Orders By CurrentVisitedCustomer

}

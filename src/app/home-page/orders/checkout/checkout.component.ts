import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { CustomerService } from 'src/app/services/customer.service';
import { DatePipeService } from 'src/app/services/date-pipe.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  dateTime: any;
  time: any;

  dateday: any;
  dateMonth: any;
  dateYear: any;
  Month: any
  hours: any;
  minutes: any;

  messages: any[] = [];

  constructor(private router: Router, private OrderService: OrderService,
    private route: ActivatedRoute, private customer: CustomerService,
    private datePipe: DatePipeService) {

  }
  table: any;
  orderdate: any;
  amount = 0;
  name = "";
  orderInfo: any;
  id = this.route.snapshot.params['id'];
  visitId = this.route.snapshot.params['visitId'];
  tableId = this.route.snapshot.params['tableId'];
  months: any = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  ngOnInit(): void {

    this.OrderService.getName().subscribe(data => {
      this.name = data.name;
    });
    this.getOrders();

  }
  getOrders() {
    this.OrderService.getOrderByVisit(this.visitId).subscribe((data: any) => {
      this.orderInfo = data;
      this.orderInfo.forEach((element: any) => {
        this.Month = element.createdDateTime;
        let date = this.Month.split(' ');
        console.log(date);
        let day = date[0];
        let time = date[1];
        console.log(day + "  " + time);
        let dayArray = day.split('/');
        console.log(dayArray);
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
        element.createdDateTime = this.dateday + " " + this.dateMonth + " " + this.dateYear + "," + this.hours + ":" + this.minutes;
        this.Month = this.dateday + " " + this.dateMonth + " " + this.dateYear + "," + this.hours + ":" + this.minutes;
        this.amount += element.totalAmount;
      });
      this.table = data.tableId;
      console.log(data);
    })
  }


  // Go to Dashboard

  dashboard() {
    this.router.navigate(['../../../../dashboard'], { relativeTo: this.route });

  }

  // logout Customer

  logOut() {
    this.customer.logOut().subscribe((data: any) => {
      console.log(data);
    });
    this.router.navigate(['/login']);
  }
}

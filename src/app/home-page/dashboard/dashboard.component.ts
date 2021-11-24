import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  customerInfo: any = [];
  month: any;
  paystatus: any;
  name: any;
  username: any
  dateTime: any;
  dateday: any;
  dateMonth: any;
  dateYear: any;
  hours: any;
  minutes: any;
  fromDateTime: any;
  sum = 0;
  amount = 0;
  orderInfo: any = [];
  customer: any;
  restaurentName: any;
  monthLabels: any;
  expenses: any=[];
;
  constructor(
    private http: HttpClient, public CustomerService: CustomerService, private route: ActivatedRoute,
    private router: Router, private OrderService: OrderService
  ) { }
  Month: any;
  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  MonthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  tableId: any;
  visitId: any;
  items: any;
  item: any = Array();
  orders = false;
  visits: any = [];
  monthInfo: any=[];
  orderDetails: any = [];
  dashboard:any;
  MonthName:any

  ngOnInit(): void {
    this.name = this.route.snapshot.params['id'];
    this.getDashboard();
    this.getName();
    this.GetExpense();
  }

  getDashboard() {
    this.CustomerService.getCustomerOrders(this.name).subscribe(data => {
      this.customer = data;
     
      console.log(data);
      this.customer.forEach((element: any) => {
        if (element.payStatus === "Paid") {
          this.customerInfo.push(element);
        }
        else {
          this.getDate();
        }
      });

      this.customerInfo.forEach((element: any) => {
        this.dashboard = true;
        this.visitId = element.id;
        this.Month = element.fromDateTime;
        let date = this.Month.split(' ');
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
        element.fromDateTime = this.dateday + " " + this.dateMonth + " " + this.dateYear + "," + this.hours + ":" + this.minutes;

      });
      this.orderGroupByMonth();
    },
      err => {   
        this.getDate();
      });
  }

  // List orders Month Wise
  orderGroupByMonth() {
    this.customerInfo.forEach((element: any) => {
      let date = element.fromDateTime.split(' ');
      let fulldate = date[0] + date[1] + date[2];
      let prd: any = {};
      prd.order = element;
      this.visitId = element.id;
      this.OrderService.getOrderByVisit(this.visitId).subscribe(data => {
        let items: any = data;
        let sum = 0;
        // this.amount =0;
        items.forEach((ele: any) => {
          sum += ele.totalAmount;
          prd.order.amount = sum;
        });
        //console.log("getOrderByVisit: "+this.amount);
        //console.log("Amount: "+prd.order.amount);
      });
      prd.date = new Date(fulldate);
      this.item.push(prd);
    });

    this.itemsGroupedByMonth();
  }

  // Make separate Array for each Month
  // Add Ordrs in Respective Month Array

  itemsGroupedByMonth() {
    var
      groups: any = [[], [], [], [], [], [], [], [], [], [], [], [],],
      itemGroupedByMonths = [];

    for (var i = 0; i < this.item.length; i++) {
      groups[this.item[i].date.getMonth()].push(this.item[i]);
    }
    for (var i = 0; i < groups.length; i++) {
      if (groups[i].length) {
        itemGroupedByMonths.push({
          month: this.MonthNames[i],
          item: groups[i],
          amount:groups[i].amount
        });
      }
    }
    console.log("this is group", groups);
    console.log("this is items Grouped By", itemGroupedByMonths);
    this.monthInfo = itemGroupedByMonths;
    this.monthInfo = this.monthInfo.reverse();
    this.GetExpense();
    return this.orderInfo;
  }

  // Get Restaurent Name
  getName() {
    this.OrderService.getName().subscribe(data => {
      this.restaurentName = data.name;
    })
  }
  // Get Date in perticular Formate
  getDate() {
    this.dashboard = false;
    let date = new Date();
    console.log(date);
    let month = date.getMonth();
    console.log(month);
    for (let i = 1; i <= this.MonthNames.length; i++) {
      if (month == i) {
        this.MonthName = this.MonthNames[i];
        console.log(this.MonthName);
       }
    }
    this.amount = 0;
    console.log(this.amount);
   }

   //Get Total Expenses by Month
   GetExpense()
   {
     let prd:any = {};
     let date:any;
     let month : any;
     this.monthInfo.forEach((element:any) => {
      prd.customerId = JSON.parse(this.name);
      let m = element.month;
      for(let i=1;i<=this.MonthNames.length;i++)
      {
        if(m==this.MonthNames[i])
        {
          month = i+1;
        }
      }
      prd.month = month
      let items = element.item;
      console.log("items",items);
      items.forEach((ele:any) => {
        date =new Date(ele.date).getFullYear();
        console.log("date is",date);  
      });
      prd.year =date;
      this.OrderService.getMonthlyExpense(prd).subscribe(data=>{ 
        element.amount = new Intl.NumberFormat('de-DE',
        { style: 'currency', currency: 'EUR' }).format(data);
      //  this.expenses.push(parseInt(data));
      //console.log("getMonthlyExpense: "+element.amount+" "+element.totalAmount);
      },
      err=>{
        element.amount =0;
      });
     });
    console.log(this.expenses);
   }
}

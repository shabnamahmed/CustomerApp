import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../services/customer.service';
import { OrderService } from '../services/order.service';
import { Subscription } from 'rxjs';
import { interval } from 'rxjs/internal/observable/interval';
import { startWith,switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private route: ActivatedRoute, private customer: CustomerService,
    private router: Router, private order: OrderService) {
  }

  name = '';
  username = ''
  visit: any;
  timeInterval!: Subscription;
  ngOnInit(): void {
    // this.router.navigate(['./dashboard']);
    this.name = this.route.snapshot.params['id'];
    console.log(this.name);
    this.customer.getName(this.name).subscribe((data: any) => {
      this.username = data.username;
    });
    this.getOrderDetails();
    this.getVisitStatus();
  }
  
  getOrderDetails()
  {
    this.order.getOpenVisitByCustomer(this.name).subscribe(data => {
      console.log(data);
      this.visit = true;
    },
      err => {
        this.visit = false;
      }
    );
  }
  
   // Destroy Subscription for the interval
   ngOnDestroy()
   {
    this.timeInterval.unsubscribe();
   }

    // Assign a Poll
 
 getVisitStatus() {
   this.timeInterval= interval(10000)
     .pipe(
       switchMap(async () => this.getOrderDetails()
       ),)
     .subscribe(_ => {},_ => {},);
 }

}

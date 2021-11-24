import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { CustomerService } from 'src/app/services/customer.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Customer } from 'src/app/Module/customer';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private route : ActivatedRoute,private http: HttpClient,private router:Router
    ,private LoginService : LoginService,private customerService:CustomerService) { }
 username:any;
 name:any;
 form!: FormGroup;
 customer:any;
  ngOnInit(): void {
    this.name = this.route.snapshot.params['id'];
      this.customerService.getCustomer(this.name).subscribe((data:Customer)=>{
      this.username = data.username;
      this.customer = data;
      });


      this.form = new FormGroup({
        id: new FormControl(JSON.parse(this.name)),
        firstName: new FormControl('', [Validators.required]),
        surName: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        street: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        city: new FormControl('', [Validators.required]),
        zipcode: new FormControl('', [Validators.required]),
        username: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required]),
        address: new FormControl('', [Validators.required]),
         phone :new FormControl('', [Validators.required]),
      });
  }
  get f() {
    this.form.controls.username.patchValue(this.username);
    return this.form.controls;
  }
  logOut()
  {
    this.customerService.logOut().subscribe(data=>{
    console.log(data);
    });
    this.router.navigateByUrl('/login');
  }
  submit(){
   this.customerService.updatecustomer(this.form.value).subscribe((data:any)=>{
     console.log(data);
   })
  }
}

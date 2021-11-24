import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Login } from '../Module/login';
import { LoginService } from '../services/login.service';
 import { SignUpService} from '../services/signup.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
 import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  form!: FormGroup;
  values: any;
  id:any;
  pwd:any;
  username:any;
  sign:any;
  error = false;
  msg:any;
  token:any;
   constructor(
    private http: HttpClient, public SignUpService:SignUpService,private LoginService : LoginService,
    private router: Router, 
) { }

  ngOnInit(): void {
    this.form = new FormGroup({
     
      password: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
     });
  }
  get f(){
    console.log(this.form.controls);
    return this.form.controls;
  }
 
  login: Login = {
    password:'',
    username:'',  
  };
    loginData:any;
    name:any;
    // getToken(){
    //   this.SignUpService.generateToken(this.form.value).subscribe((data:any)=>{
    //   this.token = data.token;
    //   console.log(this.token);
    //   localStorage.setItem('tokenData',JSON.stringify(this.token));
    //   });
   // }
  submit()
  
  {
    this.LoginService.create(this.form.value).subscribe
    ((data:any) => 
     {
               this.id  = data.id;
               this.error = false;
               this.router.navigate(['/homePage',data.id]);
               localStorage.setItem("id",JSON.stringify(this.id));
      },
     err=>
      {
        this.error = true;
        this.msg = err;
       
      });
     }
     close(){
      this.error = false;
    }
}


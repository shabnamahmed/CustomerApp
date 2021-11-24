// import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Signup } from '../Module/signup';
import { SignUpService } from '../services/signup.service';
// import { SignupService} from '../services/signup.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  form!: FormGroup;
  id: any;
  msg: any;
  constructor(
    // private http: HttpClient,
    public signup:SignUpService,
    private router: Router, 
   
    ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      username:  new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
     });
  }
  get f(){
    return this.form.controls;
  }
error:any;
  signupUser ={}
  Signup: Signup = {
  
    
    username:'',
    password:'',
    email:'',
    
  };
  

  
  submit(){
    this.signup.signup(this.form.value).subscribe(data=>{
      console.log(data);
      this.router.navigate(['/login']);
    },
    err=>{
      this.error =true;
      this.msg = err;
    })
  }

  close(){
    this.error = false;
  }

  }
 



import { Component } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import { SignUpService } from "src/app/services/signup.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  sign = true;
  title = 'CustomerApp';
}

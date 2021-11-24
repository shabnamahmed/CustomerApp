import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { DashboardComponent} from '../home-page/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { SettingsComponent } from './settings/settings.component';
import { CheckoutComponent } from './orders/checkout/checkout.component';
import { ScanComponent } from './scan/scan.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
         DashboardComponent,
         SettingsComponent,
         CheckoutComponent,
         ScanComponent,   
  ],
  imports: [
    RouterModule,
    CommonModule,    
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ZXingScannerModule ,
    CdkAccordionModule,
    MatIconModule
  
     
  ],
  
  exports:[ 
    DashboardComponent,
    SettingsComponent,
    CheckoutComponent,
    ScanComponent, CommonModule,HttpClientModule,
    RouterModule,
    
    ],
providers: [  ],
bootstrap:[]
})
export class HomePageModule { }




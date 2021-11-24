import { Injectable } from '@angular/core';
import { Pipe} from '@angular/core';
import { CurrencyPipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
@Pipe({
  name: 'currencySpace',
})
export class CurrencyPipeService extends CurrencyPipe{
 
  // transform(value: number, ...args: any[]): string {
  //   return super.transform(value, ...args).replace(/([^\d.,])(\d)/, "$1 $2");
  // }
}


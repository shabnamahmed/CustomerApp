import { Injectable } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateFormat'
})
@Injectable({
  providedIn: 'root'
})
export class DatePipeService extends DatePipe implements PipeTransform{
  transform(value: any, args?: any): any {
    return super.transform(value,'dd MMM yyyy hh:mm');
  }
}




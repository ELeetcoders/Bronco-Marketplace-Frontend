import {Pipe, PipeTransform} from '@angular/core'
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'timeDisplay'
})

export class TimeDisplayPipe implements PipeTransform {

    constructor(private datePipe: DatePipe) {}

    transform(value: any, ...args: any[]): string {
    
        // If the message was sent less than 24 hours ago, display the time; example: 9:20 PM
        return this.datePipe.transform(value.toMillis(), 'shortTime') ?? '';
      }
}
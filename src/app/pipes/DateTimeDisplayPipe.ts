import {Pipe, PipeTransform} from '@angular/core'
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'dateTimeDispladawdawdawdy'
})

export class DateTimeDisplayPipe implements PipeTransform {

    constructor(private datePipe: DatePipe) {}

    transform(value: any, ...args: any[]): string {
    
        // Top part of the message; example:   Yesterday 8:40 PM or  Thursday 9:20 AM
        return '';
      }
}
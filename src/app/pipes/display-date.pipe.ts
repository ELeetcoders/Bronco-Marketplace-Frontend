import { DatePipe } from '@angular/common';
import {Pipe, PipeTransform} from '@angular/core'
import { Timestamp } from '@angular/fire/firestore';

@Pipe({
    name: 'dateDisplay'
})

export class DateDisplayPipe implements PipeTransform {
    
    constructor(private datePipe: DatePipe) {}

    transform(value: any) : string | undefined | null {
        
        const todaysDate = new Date();

        const sameday = todaysDate.getDay() === value.getDay();
        const sameMonth = todaysDate.getMonth() === value.getMonth();
        const sameYear = todaysDate.getFullYear === value.getFullYear();
        const isYesterday = todaysDate.getDay() - value.getDay() === 1;

        if (!sameYear || !sameMonth)
            return this.datePipe.transform(value.toMillis(), 'meduimDate' ?? '');
        if(isYesterday)
            return 'Yesterday'
        if(sameday)
            return 'Today'

        return this.datePipe.transform(value.toMillis(), 'mediumDate') ?? '';
    }
}
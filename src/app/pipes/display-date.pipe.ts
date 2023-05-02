import { DatePipe } from '@angular/common';
import {Pipe, PipeTransform} from '@angular/core'

@Pipe({
    name: 'dateTimeDisplay'
})

export class DayDisplayPipe implements PipeTransform {
    
    constructor(private datePipe: DatePipe) {}

    getDayDiff(today: Date, messageDate: Date) :number {
        const msInDay = 24 * 60 * 60 * 1000;
    
        return Math.round(
            Math.abs(today.getTime() - messageDate.getTime()) / msInDay
        )
    }

    transform(value: any) : string {

        console.log("we in da pipe")
        
        const todaysDate = new Date();
        todaysDate.setHours(0,0,0,0);
        const messageDate = new Date(this.datePipe.transform(value.toMillis()) ?? 0);

        const dayDiff = this.getDayDiff(todaysDate, messageDate)

        if (dayDiff < 7){
            if (dayDiff == 0)
                return 'Today'
            if (dayDiff == 1)
                return 'Yesterday'
            return this.datePipe.transform(value.toMillis(), 'EEEE') ?? ''
        }
        return this.datePipe.transform(value.toMillis(), 'mediumDate') ?? '';
        
    }
    
}
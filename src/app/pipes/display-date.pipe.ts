import { DatePipe } from '@angular/common';
import {Pipe, PipeTransform} from '@angular/core'
import { Timestamp } from '@angular/fire/firestore';

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
      
      const messageDate = value as Date
      const todaysDate = new Date();
      todaysDate.setHours(0,0,0,0);
      
      messageDate.setHours(0,0,0,0)

      const dayDiff = this.getDayDiff(todaysDate, messageDate)

      if (dayDiff < 7){
          if (dayDiff == 0)
              return 'Today'
          if (dayDiff == 1)
              return 'Yesterday'
          return this.datePipe.transform(messageDate.getTime(), 'EEEE') ?? ''
      }
      return this.datePipe.transform(messageDate.getTime(), 'mediumDate') ?? '';
    }
}
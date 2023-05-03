import {Pipe, PipeTransform} from '@angular/core'
import { DatePipe } from '@angular/common';
import { Timestamp } from '@angular/fire/firestore';

@Pipe({
    name: 'dateDisplay'
})

export class DateDisplayPipe implements PipeTransform {

    constructor(private datePipe: DatePipe) {}

    getDayDiff(today: Date, messageDate: Date) :number {
      const msInDay = 24 * 60 * 60 * 1000;
  
      return Math.round(
          Math.abs(today.getTime() - messageDate.getTime()) / msInDay
      )
  }

  transform(value: any) : string {
      
      const newVal = value as Timestamp
      const todaysDate = new Date();
      todaysDate.setHours(0,0,0,0);
      const messageDate = new Date(this.datePipe.transform(newVal.toMillis()) ?? 0);
      messageDate.setHours(0,0,0,0)

      const dayDiff = this.getDayDiff(todaysDate, messageDate)

      if (dayDiff < 7){
          if (dayDiff == 0)
              return this.datePipe.transform(newVal.toMillis(), 'shortTime') ?? ''
          if (dayDiff == 1)
              return 'Yesterday'
          return this.datePipe.transform(newVal.toMillis(), 'EEEE') ?? ''
      }
      return this.datePipe.transform(newVal.toMillis(), 'mediumDate') ?? '';
      
  }
}
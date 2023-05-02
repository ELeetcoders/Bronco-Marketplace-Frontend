import {Pipe, PipeTransform} from '@angular/core'
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'dateDisplay'
})

export class DateDisplayPipe implements PipeTransform {

    constructor(private datePipe: DatePipe) {}

    transform(value: any): string {

        // Get the current date and time
        const currentDate = new Date();
        const currentTime = currentDate.getTime();
    
        // Get the message date and time
        const messageDate = new Date(value.toMillis());
        const messageTime = messageDate.getTime();
    
        // Calculate the time difference between the current time and the message time
        const timeDiff = currentTime - messageTime;
    
        // If the message was sent more than a week ago, display the date
        if (timeDiff > 604800000) {
          return this.datePipe.transform(value.toMillis(), 'short') ?? '';
        }
    
        // If the message was sent yesterday, display "Yesterday"
        const messageDayOfWeek = messageDate.getDay();
        const currentDayOfWeek = new Date().getDay();
        // If the message was sent yesterday (i.e., the day of the week is one less than the current day of the week)
        if (timeDiff > 86400000 && messageDayOfWeek === (currentDayOfWeek + 6) % 7) {
          return 'Yesterday';
        }
    
        // If the message was sent between 2-6 days ago, display the day of the week
        if (timeDiff > 172800000) {
          const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
          const messageDayOfWeek = messageDate.getDay();
          return daysOfWeek[messageDayOfWeek];
        }
    
        // If the message was sent less than 24 hours ago, display the time
        return this.datePipe.transform(value.toMillis(), 'shortTime') ?? '';
      }
}
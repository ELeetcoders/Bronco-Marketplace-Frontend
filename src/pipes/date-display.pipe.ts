import {Pipe, PipeTransform} from '@angular/core'

@Pipe({
    name: 'dateDisplay'
})

export class DateDisplayPipe implements PipeTransform {
    transform(value: any, ...args: any[]) : any {
        return null;
    }
}
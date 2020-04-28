import { PipeTransform, Pipe } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'hour'
  })
  export class HourPipe implements PipeTransform {
    transform(value: string): string {
        let data = moment(value).format('hh:mm')

      return data;
    }
  }

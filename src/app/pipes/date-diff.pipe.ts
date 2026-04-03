import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateDiff',
  standalone:true
})
export class DateDiffPipe implements PipeTransform {
  transform(value: string | Date): string {
    const today = new Date();
    const givenDate = new Date(value);

    const timeDiff = today.getTime() - givenDate.getTime();

    const differenceInDays = Math.floor(timeDiff / (1000 * 3600 * 24));
    if (differenceInDays === 0) {
      return 'Today';
    }
    if (differenceInDays === 1) {
      return differenceInDays + ' day ago';
    }
    if (differenceInDays > 30) {
      return  '30+ days ago';
    }
    return differenceInDays + ' days ago';
  }
}

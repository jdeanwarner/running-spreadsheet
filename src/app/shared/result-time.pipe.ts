import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'resultTime'
})
export class ResultTimePipe implements PipeTransform {

  transform(timeInSeconds: number): string {
    return `${('0' + Math.floor(timeInSeconds / 60 / 60 )).substr( -2 )}:
      ${('0' +  (timeInSeconds / 60) % 60).substr( -2 )}:
      ${('0' + timeInSeconds % 60).substr( -2 )}`.replace(/\s/g, '');
  }

}

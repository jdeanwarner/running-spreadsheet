import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'resultTime'
})
export class ResultTimePipe implements PipeTransform {

  transform(timeInSeconds: number): string {
    const hours   = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds - (hours * 3600)) / 60);
    const seconds = timeInSeconds - (hours * 3600) - (minutes * 60);
    return `${('0' + hours).substr( -2 )}:
      ${('0' + minutes).substr( -2 )}:
      ${('0' + seconds).substr( -2 )}`.replace(/\s/g, '');
  }

}

import { Pipe, PipeTransform } from '@angular/core';
import { RunType } from './run-type';

@Pipe({
  name: 'runType'
})
export class RunTypePipe implements PipeTransform {

  transform(type: string, activityTypes: RunType[]): any {
    let displayValue: String = '';
    activityTypes.forEach((activityType: RunType) => {
      if (activityType.id === type) {
        displayValue = activityType.description;
      }
    });
    return displayValue;
  }

}

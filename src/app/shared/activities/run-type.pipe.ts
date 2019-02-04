import { Pipe, PipeTransform } from '@angular/core';
import { RunType } from './run-type';

@Pipe({
  name: 'runType'
})
export class RunTypePipe implements PipeTransform {

  transform(type: string, runTypes: RunType[]): any {
    let displayValue: String = '';
    if (type && runTypes) {
      runTypes.forEach((activityType: RunType) => {
        if (activityType.id === type) {
          displayValue = activityType.description;
        }
      });
    }
    return displayValue;
  }

}

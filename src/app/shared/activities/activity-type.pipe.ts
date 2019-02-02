import { Pipe, PipeTransform } from '@angular/core';
import { ActivityType } from './activity-type';

@Pipe({
  name: 'activityType'
})
export class ActivityTypePipe implements PipeTransform {

  transform(type: string, activityTypes: ActivityType[]): any {
    let displayValue: String = '';
    activityTypes.forEach((activityType: ActivityType) => {
      if (activityType.id === type) {
        displayValue = activityType.description;
      }
    });
    return displayValue;
  }

}

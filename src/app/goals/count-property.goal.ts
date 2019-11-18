import { ActivityTypeEnum } from 'src/app/shared/activities/activity-type.enum';
import { Goal } from './goal';

export class CountPropertyGoal extends Goal {
    activityType: ActivityTypeEnum;
    property: string;
    values: string[];
}

import { ActivityTypeEnum } from 'src/app/shared/activities/activity-type.enum';
import { Goal } from './goal';

export class SumPropertyGoal extends Goal {
    activityType: ActivityTypeEnum;
    property: string;
}

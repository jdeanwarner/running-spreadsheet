import { ActivityTypeEnum } from 'src/app/shared/activities/activity-type.enum';
import { Goal } from './goal';

export class CountActivityGoal extends Goal {
    activityTypes: ActivityTypeEnum[];
}

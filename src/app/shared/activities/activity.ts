import { ActivityTypeEnum } from './activity-type.enum';
import { firestore } from 'firebase';

export class Activity {
    id: string;
    activityType: ActivityTypeEnum;
    date: firestore.Timestamp;
}

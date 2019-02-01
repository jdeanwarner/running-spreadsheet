import { ActivityType } from './activity-type.enum';
import { firestore } from 'firebase';

export class Activity {
    id: string;
    activityType: ActivityType;
    date: firestore.Timestamp;
}

import { StravaActivity } from './../models/strava/strava-activity';
import { UserOwned } from '../user-owned';
import { ActivityTypeEnum } from './activity-type.enum';
import { firestore } from 'firebase';

export class Activity extends UserOwned {
    id?: string;
    activityType: ActivityTypeEnum;
    date: firestore.Timestamp;
    strava: StravaActivity;
}

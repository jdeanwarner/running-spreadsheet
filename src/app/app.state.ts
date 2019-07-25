import { ActivityType } from './shared/activities/activity-type';
export interface AppState {
    readonly year: number;
    readonly activityType: ActivityType[];
}

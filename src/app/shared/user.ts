import { StravaToken } from './strava-token';
export interface User {
    uid: string;
    email: string;
    photoUrl?: string;
    displayName?: string;
    strava?: StravaToken;
}

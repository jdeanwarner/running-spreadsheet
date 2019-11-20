import { UserOwned } from './user-owned';
import { Location } from './location';
import { firestore } from 'firebase';
import { RaceStatus } from './race-status.enum';

export class Race extends UserOwned {
    id: string;
    name: string;
    date: firestore.Timestamp;
    distance: number;
    result: number;
    raceUrl: string;
    resultUrl: string;
    status: RaceStatus;
    location: Location;
    userId: string;
}

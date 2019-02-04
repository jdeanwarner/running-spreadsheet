import { firestore } from 'firebase';
import { RaceStatus } from './race-status.enum';

export class Race {
    id: string;
    name: string;
    date: firestore.Timestamp;
    raceWebsite: string;
    distance: number;
    result: number;
    resultUrl: string;
    status: RaceStatus;
}

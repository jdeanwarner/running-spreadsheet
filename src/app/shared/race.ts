import { firestore } from 'firebase';
import { RaceStatus } from './race-status.enum';

export class Race {
    id: string;
    name: string;
    date: firestore.Timestamp;
    distance: number;
    result: number;
    raceUrl: string;
    resultUrl: string;
    status: RaceStatus;
}

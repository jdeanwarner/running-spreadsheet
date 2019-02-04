import { firestore } from 'firebase';

export class Race {
    id: string;
    name: string;
    date: firestore.Timestamp;
    raceWebsite: string;
    distance: number;
    result: number;
    resultUrl: string;
}

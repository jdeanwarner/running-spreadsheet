import Timestamp = firestore.Timestamp;
import { firestore } from 'firebase';

export class Run {
    date: Timestamp;
    distance: number;
    type: string;
}

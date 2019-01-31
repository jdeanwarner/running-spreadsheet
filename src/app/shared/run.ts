import Timestamp = firestore.Timestamp;
import { firestore } from 'firebase';

export class Run {
    id: string;
    date: Timestamp;
    distance: number;
    type: string;
}

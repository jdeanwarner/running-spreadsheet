import { firestore } from 'firebase';
export class TrainingBlock {
    description: string;
    startDate: firestore.Timestamp;
    endDate: firestore.Timestamp;
}

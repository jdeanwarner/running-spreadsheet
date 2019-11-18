import { GoalType } from './goal-type.enum';
import { firestore } from 'firebase';

export class Goal {
    id: string;
    name: string;
    startDate: firestore.Timestamp;
    endDate: firestore.Timestamp;
    type: GoalType;
    value: number;
    pinned: boolean;
}

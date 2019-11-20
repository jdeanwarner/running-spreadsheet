import { UserOwned } from './../shared/user-owned';
import { GoalType } from './goal-type.enum';
import { firestore } from 'firebase';

export class Goal extends UserOwned {
    id: string;
    name: string;
    startDate: firestore.Timestamp;
    endDate: firestore.Timestamp;
    type: GoalType;
    value: number;
    pinned: boolean;
}

import { GoalType } from './goal-type.enum';

export class Goal {
    id: string;
    year: number;
    miles: number;
    crossTraining: number;
    highEffortRuns: number;
    months: {[month: string]: number};
}

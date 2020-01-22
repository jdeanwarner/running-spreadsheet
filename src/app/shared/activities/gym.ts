import { Activity } from './activity';
import { WeightLiftingExcercise } from './weight-lifting-excercise';
import { GymWorkoutType } from './gym-workout-type.enum';

export class Gym extends Activity {
  type ?: GymWorkoutType;
  excercises: WeightLiftingExcercise[];
}

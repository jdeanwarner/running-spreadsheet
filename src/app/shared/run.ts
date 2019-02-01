import { Activity } from './activity';
import { RunType } from './run-type.enum';

export class Run extends Activity {
    distance: number;
    runType: RunType;
}

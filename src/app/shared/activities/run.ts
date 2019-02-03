import { Activity } from './activity';
import { RunTypeEnum } from './run-type.enum';

export class Run extends Activity {
    distance: number;
    runType: RunTypeEnum;
}

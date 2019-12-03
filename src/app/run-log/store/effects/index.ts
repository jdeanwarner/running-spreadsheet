import { ActivityEffects } from './activity.effect';
import { RunTypeEffects } from './run-type.effect';
import { YearEffects } from './year.effect';

export const effects: any[] = [RunTypeEffects, ActivityEffects, YearEffects];

export * from './run-type.effect';
export * from './activity.effect';
export * from './year.effect';


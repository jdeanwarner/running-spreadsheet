import { ActivityEffects } from './activity.effect';
import { RunTypeEffects } from './run-type.effect';

export const effects: any[] = [RunTypeEffects, ActivityEffects];

export * from './run-type.effect';
export * from './activity.effect';


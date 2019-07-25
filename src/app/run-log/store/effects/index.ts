import { ActivityTypeEffects } from './actvity-type.effect';
import { RunTypeEffects } from './run-type.effect';
import { ActivityEffects } from './activity.effect';

export const effects: any[] = [ActivityEffects, ActivityTypeEffects, RunTypeEffects];

export * from './activity.effect';
export * from './actvity-type.effect';
export * from './run-type.effect';


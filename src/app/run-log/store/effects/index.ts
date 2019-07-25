import { RunTypeEffects } from './run-type.effect';
import { ActivityEffects } from './activity.effect';

export const effects: any[] = [ActivityEffects, RunTypeEffects];

export * from './activity.effect';
export * from './run-type.effect';


import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { forwardRef, Provider } from '@angular/core';

export class ValueAccessorService {
    public static getProvider(type: any ): Provider {
        return {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => type),
            multi: true
        };
    }
}

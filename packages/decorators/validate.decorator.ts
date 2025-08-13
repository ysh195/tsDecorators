import { VALIDATION_METADATA } from "../constants";

export function Validate(): MethodDecorator {
    return function (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
        if (!descriptor || typeof descriptor.value !== 'function')
            throw new Error('@Validate는 메서드에만 적용할 수 있습니다.');

        const originalMethod = descriptor.value;

        descriptor.value = function (...args: any[]) {
            for (const arg of args) {
                if (!arg || typeof arg !== 'object') continue;

                const validations = Reflect.getMetadata(VALIDATION_METADATA, Object.getPrototypeOf(arg));

                if (!validations) continue;

                for (const field in validations) {
                    const validator = validations[field];
                    const value = arg[field];

                    if (typeof validator === 'function') {
                        if (!validator(value)) throw new Error(`${field} - 유효성 검사 실패`);
                    } else if (validator instanceof RegExp) {
                        if (!validator.test(value)) throw new Error(`${field} - 유효성 검사 실패`);
                    }
                }
            }

            return originalMethod.apply(this, args);
        };

        return descriptor;
    }
}

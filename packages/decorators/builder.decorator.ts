import { Type } from "../interfaces/type.interface"

export function Builder() {
    return function <T extends Type>(target: T) {
        (target as any).builder = (...args: any[]) => {
            const instance = new target(...args) as InstanceType<T>;
            const BUILDER_OBJ_DATA = Symbol("BUILDER_OBJ_DATA");

            let obj: any = {
                [BUILDER_OBJ_DATA]: {},
                build: () => {
                    for (const key in obj[BUILDER_OBJ_DATA]) {
                        (instance as any)[key] = obj[BUILDER_OBJ_DATA][key];
                    }

                    return instance;
                }
            };

            for (const field of Object.keys(instance)) {
                if (typeof (instance as any)[field] !== "function") {
                    obj[field] = (value: any) => {
                        obj[BUILDER_OBJ_DATA][field] = value;
                        return obj;
                    };
                }
            }

            return obj;
        };
    } as ClassDecorator;
}

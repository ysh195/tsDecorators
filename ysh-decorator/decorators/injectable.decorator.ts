import { INJECTABLE_METADATA } from "../constants";

export function Injectable(): ClassDecorator {
    return (target: any) => {
        Reflect.defineMetadata(INJECTABLE_METADATA, {}, target);
    }
}

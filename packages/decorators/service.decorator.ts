import { SERVICE_METADATA } from "../constants";

export function Service(): ClassDecorator {
    return (target: any) => {
        Reflect.defineMetadata(SERVICE_METADATA, {}, target);
    }
}

import {
    INJECTABLE_METADATA,
    CONTROLLER_METADATA,
    SERVICE_METADATA,
    INJECT_METADATA
} from "./constants";

export class Container {
    private instances = new Map<any, any>();

    get(token: any): any {
        if (this.instances.has(token)) return this.instances.get(token);

        const injectableMetadata =
            Reflect.getMetadata(INJECTABLE_METADATA, token)
            || Reflect.getMetadata(SERVICE_METADATA, token)
            || Reflect.getMetadata(CONTROLLER_METADATA, token);

        if (!injectableMetadata) throw new Error(`Cannot resolve dependency: ${token.name}`);

        const paramTypes: any[] = Reflect.getMetadata('design:paramtypes', token) || [];
        const injectedParams: any[] = Reflect.getMetadata(INJECT_METADATA, token) || [];

        const args = paramTypes.map((paramType, index) => {
            const injected = injectedParams.find(p => p.index === index);
            return this.get(injected ? injected.token : paramType);
        });

        const instance = new token(...args);
        this.instances.set(token, instance);

        return instance;
    }
}

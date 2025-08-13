import { INJECT_METADATA } from "../constants";

export default function Inject(token: any): ParameterDecorator {
    return (
        target: any,
        propertyKey: string | symbol | undefined,
        parameterIndex: number
    ): void => {
        const existingInjectedParams: any[] = Reflect.getMetadata(
            INJECT_METADATA,
            propertyKey ? target.constructor : target
        ) || [];

        existingInjectedParams.push({ index: parameterIndex, token });

        Reflect.defineMetadata(
            INJECT_METADATA,
            existingInjectedParams,
            propertyKey ? target.constructor : target
        );
    };
}

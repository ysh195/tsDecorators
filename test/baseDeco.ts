export function ClassDecorator(): Function {
    // target.prototype.decorated = true;
    return function (target: Function): void {
        console.log("[ClassDecorator]" + target.name + " class decorated");
    }
}

export function MethodDecorator(): Function {
    // descriptor.value = function () {
    //     return "Method Decorated!";
    // };
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor): void {
        console.log(`[MethodDecorator] ${target.constructor.name} class method decorated`);
        console.log(`[MethodDecorator] ${propertyKey} method decorated`);
        console.log(`[MethodDecorator] Original method: ${descriptor.value}`);
    }
}

export function PropertyDecorator(): Function {
    // Object.defineProperty(target, propertyKey, {
    //     get: function () {
    //         return "Property Decorated!";
    //     },
    //     enumerable: true,
    //     configurable: true
    // });
    return function (target: any, propertyKey: string): void {
        console.log(`[PropertyDecorator] ${target.constructor.name} class property decorated`);
        console.log(`[PropertyDecorator] Property: ${propertyKey}`);
    }
}

export function ParameterDecorator(): Function {
    // console.log(`Parameter Decorated at index ${parameterIndex} in method ${propertyKey}`);
    return function (target: any, propertyKey: string, parameterIndex: number): void {
        console.log(`[ParameterDecorator] ${target.constructor.name} class method parameter decorated`);
        console.log(`[ParameterDecorator] Method: ${propertyKey}, Parameter index: ${parameterIndex}`);
    }
}

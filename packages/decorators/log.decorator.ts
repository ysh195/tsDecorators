export function Log(): MethodDecorator {
    return (target, propertyKey, descriptor: any) => {
        const originalMethod = descriptor.value;

        descriptor.value = function (...args: any[]) {
            console.log(`Calling ${String(propertyKey)} with arguments:`, args);
            const result = originalMethod.apply(this, args);
            console.log(`Result from ${String(propertyKey)}:`, result);
            return result;
        };

        return descriptor;
    };
}

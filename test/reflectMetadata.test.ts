import 'reflect-metadata';

class ReflectMetadataTestClass {
    constructor() {
        Reflect.defineMetadata('testKey', 'testValue', this);
        Reflect.defineMetadata('testKeyForMethod', 'testValueForMethod', this, "myMethod");
    }

    getMetadata(): void {
        console.log(Reflect.getMetadata('testKey', this))
    }

    myMethod(): void {
        console.log(Reflect.getMetadata('testKeyForMethod', this, "myMethod"));
    }
}

const testInstance = new ReflectMetadataTestClass();
testInstance.getMetadata();
testInstance.myMethod();

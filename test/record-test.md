실행 코드

```
npx ts-node 파일경로/파일명.ts
```

# 데코레이터 기초 동작 테스트

**코드**

```js
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
        console.log(`MethodDecorator] ${propertyKey} method decorated`);
        console.log(`MethodDecorator] Original method: ${descriptor.value}`);
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

```

```js
import {
    ClassDecorator,
    MethodDecorator,
    PropertyDecorator,
    ParameterDecorator
} from './BaseDeco';

@ClassDecorator()
class BaseDecoTest {

    @PropertyDecorator()
    field: any;

    constructor() {
        console.log("BaseDecoTest constructor called");
    }

    @MethodDecorator()
    print(@ParameterDecorator() a: string): void {
        console.log("BaseDecoTest print method called");
    }
}

const baseDecoTest = new BaseDecoTest();
baseDecoTest.print("Hello, Decorators!");
```

**결과**

```
[PropertyDecorator] BaseDecoTest class property decorated
[PropertyDecorator] Property: field
[ParameterDecorator] BaseDecoTest class method parameter decorated
[ParameterDecorator] Method: print, Parameter index: 0
[MethodDecorator] BaseDecoTest class method decorated
[MethodDecorator] print method decorated
[MethodDecorator] Original method: print(a) {
        console.log("BaseDecoTest print method called");
    }
[ClassDecorator]BaseDecoTest class decorated
BaseDecoTest constructor called
BaseDecoTest print method called
```

---

# reflect-metadata 기초 동작 테스트

**코드**

```js
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

```

**결과**

```
testValue
testValueForMethod
```

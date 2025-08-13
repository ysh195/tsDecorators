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

import { VALIDATION_METADATA } from "../constants";
import { ValidationCondition } from "../interfaces/validation.condition.interface";

export function ValidatedWith(condition: ValidationCondition | RegExp): PropertyDecorator {
    return function (target: Object, propertyKey: string | symbol) {
        const existingValidations = Reflect.getMetadata(VALIDATION_METADATA, target) || {};

        existingValidations[propertyKey] = condition;

        Reflect.defineMetadata(VALIDATION_METADATA, existingValidations, target);
    };
}

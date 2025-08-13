import { ROUTES_METADATA } from "../constants";
import { HttpRequestMethod } from "../enums/http.request.method.type";

function createRouteDecorator(method: HttpRequestMethod) {
    return function (path: string): MethodDecorator {
        return (target, propertyKey) => {
            const routes = Reflect.getMetadata(ROUTES_METADATA, target.constructor) || [];

            routes.push({ method, path, handler: propertyKey });

            Reflect.defineMetadata(ROUTES_METADATA, routes, target.constructor);
        };
    }
}

export const Get = createRouteDecorator(HttpRequestMethod.GET);
export const Post = createRouteDecorator(HttpRequestMethod.POST);
export const Put = createRouteDecorator(HttpRequestMethod.PUT);
export const Delete = createRouteDecorator(HttpRequestMethod.DELETE);
export const Patch = createRouteDecorator(HttpRequestMethod.PATCH);

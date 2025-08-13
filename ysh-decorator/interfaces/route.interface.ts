import { HttpRequestMethod } from "../enums/http.request.method.type";

export interface Route {
    method: HttpRequestMethod,
    path: string,
    handler: string | symbol
}

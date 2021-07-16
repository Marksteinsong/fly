import { Response } from './httpParser/Response'

type Method = "GET" | "POST";

type Header = Map<any,any>;

export interface Request {
    method:Method,
    path:string,
    params?:string,
    body?:string[],
    headers:Headers,
    httpVersion:string
}

/**
 * 路由规则
 */
interface Routing {
    method:Method
    path:string
    handler(request: Request, response: Response):void
}

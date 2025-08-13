import { Container } from "./di.container";
import { CONTROLLER_METADATA, ROUTES_METADATA } from "./constants";
import { Route } from "./interfaces/route.interface";
import { Request, Response } from "express";

export function bootstrap(
    app: any,
    controllers: any[],
    others: any[] = []
) {
    // const app = express();
    // app.use(express.json());

    const container = new Container();

    others.forEach(other => container.get(other));

    controllers.forEach(ctrlClass => {
        const ctrlInstance = container.get(ctrlClass);
        const { prefix } = Reflect.getMetadata(CONTROLLER_METADATA, ctrlClass);
        const routes = Reflect.getMetadata(ROUTES_METADATA, ctrlClass) || [];

        routes.forEach((route: Route) => {
            (app as any)[route.method](`${prefix}${route.path}`, (req: Request, res: Response) => {
                const result = (ctrlInstance as any)[route.handler](req, res);
                if (result !== undefined) res.send(result);
            });
        });
    });

    // app.listen(port, () => {
    //     console.log(`Server running on http://localhost:${port}`);
    // });
}

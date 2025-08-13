import 'reflect-metadata'; // 필수
import express from "express";
import bootstrap, {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Patch,
    Builder,
    Injectable,
    Inject,
    Service,
    Log,
    Validate,
    ValidatedWith
} from "./ysh-decorator";
// 직접 생성한 컨트롤러 클래스나 주입이 필요한 클래스를 임포트합니다.

const port = 3000;

const app = express();
app.use(express.json());

const controllers: any[] = []; // 컨트롤러 클래스 자체를 여기에 추가합니다.
const others: any[] = []; // 그 외 주입이 필요한 클래스 자체를 여기에 추가합니다.

bootstrap(app, controllers, others);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

import 'reflect-metadata'; // 필수
import express from "express";
import bootstrap from "./packages";

const port = 3000;

const app = express();
app.use(express.json());

const controllers: any[] = [];
const others: any[] = [];

bootstrap(app, controllers, others);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

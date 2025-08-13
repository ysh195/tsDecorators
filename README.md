# express에서 사용할 커스텀 데코레이터(타입스크립트 환경)

## 목차

1. [안내](#안내)
2. [주요 데코레이터](#주요-데코레이터)
    1. [`@Controller(prefix: string)`](#1-controllerprefix-string)
    2. [`@Service()` / `@Injectable()`](#2-service--injectable)
    3. [`@Inject(token)`](#3-injecttoken)
    4. [HTTP 메서드 데코레이터](#4-http-메서드-데코레이터)
    5. [`@Builder()`](#5-builder)
    6. [`@ValidatedWith(condition)`](#6-validatedwithcondition)
    7. [`@Validate()`](#7-validate)
    8. [`@Log()`](#8-log)
3. [레퍼런스](#레퍼런스)

---

## 안내

원래 부스트캠프 멤버십에서 사용할 생각으로 만들고 있었는데, 결국 탈락하여 개발 중단합니다.

최종 테스트해보진 않았지만, 이전에 만든 것과 기능과 구조가 유사하니까 아마 잘 작동하지 않을까 싶습니다.

---

## 주요 데코레이터

### 1. `@Controller(prefix: string)`

- 클래스 데코레이터
- Express 라우터의 기본 URL 경로(prefix)를 지정
- 해당 클래스의 메서드에 붙은 HTTP 메서드 데코레이터들과 함께 사용

```ts
@Controller('/api')
class MyController { }
```

### 2. `@Service()` / `@Injectable()`

- 클래스 데코레이터
- 둘 사이에 용도와 기능상 차이는 없음

```ts
@Service()
class MyService { }

@Injectable()
class SomeUtil { }
```

### 3. `@Inject(token)`
파라미터 데코레이터

생성자 또는 메서드 파라미터에 의존성 주입 대상 지정

token은 클래스 타입 또는 식별자

```ts
class MyController {
    constructor(@Inject(MyService) private service: MyService) { }
}
```

### 4. HTTP 메서드 데코레이터

- 메서드 데코레이터
- Express의 HTTP 메서드 라우팅과 매핑
- 지원: @Get(path), @Post(path), @Put(path), @Delete(path)

```ts
@Controller('/users')
class UserController {
    @Get('/')
    getUsers(req: Request, res: Response) { }

    @Post('/')
    createUser(req: Request, res: Response) { }
}
```

### 5. `@Builder()`

- 클래스 데코레이터
- 클래스에 .builder(...args) static 메서드를 추가
- 빌더 패턴으로 인스턴스 생성 및 필드 체이닝 설정 가능

```ts
@Builder()
class User {
    name: string;
    age: number;

    constructor(){}
}

const user = User.builder().name('Alice').age(30).build();
```

### 6. `@ValidatedWith(condition)`

- 프로퍼티 데코레이터
- 해당 필드에 유효성 검사 조건(함수)을 지정
- condition은 (value: any) => boolean 타입 또는 정규식. 람다식으로 선언할 때 매개변수는 반드시 value 하나만.

```ts
class UserDto {
    @ValidatedWith(value => typeof value === 'string' && value.length > 0)
    name: string;
}
```

### 7. `@Validate()`

- 메서드 데코레이터
- 매개변수로 전달된 객체 안에 `@ValidatedWith(condition)`이 붙은 필드가 있는지 확인하고, 그것에 대해 유효성 검사를 실시
- 유효성 검사 실패 시 에러 반환

### 8. `@Log()`

- 메서드 데코레이터
- 매개변수와 리턴값을 콘솔 로그로 출력

```ts
class User {
    name;

    @Log()
    greet(age) {
        return `안녕하세요? ${age}살 ${this.name}입니다.`;
    }
}
```

---

## 레퍼런스

- https://medium.com/globant/expressjs-routing-with-decorators-dependency-injection-and-reflect-metadata-945f92e15a06
- https://docs.typestack.community/typedi/
- https://toss.tech/article/nestjs-custom-decorator
- https://docs.nestjs.com/custom-decorators
- https://docs.nestjs.com/modules
- https://github.com/nestjs/nest
- Microservice의 메시지 패턴 : https://github.com/nestjs/nest/blob/master/packages/microservices/decorators/message-pattern.decorator.ts
- 웹소켓 : https://github.com/nestjs/nest/blob/master/packages/websockets/decorators/message-body.decorator.ts
- 데코레이터 모음 : https://github.com/nestjs/nest/tree/master/packages/common/decorators

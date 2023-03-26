
## day 1
### node js + express 설치를 해보자.

#### 1. node.js 를 설치하자

- 우선 node.js 를 설치한다. (웹에서 다운로드 받거나 터미널로 내려받아 설치)
- 원하는 디렉토리에 프로젝트를 생성한다.

```
npm init
```

- 프로젝트 세팅은 적절히 넣어준다. (나중에 package.json 에서 직접 수정 가능)

<img src="./img/1.png" width="100%" title="day1 test1" alt="day1 test1"></img>

#### 2. express js 을 설치하자

- express 의존성 패키지를 설치한다. (npm 이든 yarn 이든 관계없다)

```
npm install express --save
```

<img src="./img/2.png" width="100%" title="day1 test2" alt="day1 test2"></img>

#### 3. 테스트를 해보자

- 다음 루트 경로에 index.js 를 생성하자

<img src="./img/3.png" width="100%" title="day1 test3" alt="day1 test3"></img>


- 다음과 같은 테스트 코드를 작성한다.

```
const express = require("express");
const app = express();
const PORT = 5000;

app.get("/", (req, res) => (
    res.send("hello world.")
));

app.listen(PORT, () => ( console.log("test app") ));
```

<img src="./img/4.png" width="100%" title="day1 test4" alt="day1 test4"></img>

- package.json 에 아래와 같은 코드를 추가하자

```
... (중략)...
  "scripts": {
    ... (생략)...
    "start": "node index.js",
    ... (생략)...
  },
... (생략)...
```

<img src="./img/5.png" width="100%" title="day1 test5" alt="day1 test5"></img>


- 이제 정상적으로 동작하는지 테스트 해보자.
```
npm start
```

<img src="./img/6.png" width="100%" title="day1 test6" alt="day1 test6"></img>

<img src="./img/7.png" width="100%" title="day1 test7" alt="day1 test7"></img>


- express 의존성 패키지를 이용하여 HTTP 요청에 대한 응답을 처리할 수 있다. 

- 끝!

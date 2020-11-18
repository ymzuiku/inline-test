# inline-test

- In server run test

## Insta

npm:

```sh
$ npm install --save inline-test
```

## Run

`inline-test` run at `process.env.e2e` is true: 



```sh
e2e=1 yarn start
```

or in index.js, set `process.env.e2e`:

```js
process.env.e2e = 1;
```

## inlineTest

### 1. Run Test Sign:

In `src/controllers/sign.js`, add:

```js
import inlineTest from "inline-test";

// first run index:1
inlineTest(1, "Test Sign", async (eq) => {
  const signData = await eq(
    fetch("http://localhost:3000/sign/?username=abc&password=123"),
    {
      code: 200,
      message: "sign done",
    }
  );

  // inlineTest.cache is {};
  inlineTest.cache.signData = signData;
});
```

### 2. Run Test Login:

In `src/controllers/logn.js`, add:

```ts
import inlineTest from "inline-test";

// seconed run index:2
inlineTest(2, "Test login", (eq) => {
  eq(
    fetch("http://localhost:3000/login/?username=abc&password=123"),
    { code: 200, message: "logined" },
    "Test with password"
  );

  eq(
    fetch(
      "http://localhost:3000/login/?username=abc&token=" +
        inlineTest.cache.signData.token
    ),
    { code: 200, message: "logined" },
    "Test with token"
  );
});
```

## eq

```ts
type eq = (a: any, b: any, message?: string) => Promise<a>;
```

eq use try/catch: `Promise.resolve(a)` check deepEqual `b`:

```ts
import inlineTest from "inline-test";

inlineTest(2, "Test login", (eq) => {
  const testA = () => {
    throw "dog";
  };
  eq(a, "dog"); // right
});
```

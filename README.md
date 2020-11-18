# inline-test

- In server run test

## Install

npm:

```sh
$ npm install --save inline-test
```

## Env

`inline-test` run at `process.env.e2e` is true:

```sh
e2e=1 yarn start
```

or in index.js, set `process.env.e2e`:

```js
process.env.e2e = 1;
```

## API

```ts
inlineTest(index:number, message:string, ({equal, load, cache}) => any);
```

### equal

```ts
type equal = (a: any, b: any, message?: string) => Promise<a>;
```

eq use try/catch: `Promise.resolve(a)` check deepEqual `b`:

```ts
import inlineTest from "inline-test";

inlineTest(2, "Test login", ({equal) => {
  const testA = () => {
    throw "dog";
  };
  equal(a, "dog"); // right
});
```

### load

```ts
type load = (a: any) => Promise<any>;
```

eq use try/catch: `Promise.resolve(a)` check deepEqual `b`:

```ts
import inlineTest from "inline-test";

inlineTest(2, "Test login", ({ load }) => {
  const testA = () => {
    setTimeout(() => {
      throw "dog";
    }, 100);
  };
  const res = load(testA);
  console.log(res); // dog
});
```

### cache

```ts
type cache = { [key: string]: any };
```

cache is global in some inlineTest();

```ts
import inlineTest from "inline-test";

inlineTest(2, "Test login", ({ cache }) => {
  console.log(cache); // {}
});
```

## Example

### 1. Run Test Sign:

In `src/controllers/sign.js`, add:

```js
import inlineTest from "inline-test";

// first run index:1
inlineTest(1, "Test Sign", async ({ equal, load, cache }) => {
  const res = await load(
    fetch("http://localhost:3000/sign/?username=abc&password=123")
  ); // {code: 200, token:"***"}

  await equal(res.code, 200);

  // save token in cache
  cache.token = res.token;
});
```

### 2. Run Test Login:

In `src/controllers/logn.js`, add:

```ts
import inlineTest from "inline-test";

// seconed run index:2
inlineTest(2, "Test login", ({ equal, cache }) => {
  equal(
    fetch("http://localhost:3000/login/?username=abc&password=123"),
    { code: 200, message: "logined" },
    "Test with password"
  );

  equal(
    fetch("http://localhost:3000/login/?username=abc&token=" + cache.token),
    { code: 200, message: "logined" },
    "Test with token"
  );
});
```

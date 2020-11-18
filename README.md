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
inlineTest(index:number, message:string, (it, cache) => any);
```

### it

```ts
type it = (message: string, target: any) => { equal: (value) => target, check:(fn:(value:any, deepEqual:Function)=>boolean) };
```

```ts
import inlineTest from "inline-test";

inlineTest(2, "Test login", (it) => {
  const testA = () => {
    throw "dog";
  };
  it("Test throw", testA()).equal("dog"); // pass

  const testB = () => {
    return new Promise((res) => {
      setTimeout(() => {
        res("cat");
      }, 100);
    });
  };
  it("Test Promise", testB()).check((v) => v === "cat"); // pass
});
```

### cache

```ts
type cache = { [key: string]: any };
```

cache is global in some inlineTest();

```ts
import inlineTest from "inline-test";

inlineTest(2, "Test login", (it, cache) => {
  console.log(cache); // {}
});
```

## Example

### 1. Run Test Sign get token:

In `src/controllers/sign.js`, add:

```js
import inlineTest from "inline-test";

// first run index:1
inlineTest(1, "Test Sign", async (it, cache) => {
  const token = await it(
    "Test fetch"
    fetch("http://localhost:3000/sign/?username=abc&password=123")
  ).check(v=>v.code === 200);

  // save token in cache
  cache.token = token;
});
```

### 2. Run Test Login use token:

In `src/controllers/logn.js`, add:

```ts
import inlineTest from "inline-test";

// seconed run index:2
inlineTest(2, "Test login", (it, cache) => {
  await it(
    "Test use token"
    fetch(
      "http://localhost:3000/login/?username=abc&token=" + cache.token
    ),
    { code: 200, message: "logined" },
  ).check(v=> v.code === 200 );
});
```

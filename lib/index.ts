/* eslint-disable no-console */
import { deepEqual } from "fast-equals";

const e2eIndexs = {} as any;
let lastAppendTime = Date.now();
const cache = {};

interface ItReturn {
  equal: (target: any) => Promise<any>;
  check: (
    fn: (equalValue: any, deepEqual: (a: any, b: any) => boolean) => boolean
  ) => Promise<any>;
}

type It = (message: string, checkValue: any) => ItReturn;

const inlineTest = (
  index: number,
  desc: string,
  fn: (it: It, cache: any) => void
) => {
  function it(message: string, a: any) {
    return {
      equal: async (b: any) => {
        try {
          a = await Promise.resolve(a);
        } catch (err) {
          a = err;
        }
        if (!deepEqual(a, b)) {
          throw `[TEST FAIL ${index}] [${desc}${
            message ? " -> " + message : ""
          }]:  ${JSON.stringify(a)} != ${JSON.stringify(b)}`;
        }
        return a;
      },
      check: async (fn: Function) => {
        try {
          a = await Promise.resolve(a);
        } catch (err) {
          a = err;
        }
        if (fn(a, deepEqual) !== true) {
          throw `[TEST FAIL ${index}] [${desc}${
            message ? " -> " + message : ""
          }]:  check-error: ${JSON.stringify(a)}}`;
        }
        return a;
      },
    };
  }

  if (process.env.e2e) {
    e2eIndexs[index] = [desc, fn, it];
    lastAppendTime = Date.now();
  }
};

async function runE2e() {
  const list = Object.keys(e2eIndexs).sort(
    (a: any, b: any) => Number(a) - Number(b)
  );
  for (const index of list) {
    const [desc, fn, it] = e2eIndexs[index];
    await fn(it, cache);
    console.log(`[TEST PASS ${index}] [${desc}]`);
  }
}

setTimeout(() => {
  if (process.env.e2e) {
    (global as any).e2e = {};
    const timeOutRun = () => {
      setTimeout(async () => {
        if (Date.now() - lastAppendTime > 100) {
          runE2e();
        } else {
          timeOutRun();
        }
      }, 100);
    };
    timeOutRun();
  }
}, 100);

inlineTest.cache = {} as { [key: string]: any };

export default inlineTest;

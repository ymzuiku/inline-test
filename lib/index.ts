/* eslint-disable no-console */
import { deepEqual } from "fast-equals";

const e2eIndexs = {} as any;
const cache = {};

interface ItReturn {
  equal: (target: any) => Promise<any>;
  check: (
    fn: (equalValue: any, deepEqual: (a: any, b: any) => boolean) => boolean
  ) => Promise<any>;
}

type It = (message: string, checkValue: any) => ItReturn;

function inlineTest(
  index: number,
  desc: string,
  fn: (it: It, cache: any) => void
) {
  if (!process.env.e2e) {
    return;
  }
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

  if (!e2eIndexs[index]) {
    e2eIndexs[index] = [];
  }
  e2eIndexs[index].push([desc, fn, it]);
}

async function start() {
  const list = Object.keys(e2eIndexs).sort(
    (a: any, b: any) => Number(a) - Number(b)
  );
  for (const index of list) {
    const fnList = e2eIndexs[index];
    for (const data of fnList) {
      const [desc, fn, it] = data;
      await fn(it, cache);
      console.log(`[TEST PASS ${index}] [${desc}]`);
    }
  }

  (e2eIndexs as any) = {};
}

inlineTest.start = start;

export default inlineTest;

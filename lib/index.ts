/* eslint-disable no-console */
import { deepEqual } from "fast-equals";

type ITryDeepEqual = (a: any, b: any, message?: string) => Promise<any>;
type ITryGet = (a: any) => Promise<any>;

const load = async (a: any): Promise<any> => {
  try {
    a = await Promise.resolve(a);
  } catch (err) {
    a = err;
  }
  return a;
};

const e2eIndexs = {} as any;
let lastAppendTime = Date.now();
const cache = {};
interface ITestFn {
  equal: ITryDeepEqual;
  load: ITryGet;
  cache: any;
}

const inlineTest = (
  index: number,
  desc: string,
  fn: (options: ITestFn) => void
) => {
  const checkDeepEqual = async (a: any, b: any, message = "") => {
    try {
      a = await Promise.resolve(a);
    } catch (err) {
      a = err;
    }
    try {
      b = await Promise.resolve(b);
    } catch (err) {
      b = err;
    }
    const isEqual = deepEqual(a, b);
    if (!isEqual) {
      throw `[TEST FAIL ${index}] [${desc}${
        message ? " -> " + message : ""
      }]:  ${JSON.stringify(a)} != ${JSON.stringify(b)}`;
    }
    return a;
  };

  if (process.env.e2e) {
    e2eIndexs[index] = [desc, fn, checkDeepEqual];
    lastAppendTime = Date.now();
  }
};

async function runE2e() {
  const list = Object.keys(e2eIndexs).sort(
    (a: any, b: any) => Number(a) - Number(b)
  );
  for (const index of list) {
    const [desc, fn, checkDeepEqual] = e2eIndexs[index];
    await fn({
      equal: checkDeepEqual,
      load,
      cache,
    });
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

/* eslint-disable no-console */
import { deepEqual } from "fast-equals";

type ICheckDeepEqual = (a: any, b: any, message?: string) => Promise<any>;

const e2eIndexs = {} as any;
let lastAppendTime = Date.now();

const inlineTest = (
  index: number,
  desc: string,
  fn: (eq: ICheckDeepEqual) => void
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
      throw `[E2E FAIL ${index}] [${desc}${
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
    await fn(checkDeepEqual);
    console.log(`[E2e PASS ${index}] [${desc}]`);
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
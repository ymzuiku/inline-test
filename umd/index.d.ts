interface ItReturn {
    equal: (target: any) => Promise<any>;
    check: (fn: (equalValue: any, deepEqual: (a: any, b: any) => boolean) => boolean) => Promise<any>;
}
declare type It = (message: string, checkValue: any) => ItReturn;
declare function inlineTest(index: number, desc: string, fn: (it: It, cache: any) => void): void;
declare namespace inlineTest {
    var start: () => Promise<void>;
}
export default inlineTest;

interface ItReturn {
    equal: (target: any) => Promise<any>;
    check: (fn: (equalValue: any, deepEqual: (a: any, b: any) => boolean) => boolean) => Promise<any>;
}
declare type It = (message: string, checkValue: any) => ItReturn;
declare const inlineTest: {
    (index: number, desc: string, fn: (it: It, cache: any) => void): void;
    cache: {
        [key: string]: any;
    };
};
export default inlineTest;

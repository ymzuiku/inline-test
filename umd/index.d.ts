declare type ITryDeepEqual = (a: any, b: any, message?: string) => Promise<any>;
declare type ITryGet = (a: any) => Promise<any>;
interface ITestFn {
    equal: ITryDeepEqual;
    load: ITryGet;
    cache: any;
}
declare const inlineTest: {
    (index: number, desc: string, fn: (options: ITestFn) => void): void;
    cache: {
        [key: string]: any;
    };
};
export default inlineTest;

declare type ITryDeepEqual = (a: any, b: any, message?: string) => Promise<any>;
declare type ITryGet = (a: any) => Promise<any>;
declare const inlineTest: {
    (index: number, desc: string, fn: (eq: ITryDeepEqual, tryGet: ITryGet) => void): void;
    cache: {
        [key: string]: any;
    };
};
export default inlineTest;

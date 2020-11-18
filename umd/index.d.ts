declare type ICheckDeepEqual = (a: any, b: any, message?: string) => Promise<any>;
declare const inlineTest: {
    (index: number, desc: string, fn: (eq: ICheckDeepEqual) => void): void;
    cache: {
        [key: string]: any;
    };
};
export default inlineTest;

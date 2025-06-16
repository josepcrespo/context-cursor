export namespace entry {
    let main: string;
}
export namespace resolve {
    let extensions: string[];
}
export namespace output {
    let path: string;
    let filename: string;
}
export namespace module {
    let rules: ({
        test: RegExp;
        type: string;
        use?: undefined;
        exclude?: undefined;
    } | {
        test: RegExp;
        use: string;
        exclude: RegExp;
        type?: undefined;
    } | {
        test: RegExp;
        use: {
            loader: string;
        }[];
        type?: undefined;
        exclude?: undefined;
    })[];
}
export let plugins: any[];

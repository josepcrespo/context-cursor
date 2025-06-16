declare const _exports: ({
    output: {
        path: string;
        filename: string;
        library: string;
        libraryTarget: string;
        globalObject: string;
    };
    entry: string;
    resolve: {
        extensions: string[];
    };
    module: {
        rules: {
            test: RegExp;
            use: string;
            exclude: RegExp;
        }[];
    };
    externals: {};
    mode: string;
} | {
    output: {
        path: string;
        filename: string;
        library: {
            type: string;
        };
        module: boolean;
    };
    experiments: {
        outputModule: boolean;
    };
    entry: string;
    resolve: {
        extensions: string[];
    };
    module: {
        rules: {
            test: RegExp;
            use: string;
            exclude: RegExp;
        }[];
    };
    externals: {};
    mode: string;
})[];
export = _exports;

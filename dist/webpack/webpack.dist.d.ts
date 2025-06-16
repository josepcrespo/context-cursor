declare const _exports: {
    entry: string;
    output: {
        path: string;
        filename: string;
        library: string;
        libraryTarget: string;
        globalObject: string;
    };
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
};
export = _exports;

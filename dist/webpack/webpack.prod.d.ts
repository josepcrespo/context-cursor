declare const _exports: {
    entry: {
        main: string;
    };
    resolve: {
        extensions: string[];
    };
    output: {
        path: string;
        filename: string;
    };
    module: {
        rules: ({
            test: RegExp;
            use: string[];
        } | {
            test: RegExp;
            use: string;
            exclude: RegExp;
        } | {
            test: RegExp;
            use: {
                loader: any;
            }[];
        })[];
    };
    plugins: any[];
};
export = _exports;

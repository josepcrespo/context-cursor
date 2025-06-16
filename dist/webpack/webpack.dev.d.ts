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
    devtool: string;
    devServer: {
        open: boolean;
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
            use: ({
                loader: any;
            } | {
                loader: string;
                options: {
                    modules: boolean;
                    sourceMap: boolean;
                };
            } | {
                loader: string;
                options: {
                    sourceMap: boolean;
                };
            })[];
        })[];
    };
    plugins: any[];
};
export = _exports;

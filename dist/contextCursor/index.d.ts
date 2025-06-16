import type { CProps } from './types';
declare function bind(element: Element): void;
declare function unbind(element: Element): void;
declare function init(props?: CProps): void;
declare function destroy(): void;
declare function isActive(): boolean;
declare const _default: {
    init: typeof init;
    destroy: typeof destroy;
    bind: typeof bind;
    unbind: typeof unbind;
    isActive: typeof isActive;
};
export default _default;
export type { CProps } from './types';

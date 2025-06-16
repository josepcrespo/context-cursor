import { addCursor, setStyles } from "./chunks";
import contextMode from "./modes/contextMode";
import propNames from "./propNames";
import type { CProps } from './types';

// Estado singleton
let cursorEl: HTMLElement | null = null;
let propsRef: CProps | null = null;
let cleanupFns: (() => void)[] = [];
let mutationObserver: MutationObserver | null = null;

function cleanup() {
  // Eliminar cursor del DOM
  if (cursorEl && cursorEl.parentNode) {
    cursorEl.parentNode.removeChild(cursorEl);
  }
  cursorEl = null;
  // Eliminar listeners
  cleanupFns.forEach(fn => fn());
  cleanupFns = [];
  // Desconectar observer
  if (mutationObserver) {
    mutationObserver.disconnect();
    mutationObserver = null;
  }
}

function bind(element: Element) {
  if (!cursorEl || !propsRef) return;
  // Enganchar lógica de contexto a un elemento
  const unbind = contextMode(cursorEl, propsRef, [element] as any);
  if (typeof unbind === 'function') cleanupFns.push(unbind);
}

function unbind(element: Element) {
  // No implementado: depende de la API de contextMode
  // Se puede mejorar si contextMode devuelve un método de cleanup por elemento
}

function observeNewElements() {
  if (mutationObserver) mutationObserver.disconnect();
  mutationObserver = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node instanceof Element && node.hasAttribute(propNames.dataAttr)) {
          bind(node);
        }
        // Buscar descendientes
        if (node instanceof Element) {
          node.querySelectorAll(`[${propNames.dataAttr}]`).forEach(bind);
        }
      });
    });
  });
  mutationObserver.observe(document.body, { childList: true, subtree: true });
}

function init(props: CProps = {}) {
  cleanup();
  // Default props
  props = {
    radius: props.radius || 20,
    transitionSpeed: props.transitionSpeed || 0.2,
    parallaxIndex: props.parallaxIndex || 10,
    hoverPadding: props.hoverPadding || 6,
  };
  propsRef = props;
  setStyles();
  cursorEl = addCursor(props) as HTMLElement;
  // Enganchar a todos los elementos actuales
  const interactElements = document.querySelectorAll(
    `[${propNames.dataAttr}]`
  ) as NodeListOf<Element>;
  // Guardar cleanup global de contextMode
  const unbind = contextMode(cursorEl, propsRef, interactElements);
  if (typeof unbind === 'function') cleanupFns.push(unbind);
  // Observar nuevos elementos
  observeNewElements();
}

function destroy() {
  cleanup();
}

function isActive() {
  return !!cursorEl;
}

export default { init, destroy, bind, unbind, isActive };
export type { CProps } from './types';

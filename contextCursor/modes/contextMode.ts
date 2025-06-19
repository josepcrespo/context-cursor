import { gsap } from "gsap";
import { getMoveIndex, isElHasProperty, getStyleProp } from "../chunks";
import propNames from "../propNames";
import type { CProps } from '../types';

const contextMode = (
  cursor: HTMLElement,
  props: CProps,
  interactElements: NodeListOf<Element>
) => {
  // Garantiza valores por defecto para props
  const radius = props.radius ?? 20;
  const transitionSpeed = props.transitionSpeed ?? 0.2;
  const parallaxIndex = props.parallaxIndex ?? 10;
  const hoverPadding = props.hoverPadding ?? 6;
  const parallaxSpeed = {
    cursor: parallaxIndex,
    target: parallaxIndex * 1.5,
  };
  let isHovered: boolean = false;
  let cursorTarget: HTMLElement | null = null;

  const isValidTarget = (el: HTMLElement | null) => {
    return !!el && el.isConnected;
  };

  // Listeners para cleanup
  const cleanupFns: (() => void)[] = [];

  const moveCursor = (e: MouseEvent) => {
    if (!isHovered || !isValidTarget(cursorTarget)) {
      const scaleValue = getScaleFromAttr(cursorTarget || cursor) || 1;
      gsap.to(cursor, { duration: transitionSpeed, x: e.clientX - radius / 2, y: e.clientY - radius / 2, scale: scaleValue });
      return;
    }
    if (!cursorTarget) return;
    const borderRadius = Number(
      window.getComputedStyle(cursorTarget).borderRadius.slice(0, -2) as any
    );
    const scaleValue = getScaleFromAttr(cursorTarget) ||  (isElHasProperty(cursorTarget, propNames.lift) ? 1.1 : 1);
    if (isElHasProperty(cursorTarget, propNames.lift)) {
      gsap.to(cursorTarget, {
        duration: transitionSpeed,
        x: getMoveIndex(
          e.clientX,
          cursorTarget.getBoundingClientRect().left,
          cursorTarget.clientWidth,
          parallaxSpeed.target
        ),
        y: getMoveIndex(
          e.clientY,
          cursorTarget.getBoundingClientRect().top,
          cursorTarget.clientHeight,
          parallaxSpeed.target
        ),
        scale: scaleValue,
        boxShadow: getStyleProp("--ghost-shadow"),
      });
      gsap.to(cursor, {
        duration: transitionSpeed,
        filter: "blur(8px)",
        x:
          cursorTarget.getBoundingClientRect().left +
          (e.clientX -
            cursorTarget.getBoundingClientRect().left -
            cursorTarget.clientWidth / 2) /
            parallaxSpeed.cursor,
        y:
          cursorTarget.getBoundingClientRect().top +
          (e.clientY -
            cursorTarget.getBoundingClientRect().top -
            cursorTarget.clientHeight / 2) /
            parallaxSpeed.cursor,
        backgroundImage: `radial-gradient(circle at ${
          e.clientX - cursorTarget.getBoundingClientRect().left
        }px ${
          e.clientY - cursorTarget.getBoundingClientRect().top
        }px, rgba(255,255,255,0.4), rgba(255,255,255,0))`,
        scale: scaleValue,
      });
    } else {
      gsap.to(cursor, {
        duration: transitionSpeed,
        x:
          cursorTarget.getBoundingClientRect().left -
          (isElHasProperty(cursorTarget, propNames.noPadding)
            ? 0
            : hoverPadding) +
          (isElHasProperty(cursorTarget, propNames.noParallax)
            ? 0
            : (e.clientX -
                cursorTarget.getBoundingClientRect().left -
                cursorTarget.clientWidth / 2) /
              parallaxSpeed.cursor),
        y:
          cursorTarget.getBoundingClientRect().top -
          (isElHasProperty(cursorTarget, propNames.noPadding)
            ? 0
            : hoverPadding) +
          (isElHasProperty(cursorTarget, propNames.noParallax)
            ? 0
            : (e.clientY -
                cursorTarget.getBoundingClientRect().top -
                cursorTarget.clientHeight / 2) /
              parallaxSpeed.cursor),
        borderRadius:
          borderRadius *
          (isElHasProperty(cursorTarget, propNames.noPadding) ? 1 : 1.5),
        width:
          cursorTarget.clientWidth +
          (isElHasProperty(cursorTarget, propNames.noPadding)
            ? 0
            : hoverPadding * 2),
        height:
          cursorTarget.clientHeight +
          (isElHasProperty(cursorTarget, propNames.noPadding)
            ? 0
            : hoverPadding * 2),
        scale: scaleValue,
      });
      if (!isElHasProperty(cursorTarget, propNames.noParallax)) {
        gsap.to(cursorTarget, {
          duration: transitionSpeed,
          x: -getMoveIndex(
            e.clientX,
            cursorTarget.getBoundingClientRect().left,
            cursorTarget.clientWidth,
            parallaxSpeed.target
          ),
          y: -getMoveIndex(
            e.clientY,
            cursorTarget.getBoundingClientRect().top,
            cursorTarget.clientHeight,
            parallaxSpeed.target
          ),
          scale: scaleValue,
        });
      }
    }
  };

  const handleMouseOver = (e: MouseEvent) => {
    isHovered = true;
    cursorTarget = e.target as HTMLElement;
    if (!isValidTarget(cursorTarget)) return;
    const borderRadius = parseFloat(window.getComputedStyle(cursorTarget).borderRadius);
    const scaleValue = getScaleFromAttr(cursorTarget) || (isElHasProperty(cursorTarget, propNames.lift) ? 1.1 : 1);
    if (isElHasProperty(cursorTarget, propNames.lift)) {
      cursor.classList.add("c-cursor-lift_active");
      gsap.to(cursor, {
        duration: transitionSpeed,
        borderRadius: borderRadius,
        width: cursorTarget.clientWidth,
        height: cursorTarget.clientHeight,
        scale: scaleValue,
      });
    } else {
      cursor.classList.add("c-cursor_active");
      gsap.to(cursor, {
        duration: transitionSpeed,
        borderRadius: borderRadius,
        width: cursorTarget.clientWidth,
        height: cursorTarget.clientHeight,
        scale: scaleValue,
      });
    }
  };

  const handleMouseOut = (e: MouseEvent) => {
    isHovered = false;
    cursor.classList.remove("c-cursor_active");
    cursor.classList.remove("c-cursor-lift_active");
    gsap.to(cursor, {
      duration: transitionSpeed,
      x: e.clientX - radius / 2,
      y: e.clientY - radius / 2,
      width: radius,
      height: radius,
      borderRadius: "100px",
      scale: 1,
      backgroundImage: "none",
      filter: "blur(0px)",
    });
    if (isValidTarget(cursorTarget)) {
      gsap.to(cursorTarget as HTMLElement, {
        duration: transitionSpeed,
        x: 0,
        y: 0,
        scale: 1,
        boxShadow: "0 7px 15px rgba(0,0,0,0.0)",
      });
    }
    cursorTarget = null;
  };

  // Event listeners
  const onWheel: EventListener = (e) => {
    handleMouseOut(e as MouseEvent);
    cursorTarget = null;
  };
  const onMouseMove: EventListener = (e) => {
    moveCursor(e as MouseEvent);
  };

  document.addEventListener("wheel", onWheel);
  document.addEventListener("mousemove", onMouseMove);
  cleanupFns.push(() => {
    document.removeEventListener("wheel", onWheel);
    document.removeEventListener("mousemove", onMouseMove);
  });

  interactElements.forEach((item) => {
    const onEnter: EventListener = (e) => handleMouseOver(e as MouseEvent);
    const onLeave: EventListener = (e) => handleMouseOut(e as MouseEvent);
    item.addEventListener("mouseenter", onEnter);
    item.addEventListener("mouseleave", onLeave);
    cleanupFns.push(() => {
      item.removeEventListener("mouseenter", onEnter);
      item.removeEventListener("mouseleave", onLeave);
    });
  });

  // Devuelve función de cleanup
  return () => {
    cleanupFns.forEach(fn => fn());
  };
};

export default contextMode;

const getScaleFromAttr = (el: HTMLElement): number | null => {
  const attr = el.getAttribute('data-ccursor-scale');
  if (!attr) return null;
  const val = parseFloat(attr);
  if (!isNaN(val)) return val;
  return null;
};

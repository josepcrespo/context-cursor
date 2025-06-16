import { gsap } from "gsap";
import { getMoveIndex, isElHasProperty, getStyleProp } from "../chunks";
import propNames from "../propNames";
import type { CProps } from '../types';

const contextMode = (
  cursor: HTMLElement,
  props: CProps,
  interactElements: NodeListOf<Element>
) => {
  const parallaxSpeed = {
    cursor: props.parallaxIndex,
    target: props.parallaxIndex * 1.5,
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
      gsap.to(cursor, { duration: props.transitionSpeed, x: e.clientX - props.radius / 2, y: e.clientY - props.radius / 2 });
      return;
    }
    if (!cursorTarget) return;
    const borderRadius = Number(
      window.getComputedStyle(cursorTarget).borderRadius.slice(0, -2) as any
    );
    if (isElHasProperty(cursorTarget, propNames.lift)) {
      gsap.to(cursorTarget, {
        duration: props.transitionSpeed,
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
        scale: 1.1,
        boxShadow: getStyleProp("--ghost-shadow"),
      });
      gsap.to(cursor, {
        duration: props.transitionSpeed,
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
      });
    } else {
      gsap.to(cursor, {
        duration: props.transitionSpeed,
        x:
          cursorTarget.getBoundingClientRect().left -
          (isElHasProperty(cursorTarget, propNames.noPadding)
            ? 0
            : props.hoverPadding) +
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
            : props.hoverPadding) +
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
            : props.hoverPadding * 2),
        height:
          cursorTarget.clientHeight +
          (isElHasProperty(cursorTarget, propNames.noPadding)
            ? 0
            : props.hoverPadding * 2),
      });
      if (!isElHasProperty(cursorTarget, propNames.noParallax)) {
        gsap.to(cursorTarget, {
          duration: props.transitionSpeed,
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
        });
      }
    }
  };

  const handleMouseOver = (e: MouseEvent) => {
    isHovered = true;
    cursorTarget = e.target as HTMLElement;
    if (!isValidTarget(cursorTarget)) return;
    const borderRadius = parseFloat(window.getComputedStyle(cursorTarget).borderRadius);
    if (isElHasProperty(cursorTarget, propNames.lift)) {
      cursor.classList.add("c-cursor-lift_active");
      gsap.to(cursor, {
        duration: props.transitionSpeed,
        borderRadius: borderRadius,
        width: cursorTarget.clientWidth,
        height: cursorTarget.clientHeight,
        scale: 1.1,
      });
    } else {
      cursor.classList.add("c-cursor_active");
    }
  };

  const handleMouseOut = (e: MouseEvent) => {
    isHovered = false;
    cursor.classList.remove("c-cursor_active");
    cursor.classList.remove("c-cursor-lift_active");
    gsap.to(cursor, {
      duration: props.transitionSpeed,
      x: e.clientX - props.radius / 2,
      y: e.clientY - props.radius / 2,
      width: props.radius,
      height: props.radius,
      borderRadius: "100px",
      scale: 1,
      backgroundImage: "none",
      filter: "blur(0px)",
    });
    if (isValidTarget(cursorTarget)) {
      gsap.to(cursorTarget, {
        duration: props.transitionSpeed,
        x: 0,
        y: 0,
        scale: 1,
        boxShadow: "0 7px 15px rgba(0,0,0,0.0)",
      });
    }
    cursorTarget = null;
  };

  // Event listeners
  const onWheel = (e: WheelEvent) => {
    handleMouseOut(e as any);
    cursorTarget = null;
  };
  const onMouseMove = (e: MouseEvent) => {
    moveCursor(e);
  };

  document.addEventListener("mousewheel", onWheel);
  document.addEventListener("mousemove", onMouseMove);
  cleanupFns.push(() => {
    document.removeEventListener("mousewheel", onWheel);
    document.removeEventListener("mousemove", onMouseMove);
  });

  interactElements.forEach((item) => {
    const onEnter = (e: MouseEvent) => handleMouseOver(e);
    const onLeave = (e: MouseEvent) => handleMouseOut(e);
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

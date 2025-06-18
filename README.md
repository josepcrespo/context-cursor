# CUSTOM CURSOR
#### A cursor that takes the shape of the hovered element. Inspired by [iPad Pointer](https://developer.apple.com/videos/play/wwdc2020/10640).

![In Action](preview/assets/custom-preview.gif)

---

## Installation

```
npm install context-cursor
# or
pnpm add context-cursor
```

## Basic usage (SPA/Quasar/Vue)

```js
import contextCursor from 'context-cursor';

// Initialize (e.g., in Vue/Quasar onMounted)
contextCursor.init();

// Destroy (e.g., in onUnmounted)
contextCursor.destroy();
```

### Available props

```ts
contextCursor.init({
  radius: 24,            // Cursor size
  transitionSpeed: 0.2,  // Animation speed
  parallaxIndex: 10,     // Parallax effect
  hoverPadding: 6        // Padding on hover
});
```

### Dynamic binding

- The cursor automatically attaches to any element with the `data-ccursor` attribute, even if added dynamically to the DOM (thanks to MutationObserver).
- You can also bind manually:

```js
const el = document.getElementById('my-button');
contextCursor.bind(el);
```

## API

- `init(props?)`: Initializes the contextual cursor. Cleans up previous instances and listeners.
- `destroy()`: Cleans up listeners, removes the DOM node, and stops the observer.
- `bind(element)`: Manually binds a new element.
- `unbind(element)`: (Pending implementation)
- `isActive()`: Returns whether the cursor is active.

## Recommended integration in Quasar/Vue

```js
import { onMounted, onUnmounted } from 'vue';
import contextCursor from 'context-cursor';

onMounted(() => {
  contextCursor.init();
});
onUnmounted(() => {
  contextCursor.destroy();
});
```

---

## Custom scale for any effect

You can set a custom scale for the cursor using the `data-ccursor-scale` attribute, regardless of the effect (lift, morph, noParallax, noPadding, or any combination):

```html
<!-- Default scale (1 for morph, 1.1 for lift) -->
<button data-ccursor="lift">Lift Button</button>
<button data-ccursor>Normal Button</button>

<!-- Custom scale (e.g. 1.3) -->
<button data-ccursor="lift" data-ccursor-scale="1.3">Big Lift Button</button>
<button data-ccursor data-ccursor-scale="1.2">Big Morph Button</button>
<button data-ccursor="noParallax" data-ccursor-scale="1.5">No Parallax, Big</button>
```

- The value of `data-ccursor-scale` must be a number (e.g. `1.2`, `1.5`, etc).
- If not provided, the default is `1.1` for lift and `1` for other effects.
- You can combine it with any other local attributes.
- You can also set or update the scale dynamically from JS:
  ```js
  el.setAttribute('data-ccursor-scale', '1.5');
  ```

---

## Demo and usage

## 👉🏽 [pavellaptev.github.io/context-cursor](https://pavellaptev.github.io/context-cursor/) 👈🏽

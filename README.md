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

## Demo and usage

## 👉🏽 [pavellaptev.github.io/context-cursor](https://pavellaptev.github.io/context-cursor/) 👈🏽

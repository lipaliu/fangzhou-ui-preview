# anim8-grid

<p align="center">
  <img src="https://i.imgur.com/i0TbGrx.png" alt="anim8-grid" width="540">
</p>

[![npm version](https://img.shields.io/npm/v/anim8-grid.svg)](https://www.npmjs.com/package/anim8-grid)
[![npm downloads](https://img.shields.io/npm/dm/anim8-grid.svg)](https://www.npmjs.com/package/anim8-grid)
[![bundle size](https://img.shields.io/bundlephobia/minzip/anim8-grid)](https://bundlephobia.com/package/anim8-grid)
[![zero dependencies](https://img.shields.io/badge/dependencies-0-brightgreen)](https://www.npmjs.com/package/anim8-grid)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue.svg)](https://www.typescriptlang.org/)
[![license](https://img.shields.io/npm/l/anim8-grid.svg)](https://github.com/muratdemirci/anim8-grid/blob/main/LICENSE)

Animated responsive image grid. Zero dependencies. Framework-agnostic. Works everywhere.

## Install

```bash
npm install anim8-grid
```

## Usage

```ts
import { createGrid } from 'anim8-grid'

const grid = createGrid(document.getElementById('grid')!, {
  images: ['/photos/01.jpg', '/photos/02.jpg', '/photos/03.jpg', '/photos/04.jpg', '/photos/05.jpg', '/photos/06.jpg'],
  gridRows: 3,
  gridColumns: 5,
  animationType: 'rotateLeft',
  animationDuration: 600,
  rotationInterval: 2000,
})

grid.stop()
grid.start()
grid.update({ animationDuration: 300, maxItemsPerCycle: 10 })
grid.destroy()
```

### CDN / Script Tag

```html
<script src="https://unpkg.com/anim8-grid"></script>
<script>
  const grid = anim8Grid.createGrid(document.getElementById('grid'), {
    images: ['/photos/01.jpg', '/photos/02.jpg', '/photos/03.jpg'],
  })
</script>
```

## Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `images` | `string[]` | **(required)** | Image URLs. Provide more than grid cells for rotation |
| `gridRows` | `number` | `4` | Number of rows |
| `gridColumns` | `number` | `10` | Number of columns |
| `animationType` | `AnimationType` | `'random'` | Animation type (see below) |
| `animationDuration` | `number` | `800` | Transition duration in ms |
| `animationEasing` | `string` | `'linear'` | CSS easing function |
| `rotationInterval` | `number` | `3000` | Time between cycles in ms (min 300) |
| `itemsPerCycle` | `number \| 'random'` | `'random'` | Cells to animate per cycle |
| `maxItemsPerCycle` | `number` | `3` | Max cells when `itemsPerCycle` is `'random'` |
| `autoplay` | `boolean` | `true` | Auto-start rotation |
| `hoverTrigger` | `boolean` | `false` | Rotate on hover instead of timer |
| `frozenIndices` | `number[]` | `[]` | Cell indices that never animate |
| `preventClick` | `boolean` | `true` | Block clicks on grid items |
| `responsive` | `Record<number, Partial<GridDimensions>>` | `{}` | Breakpoint overrides |
| `fullscreen` | `boolean` | `false` | Fill entire viewport, auto-calculate grid |
| `cellSize` | `number` | `120` | Target cell size in px (fullscreen mode) |

## Methods

| Method | Description |
| --- | --- |
| `start()` | Start or resume rotation |
| `stop()` | Pause rotation |
| `update(opts)` | Change options at runtime without recreating the grid |
| `destroy()` | Remove grid, cleanup all listeners |

### Runtime Updates

Change animation speed, interval, items per cycle, animation type, or cell size without destroying the grid:

```ts
const grid = createGrid(container, { images, fullscreen: true, cellSize: 120 })

// These apply instantly — no rebuild
grid.update({ animationDuration: 300 })
grid.update({ rotationInterval: 800 })
grid.update({ maxItemsPerCycle: 15 })
grid.update({ animationType: 'rotateLeft' })

// This rebuilds the grid in fullscreen mode
grid.update({ cellSize: 80 })
```

**Updatable options:** `animationType`, `animationDuration`, `animationEasing`, `rotationInterval`, `itemsPerCycle`, `maxItemsPerCycle`, `cellSize`

## Animation Types

17 built-in types:

| 2D | 3D | Combo | Special |
| --- | --- | --- | --- |
| `fadeInOut` | `rotateLeft` | `rotateLeftScale` | `showHide` |
| `slideLeft` | `rotateRight` | `rotateRightScale` | `random` |
| `slideRight` | `rotateTop` | `rotateTopScale` | |
| `slideTop` | `rotateBottom` | `rotateBottomScale` | |
| `slideBottom` | `scale` | | |
| | `rotate3d` | | |

## Responsive

Breakpoint-based grid dimensions using `ResizeObserver`:

```ts
createGrid(container, {
  images,
  gridRows: 4,
  gridColumns: 8,
  responsive: {
    1024: { gridRows: 3, gridColumns: 6 },
    768: { gridRows: 2, gridColumns: 4 },
    480: { gridRows: 1, gridColumns: 2 },
  },
})
```

## Fullscreen Mode

Fill the entire viewport. Rows and columns auto-calculated from `window.innerWidth / innerHeight` and `cellSize`. Recalculates on resize.

```ts
createGrid(container, {
  images,
  fullscreen: true,
  cellSize: 120,
  animationType: 'random',
  rotationInterval: 1500,
  maxItemsPerCycle: 5,
})
```

| Resolution | cellSize: 120 | cellSize: 80 |
|---|---|---|
| 1920x1080 (Full HD) | 16x9 = 144 cells | 24x14 = 336 cells |
| 2560x1440 (2K) | 22x12 = 264 cells | 32x18 = 576 cells |
| 3840x2160 (4K) | 32x18 = 576 cells | 48x27 = 1296 cells |
| 1366x768 (laptop) | 12x7 = 84 cells | 18x10 = 180 cells |
| 390x844 (iPhone) | 4x8 = 32 cells | 5x11 = 55 cells |
| 768x1024 (iPad) | 7x9 = 63 cells | 10x13 = 130 cells |

Container gets `position: fixed; width: 100vw; height: 100vh` — layer content on top with higher `z-index`.

## Framework Examples

### React

```tsx
import { createGrid, type GridInstance, type UpdatableOptions } from 'anim8-grid'
import { useRef, useEffect, useCallback } from 'react'

function Anim8Grid({ images, ...options }) {
  const ref = useRef(null)

  useEffect(() => {
    const grid = createGrid(ref.current, { images, ...options })
    return () => grid.destroy()
  }, [])

  return <div ref={ref} />
}

// With runtime updates via hook
function useAnim8Grid() {
  const gridRef = useRef<GridInstance | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const init = useCallback((opts) => {
    gridRef.current?.destroy()
    gridRef.current = createGrid(containerRef.current!, opts)
  }, [])

  const update = useCallback((opts: UpdatableOptions) => {
    gridRef.current?.update(opts)
  }, [])

  return { containerRef, init, update }
}
```

### Vue

```vue
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { createGrid, type GridInstance, type UpdatableOptions } from 'anim8-grid'

const props = defineProps<{ images: string[], fullscreen?: boolean, cellSize?: number }>()
const containerRef = ref<HTMLElement | null>(null)
let grid: GridInstance | null = null

function update(opts: UpdatableOptions) { grid?.update(opts) }

onMounted(() => {
  grid = createGrid(containerRef.value!, { images: props.images, fullscreen: props.fullscreen, cellSize: props.cellSize })
})
onBeforeUnmount(() => { grid?.destroy() })

defineExpose({ update })
</script>

<template><div ref="containerRef" /></template>
```

### Angular

```ts
@Component({ selector: 'app-grid', template: '<div #container></div>', standalone: true })
export class Anim8GridComponent implements AfterViewInit, OnDestroy {
  @ViewChild('container', { static: true }) ref!: ElementRef
  @Input() images: string[] = []
  @Input() fullscreen = false
  @Input() cellSize = 120
  private grid: GridInstance | null = null

  ngAfterViewInit() {
    this.grid = createGrid(this.ref.nativeElement, {
      images: this.images, fullscreen: this.fullscreen, cellSize: this.cellSize
    })
  }

  update(opts: UpdatableOptions) { this.grid?.update(opts) }
  ngOnDestroy() { this.grid?.destroy() }
}
```

### Astro

```astro
<div id="grid"></div>
<script>
  import { createGrid } from 'anim8-grid'
  createGrid(document.getElementById('grid')!, {
    images: Array.from({ length: 54 }, (_, i) => `/img/${i + 1}.jpg`),
    fullscreen: true,
    cellSize: 120,
  })
</script>
```

Full working examples: [`examples/`](./examples/)

## Demos

Run `npx serve .` from the project root and open `/demo/`. 8 interactive demos included:

| Demo | Description |
|---|---|
| [**Basic**](demo/basic.html) | Responsive grid with random animations and breakpoints |
| [**Animations**](demo/animations.html) | All 15 animation types running side by side |
| [**Hover**](demo/hover.html) | No auto-rotation — cells animate on mouse hover |
| [**Fullscreen**](demo/fullscreen.html) | Viewport-filling grid with live sliders for cell size, speed, interval, items |
| [**Hero**](demo/hero.html) | Fullscreen grid as a page background with gradient overlay and content on top |
| [**Frozen**](demo/frozen.html) | Pin specific cells with `frozenIndices` while the rest rotate |
| [**Speed**](demo/speed.html) | Slow / balanced / chaotic — same grid at 3 different speed configs |
| [**Playground**](demo/playground.html) | Full control panel — tweak every parameter live with real-time code preview |

## License

MIT

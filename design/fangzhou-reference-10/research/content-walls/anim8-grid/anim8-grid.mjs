// src/animations/index.ts
var ANIMATION_TYPES = [
  "fadeInOut",
  "slideLeft",
  "slideRight",
  "slideTop",
  "slideBottom",
  "rotateLeft",
  "rotateRight",
  "rotateTop",
  "rotateBottom",
  "scale",
  "rotate3d",
  "rotateLeftScale",
  "rotateRightScale",
  "rotateTopScale",
  "rotateBottomScale"
];
function halfSpeed(props) {
  return (ctx) => ({ ...props, speed: ctx.hd, delay: ctx.hd });
}
function rotateAnim(axis, inDeg, outDeg) {
  const fn = axis === "X" ? "rotateX" : "rotateY";
  return halfSpeed({
    startInProps: { transform: `${fn}(${inDeg})` },
    startOutProps: {},
    endInProps: { transform: `${fn}(0deg)` },
    endOutProps: { transform: `${fn}(${outDeg})` }
  });
}
function rotateScaleAnim(axis, inDeg, outDeg) {
  const fn = axis === "X" ? "rotateX" : "rotateY";
  return halfSpeed({
    startInProps: { transform: `scale(0.3) ${fn}(${inDeg})` },
    startOutProps: { transform: "scale(1)" },
    endInProps: { transform: `scale(1) ${fn}(0deg)` },
    endOutProps: { transform: `scale(0.3) ${fn}(${outDeg})` }
  });
}
var ANIMATION_MAP = {
  showHide: () => ({
    startInProps: {},
    startOutProps: {},
    endInProps: {},
    endOutProps: { opacity: "0" },
    speed: 0
  }),
  fadeInOut: () => ({
    startInProps: {},
    startOutProps: {},
    endInProps: {},
    endOutProps: { opacity: "0" }
  }),
  slideLeft: (ctx) => ({
    startInProps: { left: `${ctx.w}px` },
    startOutProps: {},
    endInProps: { left: "0px" },
    endOutProps: { left: `${-ctx.w}px` }
  }),
  slideRight: (ctx) => ({
    startInProps: { left: `${-ctx.w}px` },
    startOutProps: {},
    endInProps: { left: "0px" },
    endOutProps: { left: `${ctx.w}px` }
  }),
  slideTop: (ctx) => ({
    startInProps: { top: `${ctx.h}px` },
    startOutProps: {},
    endInProps: { top: "0px" },
    endOutProps: { top: `${-ctx.h}px` }
  }),
  slideBottom: (ctx) => ({
    startInProps: { top: `${-ctx.h}px` },
    startOutProps: {},
    endInProps: { top: "0px" },
    endOutProps: { top: `${ctx.h}px` }
  }),
  rotateLeft: rotateAnim("Y", "90deg", "-90deg"),
  rotateRight: rotateAnim("Y", "-90deg", "90deg"),
  rotateTop: rotateAnim("X", "90deg", "-90deg"),
  rotateBottom: rotateAnim("X", "-90deg", "90deg"),
  scale: halfSpeed({
    startInProps: { transform: "scale(0)" },
    startOutProps: { transform: "scale(1)" },
    endInProps: { transform: "scale(1)" },
    endOutProps: { transform: "scale(0)" }
  }),
  rotate3d: halfSpeed({
    startInProps: { transform: "rotate3d(1, 1, 0, 90deg)" },
    startOutProps: {},
    endInProps: { transform: "rotate3d(1, 1, 0, 0deg)" },
    endOutProps: { transform: "rotate3d(1, 1, 0, -90deg)" }
  }),
  rotateLeftScale: rotateScaleAnim("Y", "90deg", "-90deg"),
  rotateRightScale: rotateScaleAnim("Y", "-90deg", "90deg"),
  rotateTopScale: rotateScaleAnim("X", "90deg", "-90deg"),
  rotateBottomScale: rotateScaleAnim("X", "-90deg", "90deg")
};
function getAnimationProperties(animType, width, height, duration) {
  const ctx = { w: width, h: height, d: duration, hd: duration / 2 };
  const def = ANIMATION_MAP[animType];
  if (!def) {
    return { startInProps: {}, startOutProps: {}, endInProps: {}, endOutProps: {}, delay: 0, speed: duration };
  }
  const result = def(ctx);
  return {
    startInProps: result.startInProps,
    startOutProps: result.startOutProps,
    endInProps: result.endInProps,
    endOutProps: result.endOutProps,
    delay: result.delay ?? 0,
    speed: result.speed ?? duration
  };
}

// src/core/AnimationEngine.ts
var AnimationEngine = class {
  constructor(duration, easing) {
    this.duration = duration;
    this.easing = easing;
  }
  updateTiming(duration, easing) {
    this.duration = duration;
    this.easing = easing;
  }
  animate(inEl, outEl, animType, width, height, onComplete) {
    const props = getAnimationProperties(animType, width, height, this.duration);
    Object.assign(inEl.style, props.startInProps);
    Object.assign(outEl.style, props.startOutProps);
    void inEl.offsetHeight;
    const inTransition = `all ${props.speed}ms ${props.delay}ms ${this.easing}`;
    const outTransition = `all ${props.speed}ms 0ms ${this.easing}`;
    requestAnimationFrame(() => {
      inEl.style.transition = inTransition;
      outEl.style.transition = outTransition;
      Object.assign(inEl.style, props.endInProps);
      Object.assign(outEl.style, props.endOutProps);
      if (props.speed === 0) {
        setTimeout(() => this.cleanup(inEl, outEl, onComplete), 0);
        return;
      }
      let completed = false;
      const finish = () => {
        if (completed) return;
        completed = true;
        inEl.removeEventListener("transitionend", onTransitionEnd);
        this.cleanup(inEl, outEl, onComplete);
      };
      const onTransitionEnd = () => finish();
      inEl.addEventListener("transitionend", onTransitionEnd);
      setTimeout(finish, props.speed + props.delay + 100);
    });
  }
  cleanup(inEl, outEl, onComplete) {
    inEl.style.transition = "none";
    outEl.style.transition = "none";
    onComplete();
  }
};

// src/core/ImagePool.ts
var ImagePool = class {
  constructor(images) {
    this.queue = [...images];
  }
  take() {
    return this.queue.shift();
  }
  release(image) {
    this.queue.push(image);
  }
  get size() {
    return this.queue.length;
  }
};

// src/utils/shuffle.ts
function shuffle(array) {
  const result = [...array];
  let i = result.length;
  while (i--) {
    const p = Math.floor(Math.random() * (i + 1));
    const t = result[i];
    result[i] = result[p];
    result[p] = t;
  }
  return result;
}

// src/core/ImageDistributor.ts
function distributeImages(images, gridSize) {
  const imgCount = images.length;
  if (imgCount === 0) {
    return {
      visibleImages: new Array(gridSize).fill(""),
      pool: new ImagePool([])
    };
  }
  if (imgCount >= gridSize) {
    return {
      visibleImages: images.slice(0, gridSize),
      pool: new ImagePool(images.slice(gridSize))
    };
  }
  return {
    visibleImages: Array.from({ length: gridSize }, (_, i) => images[i % imgCount]),
    pool: new ImagePool(shuffle([...images]))
  };
}

// src/core/ResponsiveManager.ts
var ResponsiveManager = class {
  constructor(container, defaults, responsive, onChange) {
    this.lastRows = -1;
    this.lastColumns = -1;
    this.defaults = defaults;
    this.onChange = onChange;
    this.breakpoints = Object.entries(responsive).map(([key, val]) => [Number(key), val]).sort((a, b) => a[0] - b[0]);
    this.observer = new ResizeObserver((entries) => {
      const width = entries[0].contentRect.width;
      this.evaluate(width);
    });
    this.observer.observe(container);
  }
  evaluate(width) {
    let dims = { ...this.defaults };
    for (const [breakpoint, overrides] of this.breakpoints) {
      if (width < breakpoint) {
        dims = {
          gridRows: overrides.gridRows ?? this.defaults.gridRows,
          gridColumns: overrides.gridColumns ?? this.defaults.gridColumns
        };
        break;
      }
    }
    if (dims.gridRows !== this.lastRows || dims.gridColumns !== this.lastColumns) {
      this.lastRows = dims.gridRows;
      this.lastColumns = dims.gridColumns;
      this.onChange(dims);
    }
  }
  destroy() {
    this.observer.disconnect();
  }
};

// src/utils/visibility.ts
function onVisibilityChange(onHidden, onVisible) {
  const handler = () => {
    document.hidden ? onHidden() : onVisible();
  };
  document.addEventListener("visibilitychange", handler);
  return () => {
    document.removeEventListener("visibilitychange", handler);
  };
}

// src/utils/dom.ts
var ANCHOR_STYLES = {
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  backfaceVisibility: "hidden",
  transformStyle: "preserve-3d",
  backgroundSize: "100% 100%",
  backgroundPosition: "center center",
  backgroundRepeat: "no-repeat"
};
function createAnchor(imageUrl) {
  const a = document.createElement("a");
  a.href = "#";
  Object.assign(a.style, ANCHOR_STYLES);
  if (imageUrl) {
    a.style.backgroundImage = `url(${imageUrl})`;
  }
  return a;
}
function createCell(widthPercent, heightValue) {
  const li = document.createElement("li");
  li.style.perspective = "400px";
  li.style.overflow = "hidden";
  li.style.backgroundColor = "#000";
  li.style.width = `${widthPercent}%`;
  li.style.position = "relative";
  li.style.margin = "0";
  li.style.padding = "0";
  if (heightValue) {
    li.style.height = heightValue;
  } else {
    li.style.aspectRatio = "1";
  }
  return li;
}
function createGridList() {
  const ul = document.createElement("ul");
  ul.style.display = "flex";
  ul.style.flexWrap = "wrap";
  ul.style.listStyle = "none";
  ul.style.margin = "0";
  ul.style.padding = "0";
  ul.style.width = "100%";
  ul.style.height = "100%";
  return ul;
}
var BG_URL_REGEX = /url\(["']?(.+?)["']?\)/;
function parseBackgroundUrl(el) {
  const match = el.style.backgroundImage.match(BG_URL_REGEX);
  return match ? match[1] : null;
}

// src/core/GridRotator.ts
var MIN_INTERVAL_MS = 300;
var FULLSCREEN_RESIZE_DEBOUNCE_MS = 150;
var GridRotator = class {
  constructor(container, options) {
    this.timerId = null;
    this.destroyed = false;
    this.activeIndices = /* @__PURE__ */ new Set();
    this.resizeHandler = null;
    this.hoverHandler = null;
    this.cachedCells = [];
    this.visibleImageUrls = [];
    if (!(container instanceof HTMLElement)) {
      throw new Error("Container must be an HTMLElement");
    }
    this.container = container;
    this.options = options;
    this.currentRows = options.gridRows;
    this.currentColumns = options.gridColumns;
    this.engine = new AnimationEngine(options.animationDuration, options.animationEasing);
    this.frozenSet = new Set(options.frozenIndices);
    if (options.fullscreen) {
      const dims = this.calcFullscreenDims();
      this.currentRows = dims.gridRows;
      this.currentColumns = dims.gridColumns;
    }
    this.initPool(options.images);
    this.container.classList.add("anim8-grid");
    if (options.fullscreen) {
      this.applyFullscreenStyles();
    }
    this.buildGrid();
    this.initResponsive();
    this.initFullscreenResize();
    this.initVisibility();
    if (options.hoverTrigger) {
      this.initHover();
    }
    if (options.autoplay) {
      this.start();
    }
  }
  start() {
    if (this.destroyed || this.options.images.length === 0) return;
    if (this.timerId !== null) return;
    this.scheduleNext();
  }
  stop() {
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }
  update(newOpts) {
    if (this.destroyed) return;
    const needsRestart = "rotationInterval" in newOpts || "itemsPerCycle" in newOpts || "maxItemsPerCycle" in newOpts;
    const needsRebuild = "cellSize" in newOpts && this.options.fullscreen;
    this.mergeOptions(newOpts);
    if (needsRebuild) {
      this.onResize(this.calcFullscreenDims());
    } else if (needsRestart && this.options.autoplay) {
      this.stop();
      this.start();
    }
  }
  destroy() {
    this.destroyed = true;
    this.stop();
    this.responsiveManager.destroy();
    this.removeVisibilityListener();
    this.removeFullscreenResize();
    if (this.hoverHandler) {
      this.container.removeEventListener("mouseover", this.hoverHandler);
      this.hoverHandler = null;
    }
    this.container.innerHTML = "";
    this.container.classList.remove("anim8-grid");
    if (this.options.fullscreen) {
      this.clearFullscreenStyles();
    }
  }
  initPool(images) {
    const gridSize = this.currentRows * this.currentColumns;
    const result = distributeImages(images, gridSize);
    this.visibleImageUrls = result.visibleImages;
    this.pool = result.pool;
  }
  initResponsive() {
    this.responsiveManager = new ResponsiveManager(
      this.container,
      { gridRows: this.currentRows, gridColumns: this.currentColumns },
      this.options.fullscreen ? {} : this.options.responsive,
      (dims) => this.onResize(dims)
    );
  }
  initFullscreenResize() {
    if (!this.options.fullscreen) return;
    let resizeTimer = null;
    this.resizeHandler = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (this.destroyed) return;
        const newDims = this.calcFullscreenDims();
        if (newDims.gridRows !== this.currentRows || newDims.gridColumns !== this.currentColumns) {
          this.applyFullscreenStyles();
          this.onResize(newDims);
        }
      }, FULLSCREEN_RESIZE_DEBOUNCE_MS);
    };
    window.addEventListener("resize", this.resizeHandler);
  }
  removeFullscreenResize() {
    if (this.resizeHandler) {
      window.removeEventListener("resize", this.resizeHandler);
      this.resizeHandler = null;
    }
  }
  initVisibility() {
    this.removeVisibilityListener = onVisibilityChange(
      () => this.stop(),
      () => {
        if (this.options.autoplay && !this.destroyed) this.start();
      }
    );
  }
  initHover() {
    this.hoverHandler = (e) => {
      const li = e.target.closest("li");
      if (!li) return;
      const idx = this.cachedCells.indexOf(li);
      if (idx === -1) return;
      if (this.frozenSet.has(idx)) return;
      if (this.activeIndices.has(idx)) return;
      this.replaceItem(idx);
    };
    this.container.addEventListener("mouseover", this.hoverHandler);
  }
  calcFullscreenDims() {
    return {
      gridColumns: Math.ceil(window.innerWidth / this.options.cellSize),
      gridRows: Math.ceil(window.innerHeight / this.options.cellSize)
    };
  }
  applyFullscreenStyles() {
    Object.assign(this.container.style, {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100vw",
      height: "100vh",
      overflow: "hidden",
      zIndex: "0"
    });
  }
  clearFullscreenStyles() {
    for (const prop of ["position", "top", "left", "width", "height", "overflow", "zIndex"]) {
      this.container.style[prop] = "";
    }
  }
  buildGrid() {
    this.container.innerHTML = "";
    this.cachedCells = [];
    const gridSize = this.currentRows * this.currentColumns;
    const ul = createGridList();
    const isFullscreen = this.options.fullscreen;
    const widthPercent = 100 / this.currentColumns;
    const heightValue = isFullscreen ? `${100 / this.currentRows}%` : void 0;
    for (let i = 0; i < gridSize; i++) {
      const li = createCell(widthPercent, heightValue);
      const a = createAnchor(this.visibleImageUrls[i]);
      if (this.options.preventClick) {
        a.addEventListener("click", (e) => e.preventDefault());
      }
      li.appendChild(a);
      if (this.frozenSet.has(i)) {
        li.setAttribute("data-frozen", "true");
      }
      ul.appendChild(li);
      this.cachedCells.push(li);
    }
    this.container.appendChild(ul);
  }
  onResize(dims) {
    this.stop();
    this.collectAndRedistribute(dims);
    this.activeIndices.clear();
    this.buildGrid();
    if (this.options.autoplay && !this.destroyed) {
      this.start();
    }
  }
  collectAndRedistribute(dims) {
    const allImages = [...this.visibleImageUrls];
    while (this.pool.size > 0) {
      const img = this.pool.take();
      if (img) allImages.push(img);
    }
    this.currentRows = dims.gridRows;
    this.currentColumns = dims.gridColumns;
    const gridSize = this.currentRows * this.currentColumns;
    const uniqueImages = [...new Set(allImages.filter(Boolean))];
    const result = distributeImages(uniqueImages, gridSize);
    this.visibleImageUrls = result.visibleImages;
    this.pool = result.pool;
  }
  scheduleNext() {
    const interval = Math.max(this.options.rotationInterval, MIN_INTERVAL_MS);
    this.timerId = setTimeout(() => {
      if (this.destroyed) return;
      const count = this.resolveItemCount();
      const candidates = this.getAnimatableCandidates();
      const picked = shuffle(candidates).slice(0, count);
      for (const idx of picked) {
        this.replaceItem(idx);
      }
      this.scheduleNext();
    }, interval);
  }
  getAnimatableCandidates() {
    const totalCells = this.currentRows * this.currentColumns;
    const candidates = [];
    for (let i = 0; i < totalCells; i++) {
      if (!this.activeIndices.has(i) && !this.frozenSet.has(i)) {
        candidates.push(i);
      }
    }
    return candidates;
  }
  resolveItemCount() {
    if (this.options.itemsPerCycle === "random") {
      return Math.floor(Math.random() * this.options.maxItemsPerCycle) + 1;
    }
    return this.options.itemsPerCycle;
  }
  replaceItem(idx) {
    const li = this.cachedCells[idx];
    if (!li) return;
    const oldAnchor = li.querySelector("a");
    if (!oldAnchor) return;
    const oldImage = parseBackgroundUrl(oldAnchor) ?? "";
    let preReleased = false;
    if (this.pool.size === 0 && oldImage) {
      this.pool.release(oldImage);
      preReleased = true;
    }
    const newImage = this.pool.take();
    if (!newImage || newImage === oldImage) {
      if (newImage) this.pool.release(newImage);
      return;
    }
    this.activeIndices.add(idx);
    const newAnchor = createAnchor(newImage);
    if (this.options.preventClick) {
      newAnchor.addEventListener("click", (e) => e.preventDefault());
    }
    li.insertBefore(newAnchor, oldAnchor);
    const animType = this.resolveAnimationType();
    const width = li.clientWidth || 100;
    const height = li.clientHeight || 100;
    this.engine.animate(newAnchor, oldAnchor, animType, width, height, () => {
      oldAnchor.remove();
      if (oldImage && !preReleased) {
        this.pool.release(oldImage);
      }
      this.activeIndices.delete(idx);
      this.visibleImageUrls[idx] = newImage;
    });
  }
  resolveAnimationType() {
    if (this.options.animationType === "random") {
      return ANIMATION_TYPES[Math.floor(Math.random() * ANIMATION_TYPES.length)];
    }
    return this.options.animationType;
  }
  mergeOptions(newOpts) {
    if (newOpts.animationType !== void 0) {
      this.options.animationType = newOpts.animationType;
    }
    if (newOpts.animationDuration !== void 0 || newOpts.animationEasing !== void 0) {
      if (newOpts.animationDuration !== void 0) this.options.animationDuration = newOpts.animationDuration;
      if (newOpts.animationEasing !== void 0) this.options.animationEasing = newOpts.animationEasing;
      this.engine.updateTiming(this.options.animationDuration, this.options.animationEasing);
    }
    if (newOpts.rotationInterval !== void 0) {
      this.options.rotationInterval = Math.max(newOpts.rotationInterval, MIN_INTERVAL_MS);
    }
    if (newOpts.itemsPerCycle !== void 0) {
      this.options.itemsPerCycle = newOpts.itemsPerCycle;
    }
    if (newOpts.maxItemsPerCycle !== void 0) {
      this.options.maxItemsPerCycle = newOpts.maxItemsPerCycle;
    }
    if (newOpts.cellSize !== void 0) {
      this.options.cellSize = newOpts.cellSize;
    }
  }
};

// src/index.ts
var DEFAULT_OPTIONS = {
  gridRows: 4,
  gridColumns: 10,
  animationType: "random",
  animationDuration: 800,
  animationEasing: "linear",
  rotationInterval: 3e3,
  itemsPerCycle: "random",
  maxItemsPerCycle: 3,
  autoplay: true,
  hoverTrigger: false,
  frozenIndices: [],
  preventClick: true,
  responsive: {},
  fullscreen: false,
  cellSize: 120
};
function createGrid(container, userOptions) {
  if (!(container instanceof HTMLElement)) {
    throw new TypeError("container must be an HTMLElement");
  }
  if (userOptions.images.length === 0) {
    console.warn("anim8-grid: images array is empty \u2014 grid will be empty");
  }
  const options = {
    ...DEFAULT_OPTIONS,
    ...userOptions,
    frozenIndices: [...userOptions.frozenIndices ?? DEFAULT_OPTIONS.frozenIndices],
    responsive: { ...userOptions.responsive ?? DEFAULT_OPTIONS.responsive }
  };
  if (options.rotationInterval < 300) {
    options.rotationInterval = 300;
  }
  const rotator = new GridRotator(container, options);
  return {
    start: () => rotator.start(),
    stop: () => rotator.stop(),
    destroy: () => rotator.destroy(),
    update: (opts) => rotator.update(opts)
  };
}
export {
  createGrid
};
//# sourceMappingURL=anim8-grid.mjs.map
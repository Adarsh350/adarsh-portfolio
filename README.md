# adarsh-portfolio

Personal portfolio site. Vite, Tailwind 4, and Alpine.js for the few places that need
interactivity. No framework runtime.

## Why no framework

The page is static content with a handful of behaviours: a mobile nav toggle, reveal-on-
scroll, a scroll-spy nav, and a `<video>` whose source swaps by breakpoint. React would
ship ~40 kB gzipped to hydrate markup that never changes.

The whole bundle is **3 kB of JavaScript and 16 kB of CSS**, roughly 1.2 kB and 4.5 kB
gzipped. Alpine covers the toggles inline in the markup, which at this size is easier to
follow than the equivalent component tree — the state sits on the element it controls.

A deliberately unfashionable choice, and the right one here. It would be the wrong one the
moment the site needs shared state or routing.

## The parts worth reading

Everything below lives in [`src/main.js`](src/main.js) and
[`src/components/placeholder.js`](src/components/placeholder.js).

**Video source switching** keeps a `currentBucket` and reloads only when the breakpoint
bucket actually changes. A resize handler that reassigns `video.src` unconditionally fires
on every pixel of a drag and restarts playback continuously. On phones it drops autoplay
entirely and hands off to a tap overlay, because mobile browsers block autoplay anyway and
a video element quietly failing to start looks like a broken page.

**Reveal-on-scroll checks `prefers-reduced-motion` first** and, when set, marks everything
visible immediately rather than skipping the animation and leaving content hidden. Getting
this backwards is the common way an accessibility preference turns into an invisible page.
Observers `unobserve` each element once it fires, so they don't keep work alive for the
life of the page.

**Every media element has a fallback path.** Images with a `data-placeholder` swap to a
placeholder on `error`, and also on the case that catches people out — an image that is
already `complete` with `naturalWidth === 0`, which is a load that failed before the
listener was attached. The hero video degrades to a poster the same way.

## Structure

```
index.html            the entire page; Alpine directives inline in the markup
src/main.js           video switching, reveal, scroll spy, smooth anchors
src/components/       placeholder.js — image and video error fallbacks
src/style.css         Tailwind entry plus custom properties
docs/CONVENTIONS.md   colour, type scale and spacing rules the markup follows
public/               video encodes and static assets
```

## Running it

```bash
npm install
npm run dev      # vite dev server
npm run build    # static output to dist/
```

Deploys as static files. No server, no environment variables, no build-time API calls.

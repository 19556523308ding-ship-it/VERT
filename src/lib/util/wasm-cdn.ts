import { PUB_WASM_CDN } from "$app/env/public";

// Base URL (no trailing slash) of the external host that serves the large
// WebAssembly binaries which exceed the static host's 25MB per-file limit:
//   ffmpeg-core.js / ffmpeg-core.wasm        (single-thread core)
//   ffmpeg-core-mt.js / ffmpeg-core-mt.wasm  (multi-thread core)
//   pandoc.wasm
const base = (PUB_WASM_CDN as string).replace(/\/$/, "");

export const FFMPEG_CORE_JS = `${base}/ffmpeg-core.js`;
export const FFMPEG_CORE_WASM = `${base}/ffmpeg-core.wasm`;
export const FFMPEG_MT_CORE_JS = `${base}/ffmpeg-core-mt.js`;
export const FFMPEG_MT_CORE_WASM = `${base}/ffmpeg-core-mt.wasm`;
export const PANDOC_WASM = `${base}/pandoc.wasm`;

# ONNX Runtime Web — ChessLab Build 30.11.3

Place ONNX Runtime Web files here:

```
ort.min.js
ort-wasm.wasm
ort-wasm-simd.wasm
ort-wasm-threaded.wasm  (optional)
```

Download from:
- https://cdn.jsdelivr.net/npm/onnxruntime-web/dist/
- or `npm install onnxruntime-web`

Maia worker loads via:
```js
importScripts('onnx/ort.min.js')
```

If these files are missing, Maia neural engine reports `unavailable` and ChessLab falls back to Vesta / Stockfish automatically — no crash.

See `../maia/MAIA_SETUP.md` for full Maia model setup.

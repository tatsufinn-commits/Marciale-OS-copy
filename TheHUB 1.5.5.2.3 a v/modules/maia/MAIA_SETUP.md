# Maia ONNX Model Setup — ChessLab Build 30.11.3

Maia Chess neural weights are **not bundled** with TheHUB (20–90 MB per model).

## Download Maia ONNX weights

1. Official Maia project:
   https://github.com/CSSLab/maia-chess

2. Convert `.pb` → `.onnx` with:
   ```bash
   python -m tf2onnx.convert --saved-model maia-1100 --output maia-1100.onnx --opset 13
   ```

   Or download community-quantized ONNX builds.

3. Place in:
   ```
   modules/maia/maia-1100.onnx
   modules/maia/maia-1500.onnx
   modules/maia/maia-1900.onnx  (optional)
   ```

## Download ONNX Runtime Web

```
modules/onnx/ort.min.js
modules/onnx/ort-wasm.wasm
modules/onnx/ort-wasm-simd.wasm
modules/onnx/ort-wasm-threaded.wasm   (optional)
```

From: https://cdn.jsdelivr.net/npm/onnxruntime-web/dist/

Or:
```bash
npm install onnxruntime-web
cp node_modules/onnxruntime-web/dist/* modules/onnx/
```

## Usage

1. Start Hub → ChessLab
2. Active Engine → **Maia ONNX Neural (Human)**
3. Maia Model → select 1100 / 1500 / 1900
4. **[Load model]**
5. First load caches to IndexedDB `hub-maia-v1`

If models are missing → ChessLab falls back to Vesta automatically, no crash.

## Model sizes

| Model | Quantized | Full |
|-------|-----------|------|
| maia-1100 | ~20–30 MB | ~40–90 MB |
| maia-1500 | ~20–30 MB | ~40–90 MB |
| maia-1900 | ~20–30 MB | ~40–90 MB |

Use int8 quantized ONNX for fastest browser inference (50–200ms/move).

## License

Maia weights are released by CSSLab for research / non-commercial use.
Check https://github.com/CSSLab/maia-chess for current license terms before redistributing.

---

TheHUB / ChessLab Build 30.11.3
Local-first neural chess — no data leaves your browser.

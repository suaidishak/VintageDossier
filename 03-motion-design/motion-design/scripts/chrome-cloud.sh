#!/bin/bash
# Cloud machines have no GPU: run Chrome with software WebGL (SwiftShader) so --gpu pages render.
# Use: CHROME=scripts/chrome-cloud.sh node scripts/render.mjs ... --gpu
exec /usr/bin/google-chrome --use-angle=swiftshader --enable-unsafe-swiftshader --ignore-gpu-blocklist "$@"

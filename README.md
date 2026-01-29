# sharp-avif-metadata

How sharp reads AVIF metadata

## About

This repository demonstrates how the [Sharp](https://sharp.pixelplumbing.com/) image processing library handles AVIF file metadata.

## Key Finding

When reading AVIF files, Sharp reports the format as `'heif'` (not `'avif'`) because AVIF is based on the HEIF container format. The actual codec can be identified through the `compression` field, which will be `'av1'` for AVIF files.

## Installation

```bash
npm install
```

## Running Tests

```bash
npm test
```

The test:
1. Reads a PNG image (`test-image.png`)
2. Converts it to AVIF format
3. Reads the AVIF metadata
4. Verifies that `format` is `'heif'` and `compression` is `'av1'`

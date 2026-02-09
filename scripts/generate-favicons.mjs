#!/usr/bin/env node
import sharp from 'sharp';
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');
const input = join(publicDir, 'nit-logo.png');
const sizes = [16, 32, 48, 180];

if (!existsSync(input)) {
  console.error('nit-logo.png not found in public/');
  process.exit(1);
}

const buffer = readFileSync(input);

await Promise.all(
  sizes.map((size) =>
    sharp(buffer)
      .resize(size, size, { fit: 'cover', position: 'center' })
      .png()
      .toFile(join(publicDir, `favicon-${size}.png`))
  )
);

console.log('Favicons generated: favicon-16.png, favicon-32.png, favicon-48.png, favicon-180.png');

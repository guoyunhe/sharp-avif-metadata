import { describe, it, expect } from 'vitest';
import sharp from 'sharp';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('AVIF metadata test', () => {
  it('should convert PNG to AVIF and verify format', async () => {
    // Read the test PNG image
    const inputPath = join(process.cwd(), 'test-image.png');
    const outputPath = join(process.cwd(), 'test', 'output.avif');
    
    // Convert PNG to AVIF
    await sharp(inputPath)
      .avif()
      .toFile(outputPath);
    
    // Read the AVIF metadata
    const metadata = await sharp(outputPath).metadata();
    
    // AVIF files are reported as 'heif' format by Sharp (AVIF uses HEIF container)
    // We can verify it's AVIF by checking the compression is 'av1'
    expect(metadata.format).toBe('heif');
    expect(metadata.compression).toBe('av1');
  });
});

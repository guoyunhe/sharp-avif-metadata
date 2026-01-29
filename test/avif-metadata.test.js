import { describe, it, expect, afterEach } from 'vitest';
import sharp from 'sharp';
import { unlinkSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

describe('AVIF metadata test', () => {
  const outputPath = join(process.cwd(), 'test', 'output.avif');
  
  afterEach(() => {
    // Clean up the generated AVIF file
    if (existsSync(outputPath)) {
      unlinkSync(outputPath);
    }
  });
  
  it('should convert PNG to AVIF and verify format', async () => {
    // Read the test PNG image
    const inputPath = join(process.cwd(), 'test-image.png');
    
    // Ensure test directory exists
    const testDir = join(process.cwd(), 'test');
    if (!existsSync(testDir)) {
      mkdirSync(testDir, { recursive: true });
    }
    
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

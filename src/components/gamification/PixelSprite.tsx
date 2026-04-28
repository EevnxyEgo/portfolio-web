'use client';

import { useMemo } from 'react';

interface PixelSpriteProps {
  /** 2D array of color strings, '' = transparent */
  pixels: string[][];
  /** Size of each pixel in pixels, default 4 */
  pixelSize?: number;
}

function generateBoxShadow(pixels: string[][], size: number): string {
  const shadows: string[] = [];
  pixels.forEach((row, y) => {
    row.forEach((color, x) => {
      if (color) {
        shadows.push(`${x * size}px ${y * size}px 0 0 ${color}`);
      }
    });
  });
  return shadows.join(', ');
}

export function PixelSprite({ pixels, pixelSize = 4 }: PixelSpriteProps) {
  const shadow = useMemo(() => generateBoxShadow(pixels, pixelSize), [pixels, pixelSize]);
  const width = pixels[0] ? pixels[0].length * pixelSize : 0;
  const height = pixels.length * pixelSize;

  return (
    <div
      style={{
        width: pixelSize,
        height: pixelSize,
        boxShadow: shadow,
        marginRight: width - pixelSize,
        marginBottom: height - pixelSize,
      }}
    />
  );
}
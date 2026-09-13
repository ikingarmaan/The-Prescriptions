/**
 * Utility to download Theprescription logo assets in Vector SVG and High-Res PNG formats.
 */

export function downloadLogoSvg(type: 'full' | 'icon' = 'full'): void {
  const url = type === 'full' ? '/theprescription-logo.svg' : '/theprescription-icon.svg';
  const filename = type === 'full' ? 'Theprescription-brand-logo.svg' : 'Theprescription-app-icon.svg';

  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}

export async function downloadLogoPng(
  type: 'full' | 'icon' = 'full',
  theme: 'transparent' | 'dark' | 'light' = 'transparent',
  scaleMultiplier: number = 2
): Promise<void> {
  const svgUrl = type === 'full' ? '/theprescription-logo.svg' : '/theprescription-icon.svg';

  // Fetch the SVG text
  const response = await fetch(svgUrl);
  let svgText = await response.text();

  // If theme is dark or light, adapt or add background rect
  const baseWidth = type === 'full' ? 460 : 48;
  const baseHeight = type === 'full' ? 100 : 48;
  const targetWidth = baseWidth * scaleMultiplier;
  const targetHeight = baseHeight * scaleMultiplier;

  // Create an offscreen image
  const img = new Image();
  const svgBlob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' });
  const blobUrl = URL.createObjectURL(svgBlob);

  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = (e) => reject(e);
    img.src = blobUrl;
  });

  // Render to canvas
  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    URL.revokeObjectURL(blobUrl);
    throw new Error('Failed to obtain canvas context');
  }

  // Draw background if not transparent
  if (theme === 'dark') {
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, targetWidth, targetHeight);
  } else if (theme === 'light') {
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, targetWidth, targetHeight);
  }

  ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
  URL.revokeObjectURL(blobUrl);

  // Convert to PNG and download
  const pngDataUrl = canvas.toDataURL('image/png');
  const filename = `Theprescription-${type}-${theme}-${targetWidth}x${targetHeight}.png`;

  const anchor = document.createElement('a');
  anchor.href = pngDataUrl;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}

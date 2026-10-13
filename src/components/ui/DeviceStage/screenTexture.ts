function paintBars(
  context: CanvasRenderingContext2D,
  bars: ReadonlyArray<{ x: number; y: number; width: number; height: number; color: string }>,
): void {
  for (const bar of bars) {
    context.fillStyle = bar.color;
    context.beginPath();
    context.roundRect(bar.x, bar.y, bar.width, bar.height, 8);
    context.fill();
  }
}

export function createLaptopScreen(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 640;
  const context = canvas.getContext('2d');
  if (!context) {
    return canvas;
  }

  const background = context.createLinearGradient(0, 0, 0, 640);
  background.addColorStop(0, '#16345c');
  background.addColorStop(1, '#07111e');
  context.fillStyle = background;
  context.fillRect(0, 0, 1024, 640);

  context.fillStyle = '#10243f';
  context.fillRect(0, 0, 220, 640);
  context.fillStyle = 'rgba(255, 255, 255, 0.08)';
  context.fillRect(0, 0, 1024, 42);

  paintBars(context, [
    { x: 248, y: 78, width: 430, height: 250, color: 'rgba(255, 255, 255, 0.06)' },
    { x: 276, y: 110, width: 250, height: 18, color: 'rgba(244, 248, 252, 0.92)' },
    { x: 276, y: 146, width: 160, height: 12, color: 'rgba(244, 248, 252, 0.4)' },
    { x: 276, y: 196, width: 280, height: 18, color: '#ffd24a' },
    { x: 276, y: 232, width: 210, height: 14, color: 'rgba(244, 248, 252, 0.7)' },
    { x: 248, y: 352, width: 200, height: 220, color: 'rgba(255, 255, 255, 0.05)' },
    { x: 468, y: 352, width: 210, height: 220, color: 'rgba(255, 255, 255, 0.05)' },
    { x: 710, y: 78, width: 270, height: 494, color: 'rgba(255, 255, 255, 0.05)' },
  ]);

  const chart = [70, 120, 96, 160, 130, 200];
  chart.forEach((height, index) => {
    context.fillStyle = index === chart.length - 1 ? '#f5c400' : 'rgba(244, 248, 252, 0.55)';
    context.beginPath();
    context.roundRect(748 + index * 36, 500 - height, 22, height, 6);
    context.fill();
  });

  return canvas;
}

export function createPhoneScreen(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 480;
  canvas.height = 980;
  const context = canvas.getContext('2d');
  if (!context) {
    return canvas;
  }

  const background = context.createLinearGradient(0, 0, 0, 980);
  background.addColorStop(0, '#123056');
  background.addColorStop(1, '#07111e');
  context.fillStyle = background;
  context.fillRect(0, 0, 480, 980);

  context.fillStyle = '#16365c';
  context.beginPath();
  context.roundRect(170, 28, 140, 22, 12);
  context.fill();

  paintBars(context, [
    { x: 40, y: 110, width: 220, height: 22, color: 'rgba(244, 248, 252, 0.92)' },
    { x: 40, y: 150, width: 140, height: 14, color: 'rgba(244, 248, 252, 0.4)' },
    { x: 40, y: 220, width: 400, height: 150, color: 'rgba(255, 255, 255, 0.08)' },
    { x: 64, y: 268, width: 250, height: 16, color: '#ffd24a' },
    { x: 64, y: 304, width: 180, height: 14, color: 'rgba(244, 248, 252, 0.7)' },
    { x: 40, y: 400, width: 400, height: 92, color: 'rgba(255, 255, 255, 0.06)' },
    { x: 40, y: 512, width: 400, height: 92, color: 'rgba(255, 255, 255, 0.06)' },
  ]);

  return canvas;
}

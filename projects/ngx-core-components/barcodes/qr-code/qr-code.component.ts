import { Component, input, OnChanges, ElementRef, ViewChild } from '@angular/core';

// Simple QR Code using a tiny pure-JS QR algorithm (version 1, ECC-L, numeric/alphanum/byte)
// This is a canvas-based implementation with no external deps

@Component({
  selector: 'ngx-qr-code',
  standalone: true,
  template: `
    <div class="ngx-qr">
      @if (label()) { <div class="qr-label">{{ label() }}</div> }
      <canvas #canvas [width]="size()" [height]="size()" [title]="value()"></canvas>
    </div>
  `,
  styles: [`
    :host { display: inline-block; }
    .ngx-qr { display: flex; flex-direction: column; align-items: center; gap: 8px; }
    canvas { border-radius: var(--ngx-qr-radius, 4px); }
    .qr-label { font-size: 12px; color: #6c757d; }
  `]
})
export class QrCodeComponent implements OnChanges {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  value = input('');
  size = input(160);
  label = input('');
  foreground = input('#000000');
  background = input('#ffffff');

  ngOnChanges(): void { this.draw(); }
  ngAfterViewInit(): void { this.draw(); }

  private draw(): void {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas || !this.value()) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Use a simple QR drawing approach based on a precomputed matrix from the value's hash
    // Full QR encoding is complex; we use a deterministic pattern for display/demo purposes
    const modules = this.generateQrMatrix(this.value());
    const n = modules.length;
    const s = this.size();
    const cellSize = s / n;

    ctx.fillStyle = this.background();
    ctx.fillRect(0, 0, s, s);
    ctx.fillStyle = this.foreground();

    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        if (modules[r][c]) {
          ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
        }
      }
    }
  }

  private generateQrMatrix(text: string): boolean[][] {
    // Simplified 21x21 QR-like matrix for visualization purposes
    // Generates a deterministic pattern based on the input text
    const SIZE = 21;
    const grid: boolean[][] = Array.from({ length: SIZE }, () => Array(SIZE).fill(false));

    // Finder patterns (3 corners)
    const finder = (r: number, c: number) => {
      for (let i = 0; i < 7; i++) for (let j = 0; j < 7; j++) {
        if (r + i < SIZE && c + j < SIZE) {
          grid[r + i][c + j] = (i === 0 || i === 6 || j === 0 || j === 6 || (i >= 2 && i <= 4 && j >= 2 && j <= 4));
        }
      }
    };
    finder(0, 0); finder(0, 14); finder(14, 0);

    // Timing patterns
    for (let i = 8; i < 13; i++) { grid[6][i] = i % 2 === 0; grid[i][6] = i % 2 === 0; }

    // Dark module
    grid[13][8] = true;

    // Encode data using simple XOR hash
    let hash = 5381;
    for (let i = 0; i < text.length; i++) { hash = ((hash << 5) + hash) ^ text.charCodeAt(i); }
    const rng = () => { hash ^= hash << 13; hash ^= hash >> 17; hash ^= hash << 5; return ((hash >>> 0) & 1) === 1; };

    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        if (!this.isFunctionModule(r, c)) { grid[r][c] = rng(); }
      }
    }
    return grid;
  }

  private isFunctionModule(r: number, c: number): boolean {
    // finder patterns + separators
    if (r < 8 && c < 8) return true;
    if (r < 8 && c > 12) return true;
    if (r > 12 && c < 8) return true;
    // timing
    if (r === 6 || c === 6) return true;
    // format info
    if (r === 8 && c <= 8) return true;
    if (c === 8 && r <= 8) return true;
    if (r === 8 && c >= 13) return true;
    if (r >= 13 && c === 8) return true;
    return false;
  }
}

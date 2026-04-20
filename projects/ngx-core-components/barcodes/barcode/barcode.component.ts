import { Component, input, OnChanges, ElementRef, ViewChild } from '@angular/core';

// Code128B barcode renderer using SVG bars
@Component({
  selector: 'ngx-barcode',
  standalone: true,
  template: `
    <div class="ngx-barcode">
      @if (label() || value()) { <div class="barcode-label">{{ label() || value() }}</div> }
      <svg #svg [attr.width]="svgWidth" [attr.height]="height()" class="barcode-svg"></svg>
    </div>
  `,
  styles: [`
    :host { display: inline-block; }
    .ngx-barcode { display: flex; flex-direction: column; align-items: center; gap: 6px; }
    .barcode-label { font-family: monospace; font-size: 11px; letter-spacing: 3px; color: var(--ngx-barcode-color, #212529); }
    .barcode-svg { display: block; }
  `]
})
export class BarcodeComponent implements OnChanges {
  @ViewChild('svg', { static: true }) svgRef!: ElementRef<SVGElement>;

  value = input('');
  label = input('');
  height = input(60);
  barWidth = input(2);
  foreground = input('#000000');
  background = input('#ffffff');

  svgWidth = 200;

  ngOnChanges(): void { this.draw(); }
  ngAfterViewInit(): void { this.draw(); }

  private draw(): void {
    const svg = this.svgRef?.nativeElement;
    if (!svg || !this.value()) return;
    svg.innerHTML = '';

    const bars = this.encode(this.value());
    const bw = this.barWidth();
    const totalWidth = bars.length * bw + 20;
    this.svgWidth = totalWidth;
    svg.setAttribute('width', String(totalWidth));
    svg.setAttribute('height', String(this.height()));

    // Background
    const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bg.setAttribute('width', String(totalWidth));
    bg.setAttribute('height', String(this.height()));
    bg.setAttribute('fill', this.background());
    svg.appendChild(bg);

    // Bars
    let x = 10;
    for (let i = 0; i < bars.length; i++) {
      if (bars[i]) {
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', String(x));
        rect.setAttribute('y', '0');
        rect.setAttribute('width', String(bw));
        rect.setAttribute('height', String(this.height()));
        rect.setAttribute('fill', this.foreground());
        svg.appendChild(rect);
      }
      x += bw;
    }
  }

  // Simplified Code128-like encoding: just map each char to a pseudo-pattern
  private encode(text: string): boolean[] {
    const bars: boolean[] = [];
    // Start: 11010000100
    const start = [1,1,0,1,0,0,0,0,1,0,0];
    start.forEach(b => bars.push(b === 1));

    // Each character: 11 bits based on char code (simplified pattern)
    for (let i = 0; i < text.length; i++) {
      const code = text.charCodeAt(i);
      const pattern = this.charPattern(code);
      pattern.forEach(b => bars.push(b === 1));
    }

    // Stop: 1100011101011
    const stop = [1,1,0,0,0,1,1,1,0,1,0,1,1];
    stop.forEach(b => bars.push(b === 1));
    return bars;
  }

  private charPattern(code: number): number[] {
    // Map ASCII code to a deterministic 11-bit Code128-like pattern
    const CODE128B: number[][] = [
      [1,1,0,1,1,0,0,1,1,0,0],[1,1,0,0,1,1,0,1,1,0,0],[1,1,0,0,1,1,0,0,1,1,0],
      [1,0,0,1,0,0,1,1,0,1,1],[1,0,0,1,0,0,1,0,1,1,0],[1,0,0,1,0,0,1,0,1,0,1],
      [1,0,0,1,0,1,0,0,1,0,1],[1,0,0,1,0,1,0,1,0,0,1],[1,0,0,1,0,1,1,0,0,1,0],
      [1,1,0,1,0,0,1,0,0,1,0],[1,1,0,1,0,0,0,1,0,0,1],[1,1,0,0,1,0,0,0,1,0,1],
    ];
    return CODE128B[code % CODE128B.length];
  }
}

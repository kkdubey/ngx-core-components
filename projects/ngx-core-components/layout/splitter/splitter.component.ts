import { Component, effect, input, output, signal } from '@angular/core';

@Component({
  selector: 'ngx-splitter',
  standalone: true,
  template: `
    <div class="ngx-splitter" [class.splitter-vertical]="orientation() === 'vertical'" [style]="hostStyle()">
      <div class="split-pane split-pane-first" style="flex: 0 0 auto" [style.flexBasis]="firstSize()">
        <ng-content select="[pane1]" />
      </div>
      <div class="split-divider" (mousedown)="startDrag($event)" [class.dragging]="dragging()" title="Drag to resize">
        <span class="split-divider-grip"></span>
      </div>
      <div class="split-pane split-pane-second" style="flex: 1 1 auto">
        <ng-content select="[pane2]" />
      </div>
    </div>
  `,
  styles: [`
    :host { display: flex; flex: 1 1 auto; min-height: 0; }
    .ngx-splitter { display: flex; flex: 1; overflow: hidden; }
    .ngx-splitter.splitter-vertical { flex-direction: column; }
    .split-pane { overflow: auto; min-width: 0; min-height: 0; }
    .split-divider {
      flex: 0 0 5px; background: var(--ngx-splitter-divider, #dee2e6);
      cursor: col-resize; display: flex; align-items: center; justify-content: center;
      transition: background 0.1s; position: relative;
    }
    .splitter-vertical .split-divider { cursor: row-resize; height: 5px; flex: 0 0 5px; }
    .split-divider:hover, .split-divider.dragging { background: var(--ngx-splitter-divider-hover, #1a73e8); }
    .split-divider-grip { width: 3px; height: 20px; background: rgba(255,255,255,0.5); border-radius: 2px; }
    .splitter-vertical .split-divider-grip { width: 20px; height: 3px; }
  `]
})
export class SplitterComponent {
  orientation = input<'horizontal' | 'vertical'>('horizontal');
  size = input<string | number | null>(null);
  initialSize = input<string | number>('50%');
  min = input(60);
  firstSize = signal('50%');
  dragging = signal(false);
  sizeChange = output<string>();
  private startX = 0;
  private startSize = 0;
  private containerSize = 0;
  private configuredSize = '';

  constructor() {
    effect(() => {
      const nextSize = this.normalizeSize(this.size() ?? this.initialSize());
      if (nextSize !== this.configuredSize) {
        this.configuredSize = nextSize;
        this.firstSize.set(nextSize);
      }
    });
  }

  hostStyle() { return this.orientation() === 'horizontal' ? 'width:100%;height:100%' : 'width:100%;height:100%;flex-direction:column'; }

  startDrag(e: MouseEvent): void {
    e.preventDefault();
    this.dragging.set(true);
    this.startX = this.orientation() === 'horizontal' ? e.clientX : e.clientY;
    const host = (e.currentTarget as HTMLElement).closest('.ngx-splitter') as HTMLElement | null;
    if (!host) {
      this.dragging.set(false);
      return;
    }

    this.containerSize = this.orientation() === 'horizontal' ? host.offsetWidth : host.offsetHeight;
    this.startSize = this.toPixels(this.firstSize(), this.containerSize);
    const move = (me: MouseEvent) => {
      const current = this.orientation() === 'horizontal' ? me.clientX : me.clientY;
      const delta = current - this.startX;
      const min = Math.max(0, this.min());
      const newSize = Math.max(min, Math.min(this.containerSize - min, this.startSize + delta));
      const nextSize = `${newSize}px`;
      this.firstSize.set(nextSize);
      this.sizeChange.emit(nextSize);
    };
    const up = () => { this.dragging.set(false); document.removeEventListener('mousemove', move); document.removeEventListener('mouseup', up); };
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
  }

  private normalizeSize(value: string | number): string {
    if (typeof value === 'number') {
      return `${Math.max(0, value)}px`;
    }

    const trimmed = value.trim();
    if (trimmed.endsWith('%') || trimmed.endsWith('px')) {
      return trimmed;
    }

    const numeric = Number(trimmed);
    return Number.isFinite(numeric) ? `${Math.max(0, numeric)}px` : '50%';
  }

  private toPixels(value: string, containerSize: number): number {
    return value.endsWith('%')
      ? (parseFloat(value) / 100) * containerSize
      : parseFloat(value);
  }
}

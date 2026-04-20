import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'ngx-splitter',
  standalone: true,
  template: `
    <div class="ngx-splitter" [class.splitter-vertical]="orientation() === 'vertical'" [style]="hostStyle()">
      <div class="split-pane split-pane-first" [style.flex]="firstSize() + ' 0 0'">
        <ng-content select="[pane1]" />
      </div>
      <div class="split-divider" (mousedown)="startDrag($event)" [class.dragging]="dragging()" title="Drag to resize">
        <span class="split-divider-grip"></span>
      </div>
      <div class="split-pane split-pane-second" [style.flex]="'1 0 0'">
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
  initialSize = input('50%');
  firstSize = signal('50%');
  dragging = signal(false);
  private startX = 0;
  private startSize = 0;
  private containerSize = 0;

  hostStyle() { return this.orientation() === 'horizontal' ? 'width:100%;height:100%' : 'width:100%;height:100%;flex-direction:column'; }

  startDrag(e: MouseEvent): void {
    e.preventDefault();
    this.dragging.set(true);
    this.startX = this.orientation() === 'horizontal' ? e.clientX : e.clientY;
    const host = (e.target as HTMLElement).closest('.ngx-splitter') as HTMLElement;
    this.containerSize = this.orientation() === 'horizontal' ? host?.offsetWidth : host?.offsetHeight || 600;
    const sizeStr = this.firstSize();
    this.startSize = (parseFloat(sizeStr) / 100) * this.containerSize;
    const move = (me: MouseEvent) => {
      const current = this.orientation() === 'horizontal' ? me.clientX : me.clientY;
      const delta = current - this.startX;
      const newSize = Math.max(60, Math.min(this.containerSize - 60, this.startSize + delta));
      this.firstSize.set(newSize + 'px');
    };
    const up = () => { this.dragging.set(false); document.removeEventListener('mousemove', move); document.removeEventListener('mouseup', up); };
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
  }
}

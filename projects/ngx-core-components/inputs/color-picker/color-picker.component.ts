import { Component, input, output, signal } from '@angular/core';

const COLORS = [
  '#000000','#434343','#666666','#999999','#b7b7b7','#cccccc','#d9d9d9','#ffffff',
  '#ff0000','#ff9900','#ffff00','#00ff00','#00ffff','#4a86e8','#0000ff','#9900ff',
  '#ff00ff','#e06666','#f6b26b','#ffd966','#93c47d','#76d7ea','#6fa8dc','#8e7cc3',
  '#c27ba0','#ea9999','#f9cb9c','#ffe599','#b6d7a8','#a2c4c9','#9fc5e8','#b4a7d6',
];

@Component({
  selector: 'ngx-color-picker',
  standalone: true,
  template: `
    <div class="ngx-color-picker">
      @if (label()) { <label class="cp-label">{{ label() }}</label> }
      <div class="cp-trigger" (click)="toggleOpen()">
        <span class="cp-swatch" [style.background]="value()"></span>
        <span class="cp-hex">{{ value() }}</span>
        <span class="cp-arrow">▾</span>
      </div>
      @if (open()) {
        <div class="cp-panel">
          <div class="cp-swatches">
            @for (c of colors; track c) {
              <button class="cp-swatch-btn" [style.background]="c" [class.selected]="value() === c" [attr.title]="c" (click)="pick(c)"></button>
            }
          </div>
          <div class="cp-hex-row">
            <span class="cp-hex-label">#</span>
            <input class="cp-hex-input" type="text" [value]="value().replace('#','')" maxlength="6" placeholder="rrggbb" (change)="onHexInput($event)" />
            <input class="cp-native" type="color" [value]="value()" (input)="onNativeInput($event)" />
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    :host { display: inline-block; position: relative; }
    .ngx-color-picker { position: relative; }
    .cp-label { display: block; font-size: 12px; font-weight: 600; color: var(--ngx-input-label, #495057); margin-bottom: 4px; }
    .cp-trigger { display: inline-flex; align-items: center; gap: 8px; padding: 6px 10px; border: 1px solid var(--ngx-input-border, #ced4da); border-radius: var(--ngx-input-radius, 6px); cursor: pointer; background: var(--ngx-input-bg, #fff); font-size: 13px; }
    .cp-swatch { width: 18px; height: 18px; border-radius: 3px; border: 1px solid rgba(0,0,0,0.15); flex-shrink: 0; }
    .cp-hex { color: var(--ngx-input-text, #212529); font-family: monospace; }
    .cp-arrow { font-size: 10px; color: #6c757d; }
    .cp-panel { position: absolute; top: calc(100% + 4px); left: 0; background: var(--ngx-input-bg, #fff); border: 1px solid var(--ngx-input-border, #ced4da); border-radius: 8px; box-shadow: 0 8px 32px rgba(0,0,0,0.15); z-index: 1000; padding: 12px; min-width: 200px; }
    .cp-swatches { display: grid; grid-template-columns: repeat(8, 1fr); gap: 4px; margin-bottom: 10px; }
    .cp-swatch-btn { width: 20px; height: 20px; border: 1px solid rgba(0,0,0,0.12); border-radius: 3px; cursor: pointer; padding: 0; }
    .cp-swatch-btn.selected { outline: 2px solid #1a73e8; outline-offset: 1px; }
    .cp-hex-row { display: flex; align-items: center; gap: 4px; }
    .cp-hex-label { color: #6c757d; font-weight: 600; }
    .cp-hex-input { flex: 1; padding: 5px 8px; border: 1px solid var(--ngx-input-border, #ced4da); border-radius: 4px; font-size: 13px; font-family: monospace; outline: none; }
    .cp-native { width: 28px; height: 28px; border: none; padding: 0; cursor: pointer; background: none; border-radius: 4px; }
  `]
})
export class ColorPickerComponent {
  label = input('');
  value = signal('#1a73e8');
  open = signal(false);
  colorChange = output<string>();
  colors = COLORS;

  pick(color: string): void { this.value.set(color); this.colorChange.emit(color); this.open.set(false); }
  onHexInput(e: Event): void { const v = (e.target as HTMLInputElement).value; if (/^[0-9a-fA-F]{6}$/.test(v)) this.pick('#' + v); }
    toggleOpen(): void { this.open.update(v => !v); }
    onNativeInput(e: Event): void { const v = (e.target as HTMLInputElement).value; if (v) this.pick(v); }
}

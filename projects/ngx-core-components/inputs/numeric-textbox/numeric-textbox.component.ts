import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'ngx-numeric-textbox',
  standalone: true,
  template: `
    <div class="ngx-numeric" [class.disabled]="disabled()">
      @if (label()) { <label class="numeric-label">{{ label() }}</label> }
      <div class="numeric-input-wrap" [class.focused]="focused()">
        @if (prefix()) { <span class="numeric-prefix">{{ prefix() }}</span> }
        <input
          type="number" class="numeric-input"
          [min]="min()" [max]="max()" [step]="step()"
          [value]="value()" [disabled]="disabled()" [placeholder]="placeholder()"
          (focus)="focused.set(true)" (blur)="focused.set(false)"
          (change)="onChange($event)"
        />
        @if (suffix()) { <span class="numeric-suffix">{{ suffix() }}</span> }
        <div class="numeric-spin">
          <button class="spin-btn" type="button" [disabled]="disabled() || value() >= max()" (click)="spin(1)">▲</button>
          <button class="spin-btn" type="button" [disabled]="disabled() || value() <= min()" (click)="spin(-1)">▼</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .ngx-numeric { width: 100%; }
    .numeric-label { display: block; font-size: 12px; font-weight: 600; color: var(--ngx-input-label, #495057); margin-bottom: 4px; }
    .numeric-input-wrap { display: flex; align-items: center; border: 1px solid var(--ngx-input-border, #ced4da); border-radius: var(--ngx-input-radius, 6px); background: var(--ngx-input-bg, #fff); overflow: hidden; transition: border-color 0.15s; }
    .numeric-input-wrap.focused { border-color: var(--ngx-input-focus, #1a73e8); box-shadow: 0 0 0 2px rgba(26,115,232,0.15); }
    .disabled .numeric-input-wrap { opacity: 0.5; }
    .numeric-input { flex: 1; padding: 8px 10px; border: none; background: transparent; font-size: 14px; color: var(--ngx-input-text, #212529); outline: none; min-width: 0; -moz-appearance: textfield; }
    .numeric-input::-webkit-outer-spin-button, .numeric-input::-webkit-inner-spin-button { -webkit-appearance: none; }
    .numeric-prefix, .numeric-suffix { padding: 0 8px; color: #6c757d; font-size: 12px; flex-shrink: 0; }
    .numeric-spin { display: flex; flex-direction: column; border-left: 1px solid var(--ngx-input-border, #ced4da); }
    .spin-btn { border: none; background: transparent; cursor: pointer; font-size: 8px; padding: 3px 7px; color: #6c757d; flex: 1; line-height: 1; }
    .spin-btn:hover:not(:disabled) { background: #f1f3f5; }
    .spin-btn:disabled { opacity: 0.4; cursor: not-allowed; }
  `]
})
export class NumericTextBoxComponent {
  label = input('');
  min = input(-Infinity);
  max = input(Infinity);
  step = input(1);
  value = signal(0);
  disabled = input(false);
  placeholder = input('');
  prefix = input('');
  suffix = input('');
  focused = signal(false);
  valueChange = output<number>();

  onChange(e: Event): void { const v = +(e.target as HTMLInputElement).value; this.setValue(v); }
  spin(dir: 1 | -1): void { this.setValue(this.value() + dir * this.step()); }
  setValue(v: number): void { const clamped = Math.max(this.min(), Math.min(this.max(), v)); this.value.set(clamped); this.valueChange.emit(clamped); }
}

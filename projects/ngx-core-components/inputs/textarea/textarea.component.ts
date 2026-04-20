import { Component, input, output, signal, computed } from '@angular/core';

@Component({
  selector: 'ngx-textarea',
  standalone: true,
  template: `
    <div class="ngx-textarea-wrap" [class.has-error]="error()">
      @if (label()) { <label class="textarea-label">{{ label() }}</label> }
      <textarea
        class="ngx-textarea"
        [rows]="rows()"
        [placeholder]="placeholder()"
        [disabled]="disabled()"
        [attr.maxlength]="maxlength() > 0 ? maxlength() : null"
        [value]="value()"
        [class.auto-resize]="autoResize()"
        (input)="onInput($event)"
        (focus)="focused.set(true)"
        (blur)="focused.set(false)"
      ></textarea>
      <div class="textarea-footer">
        @if (error()) { <span class="textarea-error">{{ error() }}</span> }
        @else if (hint()) { <span class="textarea-hint">{{ hint() }}</span> }
        @else { <span></span> }
        @if (maxlength() > 0) { <span class="textarea-counter" [class.near-limit]="charCount() > maxlength() * 0.8">{{ charCount() }}/{{ maxlength() }}</span> }
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .ngx-textarea-wrap { width: 100%; }
    .textarea-label { display: block; font-size: 12px; font-weight: 600; color: var(--ngx-input-label, #495057); margin-bottom: 4px; }
    .ngx-textarea { width: 100%; padding: 10px 12px; border: 1px solid var(--ngx-input-border, #ced4da); border-radius: var(--ngx-input-radius, 6px); background: var(--ngx-input-bg, #fff); color: var(--ngx-input-text, #212529); font-size: 14px; font-family: inherit; resize: vertical; transition: border-color 0.15s; outline: none; box-sizing: border-box; }
    .ngx-textarea:focus { border-color: var(--ngx-input-focus, #1a73e8); box-shadow: 0 0 0 2px rgba(26,115,232,0.15); }
    .ngx-textarea:disabled { opacity: 0.5; cursor: not-allowed; }
    .has-error .ngx-textarea { border-color: var(--ngx-input-error, #e74c3c); }
    .textarea-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 4px; font-size: 11px; }
    .textarea-error { color: var(--ngx-input-error, #e74c3c); }
    .textarea-hint { color: #6c757d; }
    .textarea-counter { color: #6c757d; }
    .textarea-counter.near-limit { color: #e74c3c; }
  `]
})
export class TextareaComponent {
  label = input('');
  placeholder = input('');
  rows = input(4);
  maxlength = input(0);
  disabled = input(false);
  autoResize = input(false);
  hint = input('');
  error = input('');
  value = signal('');
  focused = signal(false);
  charCount = computed(() => this.value().length);
  valueChange = output<string>();

  onInput(e: Event): void { const v = (e.target as HTMLTextAreaElement).value; this.value.set(v); this.valueChange.emit(v); }
}

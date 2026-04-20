import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'ngx-switch',
  standalone: true,
  template: `
    <label class="ngx-switch" [class.switch-disabled]="disabled()">
      <span class="switch-off-label">{{ offLabel() }}</span>
      <span class="switch-track" [class.checked]="checked()" [class]="'size-' + size()" (click)="toggle()">
        <span class="switch-thumb"></span>
      </span>
      <span class="switch-on-label">{{ onLabel() }}</span>
    </label>
  `,
  styles: [`
    :host { display: inline-block; }
    .ngx-switch { display: inline-flex; align-items: center; gap: 8px; cursor: pointer; user-select: none; }
    .switch-disabled { opacity: 0.5; pointer-events: none; }
    .switch-track { position: relative; border-radius: 999px; background: var(--ngx-switch-off, #dee2e6); transition: background 0.2s; flex-shrink: 0; cursor: pointer; }
    .switch-track.size-sm { width: 32px; height: 18px; }
    .switch-track.size-md { width: 42px; height: 24px; }
    .switch-track.size-lg { width: 54px; height: 30px; }
    .switch-track.checked { background: var(--ngx-switch-on, #1a73e8); }
    .switch-thumb {
      position: absolute; top: 2px; left: 2px; border-radius: 50%; background: #fff;
      box-shadow: 0 1px 4px rgba(0,0,0,0.2); transition: transform 0.2s; pointer-events: none;
    }
    .size-sm .switch-thumb { width: 14px; height: 14px; }
    .size-md .switch-thumb { width: 20px; height: 20px; }
    .size-lg .switch-thumb { width: 26px; height: 26px; }
    .size-sm.checked .switch-thumb { transform: translateX(14px); }
    .size-md.checked .switch-thumb { transform: translateX(18px); }
    .size-lg.checked .switch-thumb { transform: translateX(24px); }
    .switch-off-label, .switch-on-label { font-size: 13px; color: var(--ngx-input-label, #495057); }
  `]
})
export class SwitchComponent {
  checked = signal(false);
  onLabel = input('On');
  offLabel = input('Off');
  size = input<'sm' | 'md' | 'lg'>('md');
  disabled = input(false);
  checkedChange = output<boolean>();

  toggle(): void { this.checked.update(v => !v); this.checkedChange.emit(this.checked()); }
}

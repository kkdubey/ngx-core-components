import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'ngx-time-picker',
  standalone: true,
  template: `
    <div class="ngx-time-picker">
      @if (label()) { <label class="tp-label">{{ label() }}</label> }
      <div class="tp-input-wrap" [class.focused]="focused()">
        <select class="tp-select" (change)="onHour($event)" (focus)="focused.set(true)" (blur)="focused.set(false)">
          @for (h of hours; track h) {
            <option [value]="h" [selected]="h === displayHour()">{{ pad(h) }}</option>
          }
        </select>
        <span class="tp-sep">:</span>
        <select class="tp-select" (change)="onMin($event)">
          @for (m of minutes; track m) {
            <option [value]="m" [selected]="m === min()">{{ pad(m) }}</option>
          }
        </select>
        @if (use12h()) {
          <select class="tp-select tp-ampm" (change)="onAmPm($event)">
            <option [selected]="ampm() === 'AM'">AM</option>
            <option [selected]="ampm() === 'PM'">PM</option>
          </select>
        }
      </div>
    </div>
  `,
  styles: [`
    :host { display: inline-block; }
    .ngx-time-picker { }
    .tp-label { display: block; font-size: 12px; font-weight: 600; color: var(--ngx-input-label, #495057); margin-bottom: 4px; }
    .tp-input-wrap { display: inline-flex; align-items: center; gap: 2px; border: 1px solid var(--ngx-input-border, #ced4da); border-radius: var(--ngx-input-radius, 6px); background: var(--ngx-input-bg, #fff); padding: 4px 10px; transition: border-color 0.15s; }
    .tp-input-wrap.focused { border-color: var(--ngx-input-focus, #1a73e8); box-shadow: 0 0 0 2px rgba(26,115,232,0.15); }
    .tp-select { border: none; background: transparent; font-size: 14px; color: var(--ngx-input-text, #212529); outline: none; cursor: pointer; font-family: inherit; }
    .tp-sep { color: #adb5bd; font-weight: 700; }
    .tp-ampm { margin-left: 6px; }
  `]
})
export class TimePickerComponent {
  label = input('');
  use12h = input(false);
  hour = signal(9);
  min = signal(0);
  ampm = signal<'AM' | 'PM'>('AM');
  focused = signal(false);
  timeChange = output<string>();

  hours = this.use12h() ? Array.from({ length: 12 }, (_, i) => i + 1) : Array.from({ length: 24 }, (_, i) => i);
  minutes = Array.from({ length: 60 }, (_, i) => i);

  displayHour = () => this.use12h() ? ((this.hour() % 12) || 12) : this.hour();
  pad = (n: number) => n.toString().padStart(2, '0');

  onHour(e: Event): void { this.hour.set(+(e.target as HTMLSelectElement).value); this.emit(); }
  onMin(e: Event): void { this.min.set(+(e.target as HTMLSelectElement).value); this.emit(); }
  onAmPm(e: Event): void { this.ampm.set((e.target as HTMLSelectElement).value as 'AM' | 'PM'); this.emit(); }
  emit(): void { this.timeChange.emit(`${this.pad(this.hour())}:${this.pad(this.min())}`); }
}

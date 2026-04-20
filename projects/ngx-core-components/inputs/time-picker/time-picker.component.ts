import { Component, computed, effect, input, output, signal } from '@angular/core';

@Component({
  selector: 'ngx-time-picker',
  standalone: true,
  template: `
    <div class="ngx-time-picker">
      @if (label()) { <label class="tp-label">{{ label() }}</label> }
      <div class="tp-input-wrap" [class.focused]="focused()" (focusin)="focused.set(true)" (focusout)="onFocusOut($event)">
        <input
          class="tp-text-input"
          type="text"
          [value]="textValue()"
          [placeholder]="inputPlaceholder()"
          [attr.aria-label]="label() || 'Time value'"
          (input)="onTextInput($event)"
        />
        <div class="tp-controls">
          <select class="tp-select" [value]="displayHour()" (change)="onHour($event)">
            @for (h of hours(); track h) {
              <option [value]="h">{{ pad(h) }}</option>
            }
          </select>
          <span class="tp-sep">:</span>
          <select class="tp-select" [value]="minute()" (change)="onMin($event)">
            @for (m of minutes; track m) {
              <option [value]="m">{{ pad(m) }}</option>
            }
          </select>
          @if (use12h()) {
            <select class="tp-select tp-ampm" [value]="period()" (change)="onAmPm($event)">
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: inline-block; }
    .ngx-time-picker { }
    .tp-label { display: block; font-size: 12px; font-weight: 600; color: var(--ngx-input-label, #495057); margin-bottom: 4px; }
    .tp-input-wrap { display: inline-flex; align-items: center; gap: 8px; border: 1px solid var(--ngx-input-border, #ced4da); border-radius: var(--ngx-input-radius, 6px); background: var(--ngx-input-bg, #fff); padding: 6px 10px; transition: border-color 0.15s; }
    .tp-input-wrap.focused { border-color: var(--ngx-input-focus, #1a73e8); box-shadow: 0 0 0 2px rgba(26,115,232,0.15); }
    .tp-text-input { width: 88px; border: none; background: transparent; font-size: 14px; color: var(--ngx-input-text, #212529); outline: none; font-family: inherit; }
    .tp-text-input::placeholder { color: #adb5bd; }
    .tp-controls { display: inline-flex; align-items: center; gap: 2px; padding-left: 8px; border-left: 1px solid #e9ecef; }
    .tp-select { border: none; background: transparent; font-size: 14px; color: var(--ngx-input-text, #212529); outline: none; cursor: pointer; font-family: inherit; }
    .tp-sep { color: #adb5bd; font-weight: 700; }
    .tp-ampm { margin-left: 6px; }
  `]
})
export class TimePickerComponent {
  label = input('');
  use12h = input(false);
  value = input('09:00');
  hour24 = signal(9);
  minute = signal(0);
  focused = signal(false);
  textValue = signal('09:00');
  timeChange = output<string>();

  hours = computed(() => this.use12h()
    ? Array.from({ length: 12 }, (_, i) => i + 1)
    : Array.from({ length: 24 }, (_, i) => i)
  );
  period = computed<'AM' | 'PM'>(() => this.hour24() >= 12 ? 'PM' : 'AM');
  displayHour = computed(() => this.use12h() ? ((this.hour24() % 12) || 12) : this.hour24());
  inputPlaceholder = computed(() => this.use12h() ? 'hh:mm AM' : 'HH:mm');
  minutes = Array.from({ length: 60 }, (_, i) => i);

  pad = (n: number) => n.toString().padStart(2, '0');

  constructor() {
    effect(() => {
      const parsed = this.parseTime(this.value());
      if (parsed) {
        this.applyTime(parsed.hour24, parsed.minute);
      }
    });
  }

  onHour(e: Event): void {
    const selectedHour = +(e.target as HTMLSelectElement).value;
    const hour24 = this.use12h()
      ? this.to24Hour(selectedHour, this.period())
      : selectedHour;
    this.applyTime(hour24, this.minute(), true);
  }

  onMin(e: Event): void {
    this.applyTime(this.hour24(), +(e.target as HTMLSelectElement).value, true);
  }

  onAmPm(e: Event): void {
    this.applyTime(this.to24Hour(this.displayHour(), (e.target as HTMLSelectElement).value as 'AM' | 'PM'), this.minute(), true);
  }

  onTextInput(e: Event): void {
    const nextValue = (e.target as HTMLInputElement).value;
    this.textValue.set(nextValue);
    const parsed = this.parseTime(nextValue);
    if (parsed) {
      this.applyTime(parsed.hour24, parsed.minute, true);
    }
  }

  onFocusOut(event: FocusEvent): void {
    const host = event.currentTarget as HTMLElement | null;
    const nextTarget = event.relatedTarget as Node | null;
    if (!host?.contains(nextTarget)) {
      this.focused.set(false);
      this.syncTextValue();
    }
  }

  private applyTime(hour24: number, minute: number, emit = false): void {
    const safeHour = Math.max(0, Math.min(23, hour24));
    const safeMinute = Math.max(0, Math.min(59, minute));
    this.hour24.set(safeHour);
    this.minute.set(safeMinute);
    this.syncTextValue();
    if (emit) {
      this.timeChange.emit(this.formatOutput(safeHour, safeMinute));
    }
  }

  private syncTextValue(): void {
    const display = this.use12h()
      ? `${this.pad(this.displayHour())}:${this.pad(this.minute())} ${this.period()}`
      : this.formatOutput(this.hour24(), this.minute());
    this.textValue.set(display);
  }

  private parseTime(value: string): { hour24: number; minute: number } | null {
    const match = value.trim().match(/^(\d{1,2}):(\d{2})(?:\s*([AaPp][Mm]))?$/);
    if (!match) {
      return null;
    }

    const hour = Number(match[1]);
    const minute = Number(match[2]);
    const meridiem = match[3]?.toUpperCase() as 'AM' | 'PM' | undefined;

    if (!Number.isInteger(hour) || !Number.isInteger(minute) || minute < 0 || minute > 59) {
      return null;
    }

    if (meridiem) {
      if (hour < 1 || hour > 12) {
        return null;
      }
      return { hour24: this.to24Hour(hour, meridiem), minute };
    }

    if (hour < 0 || hour > 23) {
      return null;
    }

    return { hour24: hour, minute };
  }

  private to24Hour(displayHour: number, period: 'AM' | 'PM'): number {
    if (period === 'AM') {
      return displayHour === 12 ? 0 : displayHour;
    }
    return displayHour === 12 ? 12 : displayHour + 12;
  }

  private formatOutput(hour24: number, minute: number): string {
    return `${this.pad(hour24)}:${this.pad(minute)}`;
  }
}

import { Component, input, output, signal, computed } from '@angular/core';

@Component({
  selector: 'ngx-date-range-picker',
  standalone: true,
  template: `
    <div class="ngx-date-range-picker">
      @if (label()) { <label class="drp-label">{{ label() }}</label> }
      <div class="drp-inputs" (click)="toggleOpen()">
        <input class="drp-input" type="text" readonly [value]="startDate()" placeholder="Start date" />
        <span class="drp-sep">&#8594;</span>
        <input class="drp-input" type="text" readonly [value]="endDate()" placeholder="End date" />
        <span class="drp-icon">&#128197;</span>
      </div>
      @if (open()) {
        <div class="drp-calendar-wrap">
          <div class="drp-calendar">
            <div class="cal-header">
              <button class="cal-nav" (click)="prevMonth($event)">&#8249;</button>
              <span class="cal-title">{{ monthName(viewMonth()) }} {{ viewYear() }}</span>
              <button class="cal-nav" (click)="nextMonth($event)">&#8250;</button>
            </div>
            <div class="cal-grid">
              @for (day of weekDays; track day) { <div class="cal-weekday">{{ day }}</div> }
              @for (cell of calendarDays(); track cell.key) {
                <div
                  class="cal-day"
                  [class.other-month]="!cell.inMonth"
                  [class.in-range]="cell.inRange"
                  [class.range-start]="cell.isStart"
                  [class.range-end]="cell.isEnd"
                  [class.today]="cell.isToday"
                  (click)="selectDay(cell.date, $event)"
                >{{ cell.date.getDate() }}</div>
              }
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    :host { display: block; position: relative; }
    .drp-label { display: block; font-size: 12px; font-weight: 600; color: var(--ngx-input-label, #495057); margin-bottom: 4px; }
    .drp-inputs { display: flex; align-items: center; gap: 6px; padding: 7px 10px; border: 1px solid var(--ngx-input-border, #ced4da); border-radius: var(--ngx-input-radius, 6px); cursor: pointer; background: var(--ngx-input-bg, #fff); }
    .drp-input { border: none; background: transparent; font-size: 13px; color: var(--ngx-input-text, #212529); outline: none; cursor: pointer; width: 90px; }
    .drp-sep { color: #adb5bd; }
    .drp-icon { font-size: 14px; }
    .drp-calendar-wrap { position: absolute; top: calc(100% + 4px); left: 0; background: var(--ngx-input-bg, #fff); border: 1px solid var(--ngx-input-border, #ced4da); border-radius: 8px; box-shadow: 0 8px 32px rgba(0,0,0,0.15); z-index: 1000; padding: 12px; }
    .cal-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
    .cal-nav { background: none; border: 1px solid #dee2e6; border-radius: 4px; cursor: pointer; padding: 3px 8px; font-size: 14px; }
    .cal-title { font-weight: 600; font-size: 13px; }
    .cal-grid { display: grid; grid-template-columns: repeat(7, 32px); gap: 2px; }
    .cal-weekday { text-align: center; font-size: 10px; font-weight: 700; color: #adb5bd; padding: 4px 0; }
    .cal-day { width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; font-size: 12px; border-radius: 4px; cursor: pointer; transition: background 0.1s; }
    .cal-day:hover { background: #f1f3f5; }
    .cal-day.other-month { color: #ced4da; }
    .cal-day.in-range { background: #e8f0fe; color: #1a73e8; }
    .cal-day.range-start, .cal-day.range-end { background: #1a73e8; color: #fff; border-radius: 50%; }
    .cal-day.today { font-weight: 700; border: 1px solid #1a73e8; }
  `]
})
export class DateRangePickerComponent {
  label = input('');
  startDate = signal<string>('');
  endDate = signal<string>('');
  open = signal(false);
  private picking = signal<'start' | 'end'>('start');
  viewMonth = signal(new Date().getMonth());
  viewYear = signal(new Date().getFullYear());
  rangeChange = output<{ start: string; end: string }>();

  weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  monthName(m: number) { return this.monthNames[m]; }
  toggleOpen(): void { this.open.update(v => !v); }
  prevMonth(e: Event): void { e.stopPropagation(); if (this.viewMonth() === 0) { this.viewMonth.set(11); this.viewYear.update(y => y - 1); } else this.viewMonth.update(m => m - 1); }
  nextMonth(e: Event): void { e.stopPropagation(); if (this.viewMonth() === 11) { this.viewMonth.set(0); this.viewYear.update(y => y + 1); } else this.viewMonth.update(m => m + 1); }

  calendarDays = computed(() => {
    const y = this.viewYear(), m = this.viewMonth();
    const first = new Date(y, m, 1).getDay();
    const days: any[] = [];
    const today = new Date(); today.setHours(0,0,0,0);
    const s = this.startDate() ? new Date(this.startDate()) : null;
    const e = this.endDate() ? new Date(this.endDate()) : null;
    for (let i = 0; i < 42; i++) {
      const date = new Date(y, m, i - first + 1);
      date.setHours(0,0,0,0);
      const ds = date.toISOString().split('T')[0];
      days.push({
        key: ds, date, inMonth: date.getMonth() === m,
        isToday: date.getTime() === today.getTime(),
        isStart: s ? date.getTime() === s.getTime() : false,
        isEnd: e ? date.getTime() === e.getTime() : false,
        inRange: s && e ? date > s && date < e : false
      });
    }
    return days;
  });

  selectDay(date: Date, e: Event): void {
    e.stopPropagation();
    const ds = date.toISOString().split('T')[0];
    if (this.picking() === 'start') { this.startDate.set(ds); this.endDate.set(''); this.picking.set('end'); }
    else { if (date >= new Date(this.startDate())) { this.endDate.set(ds); this.picking.set('start'); this.rangeChange.emit({ start: this.startDate(), end: ds }); this.open.set(false); } else { this.startDate.set(ds); } }
  }
}
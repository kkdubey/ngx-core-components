import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface AccordionItem {
  title: string;
  content: string;
  icon?: string;
  disabled?: boolean;
  expanded?: boolean;
}

@Component({
  selector: 'ngx-accordion',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="ngx-accordion">
      @for (item of items(); track item.title; let i = $index) {
        <div class="accordion-item" [class.expanded]="isExpanded(i)" [class.disabled]="item.disabled">
          <button
            class="accordion-header"
            [attr.aria-expanded]="isExpanded(i)"
            [disabled]="item.disabled"
            (click)="toggle(i)"
          >
            @if (item.icon) { <span class="acc-icon" aria-hidden="true">{{ item.icon }}</span> }
            <span class="acc-title">{{ item.title }}</span>
            <span class="acc-chevron" [class.open]="isExpanded(i)">▾</span>
          </button>
          @if (isExpanded(i)) {
            <div class="accordion-body" role="region">
              {{ item.content }}
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    :host { display: block; }
    .ngx-accordion { border: 1px solid var(--ngx-acc-border, #dee2e6); border-radius: var(--ngx-acc-radius, 6px); overflow: hidden; }
    .accordion-item { border-bottom: 1px solid var(--ngx-acc-border, #dee2e6); }
    .accordion-item:last-child { border-bottom: none; }
    .accordion-item.disabled { opacity: 0.5; }
    .accordion-header {
      display: flex; align-items: center; gap: 10px; width: 100%; padding: 14px 18px;
      background: var(--ngx-acc-header-bg, #fafbfc); border: none; cursor: pointer; font-family: inherit;
      font-size: 14px; font-weight: 500; color: var(--ngx-acc-header-color, #212529);
      text-align: left; transition: background 0.12s;
    }
    .accordion-header:hover:not(:disabled) { background: var(--ngx-acc-header-hover-bg, #f1f3f5); }
    .accordion-item.expanded .accordion-header { background: var(--ngx-acc-expanded-bg, #fff); color: var(--ngx-acc-expanded-color, #1a73e8); }
    .acc-icon { font-size: 16px; flex-shrink: 0; }
    .acc-title { flex: 1; }
    .acc-chevron { font-size: 12px; transition: transform 0.2s; flex-shrink: 0; }
    .acc-chevron.open { transform: rotate(180deg); }
    .accordion-body { padding: 14px 18px; font-size: 14px; color: var(--ngx-acc-body-color, #495057); line-height: 1.6; background: var(--ngx-acc-body-bg, #fff); border-top: 1px solid var(--ngx-acc-border, #dee2e6); }
  `]
})
export class AccordionComponent {
  items = input<AccordionItem[]>([]);
  multi = input(false);
  private expanded = signal<Set<number>>(new Set());

  isExpanded(i: number): boolean {
    return this.expanded().has(i);
  }

  toggle(i: number): void {
    const s = new Set(this.expanded());
    if (s.has(i)) { s.delete(i); } else {
      if (!this.multi()) s.clear();
      s.add(i);
    }
    this.expanded.set(s);
  }
}

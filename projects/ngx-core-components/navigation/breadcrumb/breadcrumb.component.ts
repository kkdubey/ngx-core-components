import { Component, input, output } from '@angular/core';

export interface BreadcrumbItem {
  label: string;
  url?: string;
  icon?: string;
}

@Component({
  selector: 'ngx-breadcrumb',
  standalone: true,
  template: `
    <nav class="ngx-breadcrumb" aria-label="breadcrumb">
      @for (item of items(); track item.label; let i = $index; let last = $last) {
        @if (i > 0) { <span class="breadcrumb-separator" aria-hidden="true">{{ separator() }}</span> }
        @if (last) {
          <span class="breadcrumb-item active" aria-current="page">
            @if (item.icon) { <span class="breadcrumb-icon">{{ item.icon }}</span> }
            {{ item.label }}
          </span>
        } @else if (item.url) {
          <a class="breadcrumb-item" [href]="item.url" (click)="onNav($event, item)">
            @if (item.icon) { <span class="breadcrumb-icon">{{ item.icon }}</span> }
            {{ item.label }}
          </a>
        } @else {
          <button class="breadcrumb-item breadcrumb-btn" (click)="itemClick.emit(item)">
            @if (item.icon) { <span class="breadcrumb-icon">{{ item.icon }}</span> }
            {{ item.label }}
          </button>
        }
      }
    </nav>
  `,
  styles: [`
    :host { display: block; }
    .ngx-breadcrumb { display: flex; flex-wrap: wrap; align-items: center; gap: 4px; font-size: 13px; }
    .breadcrumb-separator { color: var(--ngx-breadcrumb-separator, #adb5bd); padding: 0 2px; }
    .breadcrumb-item { display: inline-flex; align-items: center; gap: 4px; color: var(--ngx-breadcrumb-link, #1a73e8); text-decoration: none; transition: color 0.15s; }
    .breadcrumb-item:hover:not(.active) { text-decoration: underline; color: var(--ngx-breadcrumb-link-hover, #1557b0); }
    .breadcrumb-item.active { color: var(--ngx-breadcrumb-active, #495057); cursor: default; font-weight: 500; }
    .breadcrumb-btn { background: none; border: none; cursor: pointer; font-family: inherit; font-size: inherit; padding: 0; }
    .breadcrumb-icon { font-size: 14px; }
  `]
})
export class BreadcrumbComponent {
  items = input<BreadcrumbItem[]>([]);
  separator = input('/');
  itemClick = output<BreadcrumbItem>();

  onNav(event: MouseEvent, item: BreadcrumbItem): void { event.preventDefault(); this.itemClick.emit(item); }
}

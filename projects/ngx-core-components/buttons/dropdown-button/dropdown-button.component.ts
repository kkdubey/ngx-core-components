import { Component, input, output, signal } from '@angular/core';
import { ButtonComponent, ButtonVariant, ButtonSize } from '../button/button.component';

export interface DropDownButtonItem { label?: string; text?: string; icon?: string; disabled?: boolean; separator?: boolean; variant?: string; }

@Component({
  selector: 'ngx-dropdown-button',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <div class="ngx-dd-btn" [class.open]="open()">
      <ngx-button [variant]="variant()" [size]="size()" [disabled]="disabled()" [suffixIcon]="'▾'" (clicked)="toggle()">
        <ng-content />
      </ngx-button>
      @if (open()) {
        <ul class="dd-menu" role="menu">
          @for (item of items(); track item.text) {
            <li class="dd-menu-item" [class.disabled]="item.disabled" role="menuitem"
              (click)="!item.disabled && itemClicked.emit(item); open.set(false)">
              @if (item.icon) { <span class="item-icon">{{ item.icon }}</span> }
              <span>{{ item.text }}</span>
            </li>
          }
        </ul>
      }
    </div>
  `,
  styles: [`
    :host { display: inline-block; position: relative; }
    .ngx-dd-btn { display: inline-flex; position: relative; }
    .dd-menu { position: absolute; top: 100%; left: 0; min-width: 160px; margin-top: 2px; background: var(--ngx-menu-bg, #fff); border: 1px solid var(--ngx-menu-border, #dee2e6); border-radius: 6px; box-shadow: 0 4px 16px rgba(0,0,0,0.12); list-style: none; padding: 4px 0; z-index: 1000; }
    .dd-menu-item { display: flex; align-items: center; gap: 8px; padding: 8px 14px; font-size: 13px; cursor: pointer; color: #212529; }
    .dd-menu-item:hover:not(.disabled) { background: #f1f3f5; }
    .dd-menu-item.disabled { color: #adb5bd; cursor: not-allowed; }
    .item-icon { font-size: 14px; }
  `]
})
export class DropDownButtonComponent {
  variant = input<ButtonVariant>('secondary');
  size = input<ButtonSize>('md');
  disabled = input(false);
  items = input<DropDownButtonItem[]>([]);
  open = signal(false);
  itemClicked = output<DropDownButtonItem>();
  toggle(): void { this.open.update(v => !v); }
}

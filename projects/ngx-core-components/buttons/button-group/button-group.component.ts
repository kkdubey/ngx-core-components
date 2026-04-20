import { Component, input, output, contentChildren } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { CommonModule } from '@angular/common';

export type ButtonGroupSelectionMode = 'none' | 'single' | 'multiple';

@Component({
  selector: 'ngx-button-group',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="ngx-btn-group" [class.btn-group-vertical]="vertical()" role="group" [attr.aria-label]="ariaLabel()">
      <ng-content />
    </div>
  `,
  styles: [`
    :host { display: inline-block; }
    .ngx-btn-group { display: inline-flex; }
    .ngx-btn-group :host-context(ngx-button) + :host-context(ngx-button) { margin-left: -1px; }
    .ngx-btn-group :global(ngx-button:not(:first-child) .ngx-btn) { border-left: none; border-radius: 0 !important; }
    .ngx-btn-group :global(ngx-button:first-child .ngx-btn) { border-radius: var(--ngx-btn-radius, 4px) 0 0 var(--ngx-btn-radius, 4px) !important; }
    .ngx-btn-group :global(ngx-button:last-child .ngx-btn) { border-radius: 0 var(--ngx-btn-radius, 4px) var(--ngx-btn-radius, 4px) 0 !important; }
    .ngx-btn-group :global(ngx-button:only-child .ngx-btn) { border-radius: var(--ngx-btn-radius, 4px) !important; }

    .btn-group-vertical { flex-direction: column; }
    .btn-group-vertical :global(ngx-button:not(:first-child) .ngx-btn) { border-top: none; border-radius: 0 !important; margin-left: 0; margin-top: -1px; }
    .btn-group-vertical :global(ngx-button:first-child .ngx-btn) { border-radius: var(--ngx-btn-radius, 4px) var(--ngx-btn-radius, 4px) 0 0 !important; }
    .btn-group-vertical :global(ngx-button:last-child .ngx-btn) { border-radius: 0 0 var(--ngx-btn-radius, 4px) var(--ngx-btn-radius, 4px) !important; }
  `]
})
export class ButtonGroupComponent {
  vertical = input(false);
  ariaLabel = input('Button group');
}

import {
  Component, ChangeDetectionStrategy, input, output, signal,
  HostListener, ElementRef, inject
} from '@angular/core';

@Component({
  selector: 'ngx-popover',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="ngx-popover-wrapper">
      <!-- Trigger slot -->
      <div class="popover-trigger" (click)="toggle()">
        <ng-content select="[popoverTrigger]"/>
      </div>

      <!-- Popup -->
      @if (isOpen()) {
        <div class="popover-panel" [class]="'popover-' + position()">
          @if (title()) {
            <div class="popover-header">
              <span class="popover-title">{{ title() }}</span>
              <button class="popover-close" (click)="close()">&#10005;</button>
            </div>
          }
          <div class="popover-body">
            <ng-content select="[popoverBody]"/>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    :host {
      display: inline-block;
    }
    .ngx-popover-wrapper { position: relative; display: inline-block; }
    .popover-trigger { cursor: pointer; }
    .popover-panel {
      position: absolute; z-index: 1000; min-width: 200px; max-width: 320px;
      background: var(--ngx-popover-bg, #fff); border: 1px solid var(--ngx-popover-border, #dee2e6);
      border-radius: var(--ngx-popover-radius, 6px); box-shadow: var(--ngx-popover-shadow, 0 4px 16px rgba(0,0,0,0.12));
      animation: fadeIn 0.12s ease;
    }
    @keyframes fadeIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
    .popover-bottom { top: calc(100% + 8px); left: 50%; transform: translateX(-50%); }
    .popover-top { bottom: calc(100% + 8px); left: 50%; transform: translateX(-50%); }
    .popover-right { left: calc(100% + 8px); top: 50%; transform: translateY(-50%); }
    .popover-left { right: calc(100% + 8px); top: 50%; transform: translateY(-50%); }
    .popover-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 10px 14px 8px; border-bottom: 1px solid var(--ngx-popover-border, #dee2e6);
    }
    .popover-title { font-size: 14px; font-weight: 600; color: #212529; }
    .popover-close {
      background: none; border: none; cursor: pointer; font-size: 12px;
      color: #6c757d; padding: 2px 4px; border-radius: 3px;
    }
    .popover-close:hover { background: #f1f3f5; }
    .popover-body { padding: 12px 14px; font-size: 13px; color: #495057; }
  `]
})
export class PopoverComponent {
  title = input<string>('');
  position = input<'top' | 'bottom' | 'left' | 'right'>('bottom');

  isOpen = signal(false);
  toggle(): void { this.isOpen.update(v => !v); }
  close(): void { this.isOpen.set(false); }

  private el = inject(ElementRef);

  @HostListener('document:click', ['$event'])
  onDocClick(e: MouseEvent): void {
    if (!this.el.nativeElement.contains(e.target)) this.isOpen.set(false);
  }
}

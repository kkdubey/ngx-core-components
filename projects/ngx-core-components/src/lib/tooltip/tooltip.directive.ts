import {
  Directive, input, signal, ElementRef, HostListener, inject,
  computed, effect, Renderer2
} from '@angular/core';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

@Directive({
  selector: '[ngxTooltip]',
  standalone: true,
})
export class TooltipDirective {
  ngxTooltip = input<string>('');
  tooltipPosition = input<TooltipPosition>('top');

  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  private tooltipEl: HTMLElement | null = null;

  @HostListener('mouseenter')
  onMouseEnter(): void {
    const text = this.ngxTooltip();
    if (!text) return;
    this.showTooltip(text);
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.hideTooltip();
  }

  private showTooltip(text: string): void {
    this.hideTooltip();
    const tip = this.renderer.createElement('div') as HTMLElement;
    tip.className = 'ngx-tooltip';
    tip.setAttribute('role', 'tooltip');
    tip.textContent = text;
    document.body.appendChild(tip);
    this.tooltipEl = tip;

    const rect = this.el.nativeElement.getBoundingClientRect();
    const tipRect = tip.getBoundingClientRect();
    const pos = this.tooltipPosition();
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    const OFFSET = 8;
    let top = 0, left = 0;

    switch (pos) {
      case 'top':
        top = rect.top + scrollY - tipRect.height - OFFSET;
        left = rect.left + scrollX + rect.width / 2 - tipRect.width / 2;
        break;
      case 'bottom':
        top = rect.bottom + scrollY + OFFSET;
        left = rect.left + scrollX + rect.width / 2 - tipRect.width / 2;
        break;
      case 'left':
        top = rect.top + scrollY + rect.height / 2 - tipRect.height / 2;
        left = rect.left + scrollX - tipRect.width - OFFSET;
        break;
      case 'right':
        top = rect.top + scrollY + rect.height / 2 - tipRect.height / 2;
        left = rect.right + scrollX + OFFSET;
        break;
    }

    // Auto-flip if outside viewport
    if (top < 0) top = rect.bottom + scrollY + OFFSET;
    if (left < 0) left = 4;
    if (left + tipRect.width > window.innerWidth) left = window.innerWidth - tipRect.width - 4;

    tip.style.top = top + 'px';
    tip.style.left = left + 'px';
    tip.style.setProperty('--pos', pos);
    requestAnimationFrame(() => { if (tip) tip.classList.add('visible'); });
  }

  private hideTooltip(): void {
    if (this.tooltipEl) {
      this.tooltipEl.remove();
      this.tooltipEl = null;
    }
  }
}

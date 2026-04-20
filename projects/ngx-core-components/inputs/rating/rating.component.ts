import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'ngx-rating',
  standalone: true,
  template: `
    <div class="ngx-rating" [attr.aria-label]="label() + ' rating: ' + current() + ' of ' + max()">
      @if (label()) { <span class="rating-label">{{ label() }}</span> }
      <div class="rating-stars">
        @for (star of stars(); track star) {
          <button
            class="rating-star"
            [class.filled]="(hovered() || current()) >= star"
            [class.hovered]="hovered() >= star"
            [disabled]="readonly()"
            type="button"
            [attr.aria-label]="'Rate ' + star"
            (mouseenter)="hovered.set(star)"
            (mouseleave)="hovered.set(0)"
            (click)="setRating(star)"
          >{{ (hovered() || current()) >= star ? '★' : '☆' }}</button>
        }
      </div>
      @if (showValue()) { <span class="rating-value">{{ current() }}/{{ max() }}</span> }
    </div>
  `,
  styles: [`
    :host { display: inline-block; }
    .ngx-rating { display: inline-flex; align-items: center; gap: 8px; }
    .rating-label { font-size: 12px; font-weight: 600; color: var(--ngx-input-label, #495057); }
    .rating-stars { display: flex; gap: 2px; }
    .rating-star { background: none; border: none; cursor: pointer; font-size: 22px; padding: 0; line-height: 1; color: var(--ngx-rating-empty, #dee2e6); transition: color 0.1s, transform 0.1s; }
    .rating-star.filled { color: var(--ngx-rating-filled, #f39c12); }
    .rating-star.hovered { color: var(--ngx-rating-hover, #f1c40f); transform: scale(1.15); }
    .rating-star:disabled { cursor: default; }
    .rating-value { font-size: 12px; color: #6c757d; }
  `]
})
export class RatingComponent {
  max = input(5);
  label = input('');
  readonly = input(false);
  showValue = input(false);
  current = signal(0);
  hovered = signal(0);
  ratingChange = output<number>();
  stars = () => Array.from({ length: this.max() }, (_, i) => i + 1);
  setRating(star: number): void { if (!this.readonly()) { this.current.set(star); this.ratingChange.emit(star); } }
}

import { Component, input, output, signal } from '@angular/core';

export interface StepperStep {
  label: string;
  description?: string;
  icon?: string;
  optional?: boolean;
  state?: 'pending' | 'current' | 'complete' | 'error';
}

@Component({
  selector: 'ngx-stepper',
  standalone: true,
  template: `
    <div class="ngx-stepper" [class.stepper-vertical]="orientation() === 'vertical'">
      @for (step of steps(); track step.label; let i = $index) {
        <div class="stepper-step" [class.completed]="i < currentStep()" [class.active]="i === currentStep()" [class.error]="step.state === 'error'">
          <div class="step-header">
            <div class="step-indicator">
              @if (i < currentStep()) {
                <span class="step-check">✓</span>
              } @else if (step.state === 'error') {
                <span class="step-error-icon">✕</span>
              } @else {
                <span class="step-number">{{ i + 1 }}</span>
              }
            </div>
            @if (i < steps().length - 1) {
              <div class="step-connector"></div>
            }
          </div>
          <div class="step-content">
            <div class="step-label">{{ step.label }}</div>
            @if (step.description) { <div class="step-desc">{{ step.description }}</div> }
            @if (step.optional) { <div class="step-optional">Optional</div> }
          </div>
        </div>
      }
    </div>
    @if (showContent()) {
      <div class="stepper-content">
        <ng-content />
      </div>
      @if (showActions()) {
        <div class="stepper-actions">
          <button class="stepper-btn stepper-btn-back" [disabled]="currentStep() === 0" (click)="back()">← Back</button>
          <button class="stepper-btn stepper-btn-next" [disabled]="currentStep() === steps().length - 1" (click)="next()">
            {{ currentStep() === steps().length - 1 ? 'Finish' : 'Next →' }}
          </button>
        </div>
      }
    }
  `,
  styles: [`
    :host { display: block; }
    .ngx-stepper { display: flex; align-items: flex-start; gap: 0; }
    .ngx-stepper.stepper-vertical { flex-direction: column; }
    .stepper-step { display: flex; flex-direction: column; align-items: center; flex: 1; }
    .stepper-vertical .stepper-step { flex-direction: row; flex: initial; align-items: flex-start; width: 100%; }
    .step-header { display: flex; align-items: center; flex-direction: column; width: 100%; }
    .stepper-vertical .step-header { flex-direction: column; align-items: center; margin-right: 14px; flex-shrink: 0; }
    .step-indicator {
      width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
      background: var(--ngx-stepper-pending-bg, #f1f3f5); color: var(--ngx-stepper-pending-color, #adb5bd);
      border: 2px solid var(--ngx-stepper-pending-border, #dee2e6); font-size: 13px; font-weight: 700;
      transition: all 0.2s; flex-shrink: 0; z-index: 1;
    }
    .active .step-indicator { background: var(--ngx-stepper-active-bg, #1a73e8); color: #fff; border-color: var(--ngx-stepper-active-bg, #1a73e8); }
    .completed .step-indicator { background: var(--ngx-stepper-complete-bg, #27ae60); color: #fff; border-color: var(--ngx-stepper-complete-bg, #27ae60); }
    .error .step-indicator { background: #e74c3c; color: #fff; border-color: #e74c3c; }
    .step-connector { flex: 1; height: 2px; background: var(--ngx-stepper-line, #dee2e6); width: 100%; margin: 16px 0 0; }
    .stepper-vertical .step-connector { width: 2px; height: 32px; margin: 0; }
    .completed .step-connector { background: var(--ngx-stepper-complete-bg, #27ae60); }
    .step-content { text-align: center; padding: 8px 4px 0; }
    .stepper-vertical .step-content { text-align: left; padding: 4px 0 24px; }
    .step-label { font-size: 12px; font-weight: 600; color: var(--ngx-stepper-label, #212529); }
    .active .step-label { color: var(--ngx-stepper-active-bg, #1a73e8); }
    .step-desc { font-size: 11px; color: #6c757d; margin-top: 2px; }
    .step-optional { font-size: 10px; color: #adb5bd; font-style: italic; }
    .stepper-content { padding: 20px 0; border-top: 1px solid #e9ecef; margin-top: 16px; }
    .stepper-actions { display: flex; gap: 10px; margin-top: 16px; }
    .stepper-btn { padding: 8px 18px; font-size: 13px; font-weight: 500; border-radius: 4px; cursor: pointer; font-family: inherit; }
    .stepper-btn-back { background: #f1f3f5; color: #495057; border: 1px solid #dee2e6; }
    .stepper-btn-back:hover:not(:disabled) { background: #e2e6ea; }
    .stepper-btn-next { background: #1a73e8; color: #fff; border: 1px solid #1a73e8; }
    .stepper-btn-next:hover:not(:disabled) { background: #1557b0; }
    .stepper-btn:disabled { opacity: 0.5; cursor: not-allowed; }
  `]
})
export class StepperComponent {
  steps = input<StepperStep[]>([]);
  currentStep = signal(0);
  orientation = input<'horizontal' | 'vertical'>('horizontal');
  showContent = input(true);
  showActions = input(true);
  stepChange = output<number>();

  next() { if (this.currentStep() < this.steps().length - 1) { this.currentStep.update(v => v + 1); this.stepChange.emit(this.currentStep()); } }
  back() { if (this.currentStep() > 0) { this.currentStep.update(v => v - 1); this.stepChange.emit(this.currentStep()); } }
}

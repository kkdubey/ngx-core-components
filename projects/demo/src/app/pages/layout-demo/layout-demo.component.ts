import { Component, signal } from '@angular/core';
import { CardComponent, TabStripComponent, TabComponent, AccordionComponent, AccordionItem, StepperComponent, StepperStep, SplitterComponent } from 'ngx-core-components/layout';

interface ApiRow { name: string; type: string; default: string; description: string; }

@Component({
  selector: 'app-layout-demo',
  standalone: true,
  imports: [CardComponent, TabStripComponent, TabComponent, AccordionComponent, StepperComponent, SplitterComponent],
  template: `
    <div class="demo-page">
      <!-- Page Header -->
      <div class="page-header">
        <div class="page-header-text">
          <h1>Layout Components</h1>
          <p>Cards, TabStrips, Accordions, Steppers, and Splitters for structured application layouts.</p>
        </div>
        <div class="header-badges">
          <span class="badge badge-green">Cards</span>
          <span class="badge badge-green">Tabs</span>
          <span class="badge badge-green">Accordion</span>
        </div>
      </div>

      <!-- TAB NAV -->
      <div class="tab-nav">
        @for (tab of tabs; track tab) {
          <button class="tab-btn" [class.active]="activeTab() === tab" (click)="activeTab.set(tab)">{{ tab }}</button>
        }
      </div>

      <!-- ===== DEMO ===== -->
      @if (activeTab() === 'Demo') {
        <div class="tab-content">
          <div class="section-label">Cards</div>
          <div class="card-grid">
            <ngx-card title="Default Card" subtitle="Basic card with default variant">
              <p>Card content goes here. Cards can contain any content including text, images, and actions.</p>
            </ngx-card>
            <ngx-card title="Elevated Card" subtitle="With shadow elevation" variant="elevated">
              <p>This card uses the elevated variant with increased shadow depth.</p>
            </ngx-card>
            <ngx-card title="Outlined Card" subtitle="With visible border" variant="outlined">
              <p>Outlined variant emphasizes borders over shadows.</p>
            </ngx-card>
            <ngx-card title="Hoverable Card" subtitle="Hover over me" [hoverable]="true" variant="elevated">
              <p>This card lifts on hover, perfect for clickable cards.</p>
            </ngx-card>
          </div>

          <div class="section-label">Tab Strip</div>
          <ngx-tab-strip>
            <ngx-tab title="Overview" icon="📋">
              <div class="tab-content-inner">
                <h3>Overview</h3>
                <p>This is the Overview tab content. The TabStrip component supports multiple tabs with icons, badges, and disabled states.</p>
              </div>
            </ngx-tab>
            <ngx-tab title="Analytics" icon="📊" badge="3">
              <div class="tab-content-inner">
                <h3>Analytics</h3>
                <p>Analytics dashboard content. This tab has a badge showing 3 unread items.</p>
              </div>
            </ngx-tab>
            <ngx-tab title="Settings" icon="⚙️">
              <div class="tab-content-inner">
                <h3>Settings</h3>
                <p>Application settings and configuration options.</p>
              </div>
            </ngx-tab>
          </ngx-tab-strip>

          <div class="section-label">Accordion</div>
          <ngx-accordion [items]="accordionItems" />

          <div class="section-label">Stepper — Horizontal</div>
          <ngx-stepper [steps]="steps" />

          <div class="section-label">Splitter</div>
          <div style="height:200px;border:1px solid #dee2e6;border-radius:8px;overflow:hidden">
            <ngx-splitter>
              <div pane1 style="padding:16px;background:#f8f9fa;height:100%">
                <strong>Left Pane</strong>
                <p style="font-size:13px;color:#6c757d">Drag the divider to resize.</p>
              </div>
              <div pane2 style="padding:16px;height:100%">
                <strong>Right Pane</strong>
                <p style="font-size:13px;color:#6c757d">Content adjusts as you resize.</p>
              </div>
            </ngx-splitter>
          </div>

          <div class="section-label">How to Use</div>
          <pre style="margin:0;background:#1e1e1e;color:#d4d4d4;padding:16px;border-radius:8px;font-size:12px;line-height:1.5;overflow:auto">{{ howToCode }}</pre>
        </div>
      }

      <!-- ===== API REFERENCE ===== -->
      @if (activeTab() === 'API Reference') {
        <div class="tab-content">
          <div class="section-label">Card</div>
          <div class="api-table-wrap">
            <table class="api-table">
              <thead><tr><th>Input / Output</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
              <tbody>
                @for (row of cardApi; track row.name) {
                  <tr><td class="api-name">{{ row.name }}</td><td class="api-type">{{ row.type }}</td><td class="api-default">{{ row.default }}</td><td>{{ row.description }}</td></tr>
                }
              </tbody>
            </table>
          </div>

          <div class="section-label">TabStrip & Tab</div>
          <div class="api-table-wrap">
            <table class="api-table">
              <thead><tr><th>Input / Output</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
              <tbody>
                @for (row of tabApi; track row.name) {
                  <tr><td class="api-name">{{ row.name }}</td><td class="api-type">{{ row.type }}</td><td class="api-default">{{ row.default }}</td><td>{{ row.description }}</td></tr>
                }
              </tbody>
            </table>
          </div>

          <div class="section-label">Accordion</div>
          <div class="api-table-wrap">
            <table class="api-table">
              <thead><tr><th>Input / Output</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
              <tbody>
                @for (row of accordionApi; track row.name) {
                  <tr><td class="api-name">{{ row.name }}</td><td class="api-type">{{ row.type }}</td><td class="api-default">{{ row.default }}</td><td>{{ row.description }}</td></tr>
                }
              </tbody>
            </table>
          </div>

          <div class="section-label">Stepper</div>
          <div class="api-table-wrap">
            <table class="api-table">
              <thead><tr><th>Input / Output</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
              <tbody>
                @for (row of stepperApi; track row.name) {
                  <tr><td class="api-name">{{ row.name }}</td><td class="api-type">{{ row.type }}</td><td class="api-default">{{ row.default }}</td><td>{{ row.description }}</td></tr>
                }
              </tbody>
            </table>
          </div>

          <div class="section-label">Splitter</div>
          <div class="api-table-wrap">
            <table class="api-table">
              <thead><tr><th>Input / Output</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
              <tbody>
                @for (row of splitterApi; track row.name) {
                  <tr><td class="api-name">{{ row.name }}</td><td class="api-type">{{ row.type }}</td><td class="api-default">{{ row.default }}</td><td>{{ row.description }}</td></tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    :host { display: flex; flex-direction: column; height: 100%; overflow-y: auto; }
    .demo-page { padding: 32px 40px; max-width: 1200px; margin: 0 auto; width: 100%; display: flex; flex-direction: column; gap: 28px; }
    .page-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 20px; padding-bottom: 24px; border-bottom: 2px solid rgba(230, 230, 245, 0.6); }
    .page-header-text h1 { margin: 0 0 8px; font-size: 28px; font-weight: 900; color: #1a1a2e; letter-spacing: -0.5px; }
    .page-header-text p { margin: 0; font-size: 14px; color: #6c757d; line-height: 1.7; max-width: 600px; }
    .header-badges { display: flex; gap: 10px; flex-shrink: 0; flex-wrap: wrap; }
    .badge { font-size: 11px; font-weight: 700; padding: 6px 12px; border-radius: 16px; transition: all 0.2s ease; }
    .badge-green { background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); color: #166534; border: 1px solid rgba(22, 101, 52, 0.1); }
    .tab-nav { display: flex; gap: 0; border-bottom: 2px solid #e9ecef; overflow-x: auto; padding-bottom: 0; }
    .tab-btn { padding: 12px 20px; background: none; border: none; font-size: 13px; font-weight: 500; color: #6c757d; cursor: pointer; border-bottom: 3px solid transparent; margin-bottom: -2px; font-family: inherit; transition: all 0.2s ease; white-space: nowrap; }
    .tab-btn:hover { color: #495057; background: rgba(26, 115, 232, 0.05); }
    .tab-btn.active { color: #1a73e8; border-bottom-color: #1a73e8; font-weight: 600; background: rgba(26, 115, 232, 0.04); }
    .tab-content { display: flex; flex-direction: column; gap: 20px; }
    .tab-content-inner { padding: 16px 0; }
    .tab-content-inner h3 { font-size: 15px; margin: 0 0 8px; }
    .tab-content-inner p { color: #6c757d; font-size: 13px; margin: 0; }
    .section-label { font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.2px; color: #8892a0; border-bottom: 2px solid #e9ecef; padding-bottom: 12px; }
    .card-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
    .api-table-wrap { overflow-x: auto; border: 1px solid #e9ecef; border-radius: 10px; }
    .api-table { width: 100%; border-collapse: collapse; font-size: 13px; }
    .api-table thead tr { background: linear-gradient(135deg, #f8f9fa 0%, #f3f5f9 100%); }
    .api-table th { padding: 12px 16px; text-align: left; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.7px; color: #495057; border-bottom: 2px solid #e9ecef; white-space: nowrap; }
    .api-table td { padding: 12px 16px; border-bottom: 1px solid #f1f3f5; color: #495057; vertical-align: top; }
    .api-table tbody tr { transition: background 0.2s ease; }
    .api-table tbody tr:hover td { background: #f8f9fa; }
    .api-table tbody tr:last-child td { border-bottom: none; }
    .api-name { color: #1a73e8 !important; font-family: monospace; font-weight: 700; white-space: nowrap; }
    .api-type { color: #8e44ad !important; font-family: monospace; white-space: nowrap; }
    .api-default { font-family: monospace; white-space: nowrap; color: #ff6b6b; font-weight: 500; }
  `]
})
export class LayoutDemoComponent {
  activeTab = signal('Demo');
  tabs = ['Demo', 'API Reference'];

  howToCode = `import { Component } from '@angular/core';
import { CardComponent, AccordionComponent } from 'ngx-core-components/layout';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CardComponent, AccordionComponent],
  template: '<ngx-card title="Project Summary" variant="elevated">Overview</ngx-card><ngx-accordion [items]="items" />'
})
export class ExampleComponent {
  items = [{ title: 'Overview', content: 'Project details' }];
}`;

  accordionItems: AccordionItem[] = [
    { title: '📦 What is this library?', content: 'ngx-core-components is an enterprise-grade Angular UI component library with Kendo UI feature parity, built with Angular Signals and zero external dependencies.' },
    { title: '🎨 How does theming work?', content: 'All components use CSS custom properties (--ngx-* variables). Override any variable in your :root or a scoped selector to apply custom themes instantly.' },
    { title: '♿ Is it accessible?', content: 'Yes! All components implement ARIA roles, labels, keyboard navigation, and follow WCAG 2.1 AA guidelines for enterprise accessibility requirements.', expanded: true },
  ];

  steps: StepperStep[] = [
    { label: 'Account Setup', description: 'Create your account', state: 'complete' },
    { label: 'Organization', description: 'Configure your org', state: 'current' },
    { label: 'Billing', description: 'Payment details', optional: true },
    { label: 'Review', description: 'Confirm & launch' },
  ];

  cardApi: ApiRow[] = [
    { name: 'title', type: 'string', default: 'undefined', description: 'Card header title.' },
    { name: 'subtitle', type: 'string', default: 'undefined', description: 'Card header subtitle.' },
    { name: 'variant', type: "'default'|'elevated'|'outlined'", default: "'default'", description: 'Visual style of the card.' },
    { name: 'hoverable', type: 'boolean', default: 'false', description: 'Card lifts on hover with animation.' },
    { name: 'imageUrl', type: 'string', default: 'undefined', description: 'URL for header image.' },
  ];

  tabApi: ApiRow[] = [
    { name: 'title', type: 'string', default: 'undefined', description: 'Tab label text.' },
    { name: 'icon', type: 'string', default: 'undefined', description: 'Icon to display with title.' },
    { name: 'badge', type: 'string', default: 'undefined', description: 'Badge text shown on tab.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable tab interaction.' },
    { name: 'activeChange', type: 'Output<boolean>', default: 'n/a', description: 'Emitted when tab becomes active/inactive.' },
  ];

  accordionApi: ApiRow[] = [
    { name: 'items', type: 'AccordionItem[]', default: '[]', description: 'Array of accordion items with title/content.' },
    { name: 'multi', type: 'boolean', default: 'false', description: 'Allow multiple items open simultaneously.' },
    { name: 'closeOthers', type: 'boolean', default: 'true', description: 'Close other items when one opens.' },
  ];

  stepperApi: ApiRow[] = [
    { name: 'steps', type: 'StepperStep[]', default: '[]', description: 'Array of stepper steps with labels and states.' },
    { name: 'orientation', type: "'horizontal'|'vertical'", default: "'horizontal'", description: 'Layout direction of steps.' },
    { name: 'linear', type: 'boolean', default: 'false', description: 'Require steps to be completed in order.' },
    { name: 'stepChange', type: 'Output<number>', default: 'n/a', description: 'Emitted when active step changes.' },
  ];

  splitterApi: ApiRow[] = [
    { name: 'size', type: 'number', default: 'undefined', description: 'Initial divider position in pixels or percentage.' },
    { name: 'direction', type: "'horizontal'|'vertical'", default: "'horizontal'", description: 'Split direction.' },
    { name: 'min', type: 'number', default: '0', description: 'Minimum size of first pane.' },
    { name: 'sizeChange', type: 'Output<number>', default: 'n/a', description: 'Emitted when divider is dragged.' },
  ];
}

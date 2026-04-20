import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

interface ComponentCard {
  icon: string;
  title: string;
  description: string;
  route: string;
  tag: string;
  tagColor: string;
  features: string[];
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="home-page">
      <!-- Hero Section -->
      <div class="hero">
        <div class="hero-content">
          <div class="hero-badge">🏢 Enterprise-Grade Angular Components</div>
          <h1 class="hero-title">ngx-core-components</h1>
          <p class="hero-subtitle">
            A comprehensive, production-ready UI component library for Angular 19, 20, and 21. 
            Built with signals, OnPush change detection, and CSS custom properties. 
            50+ reusable components. Zero dependencies. Fully typed. Enterprise-ready.
          </p>
          <div class="hero-actions">
            <a class="btn btn-primary" routerLink="/getting-started">
              <span>🚀</span> Get Started Now
            </a>
            <a class="btn btn-secondary" routerLink="/charts">
              <span>📚</span> Browse All Components
            </a>
          </div>
        </div>
      </div>

      <!-- Stats Section -->
      <div class="stats-section">
        <div class="stat-card">
          <div class="stat-icon">📦</div>
          <div class="stat-value">50+</div>
          <div class="stat-label">Production Components</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">⚡</div>
          <div class="stat-value">0</div>
          <div class="stat-label">External Dependencies</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🎯</div>
          <div class="stat-value">100%</div>
          <div class="stat-label">Standalone & Typed</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🎨</div>
          <div class="stat-value">CSS</div>
          <div class="stat-label">Fully Themeable</div>
        </div>
      </div>

      <!-- Highlights Section -->
      <div class="highlights-section">
        <div class="highlight-item">
          <div class="highlight-icon">✅</div>
          <div class="highlight-text">
            <div class="highlight-title">Production Ready</div>
            <p>Battle-tested components suitable for enterprise applications</p>
          </div>
        </div>
        <div class="highlight-item">
          <div class="highlight-icon">🔒</div>
          <div class="highlight-text">
            <div class="highlight-title">Type Safe</div>
            <p>Fully typed with TypeScript for maximum IDE support</p>
          </div>
        </div>
        <div class="highlight-item">
          <div class="highlight-icon">📊</div>
          <div class="highlight-text">
            <div class="highlight-title">Rich Components</div>
            <p>Charts, grids, forms, dialogs, and more out of the box</p>
          </div>
        </div>
      </div>

      <!-- Quick Install -->
      <div class="quick-install">
        <div class="install-header">Quick Start</div>
        <pre class="install-code">npm install ngx-core-components</pre>
      </div>

      <!-- Component Categories -->
      <div class="section-title">📦 Component Library (50+)</div>
      <div class="category-intro">Complete set of components for building enterprise applications</div>

      <div class="section-title">🖱️ Buttons & Actions (5 Components)</div>
      <div class="cards-grid">
        @for (card of buttonComponents; track card.title) {
          <a class="component-card" [routerLink]="card.route">
            <div class="card-icon">{{ card.icon }}</div>
            <div class="card-body">
              <div class="card-title">{{ card.title }}</div>
              <p class="card-desc">{{ card.description }}</p>
              <div class="card-features">
                @for (f of card.features.slice(0, 3); track f) {
                  <span class="feature-chip">{{ f }}</span>
                }
              </div>
            </div>
          </a>
        }
      </div>

      <div class="section-title">🧩 Layout (5 Components)</div>
      <div class="cards-grid">
        @for (card of layoutComponents; track card.title) {
          <a class="component-card" [routerLink]="card.route">
            <div class="card-icon">{{ card.icon }}</div>
            <div class="card-body">
              <div class="card-title">{{ card.title }}</div>
              <p class="card-desc">{{ card.description }}</p>
              <div class="card-features">
                @for (f of card.features.slice(0, 3); track f) {
                  <span class="feature-chip">{{ f }}</span>
                }
              </div>
            </div>
          </a>
        }
      </div>

      <div class="section-title">📊 Charts & Visualization (5 Components)</div>
      <div class="cards-grid">
        @for (card of chartComponents; track card.title) {
          <a class="component-card" [routerLink]="card.route">
            <div class="card-icon">{{ card.icon }}</div>
            <div class="card-body">
              <div class="card-title">{{ card.title }}</div>
              <p class="card-desc">{{ card.description }}</p>
              <div class="card-features">
                @for (f of card.features.slice(0, 3); track f) {
                  <span class="feature-chip">{{ f }}</span>
                }
              </div>
            </div>
          </a>
        }
      </div>

      <div class="section-title">✏️ Form Inputs (15 Components)</div>
      <div class="cards-grid">
        @for (card of inputComponents; track card.title) {
          <a class="component-card" [routerLink]="card.route">
            <div class="card-icon">{{ card.icon }}</div>
            <div class="card-body">
              <div class="card-title">{{ card.title }}</div>
              <p class="card-desc">{{ card.description }}</p>
              <div class="card-features">
                @for (f of card.features.slice(0, 3); track f) {
                  <span class="feature-chip">{{ f }}</span>
                }
              </div>
            </div>
          </a>
        }
      </div>

      <div class="section-title">🔔 Feedback (4 Components)</div>
      <div class="cards-grid">
        @for (card of feedbackComponents; track card.title) {
          <a class="component-card" [routerLink]="card.route">
            <div class="card-icon">{{ card.icon }}</div>
            <div class="card-body">
              <div class="card-title">{{ card.title }}</div>
              <p class="card-desc">{{ card.description }}</p>
              <div class="card-features">
                @for (f of card.features.slice(0, 3); track f) {
                  <span class="feature-chip">{{ f }}</span>
                }
              </div>
            </div>
          </a>
        }
      </div>

      <div class="section-title">🧭 Navigation (2 Components)</div>
      <div class="cards-grid">
        @for (card of navigationComponents; track card.title) {
          <a class="component-card" [routerLink]="card.route">
            <div class="card-icon">{{ card.icon }}</div>
            <div class="card-body">
              <div class="card-title">{{ card.title }}</div>
              <p class="card-desc">{{ card.description }}</p>
              <div class="card-features">
                @for (f of card.features.slice(0, 3); track f) {
                  <span class="feature-chip">{{ f }}</span>
                }
              </div>
            </div>
          </a>
        }
      </div>

      <div class="section-title">▦ Barcodes (2 Components)</div>
      <div class="cards-grid">
        @for (card of barcodeComponents; track card.title) {
          <a class="component-card" [routerLink]="card.route">
            <div class="card-icon">{{ card.icon }}</div>
            <div class="card-body">
              <div class="card-title">{{ card.title }}</div>
              <p class="card-desc">{{ card.description }}</p>
              <div class="card-features">
                @for (f of card.features.slice(0, 3); track f) {
                  <span class="feature-chip">{{ f }}</span>
                }
              </div>
            </div>
          </a>
        }
      </div>

      <div class="section-title">🗂️ Data Display & Tables (4 Components)</div>
      <div class="cards-grid">
        @for (card of dataComponents; track card.title) {
          <a class="component-card" [routerLink]="card.route">
            <div class="card-icon">{{ card.icon }}</div>
            <div class="card-body">
              <div class="card-title">{{ card.title }}</div>
              <p class="card-desc">{{ card.description }}</p>
              <div class="card-features">
                @for (f of card.features.slice(0, 3); track f) {
                  <span class="feature-chip">{{ f }}</span>
                }
              </div>
            </div>
          </a>
        }
      </div>

      <div class="section-title">🪟 Overlays & Modals (1 Component)</div>
      <div class="cards-grid">
        @for (card of overlayComponents; track card.title) {
          <a class="component-card" [routerLink]="card.route">
            <div class="card-icon">{{ card.icon }}</div>
            <div class="card-body">
              <div class="card-title">{{ card.title }}</div>
              <p class="card-desc">{{ card.description }}</p>
              <div class="card-features">
                @for (f of card.features.slice(0, 3); track f) {
                  <span class="feature-chip">{{ f }}</span>
                }
              </div>
            </div>
          </a>
        }
      </div>

      <!-- Enterprise Features -->
      <div class="section-title">🏢 Enterprise Features</div>
      <div class="features-grid">
        @for (feat of features; track feat.title) {
          <div class="feature-card">
            <div class="feature-icon">{{ feat.icon }}</div>
            <div class="feature-title">{{ feat.title }}</div>
            <div class="feature-desc">{{ feat.desc }}</div>
          </div>
        }
      </div>

      <!-- Code Examples -->
      <div class="section-title">💻 Usage Examples</div>
      <div class="quickstart-grid">
        @for (ex of quickStartExamples; track ex.title) {
          <div class="qs-card">
            <div class="qs-title">{{ ex.title }}</div>
            <pre class="code-block">{{ ex.code }}</pre>
          </div>
        }
      </div>

      <!-- Footer -->
      <div class="home-footer">
        <p>ngx-core-components · MIT License · Built with ❤️ for Angular developers</p>
      </div>
    </div>
  `,
  styles: [`
    :host { display: flex; flex-direction: column; height: 100%; overflow-y: auto; background: #f7f8fb; }
    .home-page { padding: 40px; max-width: 1400px; margin: 0 auto; width: 100%; }

    /* Hero */
    .hero { text-align: center; padding: 60px 0 40px; }
    .hero-badge {
      display: inline-block; background: #e8f0fe; color: #0f0f23;
      font-size: 12px; font-weight: 700; letter-spacing: 0.5px;
      padding: 6px 16px; border-radius: 20px; margin-bottom: 24px;
    }
    .hero-title { margin: 0 0 16px; font-size: 48px; font-weight: 800; color: #0f0f23; letter-spacing: -1px; }
    .hero-subtitle { margin: 0 auto 32px; max-width: 720px; font-size: 16px; color: #6c757d; line-height: 1.7; }
    .hero-actions { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }

    .btn {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 12px 28px; border-radius: 8px; text-decoration: none;
      font-size: 14px; font-weight: 600; transition: all 0.2s ease;
      border: none; cursor: pointer;
    }
    .btn-primary {
      background: #0f0f23; color: #fff;
      &:hover { transform: translateY(-2px); box-shadow: 0 8px 16px rgba(15, 15, 35, 0.2); }
    }
    .btn-secondary {
      background: #fff; color: #0f0f23; border: 2px solid #0f0f23;
      &:hover { background: #f7f8fb; }
    }

    /* Stats */
    .stats-section { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 16px; margin: 40px 0; }
    .stat-card {
      background: #fff; border: 1px solid #e8ecf1; border-radius: 10px;
      padding: 24px; text-align: center; transition: all 0.2s ease;
      &:hover { border-color: #0f0f23; box-shadow: 0 4px 12px rgba(15, 15, 35, 0.08); }
    }
    .stat-icon { font-size: 28px; margin-bottom: 8px; }
    .stat-value { font-size: 28px; font-weight: 800; color: #0f0f23; margin-bottom: 4px; }
    .stat-label { font-size: 12px; color: #6c757d; font-weight: 500; }

    /* Quick Install */
    .quick-install { background: #1e1e1e; border-radius: 10px; padding: 24px; margin: 40px 0; }
    .install-header { font-size: 12px; font-weight: 700; color: #888; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 12px; }
    .install-code { margin: 0; color: #d4d4d4; font-family: 'Cascadia Code', Consolas, monospace; font-size: 14px; }

    /* Section Title */
    .section-title { font-size: 22px; font-weight: 700; color: #212529; margin: 48px 0 24px; padding-bottom: 12px; border-bottom: 2px solid #e8ecf1; }

    /* Component Cards */
    .cards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 16px; margin-bottom: 32px; }
    .component-card {
      background: #fff; border: 1px solid #e8ecf1; border-radius: 10px;
      padding: 20px; text-decoration: none; display: flex; gap: 16px;
      transition: all 0.2s ease; cursor: pointer;
      &:hover { border-color: #0f0f23; box-shadow: 0 8px 24px rgba(15, 15, 35, 0.12); transform: translateY(-2px); }
    }
    .card-icon { font-size: 32px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
    .card-body { flex: 1; }
    .card-title { font-size: 15px; font-weight: 700; color: #212529; margin: 0 0 6px; }
    .card-desc { margin: 0 0 10px; font-size: 13px; color: #6c757d; line-height: 1.5; }
    .card-features { display: flex; flex-wrap: wrap; gap: 6px; }
    .feature-chip { background: #f1f3f5; color: #495057; font-size: 11px; padding: 3px 8px; border-radius: 10px; }

    /* Features */
    .features-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 20px; margin-bottom: 32px; }
    .feature-card { background: #fff; border: 1px solid #e8ecf1; border-radius: 10px; padding: 24px; transition: all 0.2s ease; }
    .feature-card:hover { border-color: #0f0f23; box-shadow: 0 4px 12px rgba(15, 15, 35, 0.08); }
    .feature-icon { font-size: 32px; margin-bottom: 12px; }
    .feature-title { font-size: 15px; font-weight: 700; color: #212529; margin-bottom: 8px; }
    .feature-desc { font-size: 13px; color: #6c757d; line-height: 1.6; margin: 0; }

    /* Quick Start */
    .quickstart-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 16px; margin-bottom: 32px; }
    .qs-card { background: #1e1e1e; border-radius: 8px; padding: 16px; }
    .qs-title { font-size: 11px; font-weight: 700; color: #888; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 12px; }
    .code-block { margin: 0; color: #d4d4d4; font-family: 'Cascadia Code', Consolas, monospace; font-size: 12px; max-height: 300px; overflow-y: auto; }

    /* Footer */
    .home-footer { text-align: center; padding: 40px 0 20px; color: #adb5bd; font-size: 12px; border-top: 1px solid #e8ecf1; margin-top: 32px; }

    .highlights-section { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin: 40px 0; }
    .highlight-item { display: flex; gap: 16px; padding: 20px; background: #fff; border: 1px solid #e8ecf1; border-radius: 10px; }
    .highlight-icon { font-size: 32px; flex-shrink: 0; }
    .highlight-text { flex: 1; }
    .highlight-title { font-size: 15px; font-weight: 700; color: #212529; margin: 0 0 4px; }
    .highlight-text p { margin: 0; font-size: 13px; color: #6c757d; line-height: 1.5; }

    .category-intro { font-size: 14px; color: #6c757d; margin: -16px 0 24px 0; font-style: italic; }

    @media (max-width: 768px) {
      .home-page { padding: 24px; }
      .hero-title { font-size: 32px; }
      .section-title { font-size: 18px; }
      .cards-grid { grid-template-columns: 1fr; }
      .highlights-section { grid-template-columns: 1fr; }
    }
  `]
})
export class HomeComponent {

  buttonComponents: ComponentCard[] = [
    {
      icon: '🖱️',
      title: 'Buttons & Actions',
      description: 'Button, ButtonGroup, Chip, SplitButton, and DropdownButton components for primary user actions.',
      route: '/buttons',
      tag: 'Buttons',
      tagColor: '#0f766e',
      features: ['Variants', 'Sizes', 'Loading', 'Split Actions', 'Chips'],
    },
  ];

  layoutComponents: ComponentCard[] = [
    {
      icon: '🧩',
      title: 'Layout Components',
      description: 'Card, TabStrip, Accordion, Stepper, and Splitter for structured layouts and guided flows.',
      route: '/layout',
      tag: 'Layout',
      tagColor: '#1d4ed8',
      features: ['Cards', 'Tabs', 'Accordion', 'Stepper', 'Resizable Panes'],
    },
  ];


  chartComponents: ComponentCard[] = [
    {
      icon: '📊',
      title: 'Bar Chart',
      description: 'SVG-based vertical/horizontal bar chart. Supports grouped and stacked modes.',
      route: '/charts',
      tag: 'Charts',
      tagColor: '#8e44ad',
      features: ['Grouped', 'Stacked', 'Tooltip', 'Legend', 'Grid lines'],
    },
    {
      icon: '📈',
      title: 'Line Chart',
      description: 'Multi-series smooth bezier line chart with optional area fill and crosshair tooltip.',
      route: '/charts',
      tag: 'Charts',
      tagColor: '#8e44ad',
      features: ['Multi-series', 'Area fill', 'Markers', 'Crosshair'],
    },
    {
      icon: '🥧',
      title: 'Pie / Donut Chart',
      description: 'SVG arc-based pie chart with donut mode, center text, hover highlights and legend.',
      route: '/charts',
      tag: 'Charts',
      tagColor: '#8e44ad',
      features: ['Pie + Donut', 'Center label', 'Hover highlight', 'Labels'],
    },
    {
      icon: '⚡',
      title: 'Sparkline',
      description: 'Inline mini chart for dashboards. Supports line, area, and bar types with no axes.',
      route: '/charts',
      tag: 'Charts',
      tagColor: '#8e44ad',
      features: ['Line', 'Area', 'Bar', 'No axes', 'Inline'],
    },
    {
      icon: '📅',
      title: 'Gantt Chart',
      description: 'Full-featured project timeline with drag-and-drop, dependencies, milestones and zoom.',
      route: '/basic',
      tag: 'Charts',
      tagColor: '#8e44ad',
      features: ['Drag & Drop', 'Dependencies', 'Milestones', 'Zoom', 'Keyboard'],
    },
  ];

  inputComponents: ComponentCard[] = [
    {
      icon: '✏️',
      title: 'TextBox',
      description: 'Styled text input with label, hint, error, disabled and readonly states.',
      route: '/inputs',
      tag: 'Inputs',
      tagColor: '#27ae60',
      features: ['Label', 'Hint', 'Error state', 'Readonly', 'Disabled'],
    },
    {
      icon: '🔽',
      title: 'Dropdown',
      description: 'Custom-rendered dropdown with filtering, keyboard navigation, and accessibility.',
      route: '/inputs',
      tag: 'Inputs',
      tagColor: '#27ae60',
      features: ['Filterable', 'Keyboard nav', 'Disabled', 'Custom options'],
    },
    {
      icon: '📅',
      title: 'DatePicker',
      description: 'Date input with calendar popup, prev/next navigation, min/max constraints.',
      route: '/inputs',
      tag: 'Inputs',
      tagColor: '#27ae60',
      features: ['Calendar popup', 'Min/Max', 'Today highlight', 'Format'],
    },
    {
      icon: '☑️',
      title: 'MultiSelect',
      description: 'Dropdown with checkboxes, removable tag chips, Select All, and built-in filtering.',
      route: '/inputs',
      tag: 'Inputs',
      tagColor: '#27ae60',
      features: ['Tag chips', 'Select All', 'Filterable', 'Max tags'],
    },
    {
      icon: '✅',
      title: 'Checkbox',
      description: 'Accessible checkbox with indeterminate state, disabled mode, and ControlValueAccessor support.',
      route: '/inputs',
      tag: 'Inputs',
      tagColor: '#27ae60',
      features: ['Indeterminate', 'ControlValueAccessor', 'Disabled', 'Accessible'],
    },
    {
      icon: '🔘',
      title: 'Radio Group',
      description: 'Radio button group with vertical and inline layouts. ControlValueAccessor support for Reactive Forms.',
      route: '/inputs',
      tag: 'Inputs',
      tagColor: '#27ae60',
      features: ['Vertical / Inline', 'ControlValueAccessor', 'Disabled', 'Custom options'],
    },
    {
      icon: '🔍',
      title: 'Autocomplete',
      description: 'Text input with type-ahead suggestion dropdown, keyboard navigation, and min-length filter.',
      route: '/inputs',
      tag: 'Inputs',
      tagColor: '#27ae60',
      features: ['Type-ahead', 'Keyboard nav', 'Min-length', 'ControlValueAccessor'],
    },
    {
      icon: '🎚️',
      title: 'Slider, Switch, Rating',
      description: 'Interactive numeric and boolean controls for modern forms and preference settings.',
      route: '/inputs',
      tag: 'Inputs',
      tagColor: '#27ae60',
      features: ['Range slider', 'Toggle switch', 'Star rating'],
    },
    {
      icon: '🔢',
      title: 'Numeric, Time & Date Range',
      description: 'NumericTextBox, TimePicker, and DateRangePicker for precise structured input.',
      route: '/inputs',
      tag: 'Inputs',
      tagColor: '#27ae60',
      features: ['Spin controls', '12/24h time', 'Range selection'],
    },
    {
      icon: '🎨',
      title: 'Textarea & Color Picker',
      description: 'Extended input controls including multi-line content and color selection workflows.',
      route: '/inputs',
      tag: 'Inputs',
      tagColor: '#27ae60',
      features: ['Auto resize', 'Character count', 'Color palette'],
    },
  ];

  feedbackComponents: ComponentCard[] = [
    {
      icon: '🔔',
      title: 'Feedback Components',
      description: 'Badge, ProgressBar, Skeleton, and Notification service to communicate state and progress.',
      route: '/feedback',
      tag: 'Feedback',
      tagColor: '#a16207',
      features: ['Status badges', 'Progress', 'Loading skeletons', 'Toasts'],
    },
  ];

  navigationComponents: ComponentCard[] = [
    {
      icon: '🧭',
      title: 'Navigation Components',
      description: 'Breadcrumb and Menu components for orientation, hierarchy, and quick access actions.',
      route: '/navigation',
      tag: 'Navigation',
      tagColor: '#7c2d12',
      features: ['Breadcrumbs', 'Horizontal menu', 'Vertical menu'],
    },
  ];

  barcodeComponents: ComponentCard[] = [
    {
      icon: '▦',
      title: 'Barcodes & QR',
      description: 'Generate QR code and barcode visuals directly in Angular templates.',
      route: '/barcodes',
      tag: 'Barcodes',
      tagColor: '#374151',
      features: ['QR rendering', 'SVG barcode', 'Custom size/colors'],
    },
  ];

  dataComponents: ComponentCard[] = [
    {
      icon: '🗂️',
      title: 'Data Grid',
      description: 'Enterprise data grid with client/server operations, grouping, templates, nested rows, and inline editing.',
      route: '/grid',
      tag: 'Data',
      tagColor: '#e67e22',
      features: ['Client/Server', 'Grouping', 'Templates', 'Nested row', 'Inline edit', 'Selection'],
    },
    {
      icon: '🌳',
      title: 'Tree View',
      description: 'Collapsible tree with indent guides, chevron toggles, checkboxes, and selection support.',
      route: '/tree-list',
      tag: 'Data',
      tagColor: '#e67e22',
      features: ['Expand/Collapse', 'Checkboxes', 'Icons', 'Selectable'],
    },
    {
      icon: '📋',
      title: 'List View',
      description: 'Scrollable list with single/multi selection and custom item templates via ng-template.',
      route: '/tree-list',
      tag: 'Data',
      tagColor: '#e67e22',
      features: ['Custom template', 'Multi-select', 'Loading', 'Header/Footer'],
    },
    {
      icon: '💬',
      title: 'Tooltip & Popover',
      description: 'Tooltip directive for hover hints (4 positions) and Popover component for rich click overlays.',
      route: '/tooltip',
      tag: 'Data',
      tagColor: '#e67e22',
      features: ['4 positions', 'Auto-flip', 'Rich content', 'Click trigger'],
    },
  ];

  overlayComponents: ComponentCard[] = [
    {
      icon: '🪟',
      title: 'Dialog',
      description: 'Programmatically open any Angular component as a floating dialog using DialogService. No NgModule required.',
      route: '/dialog',
      tag: 'Overlay',
      tagColor: '#c0392b',
      features: ['Programmatic', 'Animated', 'Signal result', 'Backdrop close'],
    },
  ];

  features = [
    {
      icon: '🔒',
      title: 'Type Safe & Typed',
      desc: 'Full TypeScript support with comprehensive type definitions for maximum IDE support and compile-time safety.',
    },
    {
      icon: '⚡',
      title: 'Angular Signals',
      desc: 'Built with the new signal-based input() / output() API. Full OnPush change detection compatibility.',
    },
    {
      icon: '🎨',
      title: 'CSS Custom Properties',
      desc: 'Every component exposes --ngx-* CSS variables for complete theme control without overrides.',
    },
    {
      icon: '📦',
      title: 'Zero Dependencies',
      desc: 'No third-party libraries. Pure Angular with native DOM APIs only. Minimal bundle size.',
    },
    {
      icon: '🧩',
      title: 'Standalone Components',
      desc: 'Import exactly what you need. No NgModule required. Tree-shaking friendly for optimal builds.',
    },
    {
      icon: '♿',
      title: 'Accessible by Default',
      desc: 'ARIA attributes, keyboard navigation, and focus management built into every component.',
    },
  ];

  quickStartExamples = [
    {
      title: 'Bar Chart',
      code: `import { BarChartComponent, ChartSeries } from 'ngx-core-components';

@Component({
  imports: [BarChartComponent],
  template: \`
    <ngx-bar-chart
      [series]="data"
      [categories]="months"
      [showLegend]="true"
      [height]="300"
    />
  \`
})
export class MyComponent {
  months = ['Jan', 'Feb', 'Mar', 'Apr'];
  data: ChartSeries[] = [
    { name: 'Revenue', data: [42, 58, 51, 73] },
    { name: 'Expenses', data: [31, 44, 38, 52] },
  ];
}`,
    },
    {
      title: 'Data Grid',
      code: `import {
  DataGridComponent,
  GridColumnDef,
  GridDataStateChangeEvent,
} from 'ngx-core-components';

@Component({
  imports: [DataGridComponent],
  template: \`
    <ngx-data-grid
      [data]="pageRows"
      [columns]="columns"
      [page]="page"
      [pageSize]="10"
      [total]="total"
      [sortMode]="'server'"
      [filterMode]="'server'"
      [groupMode]="'server'"
      [pagingMode]="'server'"
      [groupBy]="group"
      [groupedData]="groupedRows"
      [selectable]="true"
      [editable]="true"
      [detailRowTemplate]="detailTpl"
      (dataStateChange)="onDataStateChange($event)"
      (rowUpdate)="onRowUpdate($event)"
    />
  \`
})
export class MyComponent {
  page = 1;
  total = 0;
  pageRows = [];
  groupedRows = [];
  group: { field: string; dir?: 'asc' | 'desc' } | null = { field: 'department', dir: 'asc' };

  columns: GridColumnDef[] = [
    { field: 'name', title: 'Name', sortable: true, filterable: true, editable: true },
    { field: 'department', title: 'Department', sortable: true, filterable: true, groupable: true },
    { field: 'salary', title: 'Salary', sortable: true, align: 'right', editable: true },
  ];

  onDataStateChange(state: GridDataStateChangeEvent): void {
    // call API with page, sort, filters, grouping
  }

  onRowUpdate(event: any): void {
    // persist inline edit changes
  }
}`,
    },
    {
      title: 'Dropdown',
      code: `import { DropdownComponent, DropdownOption } from 'ngx-core-components';

@Component({
  imports: [DropdownComponent],
  template: \`
    <ngx-dropdown
      [options]="options"
      [value]="selected()"
      label="Country"
      placeholder="Select..."
      [filterable]="true"
      (valueChange)="selected.set($event)"
    />
    <p>Selected: {{ selected() }}</p>
  \`
})
export class MyComponent {
  selected = signal<unknown>(null);
  options: DropdownOption[] = [
    { label: 'United States', value: 'us' },
    { label: 'Germany', value: 'de' },
  ];
}`,
    },
    {
      title: 'Tooltip & Popover',
      code: `import { TooltipDirective, PopoverComponent } from 'ngx-core-components';

@Component({
  imports: [TooltipDirective, PopoverComponent],
  template: \`
    <!-- Tooltip (hover) -->
    <button [ngxTooltip]="'Save document'"
            tooltipPosition="top">
      Save
    </button>

    <!-- Popover (click) -->
    <ngx-popover title="User Info" position="bottom">
      <button popoverTrigger>View Details</button>
      <div popoverBody>
        <p>Rich content here.</p>
      </div>
    </ngx-popover>
  \`
})
export class MyComponent {}`,
    },
  ];
}

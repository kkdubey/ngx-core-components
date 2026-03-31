import { Component } from '@angular/core';

@Component({
  selector: 'app-getting-started',
  standalone: true,
  template: `
    <div class="docs-page">
      <div class="docs-content">
        <h1>How to Use ngx-core-components</h1>

        <section class="doc-section">
          <h2>1. Installation</h2>
          <pre class="code-block"><code>npm install ngx-core-components</code></pre>
        </section>

        <section class="doc-section">
          <h2>2. Import the Component</h2>
          <pre class="code-block"><code>{{ importCode }}</code></pre>
        </section>

        <section class="doc-section">
          <h2>3. Basic Usage</h2>
          <p>Add the Gantt chart to your template:</p>
          <pre class="code-block"><code>{{ templateCode }}</code></pre>
        </section>

        <section class="doc-section">
          <h2>4. Define Your Data</h2>
          <pre class="code-block"><code>{{ dataCode }}</code></pre>
        </section>

        <section class="doc-section">
          <h2>5. Configuration Options</h2>
          <pre class="code-block"><code>{{ configCode }}</code></pre>
          <table class="prop-table">
            <thead>
              <tr><th>Property</th><th>Type</th><th>Default</th><th>Description</th></tr>
            </thead>
            <tbody>
              <tr><td>zoomLevel</td><td>ZoomLevel</td><td>Day</td><td>Timeline zoom level (Day, Week, Month)</td></tr>
              <tr><td>rowHeight</td><td>number</td><td>40</td><td>Height of each task row in pixels</td></tr>
              <tr><td>columnWidth</td><td>number</td><td>40</td><td>Width of each column in pixels</td></tr>
              <tr><td>sidebarWidth</td><td>number</td><td>280</td><td>Width of the left tree panel</td></tr>
              <tr><td>headerHeight</td><td>number</td><td>60</td><td>Height of the timeline header</td></tr>
              <tr><td>showTodayMarker</td><td>boolean</td><td>true</td><td>Show today marker line</td></tr>
              <tr><td>showGrid</td><td>boolean</td><td>true</td><td>Show background grid</td></tr>
              <tr><td>snapTo</td><td>'day' | 'none'</td><td>'day'</td><td>Snap mode for drag operations</td></tr>
              <tr><td>collapsible</td><td>boolean</td><td>true</td><td>Allow collapsing parent tasks</td></tr>
              <tr><td>locale</td><td>string</td><td>'en-US'</td><td>Date format locale</td></tr>
            </tbody>
          </table>
        </section>

        <section class="doc-section">
          <h2>6. Events</h2>
          <table class="prop-table">
            <thead>
              <tr><th>Event</th><th>Payload</th><th>Description</th></tr>
            </thead>
            <tbody>
              <tr><td>(taskChange)</td><td>GanttTaskChangeEvent</td><td>Fired when a task is dragged or resized</td></tr>
              <tr><td>(taskClick)</td><td>GanttTaskClickEvent</td><td>Fired when a task is clicked</td></tr>
              <tr><td>(taskDblClick)</td><td>GanttTaskClickEvent</td><td>Fired on double-click</td></tr>
              <tr><td>(dependencyClick)</td><td>GanttDependencyClickEvent</td><td>Fired when a dependency line is clicked</td></tr>
              <tr><td>(zoomChange)</td><td>ZoomLevel</td><td>Fired when zoom level changes</td></tr>
            </tbody>
          </table>
        </section>

        <section class="doc-section">
          <h2>7. Public Methods</h2>
          <table class="prop-table">
            <thead>
              <tr><th>Method</th><th>Description</th></tr>
            </thead>
            <tbody>
              <tr><td>scrollToDate(date)</td><td>Scroll the timeline to a specific date</td></tr>
              <tr><td>scrollToTask(taskId)</td><td>Scroll vertically to a specific task</td></tr>
              <tr><td>expandAll()</td><td>Expand all collapsed parent tasks</td></tr>
              <tr><td>collapseAll()</td><td>Collapse all parent tasks</td></tr>
            </tbody>
          </table>
        </section>

        <section class="doc-section">
          <h2>8. Theming with CSS Custom Properties</h2>
          <pre class="code-block"><code>{{ themingCode }}</code></pre>
          <p>Available CSS variables:</p>
          <pre class="code-block"><code>{{ cssVarsCode }}</code></pre>
        </section>

        <section class="doc-section">
          <h2>9. Task Model</h2>
          <pre class="code-block"><code>{{ taskModelCode }}</code></pre>
        </section>

        <section class="doc-section">
          <h2>10. Dependency Model</h2>
          <pre class="code-block"><code>{{ depModelCode }}</code></pre>
        </section>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; height: 100%; overflow-y: auto; }
    .docs-page { padding: 24px 32px; max-width: 900px; }
    .docs-content h1 { font-size: 24px; font-weight: 700; margin: 0 0 24px; color: #212529; }
    .doc-section { margin-bottom: 28px; }
    .doc-section h2 { font-size: 16px; font-weight: 600; color: #212529; margin: 0 0 8px; }
    .doc-section p { font-size: 14px; color: #495057; margin: 4px 0 8px; }
    .code-block {
      background: #1e1e1e; color: #d4d4d4; padding: 16px; border-radius: 6px;
      font-size: 13px; font-family: 'SF Mono', Monaco, Consolas, monospace;
      overflow-x: auto; white-space: pre; line-height: 1.5;
    }
    .prop-table {
      width: 100%; border-collapse: collapse; font-size: 13px; margin-top: 8px;
    }
    .prop-table th {
      text-align: left; padding: 8px 12px; background: #f1f3f5;
      border: 1px solid #dee2e6; font-weight: 600; color: #495057;
    }
    .prop-table td {
      padding: 8px 12px; border: 1px solid #dee2e6; color: #212529;
    }
    .prop-table td:first-child { font-family: monospace; color: #e74c3c; }
  `]
})
export class GettingStartedComponent {
  importCode = `import { Component } from '@angular/core';
import {
  GanttChartComponent,
  GanttTask,
  GanttDependency,
  GanttConfig,
  ZoomLevel,
  GanttTaskChangeEvent,
} from 'ngx-core-components';

@Component({
  selector: 'app-my-gantt',
  standalone: true,
  imports: [GanttChartComponent],
  template: \`<ngx-gantt-chart [tasks]="tasks" [config]="config" />\`,
})
export class MyGanttComponent {
  tasks: GanttTask[] = [ /* ... */ ];
  config: Partial<GanttConfig> = { zoomLevel: ZoomLevel.Day };
}`;

  templateCode = `<ngx-gantt-chart
  [tasks]="tasks"
  [dependencies]="dependencies"
  [config]="config"
  (taskChange)="onTaskChange($event)"
  (taskClick)="onTaskClick($event)"
/>`;

  dataCode = `tasks: GanttTask[] = [
  {
    id: '1',
    name: 'Requirements',
    start: new Date(2025, 0, 1),
    end: new Date(2025, 0, 10),
    progress: 100,
    parentId: null,
    collapsed: false,
    isMilestone: false,
  },
  {
    id: '2',
    name: 'Design',
    start: new Date(2025, 0, 10),
    end: new Date(2025, 0, 20),
    progress: 60,
    parentId: null,
    collapsed: false,
    isMilestone: false,
    color: '#8e44ad',
  },
];

dependencies: GanttDependency[] = [
  { fromId: '1', toId: '2', type: DependencyType.FinishToStart },
];`;

  configCode = `config: Partial<GanttConfig> = {
  zoomLevel: ZoomLevel.Day,  // Day | Week | Month
  rowHeight: 36,
  columnWidth: 36,
  headerHeight: 56,
  sidebarWidth: 350,
  showTodayMarker: true,
  showGrid: true,
  snapTo: 'day',       // 'day' | 'none'
  collapsible: true,
  locale: 'en-US',
};`;

  themingCode = `/* In your component or global styles */
ngx-gantt-chart {
  --ngx-gantt-bar-bg: #0077cc;
  --ngx-gantt-bar-progress-bg: #005fa3;
  --ngx-gantt-today-color: #e74c3c;
}`;

  cssVarsCode = `--ngx-gantt-bg              /* Background color */
--ngx-gantt-alt-bg           /* Alternate row color */
--ngx-gantt-border           /* Border color */
--ngx-gantt-grid-line        /* Grid line color */
--ngx-gantt-weekend-bg       /* Weekend column background */
--ngx-gantt-header-bg        /* Header background */
--ngx-gantt-header-text      /* Header text color */
--ngx-gantt-text             /* Primary text color */
--ngx-gantt-text-secondary   /* Secondary text color */
--ngx-gantt-bar-bg           /* Task bar background */
--ngx-gantt-bar-progress-bg  /* Progress fill color */
--ngx-gantt-bar-text         /* Task bar text color */
--ngx-gantt-summary-color    /* Summary bar color */
--ngx-gantt-milestone-color  /* Milestone diamond color */
--ngx-gantt-arrow-color      /* Dependency arrow color */
--ngx-gantt-today-color      /* Today marker color */
--ngx-gantt-hover-bg         /* Row hover background */
--ngx-gantt-selected-bg      /* Selected row background */
--ngx-gantt-focus-ring       /* Focus outline color */`;

  taskModelCode = `interface GanttTask {
  id: string;
  name: string;
  start: Date;
  end: Date;
  progress: number;          // 0-100
  parentId: string | null;   // null for root tasks
  collapsed: boolean;
  isMilestone: boolean;
  color?: string;            // Custom bar color
  draggable?: boolean;       // Default: true
  cssClass?: string;
  meta?: Record<string, unknown>;
}`;

  depModelCode = `enum DependencyType {
  FinishToStart = 'FS',
  StartToStart = 'SS',
  FinishToFinish = 'FF',
  StartToFinish = 'SF',
}

interface GanttDependency {
  fromId: string;
  toId: string;
  type: DependencyType;
  color?: string;
  cssClass?: string;
}`;
}

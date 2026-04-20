import { Component } from '@angular/core';
import {
  GanttChartComponent,
  GanttTask,
  GanttConfig,
  ZoomLevel,
} from 'ngx-core-components';

interface ApiRow {
  name: string;
  type: string;
  default: string;
  description: string;
}

@Component({
  selector: 'app-large-dataset-demo',
  standalone: true,
  imports: [GanttChartComponent],
  template: `
    <div class="demo-page">
      <div class="demo-header">
        <h2 class="demo-title">Large Dataset ({{ taskCount }} tasks)</h2>
        <p class="demo-desc">Stress test with a large number of tasks. The Gantt chart handles hundreds of tasks efficiently.</p>
        <div class="demo-toolbar">
          <div class="btn-group">
            <button class="k-btn" [class.k-btn-active]="taskCount === 100" (click)="generate(100)">100</button>
            <button class="k-btn" [class.k-btn-active]="taskCount === 500" (click)="generate(500)">500</button>
            <button class="k-btn" [class.k-btn-active]="taskCount === 1000" (click)="generate(1000)">1000</button>
          </div>
          <span class="task-counter">Rendering {{ taskCount }} tasks</span>
        </div>
      </div>
      <div class="demo-chart">
        <ngx-gantt-chart
          [tasks]="tasks"
          [config]="config"
        />
      </div>

      <div style="flex-shrink:0;display:flex;flex-direction:column;gap:8px;">
        <div style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:1px;color:#868e96;">How to Use</div>
        <pre style="margin:0;background:#1e1e1e;color:#d4d4d4;padding:14px;border-radius:8px;font-size:12px;line-height:1.5;overflow:auto">{{ howToCode }}</pre>
      </div>

      <div class="api-section">
        <div class="section-label">API Reference</div>
        <div class="api-table-wrap">
          <table class="api-table">
            <thead><tr><th>Input / Output</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
            <tbody>
              @for (row of ganttApi; track row.name) {
                <tr><td class="api-name">{{ row.name }}</td><td class="api-type">{{ row.type }}</td><td class="api-default">{{ row.default }}</td><td>{{ row.description }}</td></tr>
              }
            </tbody>
          </table>
        </div>
        <div class="section-label">Config Options Used In This Demo</div>
        <div class="api-table-wrap">
          <table class="api-table">
            <thead><tr><th>Config Field</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
            <tbody>
              @for (row of ganttConfigApi; track row.name) {
                <tr><td class="api-name">{{ row.name }}</td><td class="api-type">{{ row.type }}</td><td class="api-default">{{ row.default }}</td><td>{{ row.description }}</td></tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: flex; flex-direction: column; height: 100%; }
    .demo-page { display: flex; flex-direction: column; height: 100%; padding: 16px; gap: 12px; }
    .demo-header { flex-shrink: 0; }
    .demo-title { margin: 0; font-size: 18px; font-weight: 700; color: #212529; }
    .demo-desc { margin: 4px 0 12px; font-size: 13px; color: #6c757d; }
    .demo-toolbar { display: flex; gap: 12px; align-items: center; }
    .btn-group { display: inline-flex; border-radius: 4px; overflow: hidden; border: 1px solid #ced4da; }
    .k-btn {
      padding: 6px 16px; font-size: 13px; background: #fff; border: none;
      border-right: 1px solid #ced4da; cursor: pointer; color: #495057; font-family: inherit;
    }
    .k-btn:last-child { border-right: none; }
    .k-btn:hover { background: #f1f3f5; }
    .k-btn-active { background: #ff6358 !important; color: #fff !important; }
    .task-counter { font-size: 12px; color: #6c757d; font-style: italic; }
    .demo-chart { flex: 1; min-height: 0; }
    .demo-chart ngx-gantt-chart { height: 100%; }
    .api-section { display: flex; flex-direction: column; gap: 12px; flex-shrink: 0; }
    .section-label { font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #868e96; }
    .api-table-wrap { overflow-x: auto; border: 1px solid #e9ecef; border-radius: 8px; background: #fff; }
    .api-table { width: 100%; border-collapse: collapse; font-size: 13px; }
    .api-table thead tr { background: #f8f9fa; }
    .api-table th { padding: 12px 14px; text-align: left; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.6px; color: #495057; border-bottom: 1px solid #e9ecef; }
    .api-table td { padding: 12px 14px; border-bottom: 1px solid #f1f3f5; color: #495057; vertical-align: top; }
    .api-table tbody tr:last-child td { border-bottom: none; }
    .api-name { color: #1a73e8; font-family: monospace; font-weight: 700; white-space: nowrap; }
    .api-type { color: #8e44ad; font-family: monospace; white-space: nowrap; }
    .api-default { color: #ff6358; font-family: monospace; white-space: nowrap; }
  `]
})
export class LargeDatasetDemoComponent {
  howToCode = `import { Component } from '@angular/core';
import { GanttChartComponent } from 'ngx-core-components';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [GanttChartComponent],
  template: '<ngx-gantt-chart [tasks]="tasks" [config]="config" />'
})
export class ExampleComponent {}`;

  ganttApi: ApiRow[] = [
    { name: 'tasks', type: 'GanttTask[]', default: 'required', description: 'Task collection rendered in the chart and sidebar.' },
    { name: 'dependencies', type: 'GanttDependency[]', default: '[]', description: 'Links that connect predecessor and successor tasks when provided.' },
    { name: 'config', type: 'Partial<GanttConfig>', default: '{}', description: 'Optional chart configuration such as zoom level, sizing, and behavior flags.' },
    { name: '(taskChange)', type: 'GanttTaskChangeEvent', default: '—', description: 'Emitted when a task is dragged or resized.' },
    { name: '(taskClick)', type: 'GanttTaskClickEvent', default: '—', description: 'Emitted when the user selects a task bar.' },
    { name: '(taskDblClick)', type: 'GanttTaskClickEvent', default: '—', description: 'Emitted on double-click for custom drill-in behavior.' },
    { name: '(dependencyClick)', type: 'GanttDependencyClickEvent', default: '—', description: 'Emitted when a dependency line is clicked.' },
    { name: '(scroll)', type: 'GanttScrollEvent', default: '—', description: 'Emitted while the chart scroll position changes.' },
    { name: '(zoomChange)', type: 'ZoomLevel', default: '—', description: 'Emitted when zoom changes through built-in interactions.' },
  ];

  ganttConfigApi: ApiRow[] = [
    { name: 'zoomLevel', type: 'ZoomLevel', default: "'day'", description: 'Controls the timeline granularity shown in the header.' },
    { name: 'rowHeight', type: 'number', default: '40', description: 'Height of each rendered task row.' },
    { name: 'columnWidth', type: 'number', default: '40', description: 'Width of a single timeline column at the current zoom.' },
    { name: 'headerHeight', type: 'number', default: '56', description: 'Height of the timeline header area.' },
    { name: 'sidebarWidth', type: 'number', default: '320', description: 'Width of the tree/sidebar pane.' },
    { name: 'showTodayMarker', type: 'boolean', default: 'true', description: 'Displays a vertical marker for today.' },
    { name: 'showGrid', type: 'boolean', default: 'true', description: 'Shows row and column grid lines.' },
    { name: 'snapTo', type: "'day'|'week'|'month'", default: "'day'", description: 'Snaps drag and resize actions to the chosen unit.' },
    { name: 'collapsible', type: 'boolean', default: 'true', description: 'Allows parent rows to collapse and expand.' },
  ];

  tasks: GanttTask[] = [];
  taskCount = 100;

  config: Partial<GanttConfig> = {
    zoomLevel: ZoomLevel.Day,
    rowHeight: 32,
    columnWidth: 30,
    headerHeight: 56,
    sidebarWidth: 300,
    showTodayMarker: true,
    showGrid: true,
    snapTo: 'day',
    collapsible: true,
  };

  constructor() {
    this.generate(100);
  }

  generate(count: number): void {
    this.taskCount = count;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tasks: GanttTask[] = [];
    const colors = ['#4a90d9', '#27ae60', '#8e44ad', '#e67e22', '#e74c3c', '#1abc9c', '#34495e'];
    const phases = Math.ceil(count / 10);

    for (let p = 0; p < phases; p++) {
      const phaseStart = p * 12;
      const phaseId = `phase-${p}`;
      const start = new Date(today);
      start.setDate(start.getDate() + phaseStart);
      const end = new Date(start);
      end.setDate(end.getDate() + 10);

      tasks.push({
        id: phaseId,
        name: `Phase ${p + 1}`,
        start, end,
        progress: Math.floor(Math.random() * 100),
        parentId: null,
        collapsed: p > 3,
        isMilestone: false,
      });

      const childrenCount = Math.min(10, count - tasks.length);
      for (let c = 0; c < childrenCount; c++) {
        const cStart = new Date(today);
        cStart.setDate(cStart.getDate() + phaseStart + c);
        const cEnd = new Date(cStart);
        cEnd.setDate(cEnd.getDate() + Math.floor(Math.random() * 5) + 2);

        tasks.push({
          id: `task-${p}-${c}`,
          name: `Task ${p + 1}.${c + 1}`,
          start: cStart, end: cEnd,
          progress: Math.floor(Math.random() * 100),
          parentId: phaseId,
          collapsed: false,
          isMilestone: false,
          color: colors[(p + c) % colors.length],
        });
      }

      if (tasks.length >= count) break;
    }
    this.tasks = tasks.slice(0, count);
  }
}

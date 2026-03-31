import { Component } from '@angular/core';
import {
  GanttChartComponent,
  GanttTask,
  GanttConfig,
  ZoomLevel,
} from 'ngx-core-components';

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
  `]
})
export class LargeDatasetDemoComponent {
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

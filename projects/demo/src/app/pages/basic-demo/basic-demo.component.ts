import { Component } from '@angular/core';
import {
  GanttChartComponent,
  GanttTask,
  GanttDependency,
  GanttConfig,
  ZoomLevel,
  GanttTaskChangeEvent,
  GanttTaskClickEvent,
} from 'ngx-core-components';
import { getSampleTasks, getSampleDependencies } from '../../data/sample-tasks';

@Component({
  selector: 'app-basic-demo',
  standalone: true,
  imports: [GanttChartComponent],
  template: `
    <div class="demo-page">
      <div class="demo-header">
        <h2 class="demo-title">Basic Gantt Chart</h2>
        <p class="demo-desc">A standard Gantt chart with tasks, dependencies, milestones, and zoom controls.</p>
        <div class="demo-toolbar">
          <div class="btn-group">
            <button
              class="k-btn"
              [class.k-btn-active]="currentZoom === ZoomLevel.Day"
              (click)="setZoom(ZoomLevel.Day)"
            >Day</button>
            <button
              class="k-btn"
              [class.k-btn-active]="currentZoom === ZoomLevel.Week"
              (click)="setZoom(ZoomLevel.Week)"
            >Week</button>
            <button
              class="k-btn"
              [class.k-btn-active]="currentZoom === ZoomLevel.Month"
              (click)="setZoom(ZoomLevel.Month)"
            >Month</button>
          </div>
        </div>
      </div>
      <div class="demo-chart">
        <ngx-gantt-chart
          [tasks]="tasks"
          [dependencies]="dependencies"
          [config]="config"
          (taskChange)="onTaskChange($event)"
          (taskClick)="onTaskClick($event)"
        />
      </div>
      @if (selectedTask) {
        <div class="demo-info-panel">
          <strong>Selected:</strong> {{ selectedTask.name }}
           | Progress: {{ selectedTask.progress }}%
           | {{ formatDate(selectedTask.start) }} - {{ formatDate(selectedTask.end) }}
        </div>
      }
    </div>
  `,
  styles: [`
    :host { display: flex; flex-direction: column; height: 100%; }
    .demo-page { display: flex; flex-direction: column; height: 100%; padding: 16px; gap: 12px; }
    .demo-header { flex-shrink: 0; }
    .demo-title { margin: 0; font-size: 18px; font-weight: 700; color: #212529; }
    .demo-desc { margin: 4px 0 12px; font-size: 13px; color: #6c757d; }
    .demo-toolbar { display: flex; gap: 8px; align-items: center; }
    .btn-group { display: inline-flex; border-radius: 4px; overflow: hidden; border: 1px solid #ced4da; }
    .k-btn {
      padding: 6px 16px; font-size: 13px; background: #fff; border: none;
      border-right: 1px solid #ced4da; cursor: pointer; color: #495057;
      transition: all 0.12s ease; font-family: inherit;
    }
    .k-btn:last-child { border-right: none; }
    .k-btn:hover { background: #f1f3f5; }
    .k-btn-active { background: #ff6358 !important; color: #fff !important; }
    .demo-chart { flex: 1; min-height: 0; }
    .demo-chart ngx-gantt-chart { height: 100%; }
    .demo-info-panel {
      flex-shrink: 0; padding: 8px 16px; background: #e8f0fe;
      border-radius: 4px; font-size: 13px; color: #1a73e8;
    }
  `]
})
export class BasicDemoComponent {
  tasks: GanttTask[] = getSampleTasks();
  dependencies: GanttDependency[] = getSampleDependencies();
  currentZoom = ZoomLevel.Day;
  selectedTask: GanttTask | null = null;

  config: Partial<GanttConfig> = {
    zoomLevel: ZoomLevel.Day,
    rowHeight: 36,
    columnWidth: 36,
    headerHeight: 56,
    sidebarWidth: 350,
    showTodayMarker: true,
    showGrid: true,
    snapTo: 'day',
    collapsible: true,
  };

  protected readonly ZoomLevel = ZoomLevel;

  setZoom(level: ZoomLevel): void {
    this.currentZoom = level;
    const widthMap: Record<string, number> = {
      [ZoomLevel.Day]: 36,
      [ZoomLevel.Week]: 120,
      [ZoomLevel.Month]: 180,
    };
    this.config = { ...this.config, zoomLevel: level, columnWidth: widthMap[level] };
  }

  onTaskChange(event: GanttTaskChangeEvent): void {
    this.tasks = this.tasks.map(t =>
      t.id === event.task.id ? { ...t, start: event.task.start, end: event.task.end } : t
    );
  }

  onTaskClick(event: GanttTaskClickEvent): void {
    this.selectedTask = event.task;
  }

  formatDate(d: Date): string {
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
}

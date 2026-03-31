import { Component, ViewChild } from '@angular/core';
import {
  GanttChartComponent,
  GanttTask,
  GanttDependency,
  GanttConfig,
  ZoomLevel,
  GanttTaskChangeEvent,
  GanttTaskClickEvent,
  GanttDependencyClickEvent,
} from 'ngx-core-components';
import { getSampleTasks, getSampleDependencies } from '../../data/sample-tasks';

@Component({
  selector: 'app-interactive-demo',
  standalone: true,
  imports: [GanttChartComponent],
  template: `
    <div class="demo-page">
      <div class="demo-header">
        <h2 class="demo-title">Interactive Demo</h2>
        <p class="demo-desc">Drag to move tasks, resize from edges, click to select. All events are logged below.</p>
        <div class="demo-toolbar">
          <div class="btn-group">
            <button class="k-btn" [class.k-btn-active]="currentZoom === ZoomLevel.Day" (click)="setZoom(ZoomLevel.Day)">Day</button>
            <button class="k-btn" [class.k-btn-active]="currentZoom === ZoomLevel.Week" (click)="setZoom(ZoomLevel.Week)">Week</button>
            <button class="k-btn" [class.k-btn-active]="currentZoom === ZoomLevel.Month" (click)="setZoom(ZoomLevel.Month)">Month</button>
          </div>
          <button class="k-btn-flat" (click)="gantt.expandAll()">Expand All</button>
          <button class="k-btn-flat" (click)="gantt.collapseAll()">Collapse All</button>
          <button class="k-btn-flat" (click)="gantt.scrollToDate(today)">Go to Today</button>
          <button class="k-btn-flat" (click)="clearLog()">Clear Log</button>
        </div>
      </div>

      <div class="demo-chart">
        <ngx-gantt-chart
          #gantt
          [tasks]="tasks"
          [dependencies]="dependencies"
          [config]="config"
          (taskChange)="onTaskChange($event)"
          (taskClick)="onTaskClick($event)"
          (taskDblClick)="onTaskDblClick($event)"
          (dependencyClick)="onDependencyClick($event)"
        />
      </div>

      <div class="event-log">
        <div class="log-header">
          <span class="log-title">Event Log</span>
          <span class="log-count">{{ eventLog.length }} events</span>
        </div>
        <div class="log-entries">
          @if (eventLog.length === 0) {
            <p class="log-empty">Interact with the Gantt chart to see events here...</p>
          }
          @for (entry of eventLog; track $index) {
            <div class="log-entry">{{ entry }}</div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: flex; flex-direction: column; height: 100%; }
    .demo-page { display: flex; flex-direction: column; height: 100%; padding: 16px; gap: 12px; }
    .demo-header { flex-shrink: 0; }
    .demo-title { margin: 0; font-size: 18px; font-weight: 700; }
    .demo-desc { margin: 4px 0 12px; font-size: 13px; color: #6c757d; }
    .demo-toolbar { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
    .btn-group { display: inline-flex; border-radius: 4px; overflow: hidden; border: 1px solid #ced4da; }
    .k-btn {
      padding: 6px 16px; font-size: 13px; background: #fff; border: none;
      border-right: 1px solid #ced4da; cursor: pointer; color: #495057; font-family: inherit;
    }
    .k-btn:last-child { border-right: none; }
    .k-btn:hover { background: #f1f3f5; }
    .k-btn-active { background: #ff6358 !important; color: #fff !important; }
    .k-btn-flat {
      background: transparent; border: 1px solid #ced4da; border-radius: 4px;
      padding: 6px 12px; font-size: 13px; cursor: pointer; color: #495057; font-family: inherit;
    }
    .k-btn-flat:hover { background: #f1f3f5; }
    .demo-chart { flex: 1; min-height: 0; }
    .demo-chart ngx-gantt-chart { height: 100%; }
    .event-log {
      flex-shrink: 0; height: 140px; border: 1px solid #dee2e6;
      background: #fff; border-radius: 4px; overflow: hidden;
      display: flex; flex-direction: column;
    }
    .log-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 6px 16px; border-bottom: 1px solid #f1f3f5; flex-shrink: 0;
    }
    .log-title { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #868e96; }
    .log-count { font-size: 11px; color: #adb5bd; }
    .log-entries { overflow-y: auto; flex: 1; padding: 4px 16px; }
    .log-entry {
      font-size: 12px; font-family: 'SF Mono', Monaco, Consolas, monospace;
      padding: 3px 0; color: #495057; border-bottom: 1px solid #f8f9fa;
    }
    .log-empty { font-size: 12px; color: #adb5bd; font-style: italic; }
  `]
})
export class InteractiveDemoComponent {
  @ViewChild('gantt') gantt!: GanttChartComponent;

  tasks: GanttTask[] = getSampleTasks();
  dependencies: GanttDependency[] = getSampleDependencies();
  eventLog: string[] = [];
  currentZoom = ZoomLevel.Day;
  today = new Date();

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
    this.log(`Zoom changed to: ${level}`);
  }

  onTaskChange(event: GanttTaskChangeEvent): void {
    this.tasks = this.tasks.map(t =>
      t.id === event.task.id ? { ...t, start: event.task.start, end: event.task.end } : t
    );
    this.log(`Task moved: "${event.task.name}" ${this.fmt(event.previousStart)} -> ${this.fmt(event.task.start)}`);
  }

  onTaskClick(event: GanttTaskClickEvent): void {
    this.log(`Clicked: "${event.task.name}" (${event.task.progress}% complete)`);
  }

  onTaskDblClick(event: GanttTaskClickEvent): void {
    this.log(`Double-clicked: "${event.task.name}"`);
  }

  onDependencyClick(event: GanttDependencyClickEvent): void {
    this.log(`Dependency: ${event.dependency.fromId} -> ${event.dependency.toId} (${event.dependency.type})`);
  }

  clearLog(): void {
    this.eventLog = [];
  }

  private log(msg: string): void {
    const time = new Date().toLocaleTimeString('en-US', { hour12: false });
    this.eventLog = [`[${time}] ${msg}`, ...this.eventLog.slice(0, 49)];
  }

  private fmt(d: Date): string {
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
}

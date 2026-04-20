# ngx-core-components

Angular 19 / 20 / 21 standalone component library with enterprise-ready UI building blocks including a full-featured **SVG Gantt Chart**, inputs, data grid, dialogs, charts, navigation, layout, feedback, and barcode components.

[![npm version](https://img.shields.io/npm/v/ngx-core-components.svg)](https://www.npmjs.com/package/ngx-core-components)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Features

- **Gantt chart** with task bars, dependencies, milestones, drag/resize, zoom, and hierarchy
- **Input controls** including text, dropdown, multi-select, autocomplete, date/time, slider, switch, rating, and color picker
- **Charts** including bar, line, pie, donut, and sparkline
- **Data presentation** with grid, tree view, and list view
- **Dialogs, tooltips, and popovers** for overlays and contextual UI
- **Buttons, chips, menus, breadcrumbs, tabs, cards, accordions, steppers, and splitters**
- **Feedback components** including badge, progress bar, skeleton, and notifications
- **Barcode and QR code generation** with no external runtime dependency
- **Fully themeable** via CSS custom properties
- **Zero runtime dependencies** — only Angular peer dependencies
- **OnPush change detection** + Angular Signals
- **Standalone components** (no NgModules)

## Installation

```bash
npm install ngx-core-components
```

## Entry Points

You can import from the primary package for convenience:

```typescript
import { GanttChartComponent, TextBoxComponent, DataGridComponent } from 'ngx-core-components';
```

Or use secondary entry points for more focused imports:

```typescript
import { TextBoxComponent, DropdownComponent } from 'ngx-core-components/inputs';
import { BarChartComponent, GanttChartComponent } from 'ngx-core-components/charts';
import { DataGridComponent } from 'ngx-core-components/grid';
import { DialogService } from 'ngx-core-components/dialog';
import { ButtonComponent } from 'ngx-core-components/buttons';
import { CardComponent } from 'ngx-core-components/layout';
import { BadgeComponent } from 'ngx-core-components/feedback';
import { BreadcrumbComponent } from 'ngx-core-components/navigation';
import { TreeViewComponent, ListViewComponent } from 'ngx-core-components/views';
import { QrCodeComponent, BarcodeComponent } from 'ngx-core-components/barcodes';
```

## Included Components

### Charts

- `GanttChartComponent`
- `BarChartComponent`
- `LineChartComponent`
- `PieChartComponent`
- `SparklineComponent`

### Inputs

- `TextBoxComponent`
- `CheckboxComponent`
- `RadioGroupComponent`
- `DropdownComponent`
- `MultiSelectComponent`
- `AutocompleteComponent`
- `DatePickerComponent`
- `SliderComponent`
- `SwitchComponent`
- `RatingComponent`
- `NumericTextBoxComponent`
- `TextareaComponent`
- `ColorPickerComponent`
- `TimePickerComponent`
- `DateRangePickerComponent`

### Data Views

- `DataGridComponent`
- `TreeViewComponent`
- `ListViewComponent`

### Dialog and Overlay

- `DialogService`
- `DialogContainerComponent`
- `TooltipDirective`
- `PopoverComponent`

### Buttons and Actions

- `ButtonComponent`
- `ButtonGroupComponent`
- `ChipComponent`
- `ChipListComponent`
- `SplitButtonComponent`
- `DropDownButtonComponent`

### Layout

- `CardComponent`
- `TabStripComponent`
- `TabComponent`
- `AccordionComponent`
- `StepperComponent`
- `SplitterComponent`

### Feedback

- `BadgeComponent`
- `ProgressBarComponent`
- `SkeletonComponent`
- `NotificationService`
- `NotificationContainerComponent`

### Navigation

- `BreadcrumbComponent`
- `MenuComponent`

### Barcodes

- `QrCodeComponent`
- `BarcodeComponent`

## Quick Start

### Gantt Chart

```typescript
import { Component } from '@angular/core';
import { GanttChartComponent, GanttTask, GanttDependency, DependencyType } from 'ngx-core-components';

@Component({
  standalone: true,
  imports: [GanttChartComponent],
  template: `
    <ngx-gantt-chart
      [tasks]="tasks"
      [dependencies]="dependencies"
      [config]="{ zoomLevel: 'day', rowHeight: 40 }"
      (taskChange)="onTaskChange($event)"
      (taskClick)="onTaskClick($event)"
    />
  `,
  styles: [`
    ngx-gantt-chart { height: 500px; }
  `]
})
export class MyComponent {
  tasks: GanttTask[] = [
    {
      id: '1', name: 'Design', progress: 100,
      start: new Date('2026-04-01'), end: new Date('2026-04-05'),
      parentId: null, collapsed: false, isMilestone: false,
    },
    {
      id: '2', name: 'Development', progress: 40,
      start: new Date('2026-04-06'), end: new Date('2026-04-15'),
      parentId: null, collapsed: false, isMilestone: false,
    },
  ];

  dependencies: GanttDependency[] = [
    { fromId: '1', toId: '2', type: DependencyType.FinishToStart },
  ];

  onTaskChange(event: any) { /* handle drag/resize */ }
  onTaskClick(event: any) { /* handle click */ }
}
```

### Form Controls

```typescript
import { Component, signal } from '@angular/core';
import { TextBoxComponent, DropdownComponent, type DropdownOption } from 'ngx-core-components';

@Component({
  standalone: true,
  imports: [TextBoxComponent, DropdownComponent],
  template: `
    <ngx-textbox
      [value]="name()"
      label="Full Name"
      placeholder="Enter your name"
      (valueChange)="name.set($event)"
    />

    <ngx-dropdown
      [options]="countries"
      [value]="country()"
      label="Country"
      placeholder="Select country"
      (valueChange)="country.set($event)"
    />
  `,
})
export class MyFormComponent {
  name = signal('');
  country = signal<unknown>(null);

  countries: DropdownOption[] = [
    { label: 'United States', value: 'us' },
    { label: 'Germany', value: 'de' },
    { label: 'Japan', value: 'jp' },
  ];
}
```

### Data Grid

```typescript
import { Component } from '@angular/core';
import { DataGridComponent, type GridColumnDef } from 'ngx-core-components';

@Component({
  standalone: true,
  imports: [DataGridComponent],
  template: `<ngx-data-grid [data]="rows" [columns]="columns" [pageSize]="5" />`,
})
export class MyGridComponent {
  columns: GridColumnDef[] = [
    { field: 'id', title: 'ID', width: 80 },
    { field: 'name', title: 'Name', sortable: true },
    { field: 'status', title: 'Status' },
  ];

  rows = [
    { id: 1, name: 'Alpha', status: 'Active' },
    { id: 2, name: 'Beta', status: 'Paused' },
  ];
}
```

## API

This README focuses on the primary Gantt API because it is the largest surface in the package. The demo application under `projects/demo` shows usage and API reference coverage for the other components.

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `tasks` | `GanttTask[]` | **required** | Array of tasks to display |
| `dependencies` | `GanttDependency[]` | `[]` | Dependency links between tasks |
| `config` | `Partial<GanttConfig>` | `{}` | Configuration options (merged with defaults) |

### Outputs

| Output | Type | Description |
|--------|------|-------------|
| `taskChange` | `GanttTaskChangeEvent` | Emitted after drag/resize completes |
| `taskClick` | `GanttTaskClickEvent` | Task bar clicked |
| `taskDblClick` | `GanttTaskClickEvent` | Task bar double-clicked |
| `dependencyClick` | `GanttDependencyClickEvent` | Dependency arrow clicked |
| `scroll` | `GanttScrollEvent` | Chart scrolled |
| `zoomChange` | `ZoomLevel` | Zoom level changed |

### GanttConfig

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `zoomLevel` | `'day' \| 'week' \| 'month'` | `'day'` | Timeline granularity |
| `rowHeight` | `number` | `40` | Height of each row in pixels |
| `columnWidth` | `number` | `40` | Width of each time-unit column |
| `sidebarWidth` | `number` | `280` | Width of the tree sidebar |
| `headerHeight` | `number` | `60` | Height of the timeline header |
| `showTodayMarker` | `boolean` | `true` | Show today indicator line |
| `showGrid` | `boolean` | `true` | Show grid lines |
| `collapsible` | `boolean` | `true` | Allow tree collapse/expand |
| `snapTo` | `'day' \| 'week' \| 'month'` | `'day'` | Snap granularity for drag and resize |
| `locale` | `string` | `'en-US'` | Locale for date formatting |

### GanttTask

| Property | Type | Description |
|----------|------|-------------|
| `id` | `string` | Unique identifier |
| `name` | `string` | Display name |
| `start` | `Date` | Start date |
| `end` | `Date` | End date |
| `progress` | `number` | 0–100 completion percentage |
| `parentId` | `string \| null` | Parent task ID for hierarchy |
| `collapsed` | `boolean` | Whether children are collapsed |
| `isMilestone` | `boolean` | Render as diamond marker |
| `color?` | `string` | Bar color override |
| `draggable?` | `boolean` | Enable drag/resize (default: true) |
| `cssClass?` | `string` | Custom CSS class |
| `meta?` | `Record<string, unknown>` | Arbitrary data |

## Theming

Override CSS custom properties on the `ngx-gantt-chart` element:

```css
ngx-gantt-chart {
  --ngx-gantt-bar-bg: #27ae60;
  --ngx-gantt-bar-progress-bg: #1e8449;
  --ngx-gantt-today-color: #e74c3c;
  --ngx-gantt-header-bg: #2c3e50;
  --ngx-gantt-text: #ecf0f1;
}
```

Common Gantt custom properties include `--ngx-gantt-bg`, `--ngx-gantt-border`, `--ngx-gantt-grid-line`, `--ngx-gantt-header-bg`, `--ngx-gantt-text`, `--ngx-gantt-bar-bg`, `--ngx-gantt-bar-progress-bg`, and `--ngx-gantt-today-color`.

Other component groups expose their own CSS variable namespaces as well:

- Inputs: `--ngx-input-*`
- Charts: `--ngx-chart-*`
- Grid: `--ngx-grid-*`
- Tree/List: `--ngx-tree-*`, `--ngx-list-*`
- Tooltip/Popover: `--ngx-tooltip-*`, `--ngx-popover-*`
- Buttons and chips: `--ngx-btn-*`, `--ngx-chip-*`

## Public Methods

Access via `ViewChild`:

```typescript
@ViewChild(GanttChartComponent) gantt!: GanttChartComponent;

this.gantt.scrollToDate(new Date('2026-04-15'));
this.gantt.scrollToTask('task-42');
this.gantt.expandAll();
this.gantt.collapseAll();
```

## Demo Application

The repository includes a demo app under `projects/demo` covering live examples, how-to snippets, and API reference tables for the library components.

## License

MIT

/*
 * Public API Surface of ngx-core-components
 */

// ===== Gantt Chart =====
export { GanttChartComponent } from './lib/gantt-chart/gantt-chart.component';
export * from './lib/gantt-chart/models';
export { GanttScaleService } from './lib/gantt-chart/services/gantt-scale.service';
export type { FlatRow } from './lib/gantt-chart/services/gantt-layout.service';
export * from './lib/gantt-chart/utils/date-utils';

// ===== Charts =====
export { BarChartComponent } from './lib/charts/bar-chart/bar-chart.component';
export { LineChartComponent } from './lib/charts/line-chart/line-chart.component';
export { PieChartComponent } from './lib/charts/pie-chart/pie-chart.component';
export { SparklineComponent } from './lib/charts/sparkline/sparkline.component';
export type { ChartSeries, ChartDataPoint } from './lib/charts/shared/chart-utils';
export { CHART_COLORS } from './lib/charts/shared/chart-utils';

// ===== Input Components =====
export { TextBoxComponent } from './lib/inputs/textbox/textbox.component';
export { DropdownComponent } from './lib/inputs/dropdown/dropdown.component';
export type { DropdownOption } from './lib/inputs/dropdown/dropdown.component';
export { DatePickerComponent } from './lib/inputs/date-picker/date-picker.component';
export { MultiSelectComponent } from './lib/inputs/multi-select/multi-select.component';

// ===== Data Grid =====
export { DataGridComponent } from './lib/data-grid/data-grid.component';
export type {
  GridColumnDef,
  GridSortState,
  GridPageChangeEvent,
  GridSortChangeEvent,
  GridRowClickEvent,
} from './lib/data-grid/data-grid.component';

// ===== Tree View =====
export { TreeViewComponent } from './lib/tree-view/tree-view.component';
export type { TreeNode, TreeNodeEvent } from './lib/tree-view/tree-view.component';

// ===== List View =====
export { ListViewComponent } from './lib/list-view/list-view.component';
export type {
  ListViewItemClickEvent,
  ListViewSelectionEvent,
} from './lib/list-view/list-view.component';

// ===== Tooltip & Popover =====
export { TooltipDirective } from './lib/tooltip/tooltip.directive';
export type { TooltipPosition } from './lib/tooltip/tooltip.directive';
export { PopoverComponent } from './lib/tooltip/popover.component';

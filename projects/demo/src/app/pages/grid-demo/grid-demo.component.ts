import { Component, signal } from '@angular/core';
import {
  DataGridComponent, GridColumnDef, GridSortChangeEvent, GridRowClickEvent
} from 'ngx-core-components';

interface Employee {
  id: number; name: string; title: string; department: string;
  email: string; salary: number; status: string; startDate: string;
}
interface ApiRow { name: string; type: string; default: string; description: string; }

@Component({
  selector: 'app-grid-demo',
  standalone: true,
  imports: [DataGridComponent],
  template: `
    <div class="demo-page">

      <!-- Page Header -->
      <div class="page-header">
        <div class="page-header-text">
          <h1>Data Grid</h1>
          <p>Full-featured data table with client-side sorting, column filtering, pagination, and row selection.
             Driven by columnar configuration — no template boilerplate needed.</p>
        </div>
        <div class="header-badges">
          <span class="badge badge-orange">Sort</span>
          <span class="badge badge-orange">Filter</span>
          <span class="badge badge-orange">Paginate</span>
          <span class="badge badge-orange">Select</span>
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
          <div class="section-label">Live Demo</div>
          <div class="demo-toolbar">
            <button class="btn-outline" (click)="loading.set(!loading())">
              {{ loading() ? '⏹ Stop Loading' : '⏳ Simulate Loading' }}
            </button>
            <span class="selection-info">{{ selectedCount() }} row(s) selected</span>
          </div>

          <ngx-data-grid
            [data]="employees"
            [columns]="columns"
            [pageSize]="8"
            [selectable]="true"
            [striped]="true"
            [loading]="loading()"
            (rowClick)="onRowClick($event)"
            (selectionChange)="onSelectionChange($event)"
            (sortChange)="onSortChange($event)"
          />

          @if (lastEvent()) {
            <div class="event-info">{{ lastEvent() }}</div>
          }
        </div>
      }

      <!-- ===== HOW TO USE ===== -->
      @if (activeTab() === 'How to Use') {
        <div class="tab-content">
          <div class="section-label">Basic Grid</div>
          <pre class="code-block">{{ basicCode }}</pre>

          <div class="section-label">With Sorting, Filtering & Pagination</div>
          <pre class="code-block">{{ fullCode }}</pre>

          <div class="section-label">GridColumnDef interface</div>
          <pre class="code-block">{{ colDefCode }}</pre>
        </div>
      }

      <!-- ===== API ===== -->
      @if (activeTab() === 'API Reference') {
        <div class="tab-content">
          <div class="section-label">Inputs</div>
          <div class="api-table-wrap">
            <table class="api-table">
              <thead><tr><th>Input</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
              <tbody>
                @for (row of gridInputs; track row.name) {
                  <tr><td class="api-name">{{ row.name }}</td><td class="api-type">{{ row.type }}</td><td class="api-default">{{ row.default }}</td><td>{{ row.description }}</td></tr>
                }
              </tbody>
            </table>
          </div>

          <div class="section-label">Outputs</div>
          <div class="api-table-wrap">
            <table class="api-table">
              <thead><tr><th>Output</th><th>Type</th><th>Description</th></tr></thead>
              <tbody>
                @for (row of gridOutputs; track row.name) {
                  <tr><td class="api-name">{{ row.name }}</td><td class="api-type">{{ row.type }}</td><td>{{ row.description }}</td></tr>
                }
              </tbody>
            </table>
          </div>

          <div class="section-label">GridColumnDef Properties</div>
          <div class="api-table-wrap">
            <table class="api-table">
              <thead><tr><th>Property</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
              <tbody>
                @for (row of columnDefProps; track row.name) {
                  <tr><td class="api-name">{{ row.name }}</td><td class="api-type">{{ row.type }}</td><td class="api-default">{{ row.default }}</td><td>{{ row.description }}</td></tr>
                }
              </tbody>
            </table>
          </div>

          <div class="section-label">CSS Custom Properties</div>
          <div class="api-table-wrap">
            <table class="api-table">
              <thead><tr><th>Variable</th><th>Default</th><th>Description</th></tr></thead>
              <tbody>
                @for (row of gridCssVars; track row.name) {
                  <tr><td class="api-name">{{ row.name }}</td><td class="api-default">{{ row.default }}</td><td>{{ row.description }}</td></tr>
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
    .demo-page { padding: 24px 28px; max-width: 1100px; display: flex; flex-direction: column; gap: 20px; }
    .page-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; padding-bottom: 16px; border-bottom: 1px solid #e9ecef; }
    .page-header-text h1 { margin: 0 0 6px; font-size: 24px; font-weight: 800; color: #1a1a2e; }
    .page-header-text p { margin: 0; font-size: 13px; color: #6c757d; line-height: 1.6; max-width: 600px; }
    .header-badges { display: flex; gap: 8px; flex-shrink: 0; flex-wrap: wrap; }
    .badge { font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 12px; }
    .badge-orange { background: #fff3cd; color: #92400e; }
    .tab-nav { display: flex; gap: 2px; border-bottom: 2px solid #e9ecef; }
    .tab-btn { padding: 8px 18px; background: none; border: none; font-size: 13px; font-weight: 500; color: #6c757d; cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -2px; font-family: inherit; transition: all 0.12s; }
    .tab-btn:hover { color: #1a1a2e; }
    .tab-btn.active { color: #1a73e8; border-bottom-color: #1a73e8; font-weight: 600; }
    .tab-content { display: flex; flex-direction: column; gap: 16px; }
    .section-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #adb5bd; border-bottom: 1px solid #f1f3f5; padding-bottom: 6px; }
    .demo-toolbar { display: flex; align-items: center; gap: 12px; }
    .btn-outline { padding: 7px 14px; background: #fff; border: 1px solid #ced4da; border-radius: 4px; font-size: 13px; cursor: pointer; font-family: inherit; }
    .btn-outline:hover { background: #f1f3f5; }
    .selection-info { font-size: 13px; color: #6c757d; }
    .event-info { padding: 8px 14px; background: #e8f0fe; border-radius: 6px; font-size: 12px; font-family: monospace; color: #1a73e8; }
    .code-block { background: #1e1e1e; color: #d4d4d4; padding: 20px; border-radius: 8px; font-size: 12px; font-family: 'Cascadia Code', Consolas, monospace; overflow-x: auto; white-space: pre; margin: 0; }
    .api-table-wrap { overflow-x: auto; border: 1px solid #e9ecef; border-radius: 8px; }
    .api-table { width: 100%; border-collapse: collapse; font-size: 13px; }
    .api-table thead tr { background: #f8f9fa; }
    .api-table th { padding: 10px 14px; text-align: left; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.6px; color: #6c757d; border-bottom: 1px solid #e9ecef; white-space: nowrap; }
    .api-table td { padding: 10px 14px; border-bottom: 1px solid #f1f3f5; color: #495057; vertical-align: top; }
    .api-table tbody tr:last-child td { border-bottom: none; }
    .api-table tbody tr:hover td { background: #f8f9fa; }
    .api-name { color: #1a73e8 !important; font-family: monospace; font-weight: 600; white-space: nowrap; }
    .api-type { color: #8e44ad !important; font-family: monospace; white-space: nowrap; }
    .api-default { font-family: monospace; white-space: nowrap; }
  `]
})
export class GridDemoComponent {
  activeTab = signal('Demo');
  tabs = ['Demo', 'How to Use', 'API Reference'];
  loading = signal(false);
  selectedCount = signal(0);
  lastEvent = signal('');

  columns: GridColumnDef[] = [
    { field: 'id', title: '#', width: 50, sortable: true },
    { field: 'name', title: 'Name', sortable: true, filterable: true, width: 160 },
    { field: 'title', title: 'Title', sortable: true, filterable: true, width: 180 },
    { field: 'department', title: 'Department', sortable: true, filterable: true, width: 140 },
    { field: 'email', title: 'Email', filterable: true, width: 200 },
    { field: 'salary', title: 'Salary', sortable: true, width: 100, align: 'right' },
    { field: 'status', title: 'Status', sortable: true, filterable: true, width: 100 },
    { field: 'startDate', title: 'Start Date', sortable: true, width: 120 },
  ];

  employees: Employee[] = [
    { id: 1, name: 'Alice Johnson', title: 'Software Engineer', department: 'Engineering', email: 'alice@corp.com', salary: 95000, status: 'Active', startDate: '2021-03-15' },
    { id: 2, name: 'Bob Martinez', title: 'Product Manager', department: 'Product', email: 'bob@corp.com', salary: 110000, status: 'Active', startDate: '2020-07-01' },
    { id: 3, name: 'Carol Williams', title: 'UX Designer', department: 'Design', email: 'carol@corp.com', salary: 88000, status: 'Active', startDate: '2022-01-10' },
    { id: 4, name: 'David Kim', title: 'DevOps Engineer', department: 'Engineering', email: 'david@corp.com', salary: 98000, status: 'Active', startDate: '2021-09-20' },
    { id: 5, name: 'Emma Davis', title: 'Data Analyst', department: 'Analytics', email: 'emma@corp.com', salary: 82000, status: 'Active', startDate: '2022-05-18' },
    { id: 6, name: 'Frank Brown', title: 'Backend Developer', department: 'Engineering', email: 'frank@corp.com', salary: 92000, status: 'On Leave', startDate: '2019-11-05' },
    { id: 7, name: 'Grace Lee', title: 'QA Engineer', department: 'Engineering', email: 'grace@corp.com', salary: 78000, status: 'Active', startDate: '2023-02-28' },
    { id: 8, name: 'Henry Wilson', title: 'Tech Lead', department: 'Engineering', email: 'henry@corp.com', salary: 125000, status: 'Active', startDate: '2018-06-15' },
    { id: 9, name: 'Iris Chen', title: 'Marketing Manager', department: 'Marketing', email: 'iris@corp.com', salary: 89000, status: 'Active', startDate: '2020-03-01' },
    { id: 10, name: 'Jack Taylor', title: 'Sales Director', department: 'Sales', email: 'jack@corp.com', salary: 115000, status: 'Active', startDate: '2017-08-22' },
    { id: 11, name: 'Karen White', title: 'HR Manager', department: 'HR', email: 'karen@corp.com', salary: 85000, status: 'Active', startDate: '2021-06-10' },
    { id: 12, name: 'Liam Harris', title: 'Frontend Developer', department: 'Engineering', email: 'liam@corp.com', salary: 89000, status: 'Active', startDate: '2022-09-01' },
    { id: 13, name: 'Maya Robinson', title: 'Data Scientist', department: 'Analytics', email: 'maya@corp.com', salary: 108000, status: 'Active', startDate: '2020-12-15' },
    { id: 14, name: 'Noah Clark', title: 'Security Engineer', department: 'Engineering', email: 'noah@corp.com', salary: 102000, status: 'Inactive', startDate: '2019-04-08' },
    { id: 15, name: 'Olivia Lewis', title: 'Project Manager', department: 'Product', email: 'olivia@corp.com', salary: 97000, status: 'Active', startDate: '2021-01-20' },
  ];

  onRowClick(e: GridRowClickEvent<Employee>): void {
    this.lastEvent.set(`Row clicked: ${e.row.name} (${e.row.title})`);
  }
  onSelectionChange(rows: Employee[]): void {
    this.selectedCount.set(rows.length);
    this.lastEvent.set(`Selection: ${rows.map(r => r.name).join(', ') || 'none'}`);
  }
  onSortChange(e: GridSortChangeEvent): void {
    this.lastEvent.set(e.sort ? `Sorted by "${e.sort.field}" (${e.sort.dir})` : 'Sort cleared');
  }

  basicCode = `import { DataGridComponent, GridColumnDef } from 'ngx-core-components';

@Component({
  imports: [DataGridComponent],
  template: \`
    <ngx-data-grid
      [data]="rows"
      [columns]="columns"
    />
  \`
})
export class MyComponent {
  columns: GridColumnDef[] = [
    { field: 'name', title: 'Name' },
    { field: 'email', title: 'Email' },
  ];
  rows = [
    { name: 'Alice', email: 'alice@example.com' },
    { name: 'Bob', email: 'bob@example.com' },
  ];
}`;

  fullCode = `import {
  DataGridComponent, GridColumnDef,
  GridSortChangeEvent, GridRowClickEvent
} from 'ngx-core-components';

@Component({
  imports: [DataGridComponent],
  template: \`
    <ngx-data-grid
      [data]="employees"
      [columns]="columns"
      [pageSize]="10"
      [selectable]="true"
      [striped]="true"
      [loading]="isLoading"
      (rowClick)="onRowClick($event)"
      (selectionChange)="onSelect($event)"
      (sortChange)="onSort($event)"
      (pageChange)="onPage($event)"
    />
  \`
})
export class MyComponent {
  isLoading = false;

  columns: GridColumnDef[] = [
    { field: 'id', title: '#', width: 60, sortable: true },
    { field: 'name', title: 'Name', sortable: true, filterable: true, width: 160 },
    { field: 'email', title: 'Email', filterable: true },
    { field: 'salary', title: 'Salary', sortable: true, align: 'right' },
    { field: 'status', title: 'Status', sortable: true, filterable: true },
  ];

  employees = [...]; // your data array

  onRowClick(e: GridRowClickEvent<YourType>): void { /* ... */ }
  onSelect(rows: YourType[]): void { /* ... */ }
  onSort(e: GridSortChangeEvent): void { /* ... */ }
  onPage(e: GridPageChangeEvent): void { /* ... */ }
}`;

  colDefCode = `interface GridColumnDef {
  field: string;          // Property name in your data object
  title: string;          // Column header display text
  width?: number;         // Column width in pixels
  sortable?: boolean;     // Enable click-to-sort on this column
  filterable?: boolean;   // Show a filter input below the header
  align?: 'left' | 'center' | 'right';  // Cell text alignment
}`;

  gridInputs: ApiRow[] = [
    { name: 'data', type: 'T[]', default: '[]', description: 'The data array to display. Can be any object type.' },
    { name: 'columns', type: 'GridColumnDef[]', default: '[]', description: 'Column definitions — controls which fields to show and how.' },
    { name: 'pageSize', type: 'number', default: '10', description: 'Number of rows per page.' },
    { name: 'selectable', type: 'boolean', default: 'false', description: 'Enable row checkboxes for selection.' },
    { name: 'striped', type: 'boolean', default: 'false', description: 'Alternate row backgrounds for readability.' },
    { name: 'loading', type: 'boolean', default: 'false', description: 'Show a loading overlay over the grid.' },
  ];

  gridOutputs: ApiRow[] = [
    { name: '(rowClick)', type: 'GridRowClickEvent<T>', default: '—', description: 'Fires when a row is clicked. Contains { row, index }.' },
    { name: '(selectionChange)', type: 'T[]', default: '—', description: 'Fires when checkbox selection changes. Contains all selected rows.' },
    { name: '(sortChange)', type: 'GridSortChangeEvent', default: '—', description: 'Fires when the sort state changes. Contains { sort: { field, dir } | null }.' },
    { name: '(pageChange)', type: 'GridPageChangeEvent', default: '—', description: 'Fires when the page changes. Contains { page, pageSize }.' },
  ];

  columnDefProps: ApiRow[] = [
    { name: 'field', type: 'string', default: '—', description: 'Required. Key of the property in the data object to render.' },
    { name: 'title', type: 'string', default: '—', description: 'Required. Column header text shown to the user.' },
    { name: 'width', type: 'number', default: 'auto', description: 'Column width in pixels. If omitted, the column grows to fill available space.' },
    { name: 'sortable', type: 'boolean', default: 'false', description: 'Makes the header clickable for ascending/descending sort.' },
    { name: 'filterable', type: 'boolean', default: 'false', description: 'Renders a text filter input below the column header.' },
    { name: 'align', type: "'left' | 'center' | 'right'", default: "'left'", description: 'Text alignment of cell content.' },
  ];

  gridCssVars: { name: string; default: string; description: string }[] = [
    { name: '--ngx-grid-header-bg', default: '#f8f9fa', description: 'Table header background.' },
    { name: '--ngx-grid-border', default: '#dee2e6', description: 'Border color for header and cells.' },
    { name: '--ngx-grid-hover-bg', default: '#f1f3f5', description: 'Row hover background color.' },
    { name: '--ngx-grid-selected-bg', default: '#e8f0fe', description: 'Selected row background.' },
    { name: '--ngx-grid-stripe-bg', default: '#f8f9fa', description: 'Alternate row background in striped mode.' },
  ];
}

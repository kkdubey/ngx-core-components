import { Component, computed, signal } from '@angular/core';
import {
  TreeViewComponent, ListViewComponent, TextBoxComponent, TreeNode, TreeNodeEvent
} from 'ngx-core-components';
import { SparklineComponent } from 'ngx-core-components';

interface Employee { name: string; email: string; dept: string; score: number; trend: number[]; }
interface ApiRow { name: string; type: string; default: string; description: string; }

@Component({
  selector: 'app-tree-list-demo',
  standalone: true,
  imports: [TreeViewComponent, ListViewComponent, TextBoxComponent, SparklineComponent],
  template: `
    <div class="demo-page">

      <!-- Page Header -->
      <div class="page-header">
        <div class="page-header-text">
          <h1>Tree View & List View</h1>
          <p>TreeView renders hierarchical data with collapsible nodes, icons, and checkboxes.
             ListView renders a scrollable list with search, header slots, single or multi-selection, and custom item templates.</p>
        </div>
        <div class="header-badges">
          <span class="badge badge-teal">Collapsible</span>
          <span class="badge badge-teal">Checkboxes</span>
          <span class="badge badge-teal">Custom template</span>
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
          <div class="demo-body">
            <!-- Tree View -->
            <div class="panel">
              <div class="panel-header">
                <span>TreeView — Organisation</span>
                <div class="panel-actions">
                  <button class="btn-tiny" (click)="checkable.set(!checkable())">
                    {{ checkable() ? 'Hide' : 'Show' }} Checkboxes
                  </button>
                </div>
              </div>
              <ngx-tree-view
                [nodes]="treeNodes"
                [selectable]="true"
                [checkable]="checkable()"
                [selectedId]="selectedNodeId()"
                (nodeSelect)="onNodeSelect($event)"
                (nodeExpand)="onNodeExpand($event)"
                (checkChange)="onCheckChange($event)"
              />
              @if (selectedNodeId()) {
                <div class="panel-info">Selected: {{ selectedNodeId() }}</div>
              }
              @if (checkedIds().length > 0) {
                <div class="panel-info">Checked: {{ checkedIds().join(', ') }}</div>
              }
            </div>

            <!-- List View -->
            <div class="panel">
              <div class="panel-header">
                <span>ListView — Search + Custom Template</span>
                <div class="panel-actions">
                  <button class="btn-tiny" (click)="listMultiselect.set(!listMultiselect())">
                    {{ listMultiselect() ? 'Single' : 'Multi' }} Select
                  </button>
                </div>
              </div>
              <ngx-list-view
                [items]="filteredEmployees()"
                [selectable]="true"
                [multiselect]="listMultiselect()"
                [pageSize]="3"
                (pageChange)="employeePage.set($event.page)"
                (selectionChange)="onListSelect($event)"
              >
                <div listHeader class="list-toolbar">
                  <ngx-textbox
                    [value]="employeeSearch()"
                    label="Search employees"
                    placeholder="Search by name, email, or department"
                    (valueChange)="employeeSearch.set($event)"
                  />
                  <div class="list-toolbar-meta">Showing {{ filteredEmployees().length }} of {{ employees.length }} · Page {{ employeePage() }}</div>
                </div>
                <ng-template #itemTemplate let-item>
                  <div class="employee-item">
                    <div class="emp-avatar">{{ getInitials(item.name) }}</div>
                    <div class="emp-info">
                      <div class="emp-name">{{ item.name }}</div>
                      <div class="emp-meta">{{ item.dept }} · {{ item.email }}</div>
                    </div>
                    <div class="emp-score">
                      <ngx-sparkline [data]="item.trend" type="line" [color]="item.score > 80 ? '#27ae60' : '#ff6358'" [width]="60" [height]="24"/>
                      <span class="emp-num">{{ item.score }}</span>
                    </div>
                  </div>
                </ng-template>
              </ngx-list-view>
              @if (selectedEmployees().length > 0) {
                <div class="panel-info">Selected: {{ selectedEmployeeNames() }}</div>
              }
            </div>
          </div>
        </div>
      }

      <!-- ===== HOW TO USE ===== -->
      @if (activeTab() === 'How to Use') {
        <div class="tab-content">
          <div class="section-label">TreeView — Basic</div>
          <pre class="code-block">{{ treeBasicCode }}</pre>

          <div class="section-label">TreeView — With Checkboxes</div>
          <pre class="code-block">{{ treeCheckCode }}</pre>

          <div class="section-label">ListView — With Custom Item Template</div>
          <pre class="code-block">{{ listCode }}</pre>
        </div>
      }

      <!-- ===== API ===== -->
      @if (activeTab() === 'API Reference') {
        <div class="tab-content">

          <div class="section-label">TreeView — Inputs</div>
          <div class="api-table-wrap">
            <table class="api-table">
              <thead><tr><th>Input</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
              <tbody>
                @for (row of treeInputs; track row.name) {
                  <tr><td class="api-name">{{ row.name }}</td><td class="api-type">{{ row.type }}</td><td class="api-default">{{ row.default }}</td><td>{{ row.description }}</td></tr>
                }
              </tbody>
            </table>
          </div>

          <div class="section-label">TreeView — Outputs</div>
          <div class="api-table-wrap">
            <table class="api-table">
              <thead><tr><th>Output</th><th>Type</th><th>Description</th></tr></thead>
              <tbody>
                @for (row of treeOutputs; track row.name) {
                  <tr><td class="api-name">{{ row.name }}</td><td class="api-type">{{ row.type }}</td><td>{{ row.description }}</td></tr>
                }
              </tbody>
            </table>
          </div>

          <div class="section-label">TreeNode interface</div>
          <pre class="code-block">{{ treeNodeCode }}</pre>

          <div class="section-label">ListView — Inputs</div>
          <div class="api-table-wrap">
            <table class="api-table">
              <thead><tr><th>Input</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
              <tbody>
                @for (row of listInputs; track row.name) {
                  <tr><td class="api-name">{{ row.name }}</td><td class="api-type">{{ row.type }}</td><td class="api-default">{{ row.default }}</td><td>{{ row.description }}</td></tr>
                }
              </tbody>
            </table>
          </div>

          <div class="section-label">ListView — Outputs</div>
          <div class="api-table-wrap">
            <table class="api-table">
              <thead><tr><th>Output</th><th>Type</th><th>Description</th></tr></thead>
              <tbody>
                @for (row of listOutputs; track row.name) {
                  <tr><td class="api-name">{{ row.name }}</td><td class="api-type">{{ row.type }}</td><td>{{ row.description }}</td></tr>
                }
              </tbody>
            </table>
          </div>

          <div class="section-label">CSS Custom Properties</div>
          <div class="api-table-wrap">
            <table class="api-table">
              <thead><tr><th>Variable</th><th>Default</th><th>Description</th></tr></thead>
              <tbody>
                @for (row of cssVars; track row.name) {
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
    .badge-teal { background: #ccfbf1; color: #0f766e; }
    .tab-nav { display: flex; gap: 2px; border-bottom: 2px solid #e9ecef; }
    .tab-btn { padding: 8px 18px; background: none; border: none; font-size: 13px; font-weight: 500; color: #6c757d; cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -2px; font-family: inherit; transition: all 0.12s; }
    .tab-btn:hover { color: #1a1a2e; }
    .tab-btn.active { color: #1a73e8; border-bottom-color: #1a73e8; font-weight: 600; }
    .tab-content { display: flex; flex-direction: column; gap: 16px; }
    .section-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #adb5bd; border-bottom: 1px solid #f1f3f5; padding-bottom: 6px; }
    .demo-body { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .panel { background: #fff; border: 1px solid #e9ecef; border-radius: 8px; overflow: hidden; display: flex; flex-direction: column; min-height: 420px; }
    .panel-header { display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; border-bottom: 1px solid #f1f3f5; font-size: 13px; font-weight: 600; color: #495057; flex-shrink: 0; }
    .panel-actions { display: flex; gap: 6px; }
    .btn-tiny { padding: 3px 10px; background: transparent; border: 1px solid #ced4da; border-radius: 3px; font-size: 11px; cursor: pointer; font-family: inherit; }
    .btn-tiny:hover { background: #f1f3f5; }
    .panel-info { padding: 6px 14px; font-size: 12px; color: #6c757d; background: #f8f9fa; border-top: 1px solid #f1f3f5; flex-shrink: 0; font-family: monospace; }
    ngx-tree-view, ngx-list-view { flex: 1; overflow-y: auto; }
    .list-toolbar { display: flex; flex-direction: column; gap: 10px; padding: 12px 14px; border-bottom: 1px solid #f1f3f5; background: #fafbfc; }
    .list-toolbar-meta { font-size: 11px; color: #6c757d; }
    .employee-item { display: flex; align-items: center; gap: 12px; }
    .emp-avatar { width: 34px; height: 34px; border-radius: 50%; background: #4a90d9; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; flex-shrink: 0; }
    .emp-info { flex: 1; min-width: 0; }
    .emp-name { font-size: 13px; font-weight: 500; color: #212529; }
    .emp-meta { font-size: 11px; color: #6c757d; }
    .emp-score { display: flex; align-items: center; gap: 8px; }
    .emp-num { font-size: 13px; font-weight: 600; color: #212529; width: 30px; text-align: right; }
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
export class TreeListDemoComponent {
  activeTab = signal('Demo');
  tabs = ['Demo', 'How to Use', 'API Reference'];
  checkable = signal(false);
  listMultiselect = signal(false);
  employeeSearch = signal('');
  employeePage = signal(1);
  selectedNodeId = signal<string | null>(null);
  checkedIds = signal<string[]>([]);
  selectedEmployees = signal<Employee[]>([]);

  treeNodes: TreeNode[] = [
    {
      id: 'engineering', label: 'Engineering', icon: '🖥',
      children: [
        { id: 'frontend', label: 'Frontend', icon: '🎨', children: [
          { id: 'react-team', label: 'React Team', icon: '⚛' },
          { id: 'angular-team', label: 'Angular Team', icon: '🔺' },
        ]},
        { id: 'backend', label: 'Backend', icon: '⚙', children: [
          { id: 'api-team', label: 'API Team', icon: '🔌' },
          { id: 'db-team', label: 'Database Team', icon: '🗄' },
        ]},
        { id: 'devops', label: 'DevOps', icon: '🚀' },
      ]
    },
    {
      id: 'product', label: 'Product', icon: '📦',
      children: [
        { id: 'design', label: 'Design', icon: '✏' },
        { id: 'research', label: 'Research', icon: '🔬' },
      ]
    },
    { id: 'marketing', label: 'Marketing', icon: '📣' },
    { id: 'hr', label: 'Human Resources', icon: '👥' },
  ];

  employees: Employee[] = [
    { name: 'Alice Johnson', email: 'alice@corp.com', dept: 'Engineering', score: 94, trend: [80,82,88,85,91,94] },
    { name: 'Bob Martinez', email: 'bob@corp.com', dept: 'Product', score: 87, trend: [82,80,84,83,88,87] },
    { name: 'Carol Williams', email: 'carol@corp.com', dept: 'Design', score: 91, trend: [75,79,82,86,89,91] },
    { name: 'David Kim', email: 'david@corp.com', dept: 'Engineering', score: 78, trend: [84,82,79,76,78,78] },
    { name: 'Emma Davis', email: 'emma@corp.com', dept: 'Analytics', score: 85, trend: [70,73,77,80,83,85] },
    { name: 'Frank Brown', email: 'frank@corp.com', dept: 'Engineering', score: 72, trend: [88,84,80,76,74,72] },
  ];

  filteredEmployees = computed(() => {
    const query = this.employeeSearch().trim().toLowerCase();
    if (!query) {
      return this.employees;
    }

    return this.employees.filter(employee =>
      `${employee.name} ${employee.email} ${employee.dept}`.toLowerCase().includes(query)
    );
  });

  onNodeSelect(e: TreeNodeEvent): void { this.selectedNodeId.set(e.node.id); }
  onNodeExpand(_e: TreeNodeEvent): void {}
  onCheckChange(e: { node: TreeNode; checked: boolean }): void {
    const ids = this.checkedIds();
    this.checkedIds.set(e.checked ? [...ids, e.node.id] : ids.filter(id => id !== e.node.id));
  }
  onListSelect(e: { selectedItems: Employee[] }): void { this.selectedEmployees.set(e.selectedItems); }
  getInitials(name: string): string { return name.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase(); }
  selectedEmployeeNames(): string { return this.selectedEmployees().map(e => e.name).join(', '); }

  // ===== CODE =====
  treeBasicCode = `import { TreeViewComponent, TreeNode } from 'ngx-core-components';

@Component({
  imports: [TreeViewComponent],
  template: \`
    <ngx-tree-view
      [nodes]="nodes"
      [selectable]="true"
      [selectedId]="selected()"
      (nodeSelect)="selected.set($event.node.id)"
    />
  \`
})
export class MyComponent {
  selected = signal<string | null>(null);

  nodes: TreeNode[] = [
    {
      id: 'root', label: 'Engineering', icon: '🖥',
      children: [
        { id: 'fe', label: 'Frontend', icon: '🎨' },
        { id: 'be', label: 'Backend', icon: '⚙' },
      ]
    },
    { id: 'design', label: 'Design', icon: '✏' },
  ];
}`;

  treeCheckCode = `<ngx-tree-view
  [nodes]="nodes"
  [selectable]="true"
  [checkable]="true"
  [selectedId]="selectedId()"
  (nodeSelect)="onSelect($event)"
  (nodeExpand)="onExpand($event)"
  (nodeCollapse)="onCollapse($event)"
  (checkChange)="onCheck($event)"
/>

// Handlers:
onCheck(e: { node: TreeNode; checked: boolean }): void {
  if (e.checked) {
    this.checkedIds.update(ids => [...ids, e.node.id]);
  } else {
    this.checkedIds.update(ids => ids.filter(id => id !== e.node.id));
  }
}`;

  listCode = `import { ListViewComponent } from 'ngx-core-components';

@Component({
  imports: [ListViewComponent],
  template: \`
    <ngx-list-view
      [items]="filteredEmployees()"
      [selectable]="true"
      [multiselect]="true"
      [pageSize]="10"
      (pageChange)="page.set($event.page)"
      (selectionChange)="onSelect($event)"
      (itemClick)="onClick($event)"
    >
      <div listHeader>
        <input type="search" (input)="search.set(($event.target as HTMLInputElement).value)" />
      </div>
      <!-- Custom item template -->
      <ng-template #itemTemplate let-item>
        <div class="my-item">
          <div class="avatar">{{ item.name[0] }}</div>
          <div>
            <div class="name">{{ item.name }}</div>
            <div class="sub">{{ item.dept }}</div>
          </div>
        </div>
      </ng-template>
    </ngx-list-view>
  \`
})
export class MyComponent {
  page = signal(1);
  employees = [
    { name: 'Alice', dept: 'Engineering' },
    { name: 'Bob', dept: 'Product' },
  ];

  onSelect(e: { selectedItems: any[] }): void {
    console.log(e.selectedItems);
  }
}`;

  treeNodeCode = `interface TreeNode {
  id: string;           // Unique identifier
  label: string;        // Display text
  icon?: string;        // Optional icon (emoji or character)
  children?: TreeNode[]; // Nested child nodes
  hasChildren?: boolean; // For lazy load: show expand arrow without children[]
}`;

  treeInputs: ApiRow[] = [
    { name: 'nodes', type: 'TreeNode[]', default: '[]', description: 'The root-level nodes of the tree.' },
    { name: 'selectable', type: 'boolean', default: 'false', description: 'Allow clicking nodes to select them.' },
    { name: 'checkable', type: 'boolean', default: 'false', description: 'Show checkboxes next to each node.' },
    { name: 'selectedId', type: 'string | null', default: 'null', description: 'The id of the currently selected node (controlled).' },
    { name: 'expandedIds', type: 'string[]', default: '[]', description: 'Array of node ids that are initially expanded.' },
  ];

  treeOutputs: ApiRow[] = [
    { name: '(nodeSelect)', type: 'TreeNodeEvent', default: '—', description: 'Fired when a node is clicked/selected. Contains { node }.' },
    { name: '(nodeExpand)', type: 'TreeNodeEvent', default: '—', description: 'Fired when a collapsed node is expanded.' },
    { name: '(nodeCollapse)', type: 'TreeNodeEvent', default: '—', description: 'Fired when an expanded node is collapsed.' },
    { name: '(checkChange)', type: '{ node, checked }', default: '—', description: 'Fired when a checkbox is toggled.' },
  ];

  listInputs: ApiRow[] = [
    { name: 'items', type: 'T[]', default: '[]', description: 'The array of items to render in the list.' },
    { name: 'labelField', type: 'string', default: "'label'", description: 'Field name used for the default text renderer when no custom template is provided.' },
    { name: 'selectable', type: 'boolean', default: 'false', description: 'Enable item selection (highlights on click).' },
    { name: 'multiselect', type: 'boolean', default: 'false', description: 'Allow selecting multiple items simultaneously.' },
    { name: 'loading', type: 'boolean', default: 'false', description: 'Show a loading spinner in place of items.' },
    { name: 'pageSize', type: 'number', default: '0', description: 'Enables built-in pagination when greater than 0.' },
  ];

  listOutputs: ApiRow[] = [
    { name: '(itemClick)', type: 'ListViewItemClickEvent<T>', default: '—', description: 'Fired on any item click. Contains { item, index }.' },
    { name: '(selectionChange)', type: 'ListViewSelectionEvent<T>', default: '—', description: 'Fired when selection changes. Contains { selectedItems }.' },
    { name: '(pageChange)', type: 'ListViewPageChangeEvent', default: '—', description: 'Fired when the built-in pager changes pages.' },
  ];

  cssVars: { name: string; default: string; description: string }[] = [
    { name: '--ngx-tree-hover-bg', default: '#f1f3f5', description: 'TreeView node hover background.' },
    { name: '--ngx-tree-selected-bg', default: '#e8f0fe', description: 'Selected node background.' },
    { name: '--ngx-tree-selected-color', default: '#1a73e8', description: 'Selected node text color.' },
    { name: '--ngx-list-hover-bg', default: '#f1f3f5', description: 'ListView item hover background.' },
    { name: '--ngx-list-selected-bg', default: '#e8f0fe', description: 'Selected list item background.' },
    { name: '--ngx-list-border', default: '#e9ecef', description: 'Border between list items.' },
  ];
}

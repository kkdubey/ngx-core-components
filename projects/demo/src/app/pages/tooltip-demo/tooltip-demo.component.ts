import { Component, signal } from '@angular/core';
import { TooltipDirective, PopoverComponent } from 'ngx-core-components';

interface ApiRow { name: string; type: string; default: string; description: string; }

@Component({
  selector: 'app-tooltip-demo',
  standalone: true,
  imports: [TooltipDirective, PopoverComponent],
  template: `
    <div class="demo-page">

      <!-- Page Header -->
      <div class="page-header">
        <div class="page-header-text">
          <h1>Tooltip & Popover</h1>
          <p>
            <strong>Tooltip</strong>: Attach to any element with <code>[ngxTooltip]</code> — appears on hover in 4 positions, auto-flips at viewport edges.<br/>
            <strong>Popover</strong>: A rich click-triggered overlay panel with title and projected body content.
          </p>
        </div>
        <div class="header-badges">
          <span class="badge badge-red">Hover</span>
          <span class="badge badge-red">Click</span>
          <span class="badge badge-red">4 Positions</span>
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

          <!-- Tooltip positions -->
          <div class="section-label">Tooltip — 4 Positions</div>
          <div class="demo-card">
            <div class="tooltip-row">
              <button class="demo-btn" [ngxTooltip]="'Appears above the element'" tooltipPosition="top">Top</button>
              <button class="demo-btn" [ngxTooltip]="'Appears below the element'" tooltipPosition="bottom">Bottom</button>
              <button class="demo-btn" [ngxTooltip]="'Appears to the left'" tooltipPosition="left">Left</button>
              <button class="demo-btn" [ngxTooltip]="'Appears to the right'" tooltipPosition="right">Right</button>
            </div>
          </div>

          <!-- Tooltip on various elements -->
          <div class="section-label">Tooltip on Various Elements</div>
          <div class="demo-card">
            <div class="elements-row">
              <span class="badge-elem badge-blue" [ngxTooltip]="'12 active users right now'" tooltipPosition="top">12 Users</span>
              <span class="badge-elem badge-green" [ngxTooltip]="'System is fully operational'" tooltipPosition="top">Operational</span>
              <span class="badge-elem badge-red" [ngxTooltip]="'3 critical issues need attention'" tooltipPosition="top">3 Issues</span>
              <span class="info-icon" [ngxTooltip]="'This field is required. Enter a value between 1 and 100.'" tooltipPosition="right">ℹ</span>
              <div class="avatar" [ngxTooltip]="'Alice Johnson — Senior Engineer'" tooltipPosition="bottom">AJ</div>
              <button class="demo-btn" [ngxTooltip]="'Click to export as CSV'" tooltipPosition="top">Export</button>
            </div>
          </div>

          <!-- Popovers -->
          <div class="section-label">Popover — Click to Open</div>
          <div class="demo-card">
            <div class="popover-row">

              <ngx-popover title="User Profile" position="bottom">
                <button class="demo-btn" popoverTrigger>View Profile ▾</button>
                <div popoverBody>
                  <div class="profile-content">
                    <div class="profile-avatar">AJ</div>
                    <div>
                      <div class="profile-name">Alice Johnson</div>
                      <div class="profile-role">Senior Engineer · Engineering</div>
                      <div class="profile-email">alice&#64;corp.com</div>
                    </div>
                  </div>
                </div>
              </ngx-popover>

              <ngx-popover title="Notification Settings" position="bottom">
                <button class="demo-btn" popoverTrigger>Settings ▾</button>
                <div popoverBody>
                  <div class="settings-list">
                    <label class="setting-row"><input type="checkbox" checked/> Email notifications</label>
                    <label class="setting-row"><input type="checkbox" checked/> Push notifications</label>
                    <label class="setting-row"><input type="checkbox"/> Weekly digest</label>
                    <label class="setting-row"><input type="checkbox" checked/> Security alerts</label>
                  </div>
                </div>
              </ngx-popover>

              <ngx-popover title="Quick Actions" position="right">
                <button class="demo-btn" popoverTrigger>Actions ▾</button>
                <div popoverBody>
                  <div class="action-list">
                    <button class="action-btn">✏ Edit</button>
                    <button class="action-btn">📋 Duplicate</button>
                    <button class="action-btn">📤 Export</button>
                    <button class="action-btn action-btn-danger">🗑 Delete</button>
                  </div>
                </div>
              </ngx-popover>

              <ngx-popover title="Filter Options" position="bottom">
                <button class="demo-btn" popoverTrigger>Filters ▾</button>
                <div popoverBody>
                  <div class="filter-content">
                    <div class="filter-label">Status</div>
                    <label class="setting-row"><input type="checkbox" checked/> Active</label>
                    <label class="setting-row"><input type="checkbox"/> Inactive</label>
                    <label class="setting-row"><input type="checkbox" checked/> Pending</label>
                    <div class="filter-label" style="margin-top:10px">Priority</div>
                    <label class="setting-row"><input type="checkbox" checked/> High</label>
                    <label class="setting-row"><input type="checkbox" checked/> Medium</label>
                    <label class="setting-row"><input type="checkbox"/> Low</label>
                  </div>
                </div>
              </ngx-popover>

            </div>
          </div>
        </div>
      }

      <!-- ===== HOW TO USE ===== -->
      @if (activeTab() === 'How to Use') {
        <div class="tab-content">
          <div class="section-label">Tooltip Directive</div>
          <pre class="code-block">{{ tooltipCode }}</pre>

          <div class="section-label">Popover Component</div>
          <pre class="code-block">{{ popoverCode }}</pre>
        </div>
      }

      <!-- ===== API ===== -->
      @if (activeTab() === 'API Reference') {
        <div class="tab-content">

          <div class="section-label">Tooltip Directive — [ngxTooltip]</div>
          <div class="api-table-wrap">
            <table class="api-table">
              <thead><tr><th>Input</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
              <tbody>
                @for (row of tooltipApi; track row.name) {
                  <tr><td class="api-name">{{ row.name }}</td><td class="api-type">{{ row.type }}</td><td class="api-default">{{ row.default }}</td><td>{{ row.description }}</td></tr>
                }
              </tbody>
            </table>
          </div>

          <div class="section-label">Popover Component — ngx-popover</div>
          <div class="api-table-wrap">
            <table class="api-table">
              <thead><tr><th>Input</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
              <tbody>
                @for (row of popoverApi; track row.name) {
                  <tr><td class="api-name">{{ row.name }}</td><td class="api-type">{{ row.type }}</td><td class="api-default">{{ row.default }}</td><td>{{ row.description }}</td></tr>
                }
              </tbody>
            </table>
          </div>

          <div class="section-label">Popover Content Slots</div>
          <div class="api-table-wrap">
            <table class="api-table">
              <thead><tr><th>Attribute</th><th>Description</th></tr></thead>
              <tbody>
                <tr><td class="api-name">popoverTrigger</td><td>Add to the child element that should open the popover on click.</td></tr>
                <tr><td class="api-name">popoverBody</td><td>Add to the element whose content is projected into the popover body.</td></tr>
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
    .page-header-text h1 { margin: 0 0 8px; font-size: 24px; font-weight: 800; color: #1a1a2e; }
    .page-header-text p { margin: 0; font-size: 13px; color: #6c757d; line-height: 1.6; max-width: 600px; }
    .page-header-text code { background: #f1f3f5; padding: 1px 6px; border-radius: 3px; font-family: monospace; font-size: 12px; color: #e74c3c; }
    .header-badges { display: flex; gap: 8px; flex-shrink: 0; }
    .badge { font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 12px; }
    .badge-red { background: #fee2e2; color: #991b1b; }
    .tab-nav { display: flex; gap: 2px; border-bottom: 2px solid #e9ecef; }
    .tab-btn { padding: 8px 18px; background: none; border: none; font-size: 13px; font-weight: 500; color: #6c757d; cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -2px; font-family: inherit; transition: all 0.12s; }
    .tab-btn:hover { color: #1a1a2e; }
    .tab-btn.active { color: #1a73e8; border-bottom-color: #1a73e8; font-weight: 600; }
    .tab-content { display: flex; flex-direction: column; gap: 16px; }
    .section-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #adb5bd; border-bottom: 1px solid #f1f3f5; padding-bottom: 6px; }
    .demo-card { background: #fff; border: 1px solid #e9ecef; border-radius: 8px; padding: 24px; }
    .tooltip-row, .popover-row { display: flex; gap: 12px; flex-wrap: wrap; align-items: flex-start; }
    .elements-row { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
    .demo-btn { padding: 8px 16px; background: #fff; border: 1px solid #ced4da; border-radius: 4px; font-size: 13px; cursor: pointer; font-family: inherit; color: #495057; transition: background 0.12s; }
    .demo-btn:hover { background: #f1f3f5; }
    .badge-elem { padding: 4px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; cursor: default; }
    .badge-blue { background: #dbeafe; color: #1e40af; }
    .badge-green { background: #dcfce7; color: #166534; }
    .badge-red { background: #fee2e2; color: #991b1b; }
    .info-icon { width: 22px; height: 22px; border-radius: 50%; background: #6c757d; color: #fff; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; cursor: help; }
    .avatar { width: 36px; height: 36px; border-radius: 50%; background: #4a90d9; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; cursor: pointer; }
    .profile-content { display: flex; gap: 12px; align-items: flex-start; }
    .profile-avatar { width: 40px; height: 40px; border-radius: 50%; background: #4a90d9; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 700; flex-shrink: 0; }
    .profile-name { font-weight: 600; font-size: 14px; color: #1a1a2e; }
    .profile-role { font-size: 12px; color: #6c757d; margin-top: 2px; }
    .profile-email { font-size: 12px; color: #4a90d9; margin-top: 2px; }
    .settings-list { display: flex; flex-direction: column; gap: 8px; min-width: 180px; }
    .filter-content { min-width: 180px; }
    .filter-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #adb5bd; margin-bottom: 6px; }
    .setting-row { display: flex; align-items: center; gap: 8px; font-size: 13px; cursor: pointer; }
    .setting-row input[type="checkbox"] { accent-color: #4a90d9; }
    .action-list { display: flex; flex-direction: column; gap: 2px; min-width: 140px; }
    .action-btn { background: none; border: none; font-size: 13px; padding: 7px 10px; cursor: pointer; text-align: left; border-radius: 3px; width: 100%; font-family: inherit; }
    .action-btn:hover { background: #f1f3f5; }
    .action-btn-danger { color: #e74c3c; }
    .action-btn-danger:hover { background: #fff5f5; }
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
export class TooltipDemoComponent {
  activeTab = signal('Demo');
  tabs = ['Demo', 'How to Use', 'API Reference'];

  tooltipCode = `import { TooltipDirective } from 'ngx-core-components';

@Component({
  imports: [TooltipDirective],
  template: \`
    <!-- Basic tooltip (top position by default) -->
    <button [ngxTooltip]="'Save your changes'">Save</button>

    <!-- Explicit position -->
    <button [ngxTooltip]="'Delete this item'" tooltipPosition="bottom">Delete</button>
    <span   [ngxTooltip]="'More info'" tooltipPosition="right">ℹ</span>
    <div    [ngxTooltip]="'Alice Johnson — Engineer'" tooltipPosition="top">AJ</div>

    <!-- Dynamic tooltip text -->
    <button [ngxTooltip]="tooltipText()">Hover me</button>
  \`
})
export class MyComponent {
  tooltipText = signal('Current status: active');
}`;

  popoverCode = `import { PopoverComponent } from 'ngx-core-components';

@Component({
  imports: [PopoverComponent],
  template: \`
    <!-- popoverTrigger = the element that opens it on click -->
    <!-- popoverBody    = projected into the panel body -->
    <ngx-popover title="User Settings" position="bottom">
      <button popoverTrigger>Settings ▾</button>
      <div popoverBody>
        <p>Any content can go here.</p>
        <button (click)="save()">Save</button>
      </div>
    </ngx-popover>

    <!-- Rich example -->
    <ngx-popover title="Notifications" position="right">
      <span popoverTrigger class="icon">🔔</span>
      <div popoverBody>
        <ul>
          <li>Build succeeded ✓</li>
          <li>2 comments on PR #42</li>
        </ul>
      </div>
    </ngx-popover>
  \`
})
export class MyComponent {
  save(): void { /* ... */ }
}`;

  tooltipApi: ApiRow[] = [
    { name: '[ngxTooltip]', type: 'string', default: "''", description: 'The tooltip text to display. Tooltip is hidden when this is empty.' },
    { name: 'tooltipPosition', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", description: 'Preferred position of the tooltip relative to the host element. Auto-flips if it would overflow the viewport.' },
  ];

  popoverApi: ApiRow[] = [
    { name: 'title', type: 'string', default: "''", description: 'Header text shown at the top of the popover panel.' },
    { name: 'position', type: "'top' | 'bottom' | 'left' | 'right'", default: "'bottom'", description: 'Preferred position of the popover relative to the trigger element.' },
  ];

  cssVars: { name: string; default: string; description: string }[] = [
    { name: '--ngx-tooltip-bg', default: '#1e1e1e', description: 'Tooltip background color.' },
    { name: '--ngx-tooltip-color', default: '#ffffff', description: 'Tooltip text color.' },
    { name: '--ngx-tooltip-border-radius', default: '4px', description: 'Tooltip corner radius.' },
    { name: '--ngx-popover-bg', default: '#ffffff', description: 'Popover panel background.' },
    { name: '--ngx-popover-border', default: '#dee2e6', description: 'Popover panel border color.' },
    { name: '--ngx-popover-shadow', default: '0 4px 24px rgba(0,0,0,0.12)', description: 'Popover drop shadow.' },
    { name: '--ngx-popover-header-bg', default: '#f8f9fa', description: 'Popover header bar background.' },
  ];
}

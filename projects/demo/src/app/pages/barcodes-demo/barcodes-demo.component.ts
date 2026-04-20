import { Component, signal } from '@angular/core';
import { QrCodeComponent, BarcodeComponent } from 'ngx-core-components/barcodes';

interface ApiRow { name: string; type: string; default: string; description: string; }

@Component({
  selector: 'app-barcodes-demo',
  standalone: true,
  imports: [QrCodeComponent, BarcodeComponent],
  template: `
    <div class="demo-page">
      <!-- Page Header -->
      <div class="page-header">
        <div class="page-header-text">
          <h1>Barcodes</h1>
          <p>QR Code and Barcode generation components. Canvas-based QR codes and SVG barcodes with zero external dependencies.</p>
        </div>
        <div class="header-badges">
          <span class="badge badge-red">QR Code</span>
          <span class="badge badge-red">Barcode</span>
          <span class="badge badge-red">Canvas</span>
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
          <div class="section-label">QR Code</div>
          <div class="barcode-grid">
            <div class="barcode-card">
              <ngx-qr-code value="https://github.com/ngx-core-components" [size]="160" label="GitHub URL" />
            </div>
            <div class="barcode-card">
              <ngx-qr-code value="ngx-core-components enterprise library" [size]="160" foreground="#0f0f23" background="#f8f9fa" label="Custom Colors" />
            </div>
            <div class="barcode-card">
              <ngx-qr-code value="Hello World!" [size]="120" label="Small (120px)" />
            </div>
            <div class="barcode-card">
              <ngx-qr-code value="Enterprise Angular UI Library with Kendo Parity" [size]="200" label="Large (200px)" />
            </div>
          </div>

          <div class="section-label">Barcode (Code128)</div>
          <div class="barcode-stack">
            <div class="barcode-card wide">
              <ngx-barcode value="NGX-CORE-2024" label="Product Code" />
            </div>
            <div class="barcode-card wide">
              <ngx-barcode value="1234567890128" [barWidth]="3" [height]="80" label="EAN-13 style" />
            </div>
            <div class="barcode-card wide">
              <ngx-barcode value="ORDER-001-A" foreground="#0f0f23" background="#f8f9fa" />
            </div>
          </div>

          <div class="section-label">How to Use</div>
          <pre style="margin:0;background:#1e1e1e;color:#d4d4d4;padding:16px;border-radius:8px;font-size:12px;line-height:1.5;overflow:auto">{{ howToCode }}</pre>
        </div>
      }

      <!-- ===== API REFERENCE ===== -->
      @if (activeTab() === 'API Reference') {
        <div class="tab-content">
          <div class="section-label">QR Code</div>
          <div class="api-table-wrap">
            <table class="api-table">
              <thead><tr><th>Input / Output</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
              <tbody>
                @for (row of qrcodeApi; track row.name) {
                  <tr><td class="api-name">{{ row.name }}</td><td class="api-type">{{ row.type }}</td><td class="api-default">{{ row.default }}</td><td>{{ row.description }}</td></tr>
                }
              </tbody>
            </table>
          </div>

          <div class="section-label">Barcode (Code128)</div>
          <div class="api-table-wrap">
            <table class="api-table">
              <thead><tr><th>Input / Output</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
              <tbody>
                @for (row of barcodeApi; track row.name) {
                  <tr><td class="api-name">{{ row.name }}</td><td class="api-type">{{ row.type }}</td><td class="api-default">{{ row.default }}</td><td>{{ row.description }}</td></tr>
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
    .demo-page { padding: 32px 40px; max-width: 1200px; margin: 0 auto; width: 100%; display: flex; flex-direction: column; gap: 28px; }
    .page-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 20px; padding-bottom: 24px; border-bottom: 2px solid rgba(230, 230, 245, 0.6); }
    .page-header-text h1 { margin: 0 0 8px; font-size: 28px; font-weight: 900; color: #1a1a2e; letter-spacing: -0.5px; }
    .page-header-text p { margin: 0; font-size: 14px; color: #6c757d; line-height: 1.7; max-width: 600px; }
    .header-badges { display: flex; gap: 10px; flex-shrink: 0; flex-wrap: wrap; }
    .badge { font-size: 11px; font-weight: 700; padding: 6px 12px; border-radius: 16px; transition: all 0.2s ease; }
    .badge-red { background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%); color: #991b1b; border: 1px solid rgba(153, 27, 27, 0.1); }
    .tab-nav { display: flex; gap: 0; border-bottom: 2px solid #e9ecef; overflow-x: auto; padding-bottom: 0; }
    .tab-btn { padding: 12px 20px; background: none; border: none; font-size: 13px; font-weight: 500; color: #6c757d; cursor: pointer; border-bottom: 3px solid transparent; margin-bottom: -2px; font-family: inherit; transition: all 0.2s ease; white-space: nowrap; }
    .tab-btn:hover { color: #495057; background: rgba(26, 115, 232, 0.05); }
    .tab-btn.active { color: #1a73e8; border-bottom-color: #1a73e8; font-weight: 600; background: rgba(26, 115, 232, 0.04); }
    .tab-content { display: flex; flex-direction: column; gap: 20px; }
    .section-label { font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.2px; color: #8892a0; border-bottom: 2px solid #e9ecef; padding-bottom: 12px; }
    .barcode-grid { display: flex; flex-wrap: wrap; gap: 20px; }
    .barcode-stack { display: flex; flex-direction: column; gap: 16px; }
    .barcode-card { display: flex; align-items: center; justify-content: center; padding: 20px; background: #fff; border: 1px solid #dee2e6; border-radius: 10px; }
    .barcode-card.wide { justify-content: flex-start; padding: 16px 24px; }
    .api-table-wrap { overflow-x: auto; border: 1px solid #e9ecef; border-radius: 10px; }
    .api-table { width: 100%; border-collapse: collapse; font-size: 13px; }
    .api-table thead tr { background: linear-gradient(135deg, #f8f9fa 0%, #f3f5f9 100%); }
    .api-table th { padding: 12px 16px; text-align: left; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.7px; color: #495057; border-bottom: 2px solid #e9ecef; white-space: nowrap; }
    .api-table td { padding: 12px 16px; border-bottom: 1px solid #f1f3f5; color: #495057; vertical-align: top; }
    .api-table tbody tr { transition: background 0.2s ease; }
    .api-table tbody tr:hover td { background: #f8f9fa; }
    .api-table tbody tr:last-child td { border-bottom: none; }
    .api-name { color: #1a73e8 !important; font-family: monospace; font-weight: 700; white-space: nowrap; }
    .api-type { color: #8e44ad !important; font-family: monospace; white-space: nowrap; }
    .api-default { font-family: monospace; white-space: nowrap; color: #ff6b6b; font-weight: 500; }
  `]
})
export class BarcodesDemoComponent {
  activeTab = signal('Demo');
  tabs = ['Demo', 'API Reference'];

  howToCode = `import { Component } from '@angular/core';
import { QrCodeComponent, BarcodeComponent } from 'ngx-core-components/barcodes';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [QrCodeComponent, BarcodeComponent],
  template: \
    <div style="display:flex;flex-direction:column;gap:16px;">
      <ngx-qr-code
        value="https://github.com/ngx-core-components"
        [size]="160"
        label="GitHub URL"
      />

      <ngx-barcode
        value="NGX-CORE-2024"
        [barWidth]="2"
        [height]="60"
        label="Product Code"
      />
    </div>
})
export class ExampleComponent {}`;

  qrcodeApi: ApiRow[] = [
    { name: 'value', type: 'string', default: 'undefined', description: 'Text or URL to encode in QR code.' },
    { name: 'size', type: 'number', default: '200', description: 'QR code canvas size in pixels.' },
    { name: 'foreground', type: 'string', default: "'#000000'", description: 'QR code color (hex, rgb, or color name).' },
    { name: 'background', type: 'string', default: "'#FFFFFF'", description: 'Background color.' },
    { name: 'label', type: 'string', default: 'undefined', description: 'Optional text label below QR code.' },
    { name: 'errorCorrection', type: 'string', default: "'M'", description: 'Error correction level: L, M, Q, H.' },
  ];

  barcodeApi: ApiRow[] = [
    { name: 'value', type: 'string', default: 'undefined', description: 'Data to encode in barcode (Code128 format).' },
    { name: 'barWidth', type: 'number', default: '2', description: 'Width of each bar in pixels.' },
    { name: 'height', type: 'number', default: '50', description: 'Total barcode height in pixels.' },
    { name: 'foreground', type: 'string', default: "'#000000'", description: 'Bar color.' },
    { name: 'background', type: 'string', default: "'#FFFFFF'", description: 'Background color.' },
    { name: 'label', type: 'string', default: 'undefined', description: 'Optional text label below barcode.' },
    { name: 'displayValue', type: 'boolean', default: 'true', description: 'Show encoded value below barcode.' },
  ];
}

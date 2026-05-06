import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PrintService {    
    
  // ─── SALES INVOICE PRINT ───
  printSalesInvoice(invoice: any, companyInfo: any = {}) {
    const company = {
      name:    companyInfo.name    || 'Sultan Tawakal Trading',
      address: companyInfo.address || 'Karachi, Pakistan',
      phone:   companyInfo.phone   || '0300-0000000',
      email:   companyInfo.email   || 'info@company.com',
    };

    const itemsHtml = invoice.items.map((item: any, i: number) => `
      <tr>
        <td>${i + 1}</td>
        <td>${item.productName}</td>
        <td>${item.description || '-'}</td>
        <td class="text-right">${item.qty}</td>
        <td class="text-right">${this.fmt(item.rate)}</td>
        <td class="text-right"><strong>${this.fmt(item.qty * item.rate)}</strong></td>
      </tr>
    `).join('');

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Sales Invoice - ${invoice.invoiceNo}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; color: #222; background: #fff; }
          .page { width: 210mm; min-height: 297mm; margin: 0 auto; padding: 15mm; }

          /* HEADER */
          .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 3px solid #198754; padding-bottom: 15px; margin-bottom: 20px; }
          .company-name { font-size: 26px; font-weight: 800; color: #198754; letter-spacing: 1px; }
          .company-info { font-size: 12px; color: #555; margin-top: 4px; line-height: 1.6; }
          .invoice-title { text-align: right; }
          .invoice-title h2 { font-size: 28px; font-weight: 800; color: #198754; letter-spacing: 2px; }
          .invoice-no { font-size: 14px; color: #333; margin-top: 5px; }
          .invoice-badge { background: #198754; color: white; padding: 3px 10px; border-radius: 20px; font-size: 11px; }

          /* BILL TO / FROM */
          .meta-row { display: flex; justify-content: space-between; margin-bottom: 20px; gap: 20px; }
          .meta-box { flex: 1; background: #f8f9fa; border-left: 4px solid #198754; padding: 12px 15px; border-radius: 0 8px 8px 0; }
          .meta-box h4 { font-size: 11px; text-transform: uppercase; color: #888; letter-spacing: 1px; margin-bottom: 6px; }
          .meta-box p { font-size: 13px; color: #222; line-height: 1.7; }
          .meta-box strong { font-size: 15px; color: #111; }

          /* TABLE */
          table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          thead tr { background: #198754; color: white; }
          thead th { padding: 10px 12px; text-align: left; font-size: 12px; letter-spacing: 0.5px; }
          tbody tr:nth-child(even) { background: #f6faf7; }
          tbody tr:hover { background: #e9f5ec; }
          tbody td { padding: 9px 12px; border-bottom: 1px solid #e5e5e5; }
          .text-right { text-align: right; }

          /* TOTALS */
          .totals-wrapper { display: flex; justify-content: flex-end; }
          .totals { width: 280px; }
          .totals table { margin: 0; }
          .totals td { padding: 6px 12px; border: none; font-size: 13px; }
          .totals tr.grand-total td { background: #198754; color: white; font-size: 16px; font-weight: 700; padding: 10px 12px; border-radius: 4px; }

          /* FOOTER */
          .footer { margin-top: 40px; border-top: 1px dashed #ccc; padding-top: 20px; display: flex; justify-content: space-between; }
          .sign-box { text-align: center; width: 160px; }
          .sign-line { border-top: 1px solid #333; margin-top: 40px; padding-top: 6px; font-size: 12px; color: #555; }
          .thank-you { text-align: center; margin-top: 30px; color: #198754; font-size: 14px; font-weight: 600; }
          .watermark { text-align: center; margin-top: 8px; font-size: 11px; color: #aaa; }

          @media print {
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .page { padding: 10mm; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="page">

          <!-- HEADER -->
          <div class="header">
            <div>
              <div class="company-name">${company.name}</div>
              <div class="company-info">
                📍 ${company.address}<br>
                📞 ${company.phone} &nbsp;&nbsp; ✉️ ${company.email}
              </div>
            </div>
            <div class="invoice-title">
              <h2>INVOICE</h2>
              <div class="invoice-no">
                <span class="invoice-badge">${invoice.invoiceNo}</span>
              </div>
              <div style="margin-top:8px; font-size:12px; color:#555;">
                Date: <strong>${this.formatDate(invoice.invoiceDate)}</strong>
              </div>
            </div>
          </div>

          <!-- BILL TO / DETAILS -->
          <div class="meta-row">
            <div class="meta-box">
              <h4>Bill To</h4>
              <p><strong>${invoice.customerName || 'Customer'}</strong></p>
            </div>
            <div class="meta-box">
              <h4>Invoice Details</h4>
              <p>Invoice No: <strong>${invoice.invoiceNo}</strong><br>
                 Date: <strong>${this.formatDate(invoice.invoiceDate)}</strong><br>
                 Status: <strong style="color:#198754">PAID</strong>
              </p>
            </div>
          </div>

          <!-- ITEMS TABLE -->
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Description</th>
                <th class="text-right">Qty</th>
                <th class="text-right">Rate</th>
                <th class="text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>

          <!-- TOTALS -->
          <div class="totals-wrapper">
            <div class="totals">
              <table>
                <tr>
                  <td>Sub Total:</td>
                  <td class="text-right">${this.fmt(invoice.totalAmount)}</td>
                </tr>
                <tr>
                  <td>Discount:</td>
                  <td class="text-right">0.00</td>
                </tr>
                <tr class="grand-total">
                  <td>Total:</td>
                  <td class="text-right">${this.fmt(invoice.totalAmount)}</td>
                </tr>
              </table>
            </div>
          </div>

          <!-- FOOTER -->
          <div class="footer">
            <div class="sign-box">
              <div class="sign-line">Customer Signature</div>
            </div>
            <div class="sign-box">
              <div class="sign-line">Authorized Signature</div>
            </div>
          </div>

          <div class="thank-you">🎉 Thank you for your business!</div>
          <div class="watermark">Powered by Sultan Tawakal ERP</div>

        </div>

        <script>window.onload = function() { window.print(); window.onafterprint = function() { window.close(); }; }</script>
      </body>
      </html>
    `;

    this.openPrintWindow(html);
  }

  // ─── PURCHASE BILL PRINT ───
  printPurchaseBill(bill: any, companyInfo: any = {}) {
    const company = {
      name:    companyInfo.name    || 'Sultan Tawakal Trading',
      address: companyInfo.address || 'Karachi, Pakistan',
      phone:   companyInfo.phone   || '0300-0000000',
      email:   companyInfo.email   || 'info@company.com',
    };

    const itemsHtml = bill.items.map((item: any, i: number) => `
      <tr>
        <td>${i + 1}</td>
        <td>${item.productName}</td>
        <td>${item.description || '-'}</td>
        <td class="text-right">${item.qty}</td>
        <td class="text-right">${this.fmt(item.rate)}</td>
        <td class="text-right"><strong>${this.fmt(item.qty * item.rate)}</strong></td>
      </tr>
    `).join('');

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Purchase Bill - ${bill.billNo}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; color: #222; background: #fff; }
          .page { width: 210mm; min-height: 297mm; margin: 0 auto; padding: 15mm; }
          .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 3px solid #0d6efd; padding-bottom: 15px; margin-bottom: 20px; }
          .company-name { font-size: 26px; font-weight: 800; color: #0d6efd; letter-spacing: 1px; }
          .company-info { font-size: 12px; color: #555; margin-top: 4px; line-height: 1.6; }
          .bill-title { text-align: right; }
          .bill-title h2 { font-size: 28px; font-weight: 800; color: #0d6efd; letter-spacing: 2px; }
          .badge { background: #0d6efd; color: white; padding: 3px 10px; border-radius: 20px; font-size: 11px; }
          .meta-row { display: flex; justify-content: space-between; margin-bottom: 20px; gap: 20px; }
          .meta-box { flex: 1; background: #f0f4ff; border-left: 4px solid #0d6efd; padding: 12px 15px; border-radius: 0 8px 8px 0; }
          .meta-box h4 { font-size: 11px; text-transform: uppercase; color: #888; letter-spacing: 1px; margin-bottom: 6px; }
          .meta-box p { font-size: 13px; color: #222; line-height: 1.7; }
          .meta-box strong { font-size: 15px; color: #111; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          thead tr { background: #0d6efd; color: white; }
          thead th { padding: 10px 12px; text-align: left; font-size: 12px; }
          tbody tr:nth-child(even) { background: #f0f4ff; }
          tbody td { padding: 9px 12px; border-bottom: 1px solid #e5e5e5; }
          .text-right { text-align: right; }
          .totals-wrapper { display: flex; justify-content: flex-end; }
          .totals { width: 280px; }
          .totals td { padding: 6px 12px; border: none; font-size: 13px; }
          .totals tr.grand-total td { background: #0d6efd; color: white; font-size: 16px; font-weight: 700; padding: 10px 12px; border-radius: 4px; }
          .footer { margin-top: 40px; border-top: 1px dashed #ccc; padding-top: 20px; display: flex; justify-content: space-between; }
          .sign-box { text-align: center; width: 160px; }
          .sign-line { border-top: 1px solid #333; margin-top: 40px; padding-top: 6px; font-size: 12px; color: #555; }
          .thank-you { text-align: center; margin-top: 30px; color: #0d6efd; font-size: 14px; font-weight: 600; }
          .watermark { text-align: center; margin-top: 8px; font-size: 11px; color: #aaa; }
          @media print {
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .page { padding: 10mm; }
          }
        </style>
      </head>
      <body>
        <div class="page">
          <div class="header">
            <div>
              <div class="company-name">${company.name}</div>
              <div class="company-info">
                📍 ${company.address}<br>
                📞 ${company.phone} &nbsp;&nbsp; ✉️ ${company.email}
              </div>
            </div>
            <div class="bill-title">
              <h2>PURCHASE BILL</h2>
              <div style="margin-top:5px;"><span class="badge">${bill.billNo}</span></div>
              <div style="margin-top:8px; font-size:12px; color:#555;">
                Date: <strong>${this.formatDate(bill.billDate)}</strong>
              </div>
            </div>
          </div>

          <div class="meta-row">
            <div class="meta-box">
              <h4>Vendor</h4>
              <p><strong>${bill.vendorName || 'Vendor'}</strong></p>
            </div>
            <div class="meta-box">
              <h4>Bill Details</h4>
              <p>Bill No: <strong>${bill.billNo}</strong><br>
                 Date: <strong>${this.formatDate(bill.billDate)}</strong>
              </p>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>#</th><th>Product</th><th>Description</th>
                <th class="text-right">Qty</th>
                <th class="text-right">Rate</th>
                <th class="text-right">Amount</th>
              </tr>
            </thead>
            <tbody>${itemsHtml}</tbody>
          </table>

          <div class="totals-wrapper">
            <div class="totals">
              <table>
                <tr><td>Sub Total:</td><td class="text-right">${this.fmt(bill.totalAmount)}</td></tr>
                <tr class="grand-total"><td>Total:</td><td class="text-right">${this.fmt(bill.totalAmount)}</td></tr>
              </table>
            </div>
          </div>

          <div class="footer">
            <div class="sign-box"><div class="sign-line">Vendor Signature</div></div>
            <div class="sign-box"><div class="sign-line">Authorized Signature</div></div>
          </div>
          <div class="thank-you">Purchase Bill — ${company.name}</div>
          <div class="watermark">Powered by Sultan Tawakal ERP</div>
        </div>
        <script>window.onload = function() { window.print(); window.onafterprint = function() { window.close(); }; }</script>
      </body>
      </html>
    `;

    this.openPrintWindow(html);
  }

  // ─── HELPERS ───
  private openPrintWindow(html: string) {
    const w = window.open('', '_blank', 'width=900,height=700');
    if (w) { w.document.write(html); w.document.close(); }
  }

  private fmt(n: number): string {
    return (n || 0).toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  private formatDate(dateStr: string): string {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  }
}
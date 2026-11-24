;(function () {
  function escapeHtml(str) {
    if (str === null || str === undefined) return "";
    const div = document.createElement("div");
    div.textContent = String(str);
    return div.innerHTML;
  }

  function getToastContainer() {
    let container = document.getElementById("toast-container");
    if (!container) {
      container = document.querySelector(".toast-container");
    }
    if (!container) {
      container = document.createElement("div");
      container.id = "toast-container";
      container.className = "toast-container";
      document.body.appendChild(container);
    }
    return container;
  }

  function showToast(message, type = "info") {
    const container = getToastContainer();
    const el = document.createElement("div");
    el.className = `toast ${type}`;
    
    let iconSvg = "";
    if (type === "success") {
      iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>';
    } else if (type === "error" || type === "danger") {
      iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>';
    } else if (type === "warning") {
      iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>';
    } else {
      iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>';
    }

    el.innerHTML = `
      <div style="display:flex;align-items:center;gap:10px;">
        ${iconSvg}
        <span>${escapeHtml(message)}</span>
      </div>
      <button class="toast-close" aria-label="Tutup notifikasi">&times;</button>
    `;

    const closeBtn = el.querySelector(".toast-close");
    closeBtn.addEventListener("click", () => el.remove());

    container.appendChild(el);
    setTimeout(() => {
      if (el.parentNode) el.remove();
    }, 4500);
  }

  function openDialog({ title, bodyHTML, onConfirm, confirmLabel = "Konfirmasi", cancelLabel = "Batal", isDanger = false }) {
    const existing = document.getElementById("active-dialog-overlay");
    if (existing) existing.remove();

    const overlay = document.createElement("div");
    overlay.id = "active-dialog-overlay";
    overlay.className = "dialog-overlay open";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");

    overlay.innerHTML = `
      <div class="dialog">
        <div class="dialog-header">
          <h3 class="dialog-title">${escapeHtml(title)}</h3>
          <button class="dialog-close" data-action="cancel" aria-label="Tutup dialog">&times;</button>
        </div>
        <div class="dialog-body">${bodyHTML || ""}</div>
        <div class="dialog-footer">
          <button class="btn btn-secondary btn-sm" data-action="cancel">${escapeHtml(cancelLabel)}</button>
          <button class="btn ${isDanger ? 'btn-danger' : 'btn-primary'} btn-sm" data-action="confirm">${escapeHtml(confirmLabel)}</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    const close = () => overlay.remove();

    overlay.querySelectorAll('[data-action="cancel"]').forEach(btn => {
      btn.addEventListener("click", close);
    });

    const confirmBtn = overlay.querySelector('[data-action="confirm"]');
    if (confirmBtn) {
      confirmBtn.addEventListener("click", () => {
        if (onConfirm) {
          const result = onConfirm();
          if (result !== false) close();
        } else {
          close();
        }
      });
    }

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) close();
    });

    const keyHandler = (e) => {
      if (e.key === "Escape") {
        close();
        document.removeEventListener("keydown", keyHandler);
      }
    };
    document.addEventListener("keydown", keyHandler);
  }

  function formatRupiah(amount) {
    if (!Number.isFinite(amount)) return "Rp 0";
    return "Rp " + Math.round(amount).toLocaleString("id-ID");
  }

  function formatDate(dateStr, includeTime = false) {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return dateStr;
    const options = { year: "numeric", month: "short", day: "numeric" };
    if (includeTime) {
      options.hour = "2-digit";
      options.minute = "2-digit";
    }
    return d.toLocaleDateString("id-ID", options);
  }

  function formatBytes(bytes) {
    if (!Number.isFinite(bytes) || bytes <= 0) return "0 GB";
    const gib = bytes / (1024 * 1024 * 1024);
    if (gib >= 1) {
      return (Number.isInteger(gib) ? gib : gib.toFixed(1)) + " GB";
    }
    const mib = bytes / (1024 * 1024);
    if (mib >= 1) {
      return (Number.isInteger(mib) ? mib : mib.toFixed(1)) + " MB";
    }
    return Math.round(bytes / 1024) + " KB";
  }

  // Interactive Payment Checkout Modal
  function openCheckoutModal({ orderId, title, amountIdr, customerName, onPaid }) {
    const existing = document.getElementById("active-checkout-modal");
    if (existing) existing.remove();

    const overlay = document.createElement("div");
    overlay.id = "active-checkout-modal";
    overlay.className = "dialog-overlay open";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");

    const formattedAmount = formatRupiah(amountIdr);
    const codeId = orderId || `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    overlay.innerHTML = `
      <div class="dialog" style="max-width:540px;">
        <div class="dialog-header">
          <div>
            <span style="font-size:0.75rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--c-accent);">Pembayaran Resmi</span>
            <h3 class="dialog-title" style="margin-top:2px;">Konfirmasi & Selesaikan Transaksi</h3>
          </div>
          <button class="dialog-close" data-action="cancel" aria-label="Tutup">&times;</button>
        </div>
        <div class="dialog-body" id="checkout-modal-body" style="padding:24px;">
          <!-- Detail Pesanan -->
          <div style="background:#f9f6f0;border:1px solid var(--c-line);border-radius:var(--radius-card);padding:18px;margin-bottom:20px;">
            <div style="display:flex;justify-content:space-between;margin-bottom:8px;font-size:0.9rem;">
              <span style="color:var(--c-muted);">No. Pesanan / Invoice:</span>
              <strong>${escapeHtml(codeId)}</strong>
            </div>
            <div style="display:flex;justify-content:space-between;margin-bottom:8px;font-size:0.9rem;">
              <span style="color:var(--c-muted);">Deskripsi Layanan:</span>
              <span style="font-weight:600;color:var(--c-ink);">${escapeHtml(title || "Layanan Momenin")}</span>
            </div>
            ${customerName ? `
            <div style="display:flex;justify-content:space-between;margin-bottom:8px;font-size:0.9rem;">
              <span style="color:var(--c-muted);">Nama Pemesan:</span>
              <span>${escapeHtml(customerName)}</span>
            </div>` : ''}
            <div style="display:flex;justify-content:space-between;align-items:center;padding-top:12px;border-top:1px dashed var(--c-line);margin-top:8px;">
              <span style="font-weight:600;color:var(--c-ink);">Total Pembayaran:</span>
              <span style="font-family:var(--font-heading);font-size:1.6rem;font-weight:700;color:var(--c-accent);">${formattedAmount}</span>
            </div>
          </div>

          <!-- Pilihan Metode Pembayaran -->
          <div style="margin-bottom:20px;">
            <label class="form-label" style="margin-bottom:10px;">Pilih Metode Pembayaran</label>
            <div style="display:grid;gap:10px;">
              <label style="display:flex;align-items:center;gap:12px;padding:12px 14px;border:1px solid var(--c-accent);background:var(--c-accent-light);border-radius:var(--radius-sm);cursor:pointer;">
                <input type="radio" name="pay-method" value="bca" checked style="accent-color:var(--c-accent);">
                <div style="flex:1;">
                  <strong style="display:block;font-size:0.92rem;color:var(--c-ink);">BCA Virtual Account</strong>
                  <span style="font-size:0.8rem;color:var(--c-muted);">No. VA: <strong>8277 0812 3456 7890</strong> (Otomatis)</span>
                </div>
                <span class="badge badge-outline" style="font-size:0.7rem;">Instan</span>
              </label>

              <label style="display:flex;align-items:center;gap:12px;padding:12px 14px;border:1px solid var(--c-line);border-radius:var(--radius-sm);cursor:pointer;">
                <input type="radio" name="pay-method" value="mandiri" style="accent-color:var(--c-accent);">
                <div style="flex:1;">
                  <strong style="display:block;font-size:0.92rem;color:var(--c-ink);">Mandiri Virtual Account</strong>
                  <span style="font-size:0.8rem;color:var(--c-muted);">No. VA: <strong>8890 0812 3456 7890</strong></span>
                </div>
                <span class="badge badge-outline" style="font-size:0.7rem;">Instan</span>
              </label>

              <label style="display:flex;align-items:center;gap:12px;padding:12px 14px;border:1px solid var(--c-line);border-radius:var(--radius-sm);cursor:pointer;">
                <input type="radio" name="pay-method" value="qris" style="accent-color:var(--c-accent);">
                <div style="flex:1;">
                  <strong style="display:block;font-size:0.92rem;color:var(--c-ink);">QRIS (GoPay, OVO, ShopeePay, Dana, BCA Mobile)</strong>
                  <span style="font-size:0.8rem;color:var(--c-muted);">Scan QR Code langsung dari smartphone Anda</span>
                </div>
                <span class="badge badge-outline" style="font-size:0.7rem;">QRIS</span>
              </label>

              <label style="display:flex;align-items:center;gap:12px;padding:12px 14px;border:1px solid var(--c-line);border-radius:var(--radius-sm);cursor:pointer;">
                <input type="radio" name="pay-method" value="cc" style="accent-color:var(--c-accent);">
                <div style="flex:1;">
                  <strong style="display:block;font-size:0.92rem;color:var(--c-ink);">Kartu Kredit / Debit Visa & Mastercard</strong>
                  <span style="font-size:0.8rem;color:var(--c-muted);">Enkripsi keamanan 256-bit SSL</span>
                </div>
              </label>
            </div>
          </div>

          <div style="background:#eaf3ec;border:1px solid #c9e2cf;border-radius:var(--radius-sm);padding:12px;font-size:0.85rem;color:var(--c-success);display:flex;align-items:center;gap:8px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <span>Koneksi transaksi aman & terverifikasi otomatis.</span>
          </div>
        </div>

        <div class="dialog-footer" style="padding:16px 24px;">
          <button class="btn btn-secondary btn-sm" data-action="cancel">Batalkan</button>
          <button class="btn btn-primary" id="btn-confirm-pay" style="padding:10px 24px;">
            <span>Bayar Sekarang (${formattedAmount})</span>
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    const close = () => overlay.remove();
    overlay.querySelectorAll('[data-action="cancel"]').forEach(btn => btn.addEventListener("click", close));
    overlay.addEventListener("click", (e) => { if (e.target === overlay) close(); });

    const payBtn = overlay.querySelector("#btn-confirm-pay");
    payBtn.addEventListener("click", () => {
      payBtn.disabled = true;
      const modalBody = overlay.querySelector("#checkout-modal-body");
      
      modalBody.innerHTML = `
        <div style="text-align:center;padding:48px 24px;">
          <div style="width:52px;height:52px;border:4px solid var(--c-line);border-top-color:var(--c-accent);border-radius:50%;animation:spin 1s linear infinite;margin:0 auto 20px;"></div>
          <h3 style="font-size:1.3rem;margin-bottom:8px;">Memverifikasi Pembayaran...</h3>
          <p style="color:var(--c-muted);font-size:0.95rem;">Mohon jangan menutup jendela ini selagi sistem memproses transaksi Anda.</p>
        </div>
        <style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>
      `;

      setTimeout(() => {
        modalBody.innerHTML = `
          <div style="text-align:center;padding:40px 24px;">
            <div style="width:64px;height:64px;border-radius:50%;background:#eaf3ec;color:var(--c-success);display:flex;align-items:center;justify-content:center;margin:0 auto 20px;">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h3 style="font-size:1.6rem;color:var(--c-ink);margin-bottom:8px;">Pembayaran Berhasil!</h3>
            <p style="color:var(--c-muted);font-size:0.95rem;max-width:400px;margin:0 auto 24px;">
              Transaksi sebesar <strong>${formattedAmount}</strong> telah berhasil diverifikasi. Layanan dan album Anda siap digunakan.
            </p>
            <button class="btn btn-primary" id="btn-checkout-finish" style="width:100%;">
              Lanjutkan ke Halaman Layanan &rarr;
            </button>
          </div>
        `;

        overlay.querySelector(".dialog-footer").style.display = "none";

        overlay.querySelector("#btn-checkout-finish").addEventListener("click", () => {
          close();
          if (onPaid) onPaid({ orderId: codeId, amountIdr, status: "lunas" });
        });
      }, 1500);
    });
  }

  // Download simulation triggering an actual file download in browser
  function downloadMockFile(fileName, contentText = "Dokumentasi Momenin Studio") {
    const blob = new Blob([contentText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName || "momenin-dokumentasi.jpg";
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      a.remove();
      URL.revokeObjectURL(url);
    }, 200);
    showToast(`Mengunduh ${fileName}...`, "success");
  }

  window.ui = {
    escapeHtml,
    showToast,
    openDialog,
    openCheckoutModal,
    downloadMockFile,
    formatRupiah,
    formatDate,
    formatBytes
  };
  window.escapeHtml = escapeHtml;
  window.toast = showToast;
  window.formatRupiah = formatRupiah;
  window.formatDate = formatDate;
  window.formatBytes = formatBytes;
})();

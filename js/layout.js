;(function () {
  function getBasePrefix() {
    const path = window.location.pathname;
    if (path.includes("/app/") || path.includes("/admin/")) {
      return "../";
    }
    return "";
  }

  function escapeHtml(str) {
    if (str === null || str === undefined) return "";
    const div = document.createElement("div");
    div.textContent = String(str);
    return div.innerHTML;
  }

  function getNavHTML(session, prefix) {
    let mainLinks = "";
    let rightHTML = "";
    const isAppPath = window.location.pathname.includes("/app/");
    const isAdmin = session && session.role === "admin";

    if (!session) {
      // Guest
      mainLinks = `
        <ul class="header-nav-list">
          <li><a href="${prefix}index.html" class="header-nav-link" data-page="index.html">Beranda</a></li>
          <li><a href="${prefix}tentang.html" class="header-nav-link" data-page="tentang.html">Tentang</a></li>
          <li><a href="${prefix}layanan.html" class="header-nav-link" data-page="layanan.html">Layanan</a></li>
          <li><a href="${prefix}portofolio.html" class="header-nav-link" data-page="portofolio.html">Portofolio</a></li>
          <li><a href="${prefix}paket.html" class="header-nav-link" data-page="paket.html">Paket & Harga</a></li>
          <li><a href="${prefix}kontak.html" class="header-nav-link" data-page="kontak.html">Kontak</a></li>
        </ul>`;
      rightHTML = `
        <div class="header-actions">
          <a href="${prefix}login.html" class="btn btn-secondary btn-sm">Masuk</a>
          <a href="${prefix}register.html" class="btn btn-primary btn-sm">Daftar Akun</a>
        </div>`;
    } else if (session.role === "user" || (isAdmin && isAppPath)) {
      // User view (or admin previewing app area)
      const adminBadge = isAdmin ? `<span class="badge badge-warning" style="margin-left:8px;font-size:0.75rem;">Mode Admin</span>` : "";
      mainLinks = `
        <ul class="header-nav-list">
          <li><a href="${prefix}index.html" class="header-nav-link" data-page="index.html">Beranda</a></li>
          <li><a href="${prefix}layanan.html" class="header-nav-link" data-page="layanan.html">Layanan</a></li>
          <li><a href="${prefix}portofolio.html" class="header-nav-link" data-page="portofolio.html">Portofolio</a></li>
          <li><a href="${prefix}paket.html" class="header-nav-link" data-page="paket.html">Paket</a></li>
          <li><a href="${prefix}app/proyek.html" class="header-nav-link" data-page="proyek.html">Proyek Saya</a></li>
          <li><a href="${prefix}app/album.html" class="header-nav-link" data-page="album.html">Album</a></li>
          <li><a href="${prefix}app/penyimpanan.html" class="header-nav-link" data-page="penyimpanan.html">Penyimpanan</a></li>
        </ul>`;
      rightHTML = `
        <div class="header-user dropdown">
          <button class="header-user-btn" aria-haspopup="true" aria-expanded="false" id="user-menu-trigger">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <span>${escapeHtml(session.name || "Pelanggan")}</span>
            ${adminBadge}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
          </button>
          <div class="dropdown-menu">
            <a href="${prefix}app/dashboard.html">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
              Dashboard Saya
            </a>
            <a href="${prefix}app/transaksi.html">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
              Riwayat Transaksi
            </a>
            <a href="${prefix}app/profil.html">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              Profil Akun
            </a>
            ${isAdmin ? `<a href="${prefix}admin/index.html"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3 7h7l-6 4 2 7-6-4-6 4 2-7-6-4h7z"/></svg>Panel Admin</a>` : ""}
            <hr>
            <a href="#" id="logout-btn" style="color:var(--c-danger);">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              Keluar
            </a>
          </div>
        </div>`;
    } else if (isAdmin) {
      // Admin Header
      mainLinks = `
        <ul class="header-nav-list header-nav-admin">
          <li><a href="${prefix}admin/index.html" class="header-nav-link" data-page="index.html">Dashboard</a></li>
          <li><a href="${prefix}admin/pelanggan.html" class="header-nav-link" data-page="pelanggan.html">Pelanggan</a></li>
          <li><a href="${prefix}admin/proyek.html" class="header-nav-link" data-page="proyek.html">Proyek</a></li>
          <li><a href="${prefix}admin/album.html" class="header-nav-link" data-page="album.html">Album</a></li>
          <li><a href="${prefix}admin/media.html" class="header-nav-link" data-page="media.html">Media</a></li>
          <li><a href="${prefix}admin/layanan.html" class="header-nav-link" data-page="layanan.html">Layanan</a></li>
          <li><a href="${prefix}admin/paket.html" class="header-nav-link" data-page="paket.html">Paket</a></li>
          <li><a href="${prefix}admin/langganan.html" class="header-nav-link" data-page="langganan.html">Langganan</a></li>
          <li><a href="${prefix}admin/pembayaran.html" class="header-nav-link" data-page="pembayaran.html">Pembayaran</a></li>
          <li><a href="${prefix}admin/pemesanan.html" class="header-nav-link" data-page="pemesanan.html">Pemesanan</a></li>
          <li><a href="${prefix}admin/aktivitas.html" class="header-nav-link" data-page="aktivitas.html">Aktivitas</a></li>
          <li><a href="${prefix}admin/pengaturan.html" class="header-nav-link" data-page="pengaturan.html">Pengaturan</a></li>
        </ul>`;
      rightHTML = `
        <div class="header-user dropdown">
          <button class="header-user-btn" aria-haspopup="true" aria-expanded="false" id="user-menu-trigger">
            <span class="badge badge-primary" style="margin-right:6px;">Admin</span>
            <span>${escapeHtml(session.name || "Administrator")}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
          </button>
          <div class="dropdown-menu">
            <a href="${prefix}index.html">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              Buka Beranda
            </a>
            <hr>
            <a href="#" id="logout-btn" style="color:var(--c-danger);">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              Keluar
            </a>
          </div>
        </div>`;
    }

    return { mainLinks, rightHTML };
  }

  function renderHeader() {
    const header = document.getElementById("site-header");
    if (!header) return;

    const prefix = getBasePrefix();
    const session = window.auth?.getSession ? window.auth.getSession() : null;
    let name = "Pengguna";
    if (session) {
      const user = window.auth?.getCurrentUser ? window.auth.getCurrentUser() : null;
      name = user?.name || (session.role === "admin" ? "Administrator" : "Pelanggan");
    }

    const { mainLinks, rightHTML } = getNavHTML(session ? { ...session, name } : null, prefix);

    header.innerHTML = `
      <header class="header" role="banner">
        <div class="container header-inner">
          <a href="${prefix}index.html" class="header-brand" aria-label="Momenin Beranda">
            <span class="brand-text">Momenin</span>
            <span class="brand-tag">Studio</span>
          </a>

          <button class="header-hamburger" aria-label="Buka menu navigasi" aria-expanded="false" aria-controls="header-nav">
            <span></span><span></span><span></span>
          </button>

          <nav id="header-nav" class="header-nav" role="navigation" aria-label="Navigasi utama">
            ${mainLinks}
            ${rightHTML}
          </nav>
        </div>
      </header>
      <div class="sidebar-overlay" id="mobile-nav-overlay" aria-hidden="true"></div>
    `;

    bindHeaderEvents();
  }

  function bindHeaderEvents() {
    const hamburger = document.querySelector(".header-hamburger");
    const nav = document.getElementById("header-nav");
    const overlay = document.getElementById("mobile-nav-overlay");
    const trigger = document.getElementById("user-menu-trigger");
    const dropdown = document.querySelector(".header-user.dropdown");
    const logoutBtn = document.getElementById("logout-btn");

    if (hamburger && nav && overlay) {
      const toggleNav = () => {
        const isOpen = nav.classList.toggle("open");
        hamburger.setAttribute("aria-expanded", isOpen);
        overlay.classList.toggle("open", isOpen);
        document.body.style.overflow = isOpen ? "hidden" : "";
      };

      hamburger.addEventListener("click", toggleNav);
      overlay.addEventListener("click", () => {
        nav.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
        overlay.classList.remove("open");
        document.body.style.overflow = "";
      });

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && nav.classList.contains("open")) {
          nav.classList.remove("open");
          hamburger.setAttribute("aria-expanded", "false");
          overlay.classList.remove("open");
          document.body.style.overflow = "";
        }
      });
    }

    if (trigger && dropdown) {
      trigger.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = dropdown.classList.toggle("open");
        trigger.setAttribute("aria-expanded", isOpen);
      });

      document.addEventListener("click", (e) => {
        if (!dropdown.contains(e.target)) {
          dropdown.classList.remove("open");
          trigger.setAttribute("aria-expanded", "false");
        }
      });
    }

    if (logoutBtn) {
      logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        window.auth?.logout();
      });
    }

    const currentFile = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".header-nav-link").forEach(link => {
      const page = link.getAttribute("data-page");
      if (page === currentFile) {
        link.classList.add("active");
      }
    });
  }

  function renderFooter() {
    const footer = document.getElementById("site-footer");
    if (!footer) return;
    const prefix = getBasePrefix();

    footer.innerHTML = `
      <footer class="footer" role="contentinfo">
        <div class="container footer-grid">
          <div class="footer-col-about">
            <div class="footer-brand">
              <span class="brand-text" style="color:#fff;">Momenin</span>
              <span class="brand-tag" style="border-color:rgba(255,255,255,0.3);color:rgba(255,255,255,0.9);margin-left:8px;">Studio</span>
            </div>
            <p class="footer-desc">Momenin membantu pelanggan mengabadikan momen penting melalui layanan dokumentasi profesional dan mengakses kenangannya secara praktis melalui album digital.</p>
            <div class="footer-contact-info">
              <p>📍 Jl. Senopati No. 42, Kebayoran Baru, Jakarta Selatan 12190</p>
              <p>✉️ Email: <a href="mailto:halo@momenin.id" style="color:rgba(255,255,255,0.85);">halo@momenin.id</a></p>
              <p>📞 WhatsApp: <a href="https://wa.me/6281234567890" target="_blank" style="color:rgba(255,255,255,0.85);">+62 812-3456-7890</a></p>
              <p>📷 Instagram & TikTok: <strong>@momeninstudio</strong></p>
            </div>
          </div>

          <div class="footer-col">
            <h4 class="footer-title">Layanan Dokumentasi</h4>
            <ul class="footer-links">
              <li><a href="${prefix}layanan-detail.html?slug=pernikahan">Dokumentasi Pernikahan</a></li>
              <li><a href="${prefix}layanan-detail.html?slug=prewedding">Sesi Prewedding</a></li>
              <li><a href="${prefix}layanan-detail.html?slug=wisuda">Dokumentasi Wisuda</a></li>
              <li><a href="${prefix}layanan-detail.html?slug=acara-keluarga">Acara Keluarga & Ulang Tahun</a></li>
              <li><a href="${prefix}layanan-detail.html?slug=korporat">Dokumentasi Korporat & Event</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h4 class="footer-title">Eksplorasi</h4>
            <ul class="footer-links">
              <li><a href="${prefix}tentang.html">Tentang Momenin</a></li>
              <li><a href="${prefix}paket.html">Pilihan Paket & Harga</a></li>
              <li><a href="${prefix}portofolio.html">Galeri Portofolio</a></li>
              <li><a href="${prefix}kontak.html">Hubungi Kami</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h4 class="footer-title">Informasi & Bantuan</h4>
            <ul class="footer-links">
              <li><a href="${prefix}kebijakan-privasi.html">Kebijakan Privasi</a></li>
              <li><a href="${prefix}syarat-ketentuan.html">Syarat & Ketentuan Layanan</a></li>
              <li><a href="${prefix}login.html">Masuk ke Akun Pelanggan</a></li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <div class="container footer-bottom-inner">
            <p>© ${new Date().getFullYear()} Momenin Studio. Seluruh hak cipta dilindungi undang-undang.</p>
            <p class="footer-disclaimer">Layanan dokumentasi foto & video profesional terintegrasi album cloud.</p>
          </div>
        </div>
      </footer>
    `;
  }

  function renderLayout() {
    renderHeader();
    renderFooter();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderLayout);
  } else {
    renderLayout();
  }

  window.layout = { renderLayout, renderHeader, renderFooter };
})();

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
          <li><a href="${prefix}index.html" class="header-nav-link" data-page="index.html"><span>Beranda</span><svg class="nav-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg></a></li>
          <li><a href="${prefix}tentang.html" class="header-nav-link" data-page="tentang.html"><span>Tentang</span><svg class="nav-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg></a></li>
          <li><a href="${prefix}layanan.html" class="header-nav-link" data-page="layanan.html"><span>Layanan</span><svg class="nav-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg></a></li>
          <li><a href="${prefix}portofolio.html" class="header-nav-link" data-page="portofolio.html"><span>Portofolio</span><svg class="nav-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg></a></li>
          <li><a href="${prefix}paket.html" class="header-nav-link" data-page="paket.html"><span>Paket & Harga</span><svg class="nav-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg></a></li>
          <li><a href="${prefix}kontak.html" class="header-nav-link" data-page="kontak.html"><span>Kontak</span><svg class="nav-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg></a></li>
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
          <li><a href="${prefix}index.html" class="header-nav-link" data-page="index.html"><span>Beranda</span><svg class="nav-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg></a></li>
          <li><a href="${prefix}layanan.html" class="header-nav-link" data-page="layanan.html"><span>Layanan</span><svg class="nav-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg></a></li>
          <li><a href="${prefix}portofolio.html" class="header-nav-link" data-page="portofolio.html"><span>Portofolio</span><svg class="nav-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg></a></li>
          <li><a href="${prefix}paket.html" class="header-nav-link" data-page="paket.html"><span>Paket</span><svg class="nav-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg></a></li>
          <li><a href="${prefix}app/proyek.html" class="header-nav-link" data-page="proyek.html"><span>Proyek Saya</span><svg class="nav-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg></a></li>
          <li><a href="${prefix}app/album.html" class="header-nav-link" data-page="album.html"><span>Album</span><svg class="nav-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg></a></li>
          <li><a href="${prefix}app/penyimpanan.html" class="header-nav-link" data-page="penyimpanan.html"><span>Penyimpanan</span><svg class="nav-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg></a></li>
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
          <li><a href="${prefix}admin/index.html" class="header-nav-link" data-page="index.html"><span>Dashboard</span><svg class="nav-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg></a></li>
          <li><a href="${prefix}admin/pelanggan.html" class="header-nav-link" data-page="pelanggan.html"><span>Pelanggan</span><svg class="nav-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg></a></li>
          <li><a href="${prefix}admin/proyek.html" class="header-nav-link" data-page="proyek.html"><span>Proyek</span><svg class="nav-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg></a></li>
          <li><a href="${prefix}admin/album.html" class="header-nav-link" data-page="album.html"><span>Album</span><svg class="nav-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg></a></li>
          <li><a href="${prefix}admin/media.html" class="header-nav-link" data-page="media.html"><span>Media</span><svg class="nav-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg></a></li>
          <li><a href="${prefix}admin/layanan.html" class="header-nav-link" data-page="layanan.html"><span>Layanan</span><svg class="nav-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg></a></li>
          <li><a href="${prefix}admin/paket.html" class="header-nav-link" data-page="paket.html"><span>Paket</span><svg class="nav-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg></a></li>
          <li><a href="${prefix}admin/langganan.html" class="header-nav-link" data-page="langganan.html"><span>Langganan</span><svg class="nav-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg></a></li>
          <li><a href="${prefix}admin/pembayaran.html" class="header-nav-link" data-page="pembayaran.html"><span>Pembayaran</span><svg class="nav-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg></a></li>
          <li><a href="${prefix}admin/pemesanan.html" class="header-nav-link" data-page="pemesanan.html"><span>Pemesanan</span><svg class="nav-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg></a></li>
          <li><a href="${prefix}admin/aktivitas.html" class="header-nav-link" data-page="aktivitas.html"><span>Aktivitas</span><svg class="nav-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg></a></li>
          <li><a href="${prefix}admin/pengaturan.html" class="header-nav-link" data-page="pengaturan.html"><span>Pengaturan</span><svg class="nav-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg></a></li>
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
          </a>

          <button class="header-hamburger" id="header-hamburger-btn" aria-label="Menu navigasi" aria-expanded="false" aria-controls="header-nav">
            <span></span><span></span><span></span>
          </button>

          <nav id="header-nav" class="header-nav" role="navigation" aria-label="Navigasi utama">
            <div class="mobile-drawer-top">
              <span class="mobile-drawer-tag">Navigasi Utama</span>
            </div>

            <div class="mobile-drawer-body">
              ${mainLinks}
            </div>

            ${!session ? `
            <div class="mobile-drawer-highlight">
              <div class="highlight-title">Abadikan Momen Spesial</div>
              <p class="highlight-desc">Dokumentasi profesional berstandar tinggi dengan galeri album digital privat.</p>
              <a href="${prefix}paket.html" class="highlight-action">
                <span>Pesan Layanan Sekarang</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
              </a>
            </div>` : ''}

            <div class="mobile-drawer-footer">
              ${rightHTML}

              <div class="mobile-drawer-social">
                <a href="https://instagram.com" target="_blank" rel="noopener" class="social-btn" aria-label="Instagram Momenin" title="Instagram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                  <span>Instagram</span>
                </a>
                <a href="https://wa.me/6281234567890" target="_blank" rel="noopener" class="social-btn" aria-label="WhatsApp Momenin" title="WhatsApp">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                  </svg>
                  <span>WhatsApp</span>
                </a>
                <a href="mailto:halo@momenin.id" class="social-btn" aria-label="Email Momenin" title="Gmail">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  <span>Gmail</span>
                </a>
              </div>
            </div>
          </nav>
        </div>
      </header>
      <div class="mobile-nav-overlay" id="mobile-nav-overlay" aria-hidden="true"></div>
    `;

    bindHeaderEvents();
  }

  function bindHeaderEvents() {
    const hamburger = document.getElementById("header-hamburger-btn");
    const nav = document.getElementById("header-nav");
    const overlay = document.getElementById("mobile-nav-overlay");
    const headerEl = document.querySelector(".header");
    const trigger = document.getElementById("user-menu-trigger");
    const dropdown = document.querySelector(".header-user.dropdown");
    const logoutBtn = document.getElementById("logout-btn");

    function openMobileNav() {
      if (!nav || !hamburger || !overlay) return;
      if (headerEl) {
        headerEl.classList.remove("header-hidden");
        headerEl.classList.add("nav-is-open");
      }
      nav.classList.add("open");
      hamburger.classList.add("is-active");
      hamburger.setAttribute("aria-expanded", "true");
      overlay.classList.add("open");
      document.body.style.overflow = "hidden";
    }

    function closeMobileNav() {
      if (!nav || !hamburger || !overlay) return;
      if (headerEl) {
        headerEl.classList.remove("nav-is-open");
      }
      nav.classList.remove("open");
      hamburger.classList.remove("is-active");
      hamburger.setAttribute("aria-expanded", "false");
      overlay.classList.remove("open");
      document.body.style.overflow = "";
    }

    if (hamburger) {
      hamburger.addEventListener("click", () => {
        if (nav.classList.contains("open")) {
          closeMobileNav();
        } else {
          openMobileNav();
        }
      });
    }

    if (overlay) {
      overlay.addEventListener("click", closeMobileNav);
    }

    // Close on navigation link click on mobile
    if (nav) {
      nav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
          if (window.innerWidth < 900) {
            closeMobileNav();
          }
        });
      });
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav && nav.classList.contains("open")) {
        closeMobileNav();
      }
    });

    // Smart hide/show navbar on scroll (hide on scroll down, show on scroll up) — semua ukuran layar
    let lastScrollY = window.pageYOffset || document.documentElement.scrollTop;
    let scrollTicking = false;
    const SCROLL_THRESHOLD = 80; // hide setelah 80px scroll

    window.addEventListener("scroll", () => {
      if (!scrollTicking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
          const headerEl = document.querySelector(".header");

          if (headerEl) {
            const isNavOpen = nav && nav.classList.contains("open");

            // Tambah class scrolled untuk shadow subtle
            if (currentScrollY > 10) {
              headerEl.classList.add("scrolled");
            } else {
              headerEl.classList.remove("scrolled");
            }

            if (!isNavOpen) {
              // Scroll ke bawah melewati threshold → sembunyikan navbar
              if (currentScrollY > lastScrollY && currentScrollY > SCROLL_THRESHOLD) {
                headerEl.classList.add("header-hidden");
              }
              // Scroll ke atas ATAU sudah di paling atas → tampilkan navbar dengan animasi halus
              else if (currentScrollY < lastScrollY || currentScrollY <= SCROLL_THRESHOLD) {
                headerEl.classList.remove("header-hidden");
              }
            }
          }

          lastScrollY = Math.max(0, currentScrollY);
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    }, { passive: true });

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
              <span class="brand-text">Momenin</span>
            </div>
            <p class="footer-desc">Momenin membantu pelanggan mengabadikan momen penting melalui layanan dokumentasi profesional dan mengakses kenangannya secara praktis melalui album digital.</p>
            <div class="footer-contact-info">
              <div class="footer-contact-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>Jl. Senopati No. 42, Kebayoran Baru, Jakarta Selatan 12190</span>
              </div>
              <div class="footer-contact-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                <span>Email: <a href="mailto:halo@momenin.id" style="color:#FFFFFF;text-decoration:underline;">halo@momenin.id</a></span>
              </div>
              <div class="footer-contact-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span>WhatsApp: <a href="https://wa.me/6281234567890" target="_blank" style="color:#FFFFFF;text-decoration:underline;">+62 812-3456-7890</a></span>
              </div>
              <div class="footer-contact-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                <span>Instagram & TikTok: <strong style="color:#FFFFFF;">@momeninstudio</strong></span>
              </div>
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
            <p>© ${new Date().getFullYear()} Momenin. Seluruh hak cipta dilindungi undang-undang.</p>
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

  window.layout = {
    renderLayout,
    renderHeader,
    renderFooter
  };

  document.addEventListener("DOMContentLoaded", () => {
    renderLayout();
  });
})();

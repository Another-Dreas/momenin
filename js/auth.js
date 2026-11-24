;(function () {
  const SESSION_KEY = "momenin_user_session";

  function getBasePrefix() {
    const path = window.location.pathname;
    if (path.includes("/app/") || path.includes("/admin/")) {
      return "../";
    }
    return "";
  }

  function getSession() {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY) || localStorage.getItem(SESSION_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return null;
  }

  function setSession(userId, role) {
    const payload = JSON.stringify({ userId, role });
    sessionStorage.setItem(SESSION_KEY, payload);
    localStorage.setItem(SESSION_KEY, payload);
  }

  function clearSession() {
    sessionStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(SESSION_KEY);
  }

  function getCurrentUser() {
    const session = getSession();
    if (!session) return null;
    let user = window.store?.getById ? window.store.getById("users", session.userId) : null;
    if (!user && window.MOMENIN_SEED?.users) {
      user = window.MOMENIN_SEED.users.find(u => u.id === session.userId);
    }
    return user || null;
  }

  function requireLogin(requiredRole) {
    const session = getSession();
    const prefix = getBasePrefix();

    if (!session) {
      const next = encodeURIComponent(window.location.pathname + window.location.search);
      window.location.href = `${prefix}login.html?next=${next}`;
      return false;
    }

    if (requiredRole === "admin" && session.role !== "admin") {
      window.location.href = `${prefix}app/dashboard.html`;
      if (window.ui && window.ui.showToast) {
        window.ui.showToast("Anda tidak memiliki akses ke area ini.", "error");
      }
      return false;
    }

    return true;
  }

  function redirectIfLoggedIn() {
    const session = getSession();
    const prefix = getBasePrefix();
    if (session) {
      if (session.role === "admin") {
        window.location.href = `${prefix}admin/index.html`;
      } else {
        window.location.href = `${prefix}app/dashboard.html`;
      }
      return true;
    }
    return false;
  }

  async function login(email, password) {
    const inputEmail = (email || "").trim().toLowerCase();
    const inputPassword = (password || "").trim();

    // Check store first (persisted and registered users)
    const storeUsers = window.store?.getAll ? window.store.getAll("users") : [];
    let user = storeUsers.find(u => {
      const uEmail = (u.email || "").toLowerCase();
      return uEmail === inputEmail || uEmail.replace("@momenin.id", "@demo.momenin") === inputEmail || uEmail.replace("@demo.momenin", "@momenin.id") === inputEmail;
    });

    if (user) {
      if (user.password && user.password !== inputPassword) {
        throw new Error("Kata sandi yang Anda masukkan salah.");
      }
      setSession(user.id, user.role || "user");
      return user;
    }

    // Check seed accounts
    const seedUsers = window.MOMENIN_SEED?.users || [];
    const seedUser = seedUsers.find(u => {
      const uEmail = (u.email || "").toLowerCase();
      const matchEmail = (uEmail === inputEmail || uEmail.replace("@momenin.id", "@demo.momenin") === inputEmail || uEmail.replace("@demo.momenin", "@momenin.id") === inputEmail);
      return matchEmail && u.password === inputPassword;
    });
    if (seedUser) {
      setSession(seedUser.id, seedUser.role || "user");
      return seedUser;
    }

    throw new Error("Akun dengan email tersebut tidak ditemukan. Silakan periksa kembali atau daftar akun baru.");
  }

  function logout() {
    clearSession();
    const prefix = getBasePrefix();
    window.location.href = `${prefix}index.html`;
  }

  function getNextUrl() {
    const params = new URLSearchParams(window.location.search);
    const next = params.get("next");
    const prefix = getBasePrefix();
    if (next && !next.includes("login.html") && !next.includes("register.html")) {
      return next;
    }
    return getSession()?.role === "admin" ? `${prefix}admin/index.html` : `${prefix}app/dashboard.html`;
  }

  function isAdmin() {
    const s = getSession();
    return Boolean(s && s.role === "admin");
  }

  function isUser() {
    const s = getSession();
    return Boolean(s && s.role === "user");
  }

  window.auth = {
    getSession,
    setSession,
    clearSession,
    getCurrentUser,
    requireLogin,
    redirectIfLoggedIn,
    login,
    logout,
    getNextUrl,
    isAdmin,
    isUser
  };
})();

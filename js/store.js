;(function () {
  const KEY = "momenin_data_v2";

  function normalizeEntity(entity) {
    if (!entity) return "";
    if (typeof entity === "object" && entity.type) return entity.type;
    return String(entity);
  }

  function clone(obj) {
    try {
      return JSON.parse(JSON.stringify(obj));
    } catch {
      return obj;
    }
  }

  function readRaw() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch (e) {
      console.warn("Gagal membaca storage, menggunakan initial data.", e);
    }
    return null;
  }

  function initialData() {
    return clone(window.MOMENIN_SEED || {});
  }

  function load() {
    let data = readRaw();
    if (!data) {
      data = initialData();
      save(data);
    }
    return data;
  }

  function save(data) {
    try {
      localStorage.setItem(KEY, JSON.stringify(data));
    } catch (e) {
      console.error("Gagal menyimpan data:", e);
    }
  }

  const PREFIX = {
    users: "usr",
    services: "svc",
    packages: "pkg",
    requests: "req",
    projects: "prj",
    albums: "alb",
    media: "med",
    storagePlans: "sp",
    subscriptions: "sub",
    payments: "pay",
    folders: "fol",
    files: "fil",
    activity: "act"
  };

  function nextId(entityName) {
    const entity = normalizeEntity(entityName);
    const arr = getAll(entity);
    const prefix = PREFIX[entity] || entity.slice(0, 3);
    let max = 0;
    arr.forEach(item => {
      const m = String(item.id || "").match(/^[a-z]+-(\d+)$/i);
      if (m) {
        max = Math.max(max, parseInt(m[1], 10));
      }
    });
    return `${prefix}-${String(max + 1).padStart(3, "0")}`;
  }

  function getAll(entityName) {
    const entity = normalizeEntity(entityName);
    const data = load();
    return clone(data[entity] || []);
  }

  function getById(entityName, id) {
    const entity = normalizeEntity(entityName);
    const arr = getAll(entity);
    return arr.find(x => String(x.id) === String(id)) || null;
  }

  function create(entityName, obj) {
    const entity = normalizeEntity(entityName);
    const data = load();
    if (!data[entity]) data[entity] = [];
    const item = Object.assign({}, obj);
    if (!item.id) item.id = nextId(entity);
    data[entity].push(item);
    save(data);
    return clone(item);
  }

  function update(entityName, id, patch) {
    const entity = normalizeEntity(entityName);
    const data = load();
    const arr = data[entity] || [];
    const idx = arr.findIndex(x => String(x.id) === String(id));
    if (idx === -1) return null;
    arr[idx] = Object.assign({}, arr[idx], patch);
    save(data);
    return clone(arr[idx]);
  }

  function remove(entityName, id) {
    const entity = normalizeEntity(entityName);
    const data = load();
    const arr = data[entity] || [];
    const idx = arr.findIndex(x => String(x.id) === String(id));
    if (idx === -1) return false;
    arr.splice(idx, 1);
    save(data);
    return true;
  }

  function resetDemo() {
    try {
      localStorage.removeItem(KEY);
    } catch (e) {}
    const fresh = initialData();
    save(fresh);
    return fresh;
  }

  window.store = {
    getAll,
    getById,
    create,
    update,
    remove,
    resetDemo
  };
})();

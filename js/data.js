window.MOMENIN_SEED = {
  users: [
    { id: "usr-001", name: "Rara Pelanggan", email: "pelanggan@momenin.id", password: "demo1234", role: "user", status: "active", phone: "0812-3456-7801", createdAt: "2024-01-12" },
    { id: "usr-002", name: "Dimas dan Sinta", email: "pasangan@momenin.id", password: "demo1234", role: "user", status: "active", phone: "0812-3456-7802", createdAt: "2024-02-03" },
    { id: "usr-003", name: "Bimo Saputra", email: "bimo@momenin.id", password: "demo1234", role: "user", status: "inactive", phone: "0812-3456-7803", createdAt: "2024-03-21" },
    { id: "usr-004", name: "Admin Momenin", email: "admin@momenin.id", password: "admin1234", role: "admin", status: "active", phone: "0812-3456-7800", createdAt: "2024-01-01" }
  ],
  services: [
    { id: "svc-001", slug: "pernikahan", name: "Dokumentasi Pernikahan", category: "Pernikahan", description: "Tim dokumentasi untuk hari pernikahan: prosesi, resepsi, dan momen kebersamaan keluarga.", image: "https://picsum.photos/seed/momenin-wedding/900/700", active: true },
    { id: "svc-002", slug: "prewedding", name: "Sesi Prewedding", category: "Pernikahan", description: "Sesi foto pasangan sebelum hari pernikahan di lokasi pilihan Anda.", image: "https://picsum.photos/seed/momenin-prewedding/900/700", active: true },
    { id: "svc-003", slug: "wisuda", name: "Dokumentasi Wisuda", category: "Akademik", description: "Abadikan momen kelulusan bersama keluarga dan teman.", image: "https://picsum.photos/seed/momenin-graduation/900/700", active: true },
    { id: "svc-004", slug: "acara-keluarga", name: "Acara Keluarga & Ulang Tahun", category: "Keluarga", description: "Ulang tahun, syukuran, dan acara keluarga kecil dengan dokumentasi hangat.", image: "https://picsum.photos/seed/momenin-family/900/700", active: true },
    { id: "svc-005", slug: "korporat", name: "Dokumentasi Korporat", category: "Korporat", description: "Seminar, gathering, dan peluncuran produk untuk kebutuhan perusahaan.", image: "https://picsum.photos/seed/momenin-corporate/900/700", active: true }
  ],
  packages: [
    { id: "pkg-001", serviceId: "svc-001", name: "Mini", priceIdr: 300000, features: ["1 fotografer profesional", "Sesi sampai 1 jam", "Album digital cloud dasar", "Unduh resolusi tinggi"], active: true },
    { id: "pkg-002", serviceId: "svc-003", name: "Standar", priceIdr: 750000, features: ["1 fotografer profesional", "Sesi sekitar 3 jam", "Album digital Standar", "Unduh resolusi penuh", "Color grading sinematik"], active: true },
    { id: "pkg-003", serviceId: "svc-002", name: "Premium", priceIdr: 1500000, features: ["Tim dokumentasi lengkap (2 fotografer)", "Sesi seharian penuh", "Album digital Premium", "Video highlight teaser 60 detik", "Akses unduh tanpa batas"], active: true }
  ],
  storagePlans: [
    { id: "sp-001", name: "Free", quotaBytes: 0, priceIdr: 0, billingPeriod: "monthly", active: true },
    { id: "sp-002", name: "Basic", quotaBytes: 10737418240, priceIdr: 9900, billingPeriod: "monthly", active: true },
    { id: "sp-003", name: "Plus", quotaBytes: 53687091200, priceIdr: 19900, billingPeriod: "monthly", active: true },
    { id: "sp-004", name: "Pro", quotaBytes: 107374182400, priceIdr: 39900, billingPeriod: "monthly", active: true }
  ],
  projects: [
    { id: "prj-001", name: "Pernikahan Rara & Dimas", eventType: "Pernikahan", eventDate: "2024-06-15", location: "Bali", status: "berjalan", memberIds: ["usr-001", "usr-002"], createdAt: "2024-04-02" },
    { id: "prj-002", name: "Prewedding Taman Kota", eventType: "Prewedding", eventDate: "2024-05-20", location: "Jakarta", status: "selesai", memberIds: ["usr-001"], createdAt: "2024-03-15" },
    { id: "prj-003", name: "Seminar Bisnis 2024", eventType: "Korporat", eventDate: "2024-07-10", location: "Jakarta", status: "terjadwal", memberIds: ["usr-002"], createdAt: "2024-05-01" },
    { id: "prj-004", name: "Ulang Tahun Sinta", eventType: "Keluarga", eventDate: "2024-08-05", location: "Yogyakarta", status: "terjadwal", memberIds: ["usr-003"], createdAt: "2024-06-20" },
    { id: "prj-005", name: "Wisuda Bimo", eventType: "Akademik", eventDate: "2024-03-01", location: "Bandung", status: "selesai", memberIds: ["usr-003"], createdAt: "2024-01-18" }
  ],
  albums: [
    { id: "alb-001", projectId: "prj-002", name: "Prewedding Taman Kota", description: "Sesi foto pasangan di taman kota.", coverMediaId: "med-001" },
    { id: "alb-002", projectId: "prj-001", name: "Persiapan Pernikahan", description: "Momen persiapan dan keluarga.", coverMediaId: "med-004" },
    { id: "alb-003", projectId: "prj-003", name: "Seminar Bisnis", description: "Dokumentasi seminar korporat.", coverMediaId: "med-007" },
    { id: "alb-004", projectId: "prj-004", name: "Ulang Tahun Sinta", description: "Perayaan ulang tahun keluarga.", coverMediaId: "med-010" },
    { id: "alb-005", projectId: "prj-005", name: "Wisuda Bimo", description: "Momen kelulusan sarjana.", coverMediaId: "med-012" }
  ],
  media: [
    { id: "med-001", albumId: "alb-001", projectId: "prj-002", fileName: "prewedding-01.jpg", type: "image/jpeg", sizeBytes: 2457600, image: "https://picsum.photos/seed/momenin-med-001/900/700", sortOrder: 1 },
    { id: "med-002", albumId: "alb-001", projectId: "prj-002", fileName: "prewedding-02.jpg", type: "image/jpeg", sizeBytes: 3110400, image: "https://picsum.photos/seed/momenin-med-002/900/700", sortOrder: 2 },
    { id: "med-003", albumId: "alb-001", projectId: "prj-002", fileName: "prewedding-03.jpg", type: "image/jpeg", sizeBytes: 2785280, image: "https://picsum.photos/seed/momenin-med-003/900/700", sortOrder: 3 },
    { id: "med-004", albumId: "alb-002", projectId: "prj-001", fileName: "persiapan-01.jpg", type: "image/jpeg", sizeBytes: 2816000, image: "https://picsum.photos/seed/momenin-med-004/900/700", sortOrder: 1 },
    { id: "med-005", albumId: "alb-002", projectId: "prj-001", fileName: "persiapan-02.jpg", type: "image/jpeg", sizeBytes: 2560000, image: "https://picsum.photos/seed/momenin-med-005/900/700", sortOrder: 2 },
    { id: "med-006", albumId: "alb-002", projectId: "prj-001", fileName: "persiapan-03.jpg", type: "image/jpeg", sizeBytes: 2949120, image: "https://picsum.photos/seed/momenin-med-006/900/700", sortOrder: 3 },
    { id: "med-007", albumId: "alb-003", projectId: "prj-003", fileName: "seminar-01.jpg", type: "image/jpeg", sizeBytes: 3317760, image: "https://picsum.photos/seed/momenin-med-007/900/700", sortOrder: 1 },
    { id: "med-008", albumId: "alb-003", projectId: "prj-003", fileName: "seminar-02.jpg", type: "image/jpeg", sizeBytes: 2621440, image: "https://picsum.photos/seed/momenin-med-008/900/700", sortOrder: 2 },
    { id: "med-009", albumId: "alb-003", projectId: "prj-003", fileName: "seminar-03.jpg", type: "image/jpeg", sizeBytes: 3145728, image: "https://picsum.photos/seed/momenin-med-009/900/700", sortOrder: 3 },
    { id: "med-010", albumId: "alb-004", projectId: "prj-004", fileName: "ultah-01.jpg", type: "image/jpeg", sizeBytes: 3670016, image: "https://picsum.photos/seed/momenin-med-010/900/700", sortOrder: 1 },
    { id: "med-011", albumId: "alb-004", projectId: "prj-004", fileName: "ultah-02.jpg", type: "image/jpeg", sizeBytes: 2867200, image: "https://picsum.photos/seed/momenin-med-011/900/700", sortOrder: 2 },
    { id: "med-012", albumId: "alb-005", projectId: "prj-005", fileName: "wisuda-01.jpg", type: "image/jpeg", sizeBytes: 3276800, image: "https://picsum.photos/seed/momenin-med-012/900/700", sortOrder: 1 }
  ],
  subscriptions: [
    { id: "sub-001", userId: "usr-001", planId: "sp-002", status: "aktif", periodStart: "2024-01-12", periodEnd: "2025-01-12" },
    { id: "sub-002", userId: "usr-002", planId: "sp-004", status: "aktif", periodStart: "2024-02-03", periodEnd: "2025-02-03" },
    { id: "sub-003", userId: "usr-003", planId: "sp-001", status: "aktif", periodStart: "2024-03-21", periodEnd: "2025-03-21" }
  ],
  payments: [
    { id: "pay-001", userId: "usr-001", orderId: "ORD-2024-0001", amountIdr: 9900, status: "lunas", createdAt: "2024-01-12" },
    { id: "pay-002", userId: "usr-002", orderId: "ORD-2024-0002", amountIdr: 39900, status: "lunas", createdAt: "2024-02-03" },
    { id: "pay-003", userId: "usr-001", orderId: "ORD-2024-0003", amountIdr: 750000, status: "menunggu", createdAt: "2024-04-02" },
    { id: "pay-004", userId: "usr-003", orderId: "ORD-2024-0004", amountIdr: 300000, status: "gagal", createdAt: "2024-05-10" }
  ],
  requests: [
    { id: "req-001", userId: "usr-001", customerName: "Rara Pelanggan", email: "pelanggan@momenin.id", phone: "0812-3456-7801", eventType: "Pernikahan", eventDate: "2024-12-20", eventLocation: "Bali", packageId: "pkg-003", notes: "Acara pagi sampai sore.", status: "disetujui", createdAt: "2024-05-02" },
    { id: "req-002", userId: "usr-002", customerName: "Dimas dan Sinta", email: "pasangan@momenin.id", phone: "0812-3456-7802", eventType: "Prewedding", eventDate: "2024-11-10", eventLocation: "Jakarta", packageId: "pkg-001", notes: "", status: "diproses", createdAt: "2024-05-18" },
    { id: "req-003", userId: "usr-003", customerName: "Bimo Saputra", email: "bimo@momenin.id", phone: "0812-3456-7803", eventType: "Akademik", eventDate: "2024-10-05", eventLocation: "Bandung", packageId: "pkg-002", notes: "Wisuda pukul 09.00.", status: "baru", createdAt: "2024-06-01" },
    { id: "req-004", userId: "usr-002", customerName: "Dimas dan Sinta", email: "pasangan@momenin.id", phone: "0812-3456-7802", eventType: "Keluarga", eventDate: "2024-09-15", eventLocation: "Yogyakarta", packageId: "pkg-001", notes: "", status: "ditolak", createdAt: "2024-06-10" }
  ],
  folders: [
    { id: "fol-001", userId: "usr-002", parentId: null, name: "Pernikahan" },
    { id: "fol-002", userId: "usr-002", parentId: "fol-001", name: "Foto Keluarga" },
    { id: "fol-003", userId: "usr-001", parentId: null, name: "Kenangan" }
  ],
  files: [
    { id: "fil-001", userId: "usr-002", folderId: "fol-001", fileName: "undangan.jpg", type: "image/jpeg", sizeBytes: 2097152, createdAt: "2024-04-10" },
    { id: "fil-002", userId: "usr-002", folderId: "fol-002", fileName: "keluarga.jpg", type: "image/jpeg", sizeBytes: 3145728, createdAt: "2024-04-12" },
    { id: "fil-003", userId: "usr-002", folderId: "fol-002", fileName: "video-persiapan.mp4", type: "video/mp4", sizeBytes: 15728640, createdAt: "2024-04-15" },
    { id: "fil-004", userId: "usr-001", folderId: "fol-003", fileName: "seminar.jpg", type: "image/jpeg", sizeBytes: 1048576, createdAt: "2024-05-01" }
  ],
  activity: [
    { id: "act-001", actorId: "usr-004", action: "membuat proyek", entityType: "project", entityId: "prj-001", createdAt: "2024-04-02" },
    { id: "act-002", actorId: "usr-004", action: "menambah album", entityType: "album", entityId: "alb-001", createdAt: "2024-03-16" },
    { id: "act-003", actorId: "usr-004", action: "menyetujui permintaan", entityType: "request", entityId: "req-001", createdAt: "2024-05-03" },
    { id: "act-004", actorId: "usr-004", action: "memperbarui paket", entityType: "package", entityId: "pkg-003", createdAt: "2024-05-20" },
    { id: "act-005", actorId: "usr-004", action: "menambah pelanggan", entityType: "user", entityId: "usr-003", createdAt: "2024-03-21" }
  ]
};

// ============================================================
// AFet Yardım Platformu - Ana Uygulama (app.js)
// ============================================================

// ---- API VERİSİ ----
const API_DATA = [
    {"id":1,"tip":"ihtiyac","acil":true,"detay":"3 aile için acil bebek maması (1-3 yaş) ve paketli içme suyu gerekmektedir.","konum":"Düzce Merkez - Çadırkent","tarih":"2026-02-23","baslik":"Bebek Maması ve Temiz Su","kategori":"gida"},
    {"id":2,"tip":"destek","acil":false,"detay":"Evimizin boş odasını barınma sorunu yaşayan 2 öğrenciye açabiliriz. İnternet ve ısınma mevcuttur.","konum":"Sakarya / Serdivan","tarih":"2026-02-22","baslik":"Öğrenci Evinde Boş Oda","kategori":"barinma"},
    {"id":3,"tip":"ihtiyac","acil":true,"detay":"Diyabet hastası yaşlı bir teyzemiz için insülin kalemi ve ilacın bozulmaması için soğutucu çanta lazım.","konum":"Hatay / Antakya","tarih":"2026-02-23","baslik":"İnsülin ve Soğutucu Çanta","kategori":"saglik"},
    {"id":4,"tip":"ihtiyac","acil":true,"detay":"Sokakta yaralı halde bulunan kedi için kliniğe nakil aracı ve tedavi sonrası 1 haftalık geçici yuva aranıyor.","konum":"İzmir / Bayraklı","tarih":"2026-02-23","baslik":"Geçici Yuva veya Klinik Aracı","kategori":"hayvanlar"},
    {"id":5,"tip":"destek","acil":false,"detay":"Sınava hazırlanan ancak kursa gidemeyen 5 öğrenciye hafta sonları ücretsiz matematik dersi verebilirim.","konum":"Online / Zoom","tarih":"2026-02-21","baslik":"Ücretsiz YKS Matematik Dersi","kategori":"egitim"},
    {"id":6,"tip":"ihtiyac","acil":false,"detay":"Yazılım öğrenmeye çalışan bir gencimiz için düşük özellikli de olsa çalışan bir dizüstü bilgisayar aranıyor.","konum":"Ankara / Polatlı","tarih":"2026-02-23","baslik":"İkinci El Laptop İhtiyacı","kategori":"esya"},
    {"id":7,"tip":"destek","acil":true,"detay":"Afet sonrası travma yaşayan çocuklar ve yetişkinler için ücretsiz online veya yüz yüze seans verebilirim.","konum":"Düzce / Gölyaka","tarih":"2026-02-23","baslik":"Gönüllü Psikolog Desteği","kategori":"psikoloji"},
    {"id":8,"tip":"ihtiyac","acil":true,"detay":"Arama kurtarma ekiplerinin telefonlarını şarj edebilmesi için yüksek kapasiteli powerbank ihtiyacı vardır.","konum":"Kahramanmaraş / Elbistan","tarih":"2026-02-23","baslik":"Powerbank ve Şarj İstasyonu","kategori":"lojistik"},
    {"id":9,"tip":"destek","acil":false,"detay":"Her akşam saat 18:00 - 21:00 arası Nilüfer meydanında ücretsiz sıcak çorba ve ekmek dağıtımı yapıyoruz.","konum":"Bursa / Nilüfer","tarih":"2026-02-22","baslik":"Sıcak Çorba Dağıtımı","kategori":"gida"},
    {"id":10,"tip":"ihtiyac","acil":true,"detay":"Kocaeli Üniversitesi Hastanesi'nde yatmakta olan bir hasta için acil 0 Rh Negatif kan ihtiyacı vardır.","konum":"Kocaeli / İzmit","tarih":"2026-02-23","baslik":"0 Rh- Kan Bağışı Acil","kategori":"saglik"},
    {"id":11,"tip":"destek","acil":false,"detay":"Çadırkentteki çocuklar için oyun etkinlikleri düzenliyoruz, gönüllü palyaço veya hikaye anlatıcısı aranıyor.","konum":"Gaziantep / Nurdağı","tarih":"2026-02-22","baslik":"Gezici Oyun Parkı ve Oyuncak","kategori":"cocuk"},
    {"id":12,"tip":"ihtiyac","acil":false,"detay":"Marangozluktan anlayan, barınma sorunu çözülmüş bir depremzede vatandaşımıza atölyemizde iş verebiliriz.","konum":"Düzce / Gümüşova","tarih":"2026-02-23","baslik":"Depremzede İçin İş İmkanı","kategori":"is"}
];

// ---- KATEGORİ META BİLGİLERİ ----
const KATEGORI_META = {
    gida:      { label: "Gıda",       icon: "🍞" },
    barinma:   { label: "Barınma",    icon: "🏠" },
    saglik:    { label: "Sağlık",     icon: "🏥" },
    hayvanlar: { label: "Hayvanlar",  icon: "🐾" },
    egitim:    { label: "Eğitim",     icon: "📚" },
    esya:      { label: "Eşya",       icon: "📦" },
    psikoloji: { label: "Psikoloji",  icon: "🧠" },
    lojistik:  { label: "Lojistik",   icon: "🚚" },
    cocuk:     { label: "Çocuk",      icon: "🧒" },
    is:        { label: "İş",         icon: "💼" }
};

// ---- DURUM YÖNETİMİ ----
let ilanlar = [];
let ustlenilenler = [];
let aktifKategori = "tumu";
let aktifTip = "tumu";
let aramaMetni = "";
let isOffline = false;

// ---- DOM REFERANSLARI ----
const filterButtonsContainer = document.getElementById("filter-buttons");
const ilanGrid = document.getElementById("ilan-grid");
const emptyState = document.getElementById("empty-state");
const resultsCount = document.getElementById("results-count");
const heroIhtiyac = document.getElementById("hero-ihtiyac");
const heroDestek = document.getElementById("hero-destek");
const offlineBanner = document.getElementById("offline-banner");
const gorevToggle = document.getElementById("gorev-toggle");
const gorevPanel = document.getElementById("gorev-panel");
const gorevClose = document.getElementById("gorev-close");
const gorevList = document.getElementById("gorev-list");
const gorevEmpty = document.getElementById("gorev-empty");
const gorevBadge = document.getElementById("gorev-badge");
const overlay = document.getElementById("overlay");
const statTotal = document.getElementById("stat-total");
const statAcil = document.getElementById("stat-acil");
const statUstlenilen = document.getElementById("stat-ustlenilen");
const searchInput = document.getElementById("search-input");
const searchClear = document.getElementById("search-clear");
const btnYeniIlan = document.getElementById("btn-yeni-ilan");
const ilanModal = document.getElementById("ilan-modal");
const modalClose = document.getElementById("modal-close");
const ilanForm = document.getElementById("ilan-form");

// ============================================================
//  VERİ YÜKLEME ve ÇEVRİMDIŞI KONTROL
// ============================================================
function verileriYukle() {
    if (navigator.onLine) {
        // Çevrimiçi: API verisini kullan ve LocalStorage'a yedekle
        ilanlar = [...API_DATA];
        localStorage.setItem("afet_ilanlar", JSON.stringify(ilanlar));
        isOffline = false;
        offlineBanner.classList.add("hidden");
    } else {
        // Çevrimdışı: LocalStorage'dan yükle
        const cached = localStorage.getItem("afet_ilanlar");
        if (cached) {
            ilanlar = JSON.parse(cached);
        } else {
            ilanlar = [...API_DATA];
        }
        isOffline = true;
        offlineBanner.classList.remove("hidden");
    }

    // Üstlenilen görevleri LocalStorage'dan yükle
    const savedGorevler = localStorage.getItem("afet_ustlenilenler");
    if (savedGorevler) {
        ustlenilenler = JSON.parse(savedGorevler);
    }
}

// ============================================================
//  KATEGORİ BUTONLARI
// ============================================================
function kategorileriOlustur() {
    // Tüm benzersiz kategorileri çıkar
    const kategoriler = [...new Set(ilanlar.map(ilan => ilan.kategori))];

    // "Tümü" butonu
    let html = `<button class="filter-btn active" data-kategori="tumu">
        📋 Tümü <span class="count">${ilanlar.length}</span>
    </button>`;

    kategoriler.forEach(kat => {
        const meta = KATEGORI_META[kat] || { label: kat, icon: "📌" };
        const count = ilanlar.filter(i => i.kategori === kat).length;
        html += `<button class="filter-btn" data-kategori="${kat}">
            ${meta.icon} ${meta.label} <span class="count">${count}</span>
        </button>`;
    });

    filterButtonsContainer.innerHTML = html;

    // Event listener'ları ekle
    filterButtonsContainer.querySelectorAll(".filter-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtonsContainer.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            aktifKategori = btn.dataset.kategori;
            ilanlariFiltrele();
        });
    });
}

// ============================================================
//  TİP FİLTRELERİ (İhtiyaç / Destek)
// ============================================================
function tipFiltreleriniAyarla() {
    document.querySelectorAll(".type-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".type-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            aktifTip = btn.dataset.type;
            ilanlariFiltrele();
        });
    });
}

// ============================================================
//  FİLTRELEME (JavaScript filter metodu)
// ============================================================
function ilanlariFiltrele() {
    let sonuc = [...ilanlar];

    // Kategori filtresi
    if (aktifKategori !== "tumu") {
        sonuc = sonuc.filter(ilan => ilan.kategori === aktifKategori);
    }

    // Tip filtresi
    if (aktifTip !== "tumu") {
        sonuc = sonuc.filter(ilan => ilan.tip === aktifTip);
    }

    // Arama filtresi
    if (aramaMetni.trim() !== "") {
        const aranan = aramaMetni.toLowerCase().trim();
        sonuc = sonuc.filter(ilan => 
            ilan.baslik.toLowerCase().includes(aranan) ||
            ilan.detay.toLowerCase().includes(aranan) ||
            ilan.konum.toLowerCase().includes(aranan) ||
            (KATEGORI_META[ilan.kategori]?.label || "").toLowerCase().includes(aranan)
        );
    }

    // Acil olanları önce göster
    sonuc.sort((a, b) => {
        if (a.acil === b.acil) return new Date(b.tarih) - new Date(a.tarih);
        return a.acil ? -1 : 1;
    });

    ilanlariGoster(sonuc);
}

// ============================================================
//  İLAN KARTLARINI EKRANA BAS
// ============================================================
function ilanlariGoster(liste) {
    if (liste.length === 0) {
        ilanGrid.innerHTML = "";
        emptyState.classList.remove("hidden");
        resultsCount.textContent = "0 ilan gösteriliyor";
        return;
    }

    emptyState.classList.add("hidden");
    resultsCount.textContent = `${liste.length} ilan gösteriliyor`;

    ilanGrid.innerHTML = liste.map(ilan => {
        const meta = KATEGORI_META[ilan.kategori] || { label: ilan.kategori, icon: "📌" };
        const ustlenildi = ustlenilenler.some(g => g.id === ilan.id);
        const tipLabel = ilan.tip === "ihtiyac" ? "İhtiyaç" : "Destek";
        const badgeClass = ilan.tip === "ihtiyac" ? "badge-ihtiyac" : "badge-destek";
        const tarihFormatli = tarihFormatlaTR(ilan.tarih);
        const zamanOnce = gorecliZaman(ilan.tarih);

        return `
        <div class="ilan-card tip-${ilan.tip}">
            <div class="card-top">
                <div class="card-badges">
                    <span class="badge ${badgeClass}">${tipLabel}</span>
                    ${ilan.acil ? '<span class="badge badge-acil">⚡ ACİL</span>' : ''}
                </div>
                <span class="card-kategori">${meta.icon} ${meta.label}</span>
            </div>
            <h3 class="card-title">${ilan.baslik}</h3>
            <p class="card-detay">${ilan.detay}</p>
            <div class="card-meta">
                <span class="meta-konum">📍 ${ilan.konum}</span>
                <span class="meta-tarih" title="${tarihFormatli}">🕐 ${zamanOnce}</span>
            </div>
            <div class="card-actions">
                <button class="btn-ustlen ${ustlenildi ? 'ustlenildi' : ''}" 
                        data-id="${ilan.id}"
                        ${ustlenildi ? 'disabled' : ''}>
                    ${ustlenildi 
                        ? '✅ Üstlenildi' 
                        : '🤝 Ben Üstleniyorum'}
                </button>
                <button class="btn-paylas" data-id="${ilan.id}" title="Bu ilanı paylaş">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                </button>
            </div>
        </div>`;
    }).join("");

    // Üstlen butonlarına event ekle
    ilanGrid.querySelectorAll(".btn-ustlen:not(.ustlenildi)").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = parseInt(btn.dataset.id);
            ilanUstlen(id);
        });
    });

    // Paylaş butonlarına event ekle
    ilanGrid.querySelectorAll(".btn-paylas").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = parseInt(btn.dataset.id);
            ilanPaylas(id);
        });
    });

    istatistikleriGuncelle();
}

// ============================================================
//  TARİH FORMATLAMA
// ============================================================
function tarihFormatlaTR(tarihStr) {
    const aylar = ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran",
                   "Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"];
    const d = new Date(tarihStr);
    return `${d.getDate()} ${aylar[d.getMonth()]} ${d.getFullYear()}`;
}

// ============================================================
//  GÖRECELİ ZAMAN (örn: "2 gün önce")
// ============================================================
function gorecliZaman(tarihStr) {
    const simdi = new Date();
    const tarih = new Date(tarihStr);
    const farkMs = simdi - tarih;
    const farkDk = Math.floor(farkMs / 60000);
    const farkSaat = Math.floor(farkMs / 3600000);
    const farkGun = Math.floor(farkMs / 86400000);

    if (farkDk < 1) return "Az önce";
    if (farkDk < 60) return `${farkDk} dakika önce`;
    if (farkSaat < 24) return `${farkSaat} saat önce`;
    if (farkGun < 7) return `${farkGun} gün önce`;
    if (farkGun < 30) return `${Math.floor(farkGun / 7)} hafta önce`;
    return tarihFormatlaTR(tarihStr);
}

// ============================================================
//  İLAN ÜSTLENME (LocalStorage)
// ============================================================
function ilanUstlen(id) {
    const ilan = ilanlar.find(i => i.id === id);
    if (!ilan) return;

    // Zaten üstlenilmişse tekrar ekleme
    if (ustlenilenler.some(g => g.id === id)) return;

    ustlenilenler.push({
        id: ilan.id,
        baslik: ilan.baslik,
        konum: ilan.konum,
        kategori: ilan.kategori,
        tarih: new Date().toISOString()
    });

    // LocalStorage'a kaydet
    localStorage.setItem("afet_ustlenilenler", JSON.stringify(ustlenilenler));

    // Arayüzü güncelle
    ilanlariFiltrele();
    gorevListesiniGuncelle();
    toastGoster(`"${ilan.baslik}" görev listenize eklendi!`);
}

// ============================================================
//  GÖREV LİSTESİNDEN ÇIKARMA
// ============================================================
function gorevCikar(id) {
    ustlenilenler = ustlenilenler.filter(g => g.id !== id);
    localStorage.setItem("afet_ustlenilenler", JSON.stringify(ustlenilenler));
    gorevListesiniGuncelle();
    ilanlariFiltrele();
    toastGoster("Görev listesinden çıkarıldı.");
}

// ============================================================
//  GÖREV PANELİNİ GÜNCELLE
// ============================================================
function gorevListesiniGuncelle() {
    gorevBadge.textContent = ustlenilenler.length;

    if (ustlenilenler.length === 0) {
        gorevList.classList.add("hidden");
        gorevEmpty.classList.remove("hidden");
    } else {
        gorevList.classList.remove("hidden");
        gorevEmpty.classList.add("hidden");

        gorevList.innerHTML = ustlenilenler.map(g => {
            const meta = KATEGORI_META[g.kategori] || { label: g.kategori, icon: "📌" };
            return `
            <div class="gorev-item">
                <div class="gorev-info">
                    <h4>${meta.icon} ${g.baslik}</h4>
                    <p>📍 ${g.konum}</p>
                </div>
                <button class="gorev-remove" data-id="${g.id}">Çıkar</button>
            </div>`;
        }).join("");

        gorevList.querySelectorAll(".gorev-remove").forEach(btn => {
            btn.addEventListener("click", () => {
                gorevCikar(parseInt(btn.dataset.id));
            });
        });
    }

    istatistikleriGuncelle();
}

// ============================================================
//  İSTATİSTİKLER
// ============================================================
function istatistikleriGuncelle() {
    statTotal.textContent = ilanlar.length;
    statAcil.textContent = ilanlar.filter(i => i.acil).length;
    statUstlenilen.textContent = ustlenilenler.length;
    // Hero istatistikleri
    if (heroIhtiyac) heroIhtiyac.textContent = ilanlar.filter(i => i.tip === 'ihtiyac').length;
    if (heroDestek) heroDestek.textContent = ilanlar.filter(i => i.tip === 'destek').length;
}

// ============================================================
//  TOAST BİLDİRİMİ
// ============================================================
function toastGoster(mesaj) {
    // Var olan toast'ı kaldır
    const eski = document.querySelector(".toast");
    if (eski) eski.remove();

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = mesaj;
    document.body.appendChild(toast);

    // Animasyon
    requestAnimationFrame(() => {
        toast.classList.add("show");
    });

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 400);
    }, 2800);
}

// ============================================================
//  GÖREV PANELİ AÇ / KAPA
// ============================================================
function gorevPaneliAc() {
    gorevPanel.classList.remove("hidden");
    overlay.classList.remove("hidden");
}

function gorevPaneliKapat() {
    gorevPanel.classList.add("hidden");
    overlay.classList.add("hidden");
}

gorevToggle.addEventListener("click", () => {
    if (gorevPanel.classList.contains("hidden")) {
        gorevPaneliAc();
    } else {
        gorevPaneliKapat();
    }
});

gorevClose.addEventListener("click", gorevPaneliKapat);
overlay.addEventListener("click", gorevPaneliKapat);

// ============================================================
//  ÇEVRİMDIŞI / ÇEVRİMİÇİ OLAYLARI DİNLE
// ============================================================
window.addEventListener("online", () => {
    isOffline = false;
    offlineBanner.classList.add("hidden");
    // Yeniden çevrimiçi olunca verileri tazele
    ilanlar = [...API_DATA];
    localStorage.setItem("afet_ilanlar", JSON.stringify(ilanlar));
    ilanlariFiltrele();
    toastGoster("İnternet bağlantısı yeniden sağlandı!");
});

window.addEventListener("offline", () => {
    isOffline = true;
    offlineBanner.classList.remove("hidden");
    toastGoster("İnternet bağlantısı kesildi — Çevrimdışı mod aktif.");
});

// ============================================================
//  İLAN PAYLAŞMA
// ============================================================
function ilanPaylas(id) {
    const ilan = ilanlar.find(i => i.id === id);
    if (!ilan) return;

    const tipLabel = ilan.tip === "ihtiyac" ? "İhtiyaç" : "Destek";
    const paylasMetni = `🆘 AfetYardım - ${tipLabel}\n\n📋 ${ilan.baslik}\n📍 ${ilan.konum}\n\n${ilan.detay}\n\n${ilan.acil ? '⚡ ACİL DURUM\n' : ''}#AfetYardım #Dayanışma`;

    if (navigator.share) {
        navigator.share({
            title: `AfetYardım: ${ilan.baslik}`,
            text: paylasMetni
        }).catch(() => {});
    } else {
        navigator.clipboard.writeText(paylasMetni).then(() => {
            toastGoster("İlan bilgileri panoya kopyalandı!");
        }).catch(() => {
            toastGoster("Paylaşım yapılamadı.");
        });
    }
}

// ============================================================
//  ARAMA FONKSİYONU
// ============================================================
function aramaAyarla() {
    let aramaTimeout;
    searchInput.addEventListener("input", () => {
        clearTimeout(aramaTimeout);
        aramaTimeout = setTimeout(() => {
            aramaMetni = searchInput.value;
            searchClear.classList.toggle("hidden", aramaMetni.trim() === "");
            ilanlariFiltrele();
        }, 250);
    });

    searchClear.addEventListener("click", () => {
        searchInput.value = "";
        aramaMetni = "";
        searchClear.classList.add("hidden");
        ilanlariFiltrele();
        searchInput.focus();
    });
}

// ============================================================
//  YENİ İLAN EKLEME MODAL
// ============================================================
function modalAyarla() {
    btnYeniIlan.addEventListener("click", () => {
        ilanModal.classList.remove("hidden");
        overlay.classList.remove("hidden");
    });

    modalClose.addEventListener("click", () => {
        ilanModal.classList.add("hidden");
        overlay.classList.add("hidden");
    });

    // Overlay'a tıklayınca modal da kapansın
    overlay.addEventListener("click", () => {
        ilanModal.classList.add("hidden");
    });

    ilanForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const tip = document.querySelector('input[name="tip"]:checked').value;
        const baslik = document.getElementById("form-baslik").value.trim();
        const detay = document.getElementById("form-detay").value.trim();
        const kategori = document.getElementById("form-kategori").value;
        const konum = document.getElementById("form-konum").value.trim();
        const acil = document.getElementById("form-acil").checked;

        if (!baslik || !detay || !konum) {
            toastGoster("Lütfen tüm alanları doldurun.");
            return;
        }

        // Yeni ID oluştur
        const yeniId = Math.max(...ilanlar.map(i => i.id), 0) + 1;
        const bugun = new Date().toISOString().split('T')[0];

        const yeniIlan = {
            id: yeniId,
            tip: tip,
            acil: acil,
            detay: detay,
            konum: konum,
            tarih: bugun,
            baslik: baslik,
            kategori: kategori
        };

        // İlanı listeye ekle
        ilanlar.unshift(yeniIlan);
        localStorage.setItem("afet_ilanlar", JSON.stringify(ilanlar));

        // Formu sıfırla ve kapat
        ilanForm.reset();
        ilanModal.classList.add("hidden");
        overlay.classList.add("hidden");

        // Arayüzü güncelle
        kategorileriOlustur();
        ilanlariFiltrele();
        toastGoster(`"${baslik}" ilanınız başarıyla eklendi!`);
    });
}

// ============================================================
//  AFET SEKMELERİ (Tab Switching)
// ============================================================
function afetSekmeleriniAyarla() {
    const tabContainer = document.getElementById("disaster-tabs");
    if (!tabContainer) return;

    tabContainer.querySelectorAll(".disaster-tab").forEach(tab => {
        tab.addEventListener("click", () => {
            // Aktif tab'ı değiştir
            tabContainer.querySelectorAll(".disaster-tab").forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            // İçerikleri değiştir
            const hedef = tab.dataset.disaster;
            document.querySelectorAll(".disaster-content").forEach(content => {
                content.classList.remove("active");
            });
            const hedefContent = document.getElementById(`disaster-${hedef}`);
            if (hedefContent) {
                hedefContent.classList.add("active");
            }
        });
    });
}

// ============================================================
//  YILDIZ ANİMASYONU (Aurora Background)
// ============================================================
function yildizlariOlustur() {
    const container = document.getElementById("stars-container");
    if (!container) return;
    const count = 80;
    for (let i = 0; i < count; i++) {
        const star = document.createElement("div");
        star.className = "star";
        star.style.left = Math.random() * 100 + "%";
        star.style.top = Math.random() * 100 + "%";
        star.style.setProperty("--duration", (2 + Math.random() * 4) + "s");
        star.style.setProperty("--max-opacity", (0.3 + Math.random() * 0.7).toFixed(2));
        star.style.animationDelay = (Math.random() * 5) + "s";
        star.style.width = (1 + Math.random() * 2) + "px";
        star.style.height = star.style.width;
        container.appendChild(star);
    }
}

// ============================================================
//  TEMA DEĞİŞTİRME (Light / Dark Mode)
// ============================================================
function temaAyarla() {
    const themeToggle = document.getElementById("theme-toggle");
    if (!themeToggle) return;

    // Kayıtlı temayı yükle
    const kayitliTema = localStorage.getItem("afet_tema");
    if (kayitliTema) {
        document.documentElement.setAttribute("data-theme", kayitliTema);
    }

    themeToggle.addEventListener("click", () => {
        const mevcutTema = document.documentElement.getAttribute("data-theme");
        const yeniTema = mevcutTema === "light" ? "dark" : "light";

        document.documentElement.setAttribute("data-theme", yeniTema);
        localStorage.setItem("afet_tema", yeniTema);

        toastGoster(yeniTema === "light" ? "☀️ Aydınlık mod aktif" : "🌙 Karanlık mod aktif");
    });
}

// ============================================================
//  UYGULAMA BAŞLAT
// ============================================================
function uygulamayiBaslat() {
    temaAyarla();
    yildizlariOlustur();
    verileriYukle();
    kategorileriOlustur();
    tipFiltreleriniAyarla();
    aramaAyarla();
    modalAyarla();
    afetSekmeleriniAyarla();
    ilanlariFiltrele();
    gorevListesiniGuncelle();
}

// DOM hazır olunca başlat
document.addEventListener("DOMContentLoaded", uygulamayiBaslat);

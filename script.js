// Sayfa kaydırıldığında Navbar'a arkaplan ekleme
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});
// 1. Tarayıcının otomatik kaydırma (scroll) hafızasını tamamen kapatıyoruz
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// 2. Sayfa tamamen yüklendiğinde (Elfsight dahil) zorla en üste çık
window.addEventListener('load', function() {
    // Sayfayı en tepeye (0,0) yumuşaklık olmadan anında at
    setTimeout(function() {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, 10); // 10 milisaniyelik gecikme, Elfsight'ın sıçramasını ezer
    
    // URL'de #instagram-vitrin gibi takılar varsa temizle
    if (window.location.hash) {
        window.history.replaceState('', document.title, window.location.pathname);
    }
});
// --- HAMBURGER MENÜ İŞLEMLERİ ---
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const navItems = document.querySelectorAll('.nav-links a');

hamburger.addEventListener('click', () => {
    // Menüyü aç/kapat
    navLinks.classList.toggle('active');
    
    // İkonu Çarpı (X) veya Hamburger (☰) yap
    if(navLinks.classList.contains('active')){
        hamburger.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    } else {
        hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
    }
});

// Menüdeki bir linke tıklandığında menüyü otomatik kapat
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
});

// Galeri Verileri (Yarın görsellerin hazır olunca buradaki isimleri değiştireceksin)
const galleryData = {
    'hasir': {
        title: 'Trabzon Hasır Setleri',
        images: [
            'assets/hasir-1.jpg',
            'assets/hasir-2.jpg',
            'assets/hasir-3.jpg'
        ]
    },
    'kelepce': {
        title: 'Şık Kelepçeler',
        images: [
            'assets/kelepce-1.jpeg',
            'assets/suyolu-kelepce-2.jpeg',
            'assets/zigzag-kelepce-3.jpeg',
            'assets/grek-desenli-kelepce-4.jpeg'
            
        ]
    },
    'setler': {
        title: 'Altın Setler',
        images: [
            'assets/set-1.jpeg',
            'assets/set-2.jpeg',
            'assets/set-3.jpeg',
            'assets/set-4.jpeg',
            'assets/set-5.jpeg',
            'assets/set-6.jpeg',
            'assets/set-7.jpeg'
            
        ]
    },
    'yuzuk-bilezik': {
        title: 'Yüzük & Bilezik Modelleri',
        images: [
            'assets/yuzuk-1.jpeg',
            'assets/yuzuk-2.jpeg',
            'assets/yuzuk-3.jpeg',
            'assets/yuzuk-4.jpeg',
            'assets/yuzuk-5.jpeg',
            'assets/yuzuk-6.jpeg',
            
        ]
    }
};

// --- GALERİ AÇMA/KAPAMA FONKSİYONLARI ---
const galleryModal = document.getElementById('gallery-modal');
const closeGalleryBtn = document.querySelector('.close-gallery');
const galleryTitle = document.getElementById('gallery-title');
const galleryImages = document.getElementById('gallery-images');

function openGallery(category) {
    // 1. Doğru kategorinin verilerini çek
    const data = galleryData[category];
    
    // Eğer böyle bir kategori tanımlı değilse hata verme, çık
    if (!data) return;

    // 2. Başlığı güncelle
    galleryTitle.textContent = data.title;

    // 3. İçerideki eski resimleri temizle ve yenilerini ekle
    galleryImages.innerHTML = '';
    data.images.forEach(imgSrc => {
        const imgElement = document.createElement('img');
        imgElement.src = imgSrc;
        imgElement.alt = data.title + " - Hasel Kuyumculuk Trabzon Hasırı";
        // Resimler yüklenirken hata olursa kırık ikon çıkmasın diye
        imgElement.onerror = function() {
            this.src = 'https://via.placeholder.com/400x400?text=Fotograf+Yukleniyor...';
        };
        galleryImages.appendChild(imgElement);
    });

    // 4. Galeriyi ekranda göster
    galleryModal.classList.add('show');
    // Arka planda sayfanın kaymasını engelle
    document.body.style.overflow = 'hidden';
}

// Kapatma düğmesi işlemleri
if(closeGalleryBtn) {
    closeGalleryBtn.addEventListener('click', () => {
        galleryModal.classList.remove('show');
        document.body.style.overflow = 'auto'; // Sayfa kaydırmasını geri aç
    });
}

window.addEventListener('click', (e) => {
    if (e.target === galleryModal) {
        galleryModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});
// --- SCROLL REVEAL (KAYDIRMA ANİMASYONU) ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.15 });

const hiddenElements = document.querySelectorAll('.reveal');
hiddenElements.forEach((el) => observer.observe(el));

// --- ÇEREZ YÖNETİMİ (Görsel KVKK) ---
document.addEventListener("DOMContentLoaded", () => {
    const cookieBanner = document.getElementById("cookie-banner");
    const acceptBtn = document.getElementById("accept-cookies");
    const necessaryBtn = document.getElementById("necessary-cookies"); // Yeni butonumuz

    if (!localStorage.getItem("haselCookieConsent")) {
        setTimeout(() => {
            cookieBanner.classList.add("show");
        }, 500); 
    }

    // Tümünü Kabul Et'e basarsa
    if(acceptBtn) {
        acceptBtn.addEventListener("click", () => {
            localStorage.setItem("haselCookieConsent", "tumunu_kabul");
            cookieBanner.classList.remove("show");
        });
    }

    // Sadece Zorunluları Kabul Et'e basarsa
    if(necessaryBtn) {
        necessaryBtn.addEventListener("click", () => {
            localStorage.setItem("haselCookieConsent", "sadece_zorunlu");
            cookieBanner.classList.remove("show");
        });
    }
});
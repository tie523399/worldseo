// 廣告和新聞內容載入器

// 模擬廣告數據
const mockAds = [
    {
        id: 1,
        title: "智能地址生成技術革新",
        desc: "採用最新 AI 技術，提供更精確的全球地址生成服務",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=180&fit=crop",
        video: null,
        link: "https://example.com/smart-address-tech",
        date: "2024-01-20"
    },
    {
        id: 2,
        title: "全球郵政系統整合方案",
        desc: "支援 40+ 國家的郵政編碼系統，確保地址格式準確性",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=180&fit=crop",
        video: null,
        link: "https://example.com/postal-integration",
        date: "2024-01-19"
    }
];

// 模擬新聞數據
const mockNews = [
    {
        id: 1,
        title: "日本郵便局推出新地址驗證系統",
        desc: "日本郵便局宣布將於 2024 年 4 月推出全新的智能地址驗證系統，提升郵件投遞準確率。",
        image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=240&fit=crop",
        video: null,
        link: "https://example.com/news/japan-postal-system",
        date: "2024-01-20"
    },
    {
        id: 2,
        title: "美國郵政服務採用 AI 地址識別",
        desc: "USPS 宣布將整合 AI 技術來改善地址識別和郵件分類效率，預計可提升 30% 的處理速度。",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=240&fit=crop",
        video: null,
        link: "https://example.com/news/usps-ai-technology",
        date: "2024-01-19"
    },
    {
        id: 3,
        title: "歐盟統一地址格式標準即將實施",
        desc: "歐盟委員會宣布將於 2024 年 7 月實施統一的地址格式標準，旨在簡化跨境電商和物流操作。",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=240&fit=crop",
        link: "https://example.com/news/eu-address-standard",
        date: "2024-01-18"
    }
];

// 獲取 API 基礎 URL
function getApiBaseUrl() {
    // 檢查環境變量
    if (typeof process !== 'undefined' && process.env && process.env.API_BASE_URL) {
        return process.env.API_BASE_URL;
    }
    
    // 檢查 Netlify 環境變量
    if (typeof window !== 'undefined' && window.API_BASE_URL) {
        return window.API_BASE_URL;
    }
    
    // 默認使用相對路徑（適用於同域部署）
    return '';
}

// 廣告欄位動態渲染
async function loadAds() {
    const adSection = document.getElementById('ad-section');
    if (!adSection) return;
    
    adSection.innerHTML = '';
    
    try {
        const apiBaseUrl = getApiBaseUrl();
        
        // 如果有配置 API URL，嘗試調用真實 API
        if (apiBaseUrl) {
            try {
                const res = await fetch(`${apiBaseUrl}/api/ads`);
                if (res.ok) {
                    const ads = await res.json();
                    renderAds(ads);
                    return;
                }
            } catch (apiError) {
                console.warn('API 調用失敗，使用模擬數據:', apiError);
            }
        }
        
        // 使用模擬數據
        renderAds(mockAds);
        
    } catch (error) {
        console.error('載入廣告失敗:', error);
        adSection.innerHTML = `
            <div class="error-message">
                <span data-i18n="adLoadError">無法載入廣告資料</span>
            </div>
        `;
        
        // 更新翻譯
        if (window.updateInterface) {
            window.updateInterface();
        }
    }
}

// 渲染廣告
function renderAds(ads) {
    const adSection = document.getElementById('ad-section');
    if (!adSection) return;
    
    ads.forEach(ad => {
        const card = document.createElement('div');
        card.className = 'ad-card';
        card.innerHTML = `
            <div class="ad-media">
                ${ad.video ? 
                    `<video src="${ad.video}" controls muted autoplay loop 
                     style="width:100%;border-radius:12px;max-height:180px;object-fit:cover;">
                     </video>` : 
                    `<img src="${ad.image || 'https://via.placeholder.com/300x180'}" 
                     alt="${ad.title}" 
                     style="width:100%;border-radius:12px;max-height:180px;object-fit:cover;">`
                }
            </div>
            <h3>${ad.title}</h3>
            <p>${ad.desc}</p>
            <a href="${ad.link}" target="_blank" rel="noopener noreferrer">
                <span data-i18n="learnMore">了解更多</span>
            </a>
        `;
        adSection.appendChild(card);
    });
    
    // 更新翻譯
    if (window.updateInterface) {
        window.updateInterface();
    }
}

// 新聞區塊動態渲染
async function loadNews() {
    const newsSection = document.getElementById('news-section');
    if (!newsSection) return;
    
    newsSection.innerHTML = '<h2 data-i18n="todayNews">今日新聞</h2>';
    
    try {
        const apiBaseUrl = getApiBaseUrl();
        
        // 如果有配置 API URL，嘗試調用真實 API
        if (apiBaseUrl) {
            try {
                const res = await fetch(`${apiBaseUrl}/api/news`);
                if (res.ok) {
                    const newsList = await res.json();
                    renderNews(newsList);
                    return;
                }
            } catch (apiError) {
                console.warn('API 調用失敗，使用模擬數據:', apiError);
            }
        }
        
        // 使用模擬數據
        renderNews(mockNews);
        
    } catch (error) {
        console.error('載入新聞失敗:', error);
        newsSection.innerHTML += `
            <div class="error-message">
                <span data-i18n="newsLoadError">無法載入新聞資料</span>
            </div>
        `;
        
        // 更新翻譯
        if (window.updateInterface) {
            window.updateInterface();
        }
    }
}

// 渲染新聞
function renderNews(newsList) {
    const newsSection = document.getElementById('news-section');
    if (!newsSection) return;
    
    const newsContainer = document.createElement('div');
    newsContainer.className = 'news-container';
    
    newsList.forEach((news, index) => {
        const newsCard = document.createElement('article');
        newsCard.className = 'news-card';
        newsCard.innerHTML = `
            <div class="news-media">
                ${news.video ? 
                    `<video src="${news.video}" controls muted 
                     style="width:100%;border-radius:12px;max-height:240px;object-fit:cover;">
                     </video>` : 
                    news.image ? 
                    `<img src="${news.image}" 
                     alt="${news.title}" 
                     style="width:100%;border-radius:12px;max-height:240px;object-fit:cover;">` : 
                    ''
                }
            </div>
            <div class="news-content">
                <div class="news-meta">
                    <span class="news-date">${formatDate(news.date)}</span>
                    <span class="news-category" data-i18n="newsCategory">地址技術</span>
                </div>
                <h3>${news.title}</h3>
                <p>${news.desc}</p>
                <a href="${news.link}" target="_blank" rel="noopener noreferrer">
                    <span data-i18n="readMore">閱讀全文</span>
                </a>
            </div>
        `;
        newsContainer.appendChild(newsCard);
    });
    
    newsSection.appendChild(newsContainer);
    
    // 更新翻譯
    if (window.updateInterface) {
        window.updateInterface();
    }
}

// 格式化日期
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const currentLang = window.currentLanguage || 'zh-TW';
    
    if (diffDays === 0) {
        return translations[currentLang]?.today || '今天';
    } else if (diffDays === 1) {
        return translations[currentLang]?.yesterday || '昨天';
    } else if (diffDays < 7) {
        return `${diffDays} ${translations[currentLang]?.daysAgo || '天前'}`;
    } else {
        return date.toLocaleDateString(currentLang === 'zh-TW' ? 'zh-TW' : 'en-US');
    }
}

// 定期更新內容
function startContentUpdates() {
    // 每 5 分鐘更新一次廣告
    setInterval(() => {
        loadAds();
    }, 5 * 60 * 1000);
    
    // 每 10 分鐘更新一次新聞
    setInterval(() => {
        loadNews();
    }, 10 * 60 * 1000);
}

// 初始化內容載入
function initContentLoader() {
    // 頁面載入完成後載入內容
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            loadAds();
            loadNews();
            startContentUpdates();
        });
    } else {
        loadAds();
        loadNews();
        startContentUpdates();
    }
}

// 導出函數供外部使用
window.loadAds = loadAds;
window.loadNews = loadNews;
window.initContentLoader = initContentLoader; 
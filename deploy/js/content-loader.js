// 廣告和新聞內容載入器

// 模擬廣告數據（實際應用中應從 API 獲取）
const mockAds = [
    {
        id: 1,
        title: "智能地址驗證服務",
        desc: "使用 AI 技術驗證地址真實性，支援全球 195+ 國家地址格式。",
        video: "https://example.com/demo-video-1.mp4",
        link: "https://example.com/address-validation"
    },
    {
        id: 2,
        title: "全球郵遞區號數據庫",
        desc: "最完整的郵遞區號查詢系統，涵蓋全球所有國家和地區。",
        video: "https://example.com/demo-video-2.mp4",
        link: "https://example.com/postal-codes"
    },
    {
        id: 3,
        title: "地址格式化 API",
        desc: "自動格式化各國地址，確保符合當地郵政標準。",
        video: "https://example.com/demo-video-3.mp4",
        link: "https://example.com/address-formatter"
    }
];

// 模擬新聞數據（實際應用中應從 API 獲取）
const mockNews = [
    {
        id: 1,
        title: "日本郵政系統更新：新增數字化地址驗證",
        desc: "日本郵政宣布推出全新的數字化地址驗證系統，支援羅馬字和日文地址的自動轉換，大幅提升國際郵件投遞效率。",
        image: "https://example.com/news-image-1.jpg",
        link: "https://example.com/news/japan-postal-update",
        date: "2024-01-20"
    },
    {
        id: 2,
        title: "美國 USPS 推出 AI 地址識別技術",
        desc: "美國郵政服務採用先進的 AI 技術，能夠識別手寫地址並自動糾正常見錯誤，預計將減少 30% 的投遞錯誤。",
        video: "https://example.com/news-video-1.mp4",
        link: "https://example.com/news/usps-ai-technology",
        date: "2024-01-19"
    },
    {
        id: 3,
        title: "歐盟統一地址格式標準即將實施",
        desc: "歐盟委員會宣布將於 2024 年 7 月實施統一的地址格式標準，旨在簡化跨境電商和物流操作。",
        image: "https://example.com/news-image-2.jpg",
        link: "https://example.com/news/eu-address-standard",
        date: "2024-01-18"
    }
];

// 廣告欄位動態渲染
async function loadAds() {
    const adSection = document.getElementById('ad-section');
    if (!adSection) return;
    
    adSection.innerHTML = '';
    
    try {
        // 模擬 API 調用延遲
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // 在實際應用中，這裡應該是：
        // const res = await fetch('/api/ads');
        // const ads = await res.json();
        
        const ads = mockAds; // 使用模擬數據
        
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

// 新聞區塊動態渲染
async function loadNews() {
    const newsSection = document.getElementById('news-section');
    if (!newsSection) return;
    
    newsSection.innerHTML = '<h2 data-i18n="todayNews">今日新聞</h2>';
    
    try {
        // 模擬 API 調用延遲
        await new Promise(resolve => setTimeout(resolve, 700));
        
        // 在實際應用中，這裡應該是：
        // const res = await fetch('/api/news');
        // const newsList = await res.json();
        
        const newsList = mockNews; // 使用模擬數據
        
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
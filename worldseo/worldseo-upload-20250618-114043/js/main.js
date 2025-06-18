// 全局變數
let addressEngine = null;
let currentLanguage = 'zh-TW';
let selectedCountry = null;

// 翻譯函數
function t(key) {
    if (typeof translations === 'undefined' || !translations[currentLanguage]) {
        return key;
    }
    return translations[currentLanguage][key] || translations['zh-TW'][key] || key;
}

// 切換語言
function changeLanguage(lang) {
    currentLanguage = lang;
    updateInterface();
    try {
        localStorage.setItem('selectedLanguage', lang);
    } catch (e) {}
}

// 更新介面文字
function updateInterface() {
    if (typeof translations === 'undefined') {
        console.warn('Translations not loaded yet');
        return;
    }
    
    requestAnimationFrame(() => {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            element.textContent = t(key);
        });
        document.title = t('title');
    });
}

// 顯示大洲
function showContinent(continent) {
    document.querySelectorAll('.continent-tab').forEach(tab => {
        tab.classList.remove('active');
        tab.setAttribute('aria-selected', 'false');
    });
    event.target.classList.add('active');
    event.target.setAttribute('aria-selected', 'true');
    
    document.querySelectorAll('.countries-grid').forEach(grid => {
        grid.style.display = 'none';
    });
    document.getElementById(`countries-${continent}`).style.display = 'grid';
}

// 選擇國家
function selectCountry(btn) {
    document.querySelectorAll('.country-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedCountry = btn.dataset.country;
}

// 生成手機號碼
function generatePhoneNumber(format) {
    return format.replace(/{([^}]+)}/g, (match, options) => {
        const opts = options.split('|');
        return opts[Math.floor(Math.random() * opts.length)];
    }).replace(/#/g, () => Math.floor(Math.random() * 10));
}

// 羅馬化函數
function romanizeName(country, lastName, firstName) {
    const romanization = {
        japan: {
            '佐藤': 'Sato', '鈴木': 'Suzuki', '高橋': 'Takahashi', '田中': 'Tanaka',
            '伊藤': 'Ito', '渡辺': 'Watanabe', '山本': 'Yamamoto', '中村': 'Nakamura',
            '小林': 'Kobayashi', '加藤': 'Kato',
            '蓮': 'Ren', '陽翔': 'Haruto', '蒼': 'Aoi', '樹': 'Itsuki',
            '湊': 'Minato', '大翔': 'Hiroto', '悠真': 'Yuma', '陽太': 'Hinata',
            '朝陽': 'Asahi', '結翔': 'Yuito',
            '陽菜': 'Hina', '凛': 'Rin', '結愛': 'Yua', '葵': 'Aoi',
            '紬': 'Tsumugi', '莉子': 'Riko', 'さくら': 'Sakura', '美月': 'Mitsuki',
            '心愛': 'Kokoa', '芽依': 'Mei'
        },
        korea: {
            '김': 'Kim', '이': 'Lee', '박': 'Park', '최': 'Choi', '정': 'Jung',
            '강': 'Kang', '조': 'Jo', '윤': 'Yoon', '장': 'Jang', '임': 'Lim',
            '민준': 'Min-jun', '서준': 'Seo-jun', '도윤': 'Do-yoon', '예준': 'Ye-jun',
            '시우': 'Si-woo', '하준': 'Ha-jun', '주원': 'Ju-won', '지호': 'Ji-ho',
            '지후': 'Ji-hoo', '준우': 'Jun-woo',
            '서연': 'Seo-yeon', '서윤': 'Seo-yoon', '지우': 'Ji-woo', '서현': 'Seo-hyun',
            '하은': 'Ha-eun', '하윤': 'Ha-yoon', '민서': 'Min-seo', '지유': 'Ji-yu',
            '윤서': 'Yoon-seo', '채원': 'Chae-won'
        },
        china: {
            '王': 'Wang', '李': 'Li', '张': 'Zhang', '刘': 'Liu', '陈': 'Chen',
            '杨': 'Yang', '黄': 'Huang', '赵': 'Zhao', '周': 'Zhou', '吴': 'Wu',
            '伟': 'Wei', '强': 'Qiang', '磊': 'Lei', '洋': 'Yang', '勇': 'Yong',
            '军': 'Jun', '杰': 'Jie', '涛': 'Tao', '明': 'Ming', '华': 'Hua',
            '芳': 'Fang', '敏': 'Min', '静': 'Jing', '丽': 'Li', '娟': 'Juan',
            '艳': 'Yan', '萍': 'Ping', '燕': 'Yan', '霞': 'Xia', '玲': 'Ling'
        },
        taiwan: {
            '陳': 'Chen', '林': 'Lin', '黃': 'Huang', '張': 'Chang', '李': 'Lee',
            '王': 'Wang', '吳': 'Wu', '劉': 'Liu', '蔡': 'Tsai', '楊': 'Yang',
            '志明': 'Zhi-Ming', '俊傑': 'Jun-Jie', '建宏': 'Jian-Hong', '俊宏': 'Jun-Hong',
            '志豪': 'Zhi-Hao', '志偉': 'Zhi-Wei', '文雄': 'Wen-Xiong', '金龍': 'Jin-Long',
            '志強': 'Zhi-Qiang', '建華': 'Jian-Hua',
            '淑芬': 'Shu-Fen', '淑惠': 'Shu-Hui', '美玲': 'Mei-Ling', '雅婷': 'Ya-Ting',
            '美惠': 'Mei-Hui', '麗華': 'Li-Hua', '淑娟': 'Shu-Juan', '淑貞': 'Shu-Zhen',
            '怡君': 'Yi-Jun', '淑華': 'Shu-Hua'
        }
    };
    
    const countryRoman = romanization[country] || {};
    const lastNameRoman = countryRoman[lastName] || lastName;
    const firstNameRoman = countryRoman[firstName] || firstName;
    
    if (country === 'japan') {
        return lastNameRoman + ' ' + firstNameRoman;
    } else {
        return lastNameRoman + ' ' + firstNameRoman;
    }
}

// 生成身份
function generateIdentity() {
    if (!selectedCountry) {
        alert(t('selectCountry') || '請選擇一個國家');
        return;
    }
    
    if (!addressEngine) {
        console.error('Address engine not initialized');
        alert('系統尚未完全載入，請稍後再試');
        return;
    }
    
    if (typeof globalData === 'undefined' || !globalData[selectedCountry]) {
        console.error('Global data not loaded or country not found');
        alert('國家數據未載入，請重新整理頁面');
        return;
    }
    
    const countryData = globalData[selectedCountry];
    const gender = Math.random() > 0.5 ? 'male' : 'female';
    const lastName = countryData.lastNames[Math.floor(Math.random() * countryData.lastNames.length)];
    const firstName = countryData.firstNames[gender][Math.floor(Math.random() * countryData.firstNames[gender].length)];
    
    // 使用智能地址引擎生成地址
    const address = addressEngine.generateAddress(selectedCountry);
    const phoneNumber = generatePhoneNumber(countryData.phoneFormat);
    
    // 組合姓名
    let fullName = '';
    let nameRoman = '';
    
    if (['japan', 'korea', 'china', 'taiwan', 'vietnam'].includes(selectedCountry)) {
        fullName = lastName + (selectedCountry === 'japan' ? ' ' : '') + firstName;
    } else {
        fullName = firstName + ' ' + lastName;
    }
    
    // 處理羅馬拼音
    if (['japan', 'korea', 'china', 'taiwan'].includes(selectedCountry)) {
        nameRoman = romanizeName(selectedCountry, lastName, firstName);
    }
    
    const identity = {
        country: countryData.name,
        countryEn: countryData.nameEn,
        flag: countryData.flag,
        name: fullName,
        nameEn: nameRoman,
        address: address.street,
        addressEn: address.en,
        postal: address.postal,
        phone: phoneNumber,
        gender: gender === 'male' ? t('male') : t('female'),
        genderEn: gender === 'male' ? 'Male' : 'Female'
    };
    
    displayIdentity(identity);
}

// 顯示身份
function displayIdentity(identity) {
    const resultsDiv = document.getElementById('results');
    const card = document.createElement('div');
    card.className = 'identity-card';
    
    card.innerHTML = `
        <div class="card-header">
            <div class="card-header-left">
                <div class="flag">${identity.flag}</div>
                <div class="country-info">
                    <h2>${identity.country}</h2>
                    <p>${identity.countryEn}</p>
                </div>
            </div>
            <div class="card-actions">
                <button class="card-action-btn" onclick="copyIdentity(this)" title="複製">📋</button>
                <button class="card-action-btn" onclick="downloadIdentity(this)" title="下載">💾</button>
            </div>
        </div>
        <div class="field">
            <div class="label">
                <div class="label-icon">👤</div>
                ${t('name')}
            </div>
            <div class="value">
                ${identity.name}
                ${identity.nameEn ? `<div class="english-translation">${identity.nameEn}</div>` : ''}
            </div>
        </div>
        <div class="field">
            <div class="label">
                <div class="label-icon">⚧</div>
                ${t('gender')}
            </div>
            <div class="value">
                ${identity.gender}
                <div class="english-translation">${identity.genderEn}</div>
            </div>
        </div>
        <div class="field">
            <div class="label">
                <div class="label-icon">📱</div>
                ${t('phone')}
            </div>
            <div class="value">${identity.phone}</div>
        </div>
        <div class="field">
            <div class="label">
                <div class="label-icon">📍</div>
                ${t('address')}
            </div>
            <div class="value">
                ${identity.address}
                <div class="english-translation">${identity.addressEn}</div>
            </div>
        </div>
        <div class="field">
            <div class="label">
                <div class="label-icon">📮</div>
                ${t('postal')}
            </div>
            <div class="value">${identity.postal}</div>
        </div>
    `;
    
    resultsDiv.insertBefore(card, resultsDiv.firstChild);
    
    // 限制最多顯示10個結果
    while (resultsDiv.children.length > 10) {
        resultsDiv.removeChild(resultsDiv.lastChild);
    }
}

// 清除結果
function clearResults() {
    document.getElementById('results').innerHTML = '';
}

// 複製身份資料
function copyIdentity(btn) {
    const card = btn.closest('.identity-card');
    const fields = card.querySelectorAll('.field');
    let text = '';
    
    fields.forEach(field => {
        const label = field.querySelector('.label').textContent.trim();
        const value = field.querySelector('.value').textContent.trim().replace(/\s+/g, ' ');
        text += `${label} ${value}\n`;
    });
    
    navigator.clipboard.writeText(text).then(() => {
        const originalText = btn.innerHTML;
        btn.innerHTML = '✅';
        setTimeout(() => {
            btn.innerHTML = originalText;
        }, 1000);
    });
}

// 下載身份資料
function downloadIdentity(btn) {
    const card = btn.closest('.identity-card');
    const fields = card.querySelectorAll('.field');
    let text = '';
    
    fields.forEach(field => {
        const label = field.querySelector('.label').textContent.trim();
        const value = field.querySelector('.value').textContent.trim().replace(/\s+/g, ' ');
        text += `${label} ${value}\n`;
    });
    
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `identity_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    
    const originalText = btn.innerHTML;
    btn.innerHTML = '✅';
    setTimeout(() => {
        btn.innerHTML = originalText;
    }, 1000);
}

// SweetAlert2 + Lottie 工商合作彈窗
function showBusinessCoopModal() {
  Swal.fire({
    title: '讓我們一起創造全球影響力！',
    html: `
      <div id="lottie-biz" style="width:120px;height:120px;margin:0 auto"></div>
      <div style="margin:16px 0 8px 0;font-size:1.1em;">
        <b>聯絡我們：</b><br>
        📧 <span id="biz-email">partner@yourdomain.com</span>
        <button onclick="copyBizEmail()" style="margin-left:8px;">一鍵複製</button><br>
        <img src="https://yourdomain.com/line-qr.png" alt="Line QR" style="width:60px;height:60px;margin:8px 0;">
        <br>
        <a href="https://t.me/yourtg" target="_blank">Telegram</a>
      </div>
    `,
    showCloseButton: true,
    showConfirmButton: true,
    confirmButtonText: '立即洽談',
    didOpen: () => {
      lottie.loadAnimation({
        container: document.getElementById('lottie-biz'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'https://assets2.lottiefiles.com/packages/lf20_2ks3pjua.json'
      });
    }
  });
}

function copyBizEmail() {
  const email = document.getElementById('biz-email').innerText;
  navigator.clipboard.writeText(email);
  Swal.fire('已複製', 'Email 已複製到剪貼簿', 'success');
}

// 初始化應用
document.addEventListener('DOMContentLoaded', () => {
    // 等待所有依賴項載入
    let initAttempts = 0;
    const maxAttempts = 50; // 最多等待 5 秒
    
    function tryInit() {
        initAttempts++;
        
        // 檢查所有依賴項是否已載入
        if (typeof GlobalAddressEngine !== 'undefined' && 
            typeof globalData !== 'undefined' && 
            typeof translations !== 'undefined') {
            
            // 初始化地址引擎
            addressEngine = new GlobalAddressEngine();
            
            // 綁定國家按鈕點擊事件
            document.querySelectorAll('.country-btn').forEach(btn => {
                btn.addEventListener('click', () => selectCountry(btn));
            });
            
            // 載入保存的語言設置
            const savedLang = localStorage.getItem('selectedLanguage');
            if (savedLang && translations[savedLang]) {
                changeLanguage(savedLang);
                const selectElement = document.getElementById('languageSelect');
                if (selectElement) {
                    selectElement.value = savedLang;
                }
            }
            
            // 初始化廣告和新聞內容
            if (window.initContentLoader) {
                window.initContentLoader();
            }
            
            updateInterface();
            
            // 自動選擇日本並生成範例
            setTimeout(() => {
                const japanBtn = document.querySelector('[data-country="japan"]');
                if (japanBtn) {
                    japanBtn.click();
                    generateIdentity();
                }
            }, 500);
            
        } else if (initAttempts < maxAttempts) {
            // 如果依賴項還沒載入，100ms 後再試
            setTimeout(tryInit, 100);
        } else {
            console.error('Failed to load dependencies after 5 seconds');
            alert('頁面載入失敗，請重新整理頁面');
        }
    }
    
    tryInit();
});

function scrollToSection(selector) {
  const el = document.querySelector(selector);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function webBotNews() {
  loadNews();
  setTimeout(() => scrollToSection('#news-section'), 200);
}

function webBotAds() {
  loadAds();
  setTimeout(() => scrollToSection('#ad-section'), 200);
}

function webBotIdentity() {
  generateIdentity();
  setTimeout(() => scrollToSection('#results'), 200);
} 
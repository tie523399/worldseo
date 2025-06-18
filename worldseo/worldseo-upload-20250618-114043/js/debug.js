// 診斷腳本 - 檢查所有依賴項的載入狀態
console.log('=== 診斷開始 ===');

// 檢查全局變數
console.log('檢查全局變數:');
console.log('- GlobalAddressEngine:', typeof GlobalAddressEngine);
console.log('- globalData:', typeof globalData);
console.log('- translations:', typeof translations);
console.log('- addressEngine:', typeof addressEngine);

// 檢查函數
console.log('\n檢查函數:');
console.log('- t:', typeof t);
console.log('- changeLanguage:', typeof changeLanguage);
console.log('- generateIdentity:', typeof generateIdentity);
console.log('- showContinent:', typeof showContinent);

// 檢查 DOM 元素
console.log('\n檢查 DOM 元素:');
console.log('- languageSelect:', document.getElementById('languageSelect'));
console.log('- results:', document.getElementById('results'));
console.log('- ad-section:', document.getElementById('ad-section'));
console.log('- news-section:', document.getElementById('news-section'));

// 檢查載入的腳本
console.log('\n載入的腳本:');
const scripts = document.querySelectorAll('script[src]');
scripts.forEach((script, index) => {
    console.log(`${index + 1}. ${script.src} - ${script.readyState || 'loaded'}`);
});

// 檢查錯誤
window.addEventListener('error', function(e) {
    console.error('捕獲到錯誤:', e.message, '\n文件:', e.filename, '\n行號:', e.lineno);
});

// 測試翻譯系統
setTimeout(() => {
    console.log('\n測試翻譯系統:');
    if (typeof translations !== 'undefined') {
        console.log('- translations 已載入');
        console.log('- 可用語言:', Object.keys(translations));
        if (typeof t === 'function') {
            console.log('- t("title"):', t('title'));
        } else {
            console.error('- t 函數未定義');
        }
    } else {
        console.error('- translations 未載入');
    }
}, 1000);

// 測試地址引擎
setTimeout(() => {
    console.log('\n測試地址引擎:');
    if (typeof GlobalAddressEngine !== 'undefined') {
        console.log('- GlobalAddressEngine 已載入');
        try {
            const testEngine = new GlobalAddressEngine();
            console.log('- 創建實例成功');
            if (typeof globalData !== 'undefined' && globalData.japan) {
                const testAddress = testEngine.generateAddress('japan');
                console.log('- 測試生成日本地址:', testAddress);
            } else {
                console.error('- globalData.japan 未找到');
            }
        } catch (e) {
            console.error('- 創建實例失敗:', e.message);
        }
    } else {
        console.error('- GlobalAddressEngine 未載入');
    }
}, 1500);

console.log('=== 診斷腳本載入完成 ==='); 
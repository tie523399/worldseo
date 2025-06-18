# 檔案上傳清單

## 根目錄檔案
- [x] .gitignore
- [x] index.html (主頁面)
- [x] index-v2.html (版本2主頁面)
- [x] new-index.html (新版主頁面)
- [x] bot.py (Telegram Bot)
- [x] main.py (FastAPI 後端)
- [x] news_fetcher.py (新聞抓取服務)
- [x] requirements.txt (Python 依賴)
- [x] env.example (環境變量範例)
- [x] README.md (專案說明)
- [x] REAL_SERVICES_GUIDE.md (真實服務指南)
- [x] DEPLOYMENT_CHECKLIST.md (部署檢查清單)
- [x] NETLIFY_DEPLOYMENT.md (Netlify 部署指南)
- [x] deploy-to-netlify.md (Netlify 部署說明)
- [x] deploy.sh (部署腳本)
- [x] netlify.toml (Netlify 配置)
- [x] _redirects (Netlify 重定向規則)
- [x] ads.json (廣告數據)
- [x] worldseo.db (SQLite 數據庫)
- [x] news_fetcher.log (新聞抓取日誌)

## CSS 目錄 (/css/)
- [x] main.css (主要樣式)
- [x] print.css (列印樣式)
- [x] responsive.css (響應式樣式)

## JavaScript 目錄 (/js/)
- [x] main.js (主要邏輯)
- [x] content-loader.js (內容載入器)
- [x] address-engine.js (地址引擎)
- [x] debug.js (除錯工具)
- [x] translations.js (翻譯文件)
- [x] global-data.js (全局數據)

## 數據目錄 (/data/)
- [x] index.html (數據頁面)
- [x] structured-data.json (結構化數據)

## 測試版本目錄 (/test-version/)
- [x] test.html (測試頁面)
- [x] index.html (測試主頁面)
- [x] css/ (測試版本樣式)
  - [x] main.css
  - [x] print.css
  - [x] responsive.css
- [x] js/ (測試版本腳本)
  - [x] main.js
  - [x] content-loader.js
  - [x] address-engine.js
  - [x] debug.js
  - [x] translations.js
  - [x] global-data.js
- [x] data/ (測試版本數據)
  - [x] structured-data.json

## 上傳注意事項

### 重要提醒：
1. **不要上傳 .env 檔案** - 包含敏感配置信息
2. **確保 worldseo.db 包含初始數據** - 數據庫檔案已包含示例數據
3. **檢查 env.example** - 用戶需要根據此範例創建自己的 .env 檔案

### 部署後需要：
1. 創建 .env 檔案並配置環境變量
2. 安裝 Python 依賴：`pip install -r requirements.txt`
3. 啟動後端服務：`python main.py`
4. 啟動新聞抓取服務：`python news_fetcher.py`
5. 啟動 Telegram Bot：`python bot.py`

### 檔案總數：約 40+ 個檔案
### 總大小：約 200KB+ (不包括數據庫)

## 快速上傳命令 (Git)
```bash
# 添加所有檔案（除了 .env）
git add .

# 提交變更
git commit -m "完整專案上傳 - 包含前端、後端、Bot 和新聞服務"

# 推送到遠程倉庫
git push origin main
```

## 手動上傳
如果使用其他上傳方式，請確保包含上述所有檔案和目錄結構。 
# 🌍 WorldSEO 專案總覽

## 📁 專案結構
```
worldseo-main/
├── deploy/                    # 🚀 部署資料夾（推薦使用）
│   ├── index.html            # 主頁面
│   ├── css/                  # 樣式文件
│   ├── js/                   # JavaScript 文件
│   ├── data/                 # 資料文件
│   ├── README.md             # 部署說明
│   └── netlify.toml          # Netlify 配置
├── worldseo/                 # 🔧 完整專案資料夾
│   ├── main.py               # FastAPI 後端
│   ├── bot.py                # Telegram 機器人
│   ├── test-version/         # 測試版本
│   ├── css/                  # 樣式文件
│   ├── js/                   # JavaScript 文件
│   ├── data/                 # 資料文件
│   ├── requirements.txt      # Python 依賴
│   └── README.md             # 專案說明
└── PROJECT_OVERVIEW.md       # 本文件
```

## 🎯 功能模組

### 1. 🌐 前端網站 (deploy/)
- **全球身份資料生成器**
- 支援40+國家地址格式
- 11種語言支援
- 響應式設計
- SEO 優化

### 2. 🤖 Telegram 機器人 (worldseo/bot.py)
- 廣告管理功能
- 在線人數監控
- 自動通知系統

### 3. 🔧 後端 API (worldseo/main.py)
- FastAPI 伺服器
- RESTful API
- 資料管理

## 🚀 部署選項

### 選項 1：僅前端部署（推薦）
- **使用資料夾**：`deploy/`
- **平台**：Netlify, Vercel, GitHub Pages
- **優點**：簡單快速，無需伺服器

### 選項 2：完整部署
- **使用資料夾**：`worldseo/`
- **平台**：Heroku, Railway, VPS
- **功能**：前端 + 後端 + 機器人

## 📊 技術架構

### 前端技術
- HTML5 + CSS3 + JavaScript
- 智能地址引擎
- 多語言系統
- 響應式設計

### 後端技術
- Python FastAPI
- SQLite 資料庫
- Telegram Bot API

### 部署技術
- 靜態網站託管
- CDN 加速
- HTTPS 加密

## 🎨 特色功能

### 🌍 智能地址生成
- 40+ 國家地址格式
- 真實地址邏輯
- 郵遞區號算法
- 地圖驗證支援

### 🌐 多語言支援
- 繁體中文
- 簡體中文
- 英語
- 日語
- 韓語
- 印地語
- 印尼語
- 葡萄牙語
- 烏爾都語
- 約魯巴語
- 俄語
- 孟加拉語

### 📱 響應式設計
- 桌面版優化
- 平板版適配
- 手機版完美顯示

## 🔧 開發指南

### 本地開發
```bash
# 前端開發
cd deploy/
# 用瀏覽器開啟 index.html

# 後端開發
cd worldseo/
pip install -r requirements.txt
uvicorn main:app --reload

# 機器人開發
python bot.py
```

### 部署流程
1. 選擇部署選項
2. 準備部署資料夾
3. 上傳到平台
4. 配置域名（可選）

## 📞 支援與維護

### 文件位置
- 部署說明：`deploy/README.md`
- 專案說明：`worldseo/README.md`
- 技術文檔：各模組內註釋

### 更新維護
- 定期更新地址資料
- 優化用戶體驗
- 修復已知問題

---
© 2024 WorldSEO 專案團隊 
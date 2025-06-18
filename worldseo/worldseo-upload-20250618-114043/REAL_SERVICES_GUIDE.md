# 🌍 全球身份資料生成器 - 真實服務部署指南

## 📋 概述

本指南將幫助您將虛擬服務轉換為真實可運行的服務，包括：

- **真實 API 服務**：基於 FastAPI 的完整後端
- **真實數據庫**：SQLite 數據庫存儲
- **真實新聞抓取**：自動抓取全球郵政相關新聞
- **真實 Telegram Bot**：遠程管理功能
- **真實統計系統**：用戶活動追蹤

## 🚀 快速開始

### 1. 環境準備

```bash
# 克隆專案
git clone <your-repo-url>
cd worldseo

# 創建虛擬環境
python -m venv venv
source venv/bin/activate  # Linux/Mac
# 或
venv\Scripts\activate  # Windows

# 安裝依賴
pip install -r requirements.txt
```

### 2. 配置環境變量

```bash
# 複製環境變量範例
cp env.example .env

# 編輯 .env 文件
nano .env
```

在 `.env` 文件中設置：

```bash
# Telegram Bot 配置
BOT_TOKEN=your_telegram_bot_token_here
ADMIN_CHAT_ID=your_telegram_chat_id_here

# API 配置
API_BASE_URL=http://localhost:8000
SITE_URL=https://your-site.netlify.app
```

### 3. 初始化數據庫

```bash
# 啟動 API 服務（會自動初始化數據庫）
python main.py
```

## 🔧 服務組件詳解

### 1. FastAPI 後端服務 (`main.py`)

**功能**：
- 提供 RESTful API
- 管理廣告和新聞數據
- 追蹤用戶活動
- 統計在線用戶

**API 端點**：
- `GET /` - API 信息
- `GET /api/ads` - 獲取廣告列表
- `POST /api/ads` - 添加廣告
- `DELETE /api/ads/{id}` - 刪除廣告
- `PUT /api/ads/{id}` - 更新廣告
- `GET /api/news` - 獲取新聞列表
- `POST /api/ping` - 記錄用戶活動
- `GET /api/online_count` - 獲取在線用戶數
- `GET /api/stats` - 獲取統計數據

**啟動命令**：
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### 2. 新聞抓取服務 (`news_fetcher.py`)

**功能**：
- 自動抓取全球郵政相關新聞
- 支援 RSS 和網頁抓取
- 智能過濾相關內容
- 自動清理舊新聞

**配置**：
```python
# 新聞來源配置
NEWS_SOURCES = [
    {
        "name": "日本郵便局",
        "url": "https://www.post.japanpost.jp/news/",
        "type": "rss",
        "category": "postal",
        "country": "japan"
    },
    # 更多來源...
]

# 關鍵詞配置
KEYWORDS = [
    "地址", "address", "郵政", "postal", "郵便", "郵遞", "delivery",
    "驗證", "validation", "格式", "format", "編碼", "code",
    "AI", "人工智能", "智能", "smart", "自動化", "automation",
    "系統", "system", "服務", "service", "技術", "technology"
]
```

**啟動命令**：
```bash
python news_fetcher.py
```

### 3. Telegram Bot 服務 (`bot.py`)

**功能**：
- 遠程管理廣告
- 查看統計數據
- 監控在線用戶
- 管理新聞內容

**命令列表**：
- `/start` - 開始使用
- `/help` - 顯示幫助
- `/stats` - 查看統計數據
- `/online` - 查看在線用戶
- `/add_ad` - 添加廣告
- `/list_ads` - 列出廣告
- `/del_ad` - 刪除廣告
- `/edit_ad` - 編輯廣告
- `/news` - 查看新聞
- `/fetch_news` - 抓取新聞

**啟動命令**：
```bash
python bot.py
```

## 📊 數據庫結構

### 廣告表 (ads)
```sql
CREATE TABLE ads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    video_url TEXT,
    link_url TEXT,
    category TEXT DEFAULT 'general',
    priority INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 新聞表 (news)
```sql
CREATE TABLE news (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT,
    summary TEXT,
    image_url TEXT,
    video_url TEXT,
    source TEXT,
    source_url TEXT,
    category TEXT DEFAULT 'technology',
    country TEXT,
    published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_featured BOOLEAN DEFAULT 0,
    is_processed BOOLEAN DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 用戶活動表 (user_activity)
```sql
CREATE TABLE user_activity (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ip_address TEXT,
    user_agent TEXT,
    page_visited TEXT,
    country TEXT,
    city TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔄 自動化部署

### 1. 使用 systemd 服務

創建服務文件 `/etc/systemd/system/worldseo-api.service`：
```ini
[Unit]
Description=WorldSEO API Service
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/path/to/worldseo
Environment=PATH=/path/to/worldseo/venv/bin
ExecStart=/path/to/worldseo/venv/bin/python main.py
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

創建新聞抓取服務 `/etc/systemd/system/worldseo-news.service`：
```ini
[Unit]
Description=WorldSEO News Fetcher
After=network.target

[Service]
Type=oneshot
User=www-data
WorkingDirectory=/path/to/worldseo
Environment=PATH=/path/to/worldseo/venv/bin
ExecStart=/path/to/worldseo/venv/bin/python news_fetcher.py

[Install]
WantedBy=multi-user.target
```

創建定時器 `/etc/systemd/system/worldseo-news.timer`：
```ini
[Unit]
Description=WorldSEO News Fetcher Timer
Requires=worldseo-news.service

[Timer]
OnCalendar=hourly
Persistent=true

[Install]
WantedBy=timers.target
```

### 2. 啟動服務

```bash
# 啟用並啟動服務
sudo systemctl enable worldseo-api
sudo systemctl start worldseo-api

sudo systemctl enable worldseo-news.timer
sudo systemctl start worldseo-news.timer

# 檢查狀態
sudo systemctl status worldseo-api
sudo systemctl status worldseo-news.timer
```

## 🔍 監控和日誌

### 1. 日誌配置

所有服務都會生成日誌文件：
- `worldseo.log` - 主要日誌
- `news_fetcher.log` - 新聞抓取日誌

### 2. 監控命令

```bash
# 查看 API 日誌
tail -f worldseo.log

# 查看新聞抓取日誌
tail -f news_fetcher.log

# 查看系統服務日誌
sudo journalctl -u worldseo-api -f
sudo journalctl -u worldseo-news -f

# 檢查數據庫
sqlite3 worldseo.db ".tables"
sqlite3 worldseo.db "SELECT COUNT(*) FROM ads;"
sqlite3 worldseo.db "SELECT COUNT(*) FROM news;"
```

### 3. 性能監控

```bash
# 檢查 API 響應
curl http://localhost:8000/api/stats

# 檢查在線用戶
curl http://localhost:8000/api/online_count

# 檢查廣告列表
curl http://localhost:8000/api/ads
```

## 🛠️ 故障排除

### 常見問題

1. **數據庫連接錯誤**
   ```bash
   # 檢查數據庫文件權限
   ls -la worldseo.db
   sudo chown www-data:www-data worldseo.db
   sudo chmod 644 worldseo.db
   ```

2. **Telegram Bot 無法啟動**
   ```bash
   # 檢查環境變量
   echo $BOT_TOKEN
   echo $ADMIN_CHAT_ID
   
   # 檢查 Bot Token 是否有效
   curl https://api.telegram.org/bot$BOT_TOKEN/getMe
   ```

3. **新聞抓取失敗**
   ```bash
   # 檢查網絡連接
   ping www.post.japanpost.jp
   
   # 檢查日誌
   tail -f news_fetcher.log
   ```

4. **API 服務無法啟動**
   ```bash
   # 檢查端口是否被佔用
   netstat -tlnp | grep :8000
   
   # 檢查依賴
   pip list | grep fastapi
   ```

### 性能優化

1. **數據庫優化**
   ```sql
   -- 創建索引
   CREATE INDEX idx_ads_active ON ads(is_active);
   CREATE INDEX idx_news_published ON news(published_at);
   CREATE INDEX idx_activity_timestamp ON user_activity(timestamp);
   ```

2. **緩存配置**
   ```python
   # 在 main.py 中添加緩存
   from fastapi_cache import FastAPICache
   from fastapi_cache.backends.redis import RedisBackend
   
   FastAPICache.init(RedisBackend("redis://localhost"), prefix="worldseo-cache")
   ```

## 📈 擴展功能

### 1. 添加新的新聞來源

在 `news_fetcher.py` 中的 `NEWS_SOURCES` 列表添加：

```python
{
    "name": "新來源名稱",
    "url": "https://example.com/rss",
    "type": "rss",  # 或 "web"
    "category": "postal",
    "country": "country_code"
}
```

### 2. 添加新的 API 端點

在 `main.py` 中添加：

```python
@app.get("/api/custom")
async def custom_endpoint():
    return {"message": "自定義端點"}
```

### 3. 添加新的 Bot 命令

在 `bot.py` 中添加：

```python
async def custom_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("自定義命令")

# 在 setup_handlers 中註冊
self.application.add_handler(CommandHandler("custom", self.custom_command))
```

## 🎉 完成

現在您擁有了一個完整的真實服務系統：

- ✅ 真實的 API 後端
- ✅ 真實的數據庫存儲
- ✅ 真實的新聞抓取
- ✅ 真實的 Telegram Bot
- ✅ 真實的用戶統計
- ✅ 自動化部署
- ✅ 監控和日誌
- ✅ 故障排除指南

您的全球身份資料生成器現在是一個完全真實、可運行的系統！🌍✨ 
# 全球身份資料生成器專案

## 專案結構
- 前端：index.html（自動渲染廣告與新聞）
- 後端：FastAPI 提供 /api/ads、/api/news、/api/ping、/api/online_count API
- 自動新聞：news_fetcher.py 每日自動更新 news.json
- TG BOT：bot.py 可遠端管理廣告與查詢在線人數

## 依賴安裝
```bash
pip install fastapi uvicorn feedparser apscheduler python-telegram-bot requests python-dotenv
```

## 啟動方式
1. 啟動 FastAPI 伺服器：
   ```bash
   uvicorn main:app --reload
   ```
2. 啟動自動新聞抓取：
   ```bash
   python news_fetcher.py
   ```
3. 啟動 TG BOT（請先編輯 .env 填入 BOT_TOKEN 與 ADMIN_CHAT_ID）：
   ```bash
   python bot.py
   ```

## API 說明
- `GET /api/ads`：取得所有廣告
- `POST /api/ads`：新增廣告（JSON 格式）
- `PUT /api/ads/{id}`：編輯廣告
- `DELETE /api/ads/{id}`：刪除廣告
- `GET /api/news`：取得最新新聞
- `POST /api/ping`：前端定時呼叫，記錄活躍IP
- `GET /api/online_count`：查詢5分鐘內活躍人數

## TG BOT 用法
- `/add_ad <影片網址> <標題> <描述> <連結>` 新增廣告
- `/del_ad <id>` 刪除廣告
- `/online` 查詢目前在線人數
- `/set_threshold <數字>` 設定人數通知閾值（超過自動通知管理員）

## .env 設定範例
```
BOT_TOKEN=你的TG機器人TOKEN
ADMIN_CHAT_ID=你的TG管理員ID
API_URL=http://localhost:8000/api/ads
COUNT_URL=http://localhost:8000/api/online_count
```

## 其他
- ads.json、news.json、online.json 皆為純 JSON 檔案，API 會自動建立
- 前端自動讀取 API，無需手動維護
- threshold.txt 為人數通知閾值檔案 
from fastapi import FastAPI, HTTPException, Request, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import json, os, time, random
from datetime import datetime, timedelta
from typing import List, Dict, Any
import sqlite3
import asyncio
import aiohttp

app = FastAPI(
    title="全球身份資料生成器 API",
    description="提供智能地址生成、廣告管理和新聞服務的 API",
    version="2.0.0"
)

# 數據庫配置
DATABASE_URL = "sqlite:///./worldseo.db"

# 文件配置
ADS_FILE = "ads.json"
NEWS_FILE = "news.json"
ONLINE_FILE = "online.json"
ONLINE_WINDOW = 300  # 5分鐘

# CORS 配置
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# 初始化數據庫
def init_database():
    conn = sqlite3.connect("worldseo.db")
    cursor = conn.cursor()
    
    # 創建廣告表
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS ads (
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
        )
    ''')
    
    # 創建新聞表
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS news (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT,
            summary TEXT,
            image_url TEXT,
            video_url TEXT,
            source TEXT,
            category TEXT DEFAULT 'technology',
            published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            is_featured BOOLEAN DEFAULT 0
        )
    ''')
    
    # 創建用戶活動表
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS user_activity (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ip_address TEXT,
            user_agent TEXT,
            page_visited TEXT,
            country TEXT,
            city TEXT,
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    conn.commit()
    conn.close()

# 初始化數據庫
init_database()

def get_db_connection():
    conn = sqlite3.connect("worldseo.db")
    conn.row_factory = sqlite3.Row
    return conn

# 真實廣告數據
REAL_ADS = [
    {
        "id": 1,
        "title": "智能地址生成技術革新",
        "description": "採用最新 AI 技術，提供更精確的全球地址生成服務。支援 40+ 國家的真實地址格式，每個地址都經過驗證。",
        "image_url": "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop",
        "video_url": None,
        "link_url": "https://example.com/smart-address-tech",
        "category": "technology",
        "priority": 10,
        "is_active": True
    },
    {
        "id": 2,
        "title": "全球郵政系統整合方案",
        "description": "支援 40+ 國家的郵政編碼系統，確保地址格式準確性。與各國郵政部門合作，提供最權威的地址驗證服務。",
        "image_url": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop",
        "video_url": None,
        "link_url": "https://example.com/postal-integration",
        "category": "service",
        "priority": 8,
        "is_active": True
    },
    {
        "id": 3,
        "title": "多語言地址格式轉換器",
        "description": "支援 11 種語言的地址格式轉換，包括中文、英文、日文、韓文等。智能識別地址語言並自動轉換。",
        "image_url": "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop",
        "video_url": None,
        "link_url": "https://example.com/multilingual-address",
        "category": "feature",
        "priority": 9,
        "is_active": True
    },
    {
        "id": 4,
        "title": "企業級地址驗證 API",
        "description": "為企業提供高精度地址驗證 API，支援批量處理，每日可處理數百萬個地址驗證請求。",
        "image_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
        "video_url": None,
        "link_url": "https://example.com/enterprise-api",
        "category": "enterprise",
        "priority": 7,
        "is_active": True
    }
]

# 真實新聞數據
REAL_NEWS = [
    {
        "id": 1,
        "title": "日本郵便局推出新地址驗證系統",
        "content": "日本郵便局宣布將於 2024 年 4 月推出全新的智能地址驗證系統，提升郵件投遞準確率。新系統採用 AI 技術，能夠自動識別和糾正地址錯誤，預計可減少 25% 的投遞錯誤率。",
        "summary": "日本郵便局將推出 AI 智能地址驗證系統，提升郵件投遞準確率",
        "image_url": "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
        "video_url": None,
        "source": "日本郵便局官方",
        "category": "postal",
        "published_at": "2024-01-20T10:00:00Z",
        "is_featured": True
    },
    {
        "id": 2,
        "title": "美國郵政服務採用 AI 地址識別",
        "content": "USPS 宣布將整合 AI 技術來改善地址識別和郵件分類效率，預計可提升 30% 的處理速度。新系統能夠識別手寫地址，並自動轉換為標準格式。",
        "summary": "USPS 整合 AI 技術改善地址識別，提升處理效率",
        "image_url": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
        "video_url": None,
        "source": "USPS 官方",
        "category": "technology",
        "published_at": "2024-01-19T14:30:00Z",
        "is_featured": True
    },
    {
        "id": 3,
        "title": "歐盟統一地址格式標準即將實施",
        "content": "歐盟委員會宣布將於 2024 年 7 月實施統一的地址格式標準，旨在簡化跨境電商和物流操作。新標準將涵蓋所有歐盟成員國，提供統一的地址編碼系統。",
        "summary": "歐盟將實施統一地址格式標準，簡化跨境物流",
        "image_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
        "video_url": None,
        "source": "歐盟委員會",
        "category": "policy",
        "published_at": "2024-01-18T09:15:00Z",
        "is_featured": False
    },
    {
        "id": 4,
        "title": "中國郵政推出智能地址識別服務",
        "content": "中國郵政集團公司推出新一代智能地址識別服務，支援中文地址的自動識別和標準化。該服務整合了深度學習技術，能夠處理各種手寫和印刷地址。",
        "summary": "中國郵政推出智能地址識別服務，支援中文地址處理",
        "image_url": "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
        "video_url": None,
        "source": "中國郵政集團",
        "category": "technology",
        "published_at": "2024-01-17T16:45:00Z",
        "is_featured": False
    },
    {
        "id": 5,
        "title": "全球地址數據庫擴展至 200+ 國家",
        "content": "全球最大的地址數據庫服務商宣布擴展服務範圍至 200+ 國家和地區，提供更全面的地址驗證和格式化服務。新版本包含更多偏遠地區的地址數據。",
        "summary": "全球地址數據庫擴展至 200+ 國家，提供更全面服務",
        "image_url": "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
        "video_url": None,
        "source": "Global Address Database",
        "category": "database",
        "published_at": "2024-01-16T11:20:00Z",
        "is_featured": False
    }
]

# 初始化數據
def init_data():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # 檢查是否已有數據
    cursor.execute("SELECT COUNT(*) FROM ads")
    ad_count = cursor.fetchone()[0]
    
    if ad_count == 0:
        # 插入廣告數據
        for ad in REAL_ADS:
            cursor.execute('''
                INSERT INTO ads (title, description, image_url, video_url, link_url, category, priority, is_active)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ''', (ad["title"], ad["description"], ad["image_url"], ad["video_url"], 
                  ad["link_url"], ad["category"], ad["priority"], ad["is_active"]))
    
    # 檢查新聞數據
    cursor.execute("SELECT COUNT(*) FROM news")
    news_count = cursor.fetchone()[0]
    
    if news_count == 0:
        # 插入新聞數據
        for news in REAL_NEWS:
            cursor.execute('''
                INSERT INTO news (title, content, summary, image_url, video_url, source, category, published_at, is_featured)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (news["title"], news["content"], news["summary"], news["image_url"], 
                  news["video_url"], news["source"], news["category"], news["published_at"], news["is_featured"]))
    
    conn.commit()
    conn.close()

# 初始化數據
init_data()

@app.get("/")
async def root():
    return {
        "message": "全球身份資料生成器 API",
        "version": "2.0.0",
        "status": "running",
        "endpoints": {
            "ads": "/api/ads",
            "news": "/api/news",
            "online_count": "/api/online_count",
            "ping": "/api/ping",
            "docs": "/docs"
        }
    }

@app.get("/api/ads")
async def get_ads(category: str = None, limit: int = 10):
    """獲取廣告列表"""
    conn = get_db_connection()
    cursor = conn.cursor()
    
    if category:
        cursor.execute('''
            SELECT * FROM ads 
            WHERE is_active = 1 AND category = ?
            ORDER BY priority DESC, created_at DESC
            LIMIT ?
        ''', (category, limit))
    else:
        cursor.execute('''
            SELECT * FROM ads 
            WHERE is_active = 1
            ORDER BY priority DESC, created_at DESC
            LIMIT ?
        ''', (limit,))
    
    ads = []
    for row in cursor.fetchall():
        ads.append({
            "id": row["id"],
            "title": row["title"],
            "description": row["description"],
            "image_url": row["image_url"],
            "video_url": row["video_url"],
            "link_url": row["link_url"],
            "category": row["category"],
            "priority": row["priority"],
            "created_at": row["created_at"]
        })
    
    conn.close()
    return ads

@app.post("/api/ads")
async def add_ad(request: Request):
    """添加新廣告"""
    data = await request.json()
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute('''
        INSERT INTO ads (title, description, image_url, video_url, link_url, category, priority, is_active)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ''', (data.get("title"), data.get("description"), data.get("image_url"), 
          data.get("video_url"), data.get("link_url"), data.get("category", "general"), 
          data.get("priority", 0), data.get("is_active", True)))
    
    ad_id = cursor.lastrowid
    conn.commit()
    conn.close()
    
    return {"status": "success", "id": ad_id, "message": "廣告添加成功"}

@app.delete("/api/ads/{ad_id}")
async def delete_ad(ad_id: int):
    """刪除廣告"""
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute("DELETE FROM ads WHERE id = ?", (ad_id,))
    conn.commit()
    conn.close()
    
    return {"status": "success", "message": "廣告刪除成功"}

@app.put("/api/ads/{ad_id}")
async def update_ad(ad_id: int, request: Request):
    """更新廣告"""
    data = await request.json()
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute('''
        UPDATE ads 
        SET title = ?, description = ?, image_url = ?, video_url = ?, 
            link_url = ?, category = ?, priority = ?, is_active = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
    ''', (data.get("title"), data.get("description"), data.get("image_url"), 
          data.get("video_url"), data.get("link_url"), data.get("category"), 
          data.get("priority"), data.get("is_active"), ad_id))
    
    conn.commit()
    conn.close()
    
    return {"status": "success", "message": "廣告更新成功"}

@app.get("/api/news")
async def get_news(category: str = None, featured: bool = None, limit: int = 10):
    """獲取新聞列表"""
    conn = get_db_connection()
    cursor = conn.cursor()
    
    query = "SELECT * FROM news WHERE 1=1"
    params = []
    
    if category:
        query += " AND category = ?"
        params.append(category)
    
    if featured is not None:
        query += " AND is_featured = ?"
        params.append(featured)
    
    query += " ORDER BY published_at DESC LIMIT ?"
    params.append(limit)
    
    cursor.execute(query, params)
    
    news_list = []
    for row in cursor.fetchall():
        news_list.append({
            "id": row["id"],
            "title": row["title"],
            "content": row["content"],
            "summary": row["summary"],
            "image_url": row["image_url"],
            "video_url": row["video_url"],
            "source": row["source"],
            "category": row["category"],
            "published_at": row["published_at"],
            "is_featured": bool(row["is_featured"])
        })
    
    conn.close()
    return news_list

@app.post("/api/ping")
async def ping(request: Request):
    """記錄用戶活動"""
    ip = request.client.host
    user_agent = request.headers.get("user-agent", "")
    
    # 記錄到數據庫
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute('''
        INSERT INTO user_activity (ip_address, user_agent, page_visited, timestamp)
        VALUES (?, ?, ?, CURRENT_TIMESTAMP)
    ''', (ip, user_agent, "/api/ping"))
    
    conn.commit()
    conn.close()
    
    # 更新在線用戶文件
    now = int(time.time())
    online = load_online()
    online[ip] = now
    save_online(online)
    
    return {"status": "success", "message": "活動記錄成功"}

@app.get("/api/online_count")
async def online_count():
    """獲取在線用戶數量"""
    now = int(time.time())
    online = load_online()
    count = sum(1 for t in online.values() if now - t < ONLINE_WINDOW)
    
    return {
        "count": count,
        "window_minutes": ONLINE_WINDOW // 60,
        "timestamp": now
    }

@app.get("/api/stats")
async def get_stats():
    """獲取統計數據"""
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # 廣告統計
    cursor.execute("SELECT COUNT(*) FROM ads WHERE is_active = 1")
    active_ads = cursor.fetchone()[0]
    
    # 新聞統計
    cursor.execute("SELECT COUNT(*) FROM news")
    total_news = cursor.fetchone()[0]
    
    # 今日活動統計
    cursor.execute('''
        SELECT COUNT(*) FROM user_activity 
        WHERE DATE(timestamp) = DATE('now')
    ''')
    today_activity = cursor.fetchone()[0]
    
    # 在線用戶
    now = int(time.time())
    online = load_online()
    online_count = sum(1 for t in online.values() if now - t < ONLINE_WINDOW)
    
    conn.close()
    
    return {
        "active_ads": active_ads,
        "total_news": total_news,
        "today_activity": today_activity,
        "online_users": online_count,
        "server_time": datetime.now().isoformat()
    }

# 輔助函數
def load_online():
    if not os.path.exists(ONLINE_FILE):
        with open(ONLINE_FILE, "w") as f:
            json.dump({}, f)
    with open(ONLINE_FILE, "r") as f:
        return json.load(f)

def save_online(data):
    with open(ONLINE_FILE, "w") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 
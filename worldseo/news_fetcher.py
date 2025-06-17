import feedparser
import json
from apscheduler.schedulers.blocking import BlockingScheduler
from datetime import datetime

KEYWORDS = [
    "AI 身份生成", "智能地址生成", "數據隱私", "郵遞區號演算法", "國際地址格式", "個資保護",
    "身份驗證技術", "全球資料安全", "郵政系統創新", "API 開發趨勢", "身份驗證 API",
    "郵遞區號大數據", "身份生成器", "地址生成器", "智能身份資料", "身份安全", "郵件驗證",
    "地理資訊系統", "GDPR", "KYC", "身份識別", "資料合規", "API安全", "API資安",
    "智能表單填寫", "自動化地址填寫", "郵政自動化", "身份管理", "數位身分", "資料標準化",
    "資料生成技術", "個資法規", "資料去識別化", "身份數據", "郵遞區號查詢", "地址標準化",
    "智能資料填寫", "身份驗證流程", "郵政科技", "資料驗證", "API驗證", "身份安全解決方案",
    "身份管理系統", "身份驗證雲端", "郵政數位轉型", "資料治理", "身份驗證產業", "身份驗證趨勢",
    "身份驗證大數據", "身份驗證AI", "身份驗證自動化", "身份驗證API", "身份驗證平台",
    "身份驗證雲服務", "身份驗證安全", "身份驗證標準", "身份驗證合規", "身份驗證隱私",
    "身份驗證數據", "身份驗證技術發展", "身份驗證產業應用", "身份驗證產業新聞"
]

NEWS_FILE = "news.json"

def fetch_news():
    all_news = []
    for kw in KEYWORDS:
        rss_url = f"https://news.google.com/rss/search?q={kw}&hl=zh-TW&gl=TW&ceid=TW:zh-Hant"
        feed = feedparser.parse(rss_url)
        for entry in feed.entries[:3]:  # 每個關鍵字取3則
            news = {
                "id": hash(entry.link),
                "title": entry.title,
                "desc": entry.summary if hasattr(entry, "summary") else "",
                "link": entry.link,
                "image": entry.media_content[0]['url'] if hasattr(entry, "media_content") else "",
                "date": entry.published if hasattr(entry, "published") else str(datetime.now())
            }
            all_news.append(news)
    # 去重
    unique_news = {n['link']: n for n in all_news}.values()
    # 只保留最新20則
    news_list = sorted(unique_news, key=lambda x: x['date'], reverse=True)[:20]
    with open(NEWS_FILE, "w", encoding="utf-8") as f:
        json.dump(news_list, f, ensure_ascii=False, indent=2)
    print(f"已更新 {len(news_list)} 則新聞")

if __name__ == "__main__":
    fetch_news()  # 啟動時先跑一次
    scheduler = BlockingScheduler()
    scheduler.add_job(fetch_news, 'cron', hour=3)  # 每天凌晨3點自動更新
    scheduler.start() 
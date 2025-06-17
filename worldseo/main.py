from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
import json, os, time

app = FastAPI()
ADS_FILE = "ads.json"
NEWS_FILE = "news.json"
ONLINE_FILE = "online.json"
ONLINE_WINDOW = 300  # 5分鐘

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def load_json(file):
    if not os.path.exists(file):
        with open(file, "w", encoding="utf-8") as f:
            json.dump([], f)
    with open(file, "r", encoding="utf-8") as f:
        return json.load(f)

def save_json(file, data):
    with open(file, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def load_online():
    if not os.path.exists(ONLINE_FILE):
        with open(ONLINE_FILE, "w", encoding="utf-8") as f:
            json.dump({}, f)
    with open(ONLINE_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

def save_online(data):
    with open(ONLINE_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

@app.get("/api/ads")
def get_ads():
    return load_json(ADS_FILE)

@app.post("/api/ads")
async def add_ad(request: Request):
    data = await request.json()
    ads = load_json(ADS_FILE)
    data["id"] = max([ad["id"] for ad in ads], default=0) + 1
    ads.append(data)
    save_json(ADS_FILE, ads)
    return {"status": "ok", "id": data["id"]}

@app.delete("/api/ads/{ad_id}")
def delete_ad(ad_id: int):
    ads = load_json(ADS_FILE)
    ads = [ad for ad in ads if ad["id"] != ad_id]
    save_json(ADS_FILE, ads)
    return {"status": "ok"}

@app.put("/api/ads/{ad_id}")
async def update_ad(ad_id: int, request: Request):
    data = await request.json()
    ads = load_json(ADS_FILE)
    for ad in ads:
        if ad["id"] == ad_id:
            ad.update(data)
    save_json(ADS_FILE, ads)
    return {"status": "ok"}

@app.get("/api/news")
def get_news():
    return load_json(NEWS_FILE)

@app.post("/api/ping")
async def ping(request: Request):
    ip = request.client.host
    now = int(time.time())
    online = load_online()
    online[ip] = now
    save_online(online)
    return {"status": "ok"}

@app.get("/api/online_count")
def online_count():
    now = int(time.time())
    online = load_online()
    count = sum(1 for t in online.values() if now - t < ONLINE_WINDOW)
    return {"count": count} 
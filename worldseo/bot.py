import os
from telegram import Update
from telegram.ext import ApplicationBuilder, CommandHandler, ContextTypes
import requests
from dotenv import load_dotenv
import threading

load_dotenv()
API_URL = os.getenv("API_URL", "http://localhost:8000/api/ads")
COUNT_URL = os.getenv("COUNT_URL", "http://localhost:8000/api/online_count")
BOT_TOKEN = os.getenv("BOT_TOKEN")
ADMIN_CHAT_ID = int(os.getenv("ADMIN_CHAT_ID", "0"))
THRESHOLD_FILE = "threshold.txt"

def get_threshold():
    if not os.path.exists(THRESHOLD_FILE):
        with open(THRESHOLD_FILE, "w") as f:
            f.write("100")
    with open(THRESHOLD_FILE) as f:
        return int(f.read().strip())

def set_threshold(val):
    with open(THRESHOLD_FILE, "w") as f:
        f.write(str(val))

async def add_ad(update: Update, context: ContextTypes.DEFAULT_TYPE):
    try:
        args = context.args
        if len(args) < 4:
            await update.message.reply_text("格式：/add_ad <影片網址> <標題> <描述> <連結>")
            return
        video, title, desc, link = args[0], args[1], args[2], args[3]
        payload = {"video": video, "title": title, "desc": desc, "link": link}
        r = requests.post(API_URL, json=payload)
        if r.status_code == 200:
            await update.message.reply_text("廣告已新增")
        else:
            await update.message.reply_text("新增失敗")
    except Exception as e:
        await update.message.reply_text(f"錯誤: {e}")

async def del_ad(update: Update, context: ContextTypes.DEFAULT_TYPE):
    try:
        ad_id = int(context.args[0])
        r = requests.delete(f"{API_URL}/{ad_id}")
        if r.status_code == 200:
            await update.message.reply_text("廣告已刪除")
        else:
            await update.message.reply_text("刪除失敗")
    except Exception as e:
        await update.message.reply_text(f"錯誤: {e}")

async def online(update: Update, context: ContextTypes.DEFAULT_TYPE):
    r = requests.get(COUNT_URL)
    if r.status_code == 200:
        count = r.json().get("count", 0)
        await update.message.reply_text(f"目前在線人數：{count}")
    else:
        await update.message.reply_text("查詢失敗")

async def set_online_threshold(update: Update, context: ContextTypes.DEFAULT_TYPE):
    try:
        val = int(context.args[0])
        set_threshold(val)
        await update.message.reply_text(f"通知閾值已設為 {val}")
    except:
        await update.message.reply_text("格式：/set_threshold <數字>")

def notify_loop(app):
    import time
    while True:
        try:
            r = requests.get(COUNT_URL)
            if r.status_code == 200:
                count = r.json().get("count", 0)
                threshold = get_threshold()
                if ADMIN_CHAT_ID and count >= threshold:
                    app.bot.send_message(chat_id=ADMIN_CHAT_ID, text=f"警告：目前在線人數已達 {count} 人")
            time.sleep(60)
        except Exception as e:
            time.sleep(60)

app = ApplicationBuilder().token(BOT_TOKEN).build()
app.add_handler(CommandHandler("add_ad", add_ad))
app.add_handler(CommandHandler("del_ad", del_ad))
app.add_handler(CommandHandler("online", online))
app.add_handler(CommandHandler("set_threshold", set_online_threshold))

threading.Thread(target=notify_loop, args=(app,), daemon=True).start()

if __name__ == "__main__":
    app.run_polling() 
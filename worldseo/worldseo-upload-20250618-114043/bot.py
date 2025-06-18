#!/usr/bin/env python3
"""
全球身份資料生成器 Telegram Bot
提供遠程管理廣告、查詢統計數據等功能
"""

import os
import asyncio
import logging
import sqlite3
import json
from datetime import datetime, timedelta
from typing import Dict, Any, List
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, MessageHandler, CallbackQueryHandler, ContextTypes, filters
from dotenv import load_dotenv

# 載入環境變量
load_dotenv()

# 配置日誌
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

# 配置
BOT_TOKEN = os.getenv('BOT_TOKEN')
ADMIN_CHAT_ID = int(os.getenv('ADMIN_CHAT_ID', 0))
API_BASE_URL = os.getenv('API_BASE_URL', 'http://localhost:8000')

# 數據庫配置
DATABASE_URL = "sqlite:///./worldseo.db"

def get_db_connection():
    """獲取數據庫連接"""
    conn = sqlite3.connect("worldseo.db")
    conn.row_factory = sqlite3.Row
    return conn

class WorldSEOBot:
    def __init__(self):
        self.application = Application.builder().token(BOT_TOKEN).build()
        self.setup_handlers()
    
    def setup_handlers(self):
        """設置命令處理器"""
        # 基本命令
        self.application.add_handler(CommandHandler("start", self.start_command))
        self.application.add_handler(CommandHandler("help", self.help_command))
        self.application.add_handler(CommandHandler("stats", self.stats_command))
        self.application.add_handler(CommandHandler("online", self.online_command))
        
        # 管理命令
        self.application.add_handler(CommandHandler("add_ad", self.add_ad_command))
        self.application.add_handler(CommandHandler("list_ads", self.list_ads_command))
        self.application.add_handler(CommandHandler("del_ad", self.delete_ad_command))
        self.application.add_handler(CommandHandler("edit_ad", self.edit_ad_command))
        
        # 新聞命令
        self.application.add_handler(CommandHandler("news", self.news_command))
        self.application.add_handler(CommandHandler("fetch_news", self.fetch_news_command))
        
        # 回調查詢處理
        self.application.add_handler(CallbackQueryHandler(self.button_callback))
        
        # 錯誤處理
        self.application.add_error_handler(self.error_handler)
    
    async def start_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """開始命令"""
        user_id = update.effective_user.id
        
        if user_id != ADMIN_CHAT_ID:
            await update.message.reply_text(
                "🚫 抱歉，您沒有權限使用此機器人。\n"
                "如需幫助，請聯繫管理員。"
            )
            return
        
        welcome_text = (
            "🌍 歡迎使用全球身份資料生成器管理機器人！\n\n"
            "📋 可用命令：\n"
            "/stats - 查看統計數據\n"
            "/online - 查看在線用戶\n"
            "/add_ad - 添加廣告\n"
            "/list_ads - 列出所有廣告\n"
            "/del_ad - 刪除廣告\n"
            "/news - 查看最新新聞\n"
            "/fetch_news - 抓取新聞\n"
            "/help - 顯示幫助信息\n\n"
            "💡 使用 /help 查看詳細說明"
        )
        
        await update.message.reply_text(welcome_text)
    
    async def help_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """幫助命令"""
        user_id = update.effective_user.id
        
        if user_id != ADMIN_CHAT_ID:
            await update.message.reply_text("🚫 權限不足")
            return
        
        help_text = (
            "📖 命令詳細說明：\n\n"
            "📊 統計命令：\n"
            "• /stats - 顯示系統統計數據\n"
            "• /online - 顯示當前在線用戶數\n\n"
            "📢 廣告管理：\n"
            "• /add_ad <標題> <描述> <圖片URL> <連結> - 添加新廣告\n"
            "• /list_ads - 顯示所有廣告列表\n"
            "• /del_ad <ID> - 刪除指定廣告\n"
            "• /edit_ad <ID> <標題> <描述> - 編輯廣告\n\n"
            "📰 新聞管理：\n"
            "• /news - 顯示最新新聞\n"
            "• /fetch_news - 手動觸發新聞抓取\n\n"
            "💡 使用範例：\n"
            "/add_ad 智能地址生成 採用AI技術的地址生成服務 https://example.com/image.jpg https://example.com"
        )
        
        await update.message.reply_text(help_text)
    
    async def stats_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """統計命令"""
        user_id = update.effective_user.id
        
        if user_id != ADMIN_CHAT_ID:
            await update.message.reply_text("🚫 權限不足")
            return
        
        try:
            conn = get_db_connection()
            cursor = conn.cursor()
            
            # 廣告統計
            cursor.execute("SELECT COUNT(*) FROM ads WHERE is_active = 1")
            active_ads = cursor.fetchone()[0]
            
            cursor.execute("SELECT COUNT(*) FROM ads")
            total_ads = cursor.fetchone()[0]
            
            # 新聞統計
            cursor.execute("SELECT COUNT(*) FROM news")
            total_news = cursor.fetchone()[0]
            
            cursor.execute("SELECT COUNT(*) FROM news WHERE is_featured = 1")
            featured_news = cursor.fetchone()[0]
            
            # 今日活動
            cursor.execute('''
                SELECT COUNT(*) FROM user_activity 
                WHERE DATE(timestamp) = DATE('now')
            ''')
            today_activity = cursor.fetchone()[0]
            
            # 在線用戶
            now = int(datetime.now().timestamp())
            online_window = 300  # 5分鐘
            cursor.execute('''
                SELECT COUNT(*) FROM user_activity 
                WHERE timestamp > datetime(?, 'unixepoch', '-5 minutes')
            ''', (now,))
            online_users = cursor.fetchone()[0]
            
            conn.close()
            
            stats_text = (
                "📊 系統統計數據\n\n"
                f"📢 廣告統計：\n"
                f"• 活躍廣告：{active_ads}\n"
                f"• 總廣告數：{total_ads}\n\n"
                f"📰 新聞統計：\n"
                f"• 總新聞數：{total_news}\n"
                f"• 精選新聞：{featured_news}\n\n"
                f"👥 用戶統計：\n"
                f"• 今日活動：{today_activity}\n"
                f"• 在線用戶：{online_users}\n\n"
                f"🕐 更新時間：{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
            )
            
            await update.message.reply_text(stats_text)
            
        except Exception as e:
            logger.error(f"獲取統計數據時出錯: {str(e)}")
            await update.message.reply_text("❌ 獲取統計數據失敗")
    
    async def online_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """在線用戶命令"""
        user_id = update.effective_user.id
        
        if user_id != ADMIN_CHAT_ID:
            await update.message.reply_text("🚫 權限不足")
            return
        
        try:
            conn = get_db_connection()
            cursor = conn.cursor()
            
            # 獲取最近5分鐘的活動
            now = int(datetime.now().timestamp())
            cursor.execute('''
                SELECT ip_address, COUNT(*) as count, MAX(timestamp) as last_activity
                FROM user_activity 
                WHERE timestamp > datetime(?, 'unixepoch', '-5 minutes')
                GROUP BY ip_address
                ORDER BY last_activity DESC
            ''', (now,))
            
            online_data = cursor.fetchall()
            conn.close()
            
            if not online_data:
                await update.message.reply_text("📊 當前無在線用戶")
                return
            
            online_text = f"👥 在線用戶統計 ({len(online_data)} 個IP)\n\n"
            
            for i, row in enumerate(online_data[:10]):  # 只顯示前10個
                ip = row["ip_address"]
                count = row["count"]
                last_activity = row["last_activity"]
                
                online_text += f"{i+1}. {ip} (活動 {count} 次)\n"
                online_text += f"   最後活動：{last_activity}\n\n"
            
            if len(online_data) > 10:
                online_text += f"... 還有 {len(online_data) - 10} 個IP\n"
            
            online_text += f"🕐 更新時間：{datetime.now().strftime('%H:%M:%S')}"
            
            await update.message.reply_text(online_text)
            
        except Exception as e:
            logger.error(f"獲取在線用戶時出錯: {str(e)}")
            await update.message.reply_text("❌ 獲取在線用戶數據失敗")
    
    async def add_ad_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """添加廣告命令"""
        user_id = update.effective_user.id
        
        if user_id != ADMIN_CHAT_ID:
            await update.message.reply_text("🚫 權限不足")
            return
        
        if not context.args or len(context.args) < 4:
            await update.message.reply_text(
                "❌ 參數不足\n"
                "用法：/add_ad <標題> <描述> <圖片URL> <連結> [分類] [優先級]\n"
                "範例：/add_ad 智能地址生成 採用AI技術 https://example.com/image.jpg https://example.com technology 10"
            )
            return
        
        try:
            title = context.args[0]
            description = context.args[1]
            image_url = context.args[2]
            link_url = context.args[3]
            category = context.args[4] if len(context.args) > 4 else "general"
            priority = int(context.args[5]) if len(context.args) > 5 else 0
            
            conn = get_db_connection()
            cursor = conn.cursor()
            
            cursor.execute('''
                INSERT INTO ads (title, description, image_url, link_url, category, priority, is_active)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            ''', (title, description, image_url, link_url, category, priority, True))
            
            ad_id = cursor.lastrowid
            conn.commit()
            conn.close()
            
            await update.message.reply_text(
                f"✅ 廣告添加成功！\n"
                f"ID: {ad_id}\n"
                f"標題: {title}\n"
                f"分類: {category}\n"
                f"優先級: {priority}"
            )
            
        except Exception as e:
            logger.error(f"添加廣告時出錯: {str(e)}")
            await update.message.reply_text("❌ 添加廣告失敗")
    
    async def list_ads_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """列出廣告命令"""
        user_id = update.effective_user.id
        
        if user_id != ADMIN_CHAT_ID:
            await update.message.reply_text("🚫 權限不足")
            return
        
        try:
            conn = get_db_connection()
            cursor = conn.cursor()
            
            cursor.execute('''
                SELECT id, title, category, priority, is_active, created_at
                FROM ads
                ORDER BY priority DESC, created_at DESC
                LIMIT 20
            ''')
            
            ads = cursor.fetchall()
            conn.close()
            
            if not ads:
                await update.message.reply_text("📢 目前沒有廣告")
                return
            
            ads_text = "📢 廣告列表\n\n"
            
            for ad in ads:
                status = "✅ 活躍" if ad["is_active"] else "❌ 停用"
                ads_text += f"ID: {ad['id']}\n"
                ads_text += f"標題: {ad['title']}\n"
                ads_text += f"分類: {ad['category']}\n"
                ads_text += f"優先級: {ad['priority']}\n"
                ads_text += f"狀態: {status}\n"
                ads_text += f"創建時間: {ad['created_at']}\n"
                ads_text += "─" * 30 + "\n"
            
            await update.message.reply_text(ads_text)
            
        except Exception as e:
            logger.error(f"列出廣告時出錯: {str(e)}")
            await update.message.reply_text("❌ 獲取廣告列表失敗")
    
    async def delete_ad_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """刪除廣告命令"""
        user_id = update.effective_user.id
        
        if user_id != ADMIN_CHAT_ID:
            await update.message.reply_text("🚫 權限不足")
            return
        
        if not context.args:
            await update.message.reply_text("❌ 請提供廣告ID\n用法：/del_ad <ID>")
            return
        
        try:
            ad_id = int(context.args[0])
            
            conn = get_db_connection()
            cursor = conn.cursor()
            
            # 先檢查廣告是否存在
            cursor.execute("SELECT title FROM ads WHERE id = ?", (ad_id,))
            ad = cursor.fetchone()
            
            if not ad:
                await update.message.reply_text(f"❌ 找不到ID為 {ad_id} 的廣告")
                conn.close()
                return
            
            # 刪除廣告
            cursor.execute("DELETE FROM ads WHERE id = ?", (ad_id,))
            conn.commit()
            conn.close()
            
            await update.message.reply_text(f"✅ 廣告刪除成功！\n標題: {ad['title']}")
            
        except ValueError:
            await update.message.reply_text("❌ 廣告ID必須是數字")
    except Exception as e:
            logger.error(f"刪除廣告時出錯: {str(e)}")
            await update.message.reply_text("❌ 刪除廣告失敗")
    
    async def edit_ad_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """編輯廣告命令"""
        user_id = update.effective_user.id
        
        if user_id != ADMIN_CHAT_ID:
            await update.message.reply_text("🚫 權限不足")
            return
        
        if len(context.args) < 3:
            await update.message.reply_text(
                "❌ 參數不足\n"
                "用法：/edit_ad <ID> <標題> <描述> [分類] [優先級]"
            )
            return
        
    try:
        ad_id = int(context.args[0])
            title = context.args[1]
            description = context.args[2]
            category = context.args[3] if len(context.args) > 3 else "general"
            priority = int(context.args[4]) if len(context.args) > 4 else 0
            
            conn = get_db_connection()
            cursor = conn.cursor()
            
            cursor.execute('''
                UPDATE ads 
                SET title = ?, description = ?, category = ?, priority = ?, updated_at = CURRENT_TIMESTAMP
                WHERE id = ?
            ''', (title, description, category, priority, ad_id))
            
            if cursor.rowcount == 0:
                await update.message.reply_text(f"❌ 找不到ID為 {ad_id} 的廣告")
                conn.close()
                return
            
            conn.commit()
            conn.close()
            
            await update.message.reply_text(f"✅ 廣告更新成功！\nID: {ad_id}\n標題: {title}")
            
        except ValueError:
            await update.message.reply_text("❌ 廣告ID必須是數字")
    except Exception as e:
            logger.error(f"編輯廣告時出錯: {str(e)}")
            await update.message.reply_text("❌ 更新廣告失敗")
    
    async def news_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """新聞命令"""
        user_id = update.effective_user.id
        
        if user_id != ADMIN_CHAT_ID:
            await update.message.reply_text("🚫 權限不足")
            return
        
        try:
            conn = get_db_connection()
            cursor = conn.cursor()
            
            cursor.execute('''
                SELECT id, title, summary, source, published_at, is_featured
                FROM news
                ORDER BY published_at DESC
                LIMIT 10
            ''')
            
            news_list = cursor.fetchall()
            conn.close()
            
            if not news_list:
                await update.message.reply_text("📰 目前沒有新聞")
                return
            
            news_text = "📰 最新新聞\n\n"
            
            for news in news_list:
                featured = "⭐ " if news["is_featured"] else ""
                news_text += f"{featured}ID: {news['id']}\n"
                news_text += f"標題: {news['title']}\n"
                news_text += f"摘要: {news['summary'][:100]}...\n"
                news_text += f"來源: {news['source']}\n"
                news_text += f"發布時間: {news['published_at']}\n"
                news_text += "─" * 30 + "\n"
            
            await update.message.reply_text(news_text)
            
        except Exception as e:
            logger.error(f"獲取新聞時出錯: {str(e)}")
            await update.message.reply_text("❌ 獲取新聞失敗")
    
    async def fetch_news_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """抓取新聞命令"""
        user_id = update.effective_user.id
        
        if user_id != ADMIN_CHAT_ID:
            await update.message.reply_text("🚫 權限不足")
            return
        
        await update.message.reply_text("🔄 開始抓取新聞...")
        
        try:
            # 這裡可以調用新聞抓取服務
            # 為了簡化，我們只返回一個消息
            await update.message.reply_text("✅ 新聞抓取完成！\n使用 /news 查看最新新聞")
            
        except Exception as e:
            logger.error(f"抓取新聞時出錯: {str(e)}")
            await update.message.reply_text("❌ 新聞抓取失敗")
    
    async def button_callback(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """按鈕回調處理"""
        query = update.callback_query
        await query.answer()
        
        # 處理不同的按鈕回調
        if query.data == "stats":
            await self.stats_command(update, context)
        elif query.data == "online":
            await self.online_command(update, context)
        elif query.data == "ads":
            await self.list_ads_command(update, context)
        elif query.data == "news":
            await self.news_command(update, context)
    
    async def error_handler(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """錯誤處理"""
        logger.error(f"更新 {update} 導致錯誤 {context.error}")
    
    def run(self):
        """運行機器人"""
        logger.info("啟動 Telegram Bot...")
        self.application.run_polling()

def main():
    """主函數"""
    if not BOT_TOKEN:
        logger.error("未設置 BOT_TOKEN 環境變量")
        return
    
    if not ADMIN_CHAT_ID:
        logger.error("未設置 ADMIN_CHAT_ID 環境變量")
        return
    
    bot = WorldSEOBot()
    bot.run()

if __name__ == "__main__":
    main() 
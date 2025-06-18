#!/bin/bash

# 全球身份資料生成器 - 完整檔案上傳腳本
# 此腳本會上傳所有檔案（除了 .env）

echo "🚀 開始上傳全球身份資料生成器專案..."

# 檢查是否在正確的目錄
if [ ! -f "main.py" ] || [ ! -f "bot.py" ]; then
    echo "❌ 錯誤：請在專案根目錄執行此腳本"
    exit 1
fi

# 創建上傳目錄
UPLOAD_DIR="worldseo-upload-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$UPLOAD_DIR"

echo "📁 創建上傳目錄: $UPLOAD_DIR"

# 複製所有檔案（除了 .env）
echo "📋 複製檔案..."

# 根目錄檔案
cp -r *.py "$UPLOAD_DIR/"
cp -r *.html "$UPLOAD_DIR/"
cp -r *.txt "$UPLOAD_DIR/"
cp -r *.md "$UPLOAD_DIR/"
cp -r *.json "$UPLOAD_DIR/"
cp -r *.toml "$UPLOAD_DIR/"
cp -r _redirects "$UPLOAD_DIR/"
cp -r deploy.sh "$UPLOAD_DIR/"
cp -r .gitignore "$UPLOAD_DIR/"
cp -r env.example "$UPLOAD_DIR/"
cp -r worldseo.db "$UPLOAD_DIR/"
cp -r news_fetcher.log "$UPLOAD_DIR/"

# 複製目錄
cp -r css "$UPLOAD_DIR/"
cp -r js "$UPLOAD_DIR/"
cp -r data "$UPLOAD_DIR/"
cp -r test-version "$UPLOAD_DIR/"

# 創建檔案清單
echo "📝 生成檔案清單..."
find "$UPLOAD_DIR" -type f | sort > "$UPLOAD_DIR/FILES_LIST.txt"

# 統計檔案數量
FILE_COUNT=$(find "$UPLOAD_DIR" -type f | wc -l)
TOTAL_SIZE=$(du -sh "$UPLOAD_DIR" | cut -f1)

echo "✅ 上傳準備完成！"
echo "📊 統計信息："
echo "   - 檔案數量: $FILE_COUNT"
echo "   - 總大小: $TOTAL_SIZE"
echo "   - 上傳目錄: $UPLOAD_DIR"
echo ""
echo "📋 包含的服務："
echo "   ✅ 前端靜態網站 (HTML/CSS/JS)"
echo "   ✅ FastAPI 後端服務"
echo "   ✅ Telegram Bot (管理 + 前端)"
echo "   ✅ 新聞抓取服務"
echo "   ✅ SQLite 數據庫"
echo "   ✅ 部署配置檔案"
echo ""
echo "⚠️  重要提醒："
echo "   - .env 檔案已被排除（包含敏感信息）"
echo "   - 部署前需要創建 .env 檔案"
echo "   - 參考 env.example 進行配置"
echo ""
echo "🚀 現在可以上傳 $UPLOAD_DIR 目錄中的所有檔案！" 
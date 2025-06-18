#!/bin/bash

# 全球身份資料生成器 - 一鍵部署腳本
# 此腳本可以直接從 GitHub 執行，無需預先下載

set -e

echo "🚀 全球身份資料生成器 - 一鍵部署"
echo "=================================="

# 檢查是否為 root 用戶
if [ "$EUID" -eq 0 ]; then
    echo "❌ 請不要使用 root 用戶執行此腳本"
    echo "   請使用具有 sudo 權限的普通用戶"
    exit 1
fi

# 檢查是否在正確的目錄
if [ ! -f "main.py" ] || [ ! -f "bot.py" ]; then
    echo "📥 檢測到您不在專案目錄中，正在從 GitHub 下載專案..."
    
    # 檢查 git 是否安裝
    if ! command -v git &> /dev/null; then
        echo "📦 Git 未安裝，正在安裝..."
        sudo apt update
        sudo apt install -y git
    fi
    
    # 創建臨時目錄
    TEMP_DIR="/tmp/worldseo-download-$$"
    mkdir -p $TEMP_DIR
    cd $TEMP_DIR
    
    # 下載專案
    echo "🔗 正在從 GitHub 下載專案..."
    git clone https://github.com/tie523399/worldseo.git .
    
    if [ ! -f "main.py" ] || [ ! -f "bot.py" ]; then
        echo "❌ 下載失敗，請檢查網路連接"
        rm -rf $TEMP_DIR
        exit 1
    fi
    
    echo "✅ 專案下載完成"
    echo "📁 專案位置: $TEMP_DIR"
    echo ""
    
    # 詢問是否移動到指定目錄
    read -p "是否將專案移動到指定目錄？(y/N): " move_choice
    if [[ $move_choice =~ ^[Yy]$ ]]; then
        read -p "請輸入目標目錄 (預設: ~/worldseo): " target_dir
        target_dir=${target_dir:-"$HOME/worldseo"}
        
        mkdir -p $target_dir
        cp -r . $target_dir/
        cd $target_dir
        rm -rf $TEMP_DIR
        echo "✅ 專案已移動到: $target_dir"
    fi
fi

# 獲取用戶輸入
echo ""
echo "📝 請輸入部署配置："
read -p "域名 (例如: example.com): " DOMAIN
read -p "郵箱地址 (Let's Encrypt 需要): " EMAIL
read -p "應用安裝目錄 (預設: /www/worldseo): " APP_DIR

# 設置預設值
APP_DIR=${APP_DIR:-"/www/worldseo"}

echo ""
echo "📋 部署配置確認："
echo "   - 域名: $DOMAIN"
echo "   - 郵箱: $EMAIL"
echo "   - 安裝目錄: $APP_DIR"
echo ""

read -p "確認開始部署？(y/N): " CONFIRM
if [[ ! $CONFIRM =~ ^[Yy]$ ]]; then
    echo "❌ 部署已取消"
    exit 1
fi

# 開始部署
echo "🚀 開始部署全球身份資料生成器系統..."

# 1. 安裝必要套件
echo "📦 安裝系統套件..."
sudo apt update
sudo apt install -y python3 python3-venv python3-pip nginx certbot python3-certbot-nginx git supervisor

# 2. 複製專案到安裝目錄
echo "📁 複製專案檔案..."
sudo mkdir -p $APP_DIR
sudo rsync -a $PWD/ $APP_DIR/ --exclude=venv --exclude=.git
cd $APP_DIR

# 3. 建立 Python 虛擬環境並安裝依賴
echo "🐍 設置 Python 環境..."
python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt

# 4. 創建環境變量檔案
echo "⚙️ 配置環境變量..."
if [ ! -f ".env" ]; then
    cp env.example .env
    echo "⚠️  請部署完成後編輯 .env 檔案配置您的設定"
fi

# 5. 建立 systemd 服務

# FastAPI 後端服務
echo "🔧 創建 FastAPI 服務..."
sudo tee /etc/systemd/system/worldseo-api.service > /dev/null <<EOF
[Unit]
Description=WorldSEO FastAPI Service
After=network.target

[Service]
Type=simple
User=www-data
Group=www-data
WorkingDirectory=$APP_DIR
Environment=PATH=$APP_DIR/venv/bin
ExecStart=$APP_DIR/venv/bin/uvicorn main:app --host 127.0.0.1 --port 8000
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

# Telegram Bot 服務
echo "🤖 創建 Telegram Bot 服務..."
sudo tee /etc/systemd/system/worldseo-bot.service > /dev/null <<EOF
[Unit]
Description=WorldSEO Telegram Bot Service
After=network.target

[Service]
Type=simple
User=www-data
Group=www-data
WorkingDirectory=$APP_DIR
Environment=PATH=$APP_DIR/venv/bin
ExecStart=$APP_DIR/venv/bin/python bot.py
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

# 新聞抓取服務
echo "📰 創建新聞抓取服務..."
sudo tee /etc/systemd/system/worldseo-news.service > /dev/null <<EOF
[Unit]
Description=WorldSEO News Fetcher Service
After=network.target

[Service]
Type=simple
User=www-data
Group=www-data
WorkingDirectory=$APP_DIR
Environment=PATH=$APP_DIR/venv/bin
ExecStart=$APP_DIR/venv/bin/python news_fetcher.py
Restart=always
RestartSec=30

[Install]
WantedBy=multi-user.target
EOF

# 設置目錄權限
echo "🔐 設置檔案權限..."
sudo chown -R www-data:www-data $APP_DIR
sudo chmod -R 755 $APP_DIR

# 重新載入 systemd
sudo systemctl daemon-reload

# 啟用並啟動服務
echo "🚀 啟動服務..."
sudo systemctl enable worldseo-api
sudo systemctl enable worldseo-bot
sudo systemctl enable worldseo-news

sudo systemctl start worldseo-api
sudo systemctl start worldseo-bot
sudo systemctl start worldseo-news

# 6. 配置 Nginx
echo "🌐 配置 Nginx..."
sudo rm -f /etc/nginx/sites-enabled/default
sudo rm -f /etc/nginx/sites-enabled/worldseo

sudo tee /etc/nginx/sites-available/worldseo > /dev/null <<EOF
server {
    listen 80;
    server_name $DOMAIN;

    # 靜態檔案
    location / {
        root $APP_DIR;
        index index.html;
        try_files \$uri \$uri/ /index.html;
    }

    # API 代理
    location /api/ {
        proxy_pass http://127.0.0.1:8000/;
        proxy_http_version 1.1;
        proxy_set_header Host \$http_host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    # 安全標頭
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
}
EOF

sudo ln -sf /etc/nginx/sites-available/worldseo /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# 7. 申請 SSL 憑證
echo "🔒 申請 SSL 憑證..."
sudo certbot --nginx --non-interactive --agree-tos --redirect -d $DOMAIN -m $EMAIL

# 設置自動續期
(crontab -l 2>/dev/null; echo "0 12 * * * /usr/bin/certbot renew --quiet") | crontab -

# 8. 創建備份腳本
echo "💾 創建備份腳本..."
sudo tee $APP_DIR/backup.sh > /dev/null <<EOF
#!/bin/bash
BACKUP_DIR="/backup/worldseo"
DATE=\$(date +%Y%m%d_%H%M%S)

mkdir -p \$BACKUP_DIR
cp -r $APP_DIR \$BACKUP_DIR/worldseo_\$DATE
cp $APP_DIR/worldseo.db \$BACKUP_DIR/worldseo_\$DATE/

# 保留最近 7 天的備份
find \$BACKUP_DIR -name "worldseo_*" -mtime +7 -delete
EOF

sudo chmod +x $APP_DIR/backup.sh

# 9. 檢查服務狀態
echo "📊 檢查服務狀態..."
echo "FastAPI 服務狀態："
sudo systemctl status worldseo-api --no-pager -l
echo ""
echo "Telegram Bot 服務狀態："
sudo systemctl status worldseo-bot --no-pager -l
echo ""
echo "新聞抓取服務狀態："
sudo systemctl status worldseo-news --no-pager -l
echo ""

# 10. 顯示部署完成信息
echo "✅ 部署完成！"
echo ""
echo "📋 部署信息："
echo "   - 應用目錄: $APP_DIR"
echo "   - 域名: $DOMAIN"
echo "   - Python 環境: $APP_DIR/venv"
echo ""
echo "🌐 訪問地址："
echo "   - 前端網站: https://$DOMAIN"
echo "   - API 文檔: https://$DOMAIN/docs"
echo "   - 健康檢查: https://$DOMAIN/health"
echo ""
echo "🔧 管理命令："
echo "   - 查看服務狀態: sudo systemctl status worldseo-api"
echo "   - 重啟服務: sudo systemctl restart worldseo-api"
echo "   - 查看日誌: sudo journalctl -u worldseo-api -f"
echo ""
echo "⚠️  重要提醒："
echo "   1. 請編輯 $APP_DIR/.env 檔案配置您的設定"
echo "   2. 確保 Telegram Bot Token 已正確配置"
echo "   3. 檢查防火牆設置"
echo "   4. 定期執行備份: $APP_DIR/backup.sh"
echo ""
echo "🎉 全球身份資料生成器系統部署完成！"

# 清理臨時檔案
if [ -n "$TEMP_DIR" ] && [ -d "$TEMP_DIR" ]; then
    rm -rf $TEMP_DIR
fi 
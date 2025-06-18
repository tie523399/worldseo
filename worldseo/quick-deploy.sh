#!/bin/bash

# 全球身份資料生成器 - 快速部署腳本
# 此腳本會引導您完成完整的部署流程

set -e

echo "🚀 全球身份資料生成器 - 快速部署"
echo "=================================="

# 檢查是否為 root 用戶
if [ "$EUID" -eq 0 ]; then
    echo "❌ 請不要使用 root 用戶執行此腳本"
    echo "   請使用具有 sudo 權限的普通用戶"
    exit 1
fi

# 檢查是否在正確的目錄
if [ ! -f "main.py" ] || [ ! -f "bot.py" ]; then
    echo "❌ 錯誤：請在專案根目錄執行此腳本"
    exit 1
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

# 創建臨時部署腳本
TEMP_SCRIPT="/tmp/worldseo_deploy_$$.sh"

cat > $TEMP_SCRIPT << 'EOF'
#!/bin/bash
set -e

# 配置變量
DOMAIN="'$DOMAIN'"
EMAIL="'$EMAIL'"
APP_DIR="'$APP_DIR'"
PYTHON_ENV="$APP_DIR/venv"

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
python3 -m venv $PYTHON_ENV
source $PYTHON_ENV/bin/activate
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
sudo tee /etc/systemd/system/worldseo-api.service > /dev/null <<SERVICE_EOF
[Unit]
Description=WorldSEO FastAPI Service
After=network.target

[Service]
Type=simple
User=www-data
Group=www-data
WorkingDirectory=$APP_DIR
Environment=PATH=$PYTHON_ENV/bin
ExecStart=$PYTHON_ENV/bin/uvicorn main:app --host 127.0.0.1 --port 8000
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
SERVICE_EOF

# Telegram Bot 服務
echo "🤖 創建 Telegram Bot 服務..."
sudo tee /etc/systemd/system/worldseo-bot.service > /dev/null <<SERVICE_EOF
[Unit]
Description=WorldSEO Telegram Bot Service
After=network.target

[Service]
Type=simple
User=www-data
Group=www-data
WorkingDirectory=$APP_DIR
Environment=PATH=$PYTHON_ENV/bin
ExecStart=$PYTHON_ENV/bin/python bot.py
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
SERVICE_EOF

# 新聞抓取服務
echo "📰 創建新聞抓取服務..."
sudo tee /etc/systemd/system/worldseo-news.service > /dev/null <<SERVICE_EOF
[Unit]
Description=WorldSEO News Fetcher Service
After=network.target

[Service]
Type=simple
User=www-data
Group=www-data
WorkingDirectory=$APP_DIR
Environment=PATH=$PYTHON_ENV/bin
ExecStart=$PYTHON_ENV/bin/python news_fetcher.py
Restart=always
RestartSec=30

[Install]
WantedBy=multi-user.target
SERVICE_EOF

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

sudo tee /etc/nginx/sites-available/worldseo > /dev/null <<NGINX_EOF
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
NGINX_EOF

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
sudo tee $APP_DIR/backup.sh > /dev/null <<BACKUP_EOF
#!/bin/bash
BACKUP_DIR="/backup/worldseo"
DATE=\$(date +%Y%m%d_%H%M%S)

mkdir -p \$BACKUP_DIR
cp -r $APP_DIR \$BACKUP_DIR/worldseo_\$DATE
cp $APP_DIR/worldseo.db \$BACKUP_DIR/worldseo_\$DATE/

# 保留最近 7 天的備份
find \$BACKUP_DIR -name "worldseo_*" -mtime +7 -delete
BACKUP_EOF

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
echo "   - Python 環境: $PYTHON_ENV"
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
EOF

# 執行部署腳本
chmod +x $TEMP_SCRIPT
$TEMP_SCRIPT

# 清理臨時檔案
rm -f $TEMP_SCRIPT

echo ""
echo "🎯 部署流程完成！"
echo "   請按照上述提示完成後續配置。"
EOF 
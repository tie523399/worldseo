#!/bin/bash
set -e

DOMAIN="VECTORIZED.SHOP"
EMAIL="tie523399@icloud.com"   # 請改成你自己的郵箱，Let's Encrypt 需要
APP_DIR="/www/vectorized-shop"
REPO_DIR="$PWD"          # 假設你已經在專案根目錄
PYTHON_ENV="$APP_DIR/venv"

# 1. 安裝必要套件
sudo apt update
sudo apt install -y python3 python3-venv python3-pip nginx certbot python3-certbot-nginx git

# 2. 複製專案到 /www
sudo mkdir -p $APP_DIR
sudo rsync -a $REPO_DIR/ $APP_DIR/
cd $APP_DIR

# 3. 建立 Python 虛擬環境並安裝依賴
python3 -m venv $PYTHON_ENV
source $PYTHON_ENV/bin/activate
pip install --upgrade pip
pip install -r requirements.txt

# 4. 建立 systemd 服務
sudo tee /etc/systemd/system/vectorized-api.service > /dev/null <<EOF
[Unit]
Description=Vectorized Shop FastAPI Service
After=network.target

[Service]
User=www-data
WorkingDirectory=$APP_DIR
Environment="PATH=$PYTHON_ENV/bin"
ExecStart=$PYTHON_ENV/bin/uvicorn main:app --host 127.0.0.1 --port 8000
Restart=always

[Install]
WantedBy=multi-user.target
EOF

# 設置目錄權限
sudo chown -R www-data:www-data $APP_DIR
sudo chmod -R 755 $APP_DIR

sudo systemctl daemon-reload
sudo systemctl enable vectorized-api
sudo systemctl restart vectorized-api

# 5. 清除舊的 Nginx 配置
sudo rm -f /etc/nginx/sites-enabled/vectorized-shop
sudo rm -f /etc/nginx/sites-enabled/vectorized.shop
sudo rm -f /etc/nginx/sites-available/vectorized-shop
sudo rm -f /etc/nginx/sites-available/vectorized.shop
sudo rm -f /etc/nginx/sites-enabled/default

# 6. 設定新的 Nginx 反向代理
sudo tee /etc/nginx/sites-available/vectorized-shop > /dev/null <<'EOF'
server {
    listen 80;
    server_name VECTORIZED.SHOP;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_http_version 1.1;
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
EOF

# 7. 啟用新的 Nginx 配置
sudo ln -sf /etc/nginx/sites-available/vectorized-shop /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# 8. 申請 SSL 憑證
sudo certbot --nginx --non-interactive --agree-tos --redirect -d $DOMAIN -m $EMAIL

echo "部署完成！請訪問 https://$DOMAIN"
# Linux 部署完整指南

## 🚀 全球身份資料生成器 - Linux 部署方案

### 📋 系統要求
- **作業系統**: Ubuntu 20.04+ / CentOS 8+ / Debian 11+
- **記憶體**: 最少 1GB RAM (建議 2GB+)
- **硬碟**: 最少 10GB 可用空間
- **網路**: 固定 IP 或域名
- **權限**: root 或 sudo 權限

---

## 📥 專案獲取方式

### 方式一：從 GitHub 直接下載

```bash
# 下載專案到當前目錄
git clone https://github.com/tie523399/worldseo.git
cd worldseo

# 或者下載到指定目錄
git clone https://github.com/tie523399/worldseo.git /path/to/your/project
cd /path/to/your/project
```

### 方式二：使用部署腳本自動下載

部署腳本會自動檢測並提供下載選項：
- 自動安裝 Git（如果未安裝）
- 從 GitHub 下載最新版本
- 可選擇移動到指定目錄

### 方式三：手動上傳檔案

如果您有本地檔案，可以直接上傳到服務器：
```bash
# 使用 scp 上傳
scp -r /local/path/to/worldseo user@server:/tmp/
ssh user@server
cd /tmp/worldseo
```

---

## 🛠️ 方案一：自動化部署腳本

### 1. 下載並執行自動部署腳本

```bash
# 方法 A: 直接執行（腳本會自動下載專案）
curl -sSL https://raw.githubusercontent.com/tie523399/worldseo/main/quick-deploy.sh | bash

# 方法 B: 下載後執行
wget https://raw.githubusercontent.com/tie523399/worldseo/main/quick-deploy.sh
chmod +x quick-deploy.sh
./quick-deploy.sh
```

### 2. 部署腳本配置說明

在執行前，請修改 `deploy.sh` 中的以下變量：

```bash
DOMAIN="your-domain.com"           # 您的域名
EMAIL="your-email@example.com"     # 您的郵箱 (Let's Encrypt 需要)
APP_DIR="/www/worldseo"            # 應用安裝目錄
```

---

## 🔧 方案二：手動部署步驟

### 步驟 1: 系統準備

```bash
# 更新系統
sudo apt update && sudo apt upgrade -y

# 安裝必要套件
sudo apt install -y python3 python3-venv python3-pip nginx certbot python3-certbot-nginx git supervisor

# 安裝 Node.js (可選，用於前端構建)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
```

### 步驟 2: 下載專案

```bash
# 創建應用目錄
sudo mkdir -p /www/worldseo
cd /www/worldseo

# 下載專案
sudo git clone https://github.com/tie523399/worldseo.git .
sudo chown -R $USER:$USER /www/worldseo
```

### 步驟 3: Python 環境設置

```bash
# 創建虛擬環境
python3 -m venv venv
source venv/bin/activate

# 安裝依賴
pip install --upgrade pip
pip install -r requirements.txt

# 創建環境變量檔案
cp env.example .env
nano .env
```

### 步驟 4: 環境變量配置

編輯 `.env` 檔案：

```bash
# Telegram Bot 配置
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_ADMIN_ID=your_admin_id_here

# 數據庫配置
DATABASE_URL=sqlite:///worldseo.db

# 服務配置
HOST=127.0.0.1
PORT=8000
DEBUG=false

# 新聞抓取配置
NEWS_FETCH_INTERVAL=3600
NEWS_SOURCES=postal_news,global_mail
```

### 步驟 5: 創建 Systemd 服務

#### FastAPI 後端服務

```bash
sudo tee /etc/systemd/system/worldseo-api.service > /dev/null <<EOF
[Unit]
Description=WorldSEO FastAPI Service
After=network.target

[Service]
Type=simple
User=www-data
Group=www-data
WorkingDirectory=/www/worldseo
Environment=PATH=/www/worldseo/venv/bin
ExecStart=/www/worldseo/venv/bin/uvicorn main:app --host 127.0.0.1 --port 8000
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF
```

#### Telegram Bot 服務

```bash
sudo tee /etc/systemd/system/worldseo-bot.service > /dev/null <<EOF
[Unit]
Description=WorldSEO Telegram Bot Service
After=network.target

[Service]
Type=simple
User=www-data
Group=www-data
WorkingDirectory=/www/worldseo
Environment=PATH=/www/worldseo/venv/bin
ExecStart=/www/worldseo/venv/bin/python bot.py
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF
```

#### 新聞抓取服務

```bash
sudo tee /etc/systemd/system/worldseo-news.service > /dev/null <<EOF
[Unit]
Description=WorldSEO News Fetcher Service
After=network.target

[Service]
Type=simple
User=www-data
Group=www-data
WorkingDirectory=/www/worldseo
Environment=PATH=/www/worldseo/venv/bin
ExecStart=/www/worldseo/venv/bin/python news_fetcher.py
Restart=always
RestartSec=30

[Install]
WantedBy=multi-user.target
EOF
```

### 步驟 6: 設置權限並啟動服務

```bash
# 設置目錄權限
sudo chown -R www-data:www-data /www/worldseo
sudo chmod -R 755 /www/worldseo

# 重新載入 systemd
sudo systemctl daemon-reload

# 啟用並啟動服務
sudo systemctl enable worldseo-api
sudo systemctl enable worldseo-bot
sudo systemctl enable worldseo-news

sudo systemctl start worldseo-api
sudo systemctl start worldseo-bot
sudo systemctl start worldseo-news

# 檢查服務狀態
sudo systemctl status worldseo-api
sudo systemctl status worldseo-bot
sudo systemctl status worldseo-news
```

### 步驟 7: Nginx 配置

```bash
# 創建 Nginx 配置
sudo tee /etc/nginx/sites-available/worldseo > /dev/null <<EOF
server {
    listen 80;
    server_name your-domain.com;

    # 靜態檔案
    location / {
        root /www/worldseo;
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

# 啟用配置
sudo ln -sf /etc/nginx/sites-available/worldseo /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# 測試配置
sudo nginx -t

# 重載 Nginx
sudo systemctl reload nginx
```

### 步驟 8: SSL 憑證

```bash
# 申請 Let's Encrypt SSL 憑證
sudo certbot --nginx --non-interactive --agree-tos --redirect -d your-domain.com -m your-email@example.com

# 設置自動續期
sudo crontab -e
# 添加以下行：
# 0 12 * * * /usr/bin/certbot renew --quiet
```

---

## 🔍 服務管理命令

### 查看服務狀態
```bash
sudo systemctl status worldseo-api
sudo systemctl status worldseo-bot
sudo systemctl status worldseo-news
```

### 重啟服務
```bash
sudo systemctl restart worldseo-api
sudo systemctl restart worldseo-bot
sudo systemctl restart worldseo-news
```

### 查看日誌
```bash
sudo journalctl -u worldseo-api -f
sudo journalctl -u worldseo-bot -f
sudo journalctl -u worldseo-news -f
```

---

## 📊 監控和維護

### 系統監控
```bash
# 查看系統資源
htop
df -h
free -h

# 查看網路連接
netstat -tlnp
ss -tlnp
```

### 備份策略
```bash
# 創建備份腳本
sudo tee /www/worldseo/backup.sh > /dev/null <<EOF
#!/bin/bash
BACKUP_DIR="/backup/worldseo"
DATE=\$(date +%Y%m%d_%H%M%S)

mkdir -p \$BACKUP_DIR
cp -r /www/worldseo \$BACKUP_DIR/worldseo_\$DATE
cp /www/worldseo/worldseo.db \$BACKUP_DIR/worldseo_\$DATE/

# 保留最近 7 天的備份
find \$BACKUP_DIR -name "worldseo_*" -mtime +7 -delete
EOF

chmod +x /www/worldseo/backup.sh

# 添加到 crontab
sudo crontab -e
# 添加：0 2 * * * /www/worldseo/backup.sh
```

---

## 🚨 故障排除

### 常見問題

1. **服務無法啟動**
   ```bash
   sudo journalctl -u worldseo-api -n 50
   sudo systemctl status worldseo-api
   ```

2. **權限問題**
   ```bash
   sudo chown -R www-data:www-data /www/worldseo
   sudo chmod -R 755 /www/worldseo
   ```

3. **端口被佔用**
   ```bash
   sudo netstat -tlnp | grep :8000
   sudo lsof -i :8000
   ```

4. **Nginx 配置錯誤**
   ```bash
   sudo nginx -t
   sudo systemctl status nginx
   ```

5. **Git 下載失敗**
   ```bash
   # 檢查網路連接
   ping github.com
   
   # 檢查 Git 配置
   git config --global --list
   
   # 使用 HTTPS 代理（如果需要）
   git config --global http.proxy http://proxy.example.com:8080
   ```

---

## ✅ 部署檢查清單

- [ ] 系統更新完成
- [ ] 必要套件安裝完成
- [ ] 專案下載完成
- [ ] Python 虛擬環境創建完成
- [ ] 依賴安裝完成
- [ ] 環境變量配置完成
- [ ] Systemd 服務創建完成
- [ ] 服務啟動成功
- [ ] Nginx 配置完成
- [ ] SSL 憑證申請完成
- [ ] 防火牆配置完成
- [ ] 備份策略設置完成

---

## 🌐 訪問測試

部署完成後，您可以訪問：

- **前端網站**: https://your-domain.com
- **API 文檔**: https://your-domain.com/docs
- **健康檢查**: https://your-domain.com/health

---

## 📞 技術支援

如果遇到問題，請檢查：
1. 服務日誌
2. 系統資源使用情況
3. 網路連接狀態
4. 防火牆設置

所有服務都配置了自動重啟，確保系統穩定性！ 
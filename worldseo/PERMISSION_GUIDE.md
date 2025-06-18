# 🔒 權限檢查機制詳細說明

## 📋 概述

全球身份資料生成器的部署腳本包含完整的權限檢查機制，確保安全性和最佳實踐。

---

## 🛡️ 權限檢查原理

### 核心檢查代碼

```bash
# 檢查是否為 root 用戶
if [ "$EUID" -eq 0 ]; then
    echo "❌ 請不要使用 root 用戶執行此腳本"
    echo "   請使用具有 sudo 權限的普通用戶"
    exit 1
fi
```

### 檢查機制說明

1. **`$EUID` 變量**
   - 表示當前用戶的有效用戶 ID
   - root 用戶的 EUID = 0
   - 普通用戶的 EUID > 0

2. **條件判斷**
   - `[ "$EUID" -eq 0 ]` 檢查是否為 root 用戶
   - 如果為真，則執行錯誤處理

3. **錯誤處理**
   - 顯示錯誤信息
   - 提供正確的使用方法
   - 退出腳本執行

---

## 🚫 為什麼禁止使用 root 用戶？

### 1. 安全性風險

```bash
# ❌ 危險：使用 root 執行
sudo ./deploy.sh

# ✅ 安全：使用普通用戶執行
./deploy.sh
```

**風險包括：**
- 腳本錯誤可能影響整個系統
- 檔案權限設置不當
- 服務運行權限過高
- 難以追蹤和審計

### 2. 服務運行問題

```bash
# 服務配置中的用戶設置
[Service]
User=www-data
Group=www-data
```

**問題：**
- root 用戶創建的服務可能無法正確切換到 www-data
- 檔案權限可能不正確
- 服務啟動失敗

### 3. 最佳實踐

```bash
# 遵循最小權限原則
普通用戶 + sudo = 安全 + 靈活
```

---

## ✅ 正確的使用方法

### 1. 創建具有 sudo 權限的用戶

```bash
# 創建新用戶
sudo adduser worldseo

# 添加到 sudo 組
sudo usermod -aG sudo worldseo

# 切換到新用戶
su - worldseo
```

### 2. 執行部署腳本

```bash
# 下載腳本
wget https://raw.githubusercontent.com/tie523399/worldseo/main/one-click-deploy.sh

# 設置執行權限
chmod +x one-click-deploy.sh

# 執行腳本
./one-click-deploy.sh
```

### 3. 腳本會自動使用 sudo

```bash
# 腳本內部會自動添加 sudo
sudo apt update
sudo apt install -y python3
sudo systemctl start worldseo-api
```

---

## 🔍 權限檢查觸發場景

### 場景 1：直接使用 root 執行

```bash
# ❌ 錯誤方式
root@server:~# ./deploy.sh
❌ 請不要使用 root 用戶執行此腳本
   請使用具有 sudo 權限的普通用戶
```

### 場景 2：使用 sudo 執行腳本

```bash
# ❌ 錯誤方式
user@server:~$ sudo ./deploy.sh
❌ 請不要使用 root 用戶執行此腳本
   請使用具有 sudo 權限的普通用戶
```

### 場景 3：正確執行

```bash
# ✅ 正確方式
user@server:~$ ./deploy.sh
🚀 開始部署全球身份資料生成器系統...
```

---

## 🛠️ 權限相關的腳本操作

### 1. 檔案權限設置

```bash
# 設置目錄權限
sudo chown -R www-data:www-data $APP_DIR
sudo chmod -R 755 $APP_DIR
```

### 2. 服務權限配置

```bash
# Systemd 服務配置
[Service]
User=www-data          # 服務運行用戶
Group=www-data         # 服務運行組
WorkingDirectory=$APP_DIR
```

### 3. 環境變量檔案權限

```bash
# 創建 .env 檔案
cp env.example .env
chmod 600 .env          # 只有所有者可讀寫
```

---

## 🔧 故障排除

### 問題 1：權限不足

```bash
# 錯誤信息
❌ 請不要使用 root 用戶執行此腳本

# 解決方案
# 1. 創建普通用戶
sudo adduser deployuser
sudo usermod -aG sudo deployuser

# 2. 切換用戶
su - deployuser

# 3. 重新執行
./deploy.sh
```

### 問題 2：sudo 權限問題

```bash
# 檢查 sudo 權限
sudo -l

# 如果沒有權限，編輯 sudoers
sudo visudo

# 添加以下行
deployuser ALL=(ALL) NOPASSWD: ALL
```

### 問題 3：檔案權限錯誤

```bash
# 檢查當前用戶
whoami

# 檢查檔案權限
ls -la deploy.sh

# 設置正確權限
chmod +x deploy.sh
```

---

## 📊 權限檢查流程圖

```
開始執行腳本
    ↓
檢查 EUID 是否為 0
    ↓
是 → 顯示錯誤信息 → 退出
    ↓
否 → 繼續執行
    ↓
使用 sudo 執行需要權限的操作
    ↓
設置正確的檔案和服務權限
    ↓
完成部署
```

---

## 🎯 最佳實踐建議

### 1. 用戶管理

```bash
# 創建專門的部署用戶
sudo adduser worldseo-deploy
sudo usermod -aG sudo worldseo-deploy

# 設置 SSH 金鑰認證
ssh-copy-id worldseo-deploy@server
```

### 2. 腳本執行

```bash
# 使用普通用戶執行
./one-click-deploy.sh

# 腳本內部自動處理權限
```

### 3. 服務管理

```bash
# 使用服務管理腳本
./service-manager.sh

# 或直接使用 systemctl
sudo systemctl status worldseo-api
```

### 4. 日誌查看

```bash
# 查看服務日誌
sudo journalctl -u worldseo-api -f

# 查看系統日誌
sudo tail -f /var/log/syslog
```

---

## 🔐 安全建議

### 1. 定期更新

```bash
# 更新系統
sudo apt update && sudo apt upgrade

# 更新專案
cd /www/worldseo
git pull origin main
```

### 2. 備份策略

```bash
# 執行備份
sudo /www/worldseo/backup.sh

# 檢查備份
ls -la /backup/worldseo/
```

### 3. 監控服務

```bash
# 檢查服務狀態
sudo systemctl status worldseo-*

# 查看資源使用
htop
df -h
```

---

## 📞 技術支援

如果遇到權限相關問題：

1. **檢查用戶身份**
   ```bash
   whoami
   id
   ```

2. **檢查 sudo 權限**
   ```bash
   sudo -l
   ```

3. **查看錯誤日誌**
   ```bash
   sudo journalctl -u worldseo-api -n 50
   ```

4. **重新設置權限**
   ```bash
   sudo chown -R www-data:www-data /www/worldseo
   sudo chmod -R 755 /www/worldseo
   ```

權限檢查機制確保了部署過程的安全性和穩定性！ 
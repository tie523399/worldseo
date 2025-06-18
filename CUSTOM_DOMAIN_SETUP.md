# 🌐 自訂域名設定指南

## 📋 設定步驟

### 步驟 1：準備域名

您需要一個域名才能使用自訂域名功能。如果您還沒有域名，可以從以下提供商購買：

- **Namecheap** (推薦)：https://www.namecheap.com
- **GoDaddy**：https://www.godaddy.com
- **Google Domains**：https://domains.google
- **Cloudflare**：https://www.cloudflare.com

### 步驟 2：設定 CNAME 記錄

在您的 DNS 提供商中設定以下 CNAME 記錄：

#### 選項 A：使用根域名
```
類型: CNAME
名稱: @ (或留空)
值: tie523399.github.io
TTL: 3600 (或自動)
```

#### 選項 B：使用 www 子域名
```
類型: CNAME
名稱: www
值: tie523399.github.io
TTL: 3600 (或自動)
```

#### 選項 C：使用子域名
```
類型: CNAME
名稱: worldseo (或其他子域名)
值: tie523399.github.io
TTL: 3600 (或自動)
```

### 步驟 3：更新 CNAME 文件

編輯 `deploy/CNAME` 文件，將您的域名填入：

```bash
# 範例：
yourdomain.com
# 或
www.yourdomain.com
# 或
worldseo.yourdomain.com
```

### 步驟 4：在 GitHub Pages 中設定

1. **前往 GitHub 倉庫**
   - 訪問：https://github.com/tie523399/worldseo

2. **進入 Settings > Pages**
   - 在 "Custom domain" 欄位輸入您的域名
   - 點擊 "Save"

3. **等待 DNS 傳播**
   - DNS 變更需要時間傳播（通常 5-30 分鐘）
   - 您可以使用 https://www.whatsmydns.net 檢查傳播狀態

### 步驟 5：啟用 HTTPS

GitHub Pages 會自動為自訂域名提供 HTTPS 憑證，但需要等待 DNS 傳播完成。

## 🔧 常見 DNS 提供商設定

### Namecheap
1. 登入 Namecheap 控制台
2. 選擇您的域名
3. 點擊 "Advanced DNS"
4. 添加 CNAME 記錄

### GoDaddy
1. 登入 GoDaddy 控制台
2. 選擇您的域名
3. 點擊 "DNS"
4. 添加 CNAME 記錄

### Cloudflare
1. 登入 Cloudflare 控制台
2. 選擇您的域名
3. 前往 "DNS" 標籤
4. 添加 CNAME 記錄

## 🛠️ 故障排除

### 問題 1：DNS 錯誤
**症狀**：網站無法訪問
**解決方案**：
- 檢查 CNAME 記錄是否正確設定
- 等待 DNS 傳播（最多 24 小時）
- 使用 https://www.whatsmydns.net 檢查

### 問題 2：HTTPS 錯誤
**症狀**：瀏覽器顯示安全警告
**解決方案**：
- 等待 GitHub 自動生成 SSL 憑證
- 確保 DNS 記錄正確指向 GitHub Pages

### 問題 3：404 錯誤
**症狀**：網站顯示 404 頁面
**解決方案**：
- 確認 GitHub Pages 已啟用
- 檢查部署是否成功
- 確認 CNAME 文件內容正確

## 📊 檢查清單

- [ ] 域名已購買
- [ ] CNAME 記錄已設定
- [ ] `deploy/CNAME` 文件已更新
- [ ] GitHub Pages 自訂域名已設定
- [ ] DNS 傳播已完成
- [ ] HTTPS 憑證已生效

## 🌟 完成後

您的網站將可以通過自訂域名訪問：
- `https://yourdomain.com` (如果使用根域名)
- `https://www.yourdomain.com` (如果使用 www)
- `https://worldseo.yourdomain.com` (如果使用子域名)

## 📞 支援

如果遇到問題：
1. 檢查 DNS 設定
2. 查看 GitHub Pages 設定
3. 等待 DNS 傳播
4. 聯繫域名提供商支援

---
© 2024 WorldSEO 專案團隊 
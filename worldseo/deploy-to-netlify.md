# Netlify 部署指南

## 部署步驟

### 1. 準備文件
確保以下文件都在專案根目錄：
- `index.html` - 主頁面
- `css/` - 樣式文件夾
- `js/` - JavaScript 文件夾
- `data/` - 數據文件夾
- `netlify.toml` - Netlify 配置
- `_redirects` - 重定向規則

### 2. 部署到 Netlify

#### 方法一：拖拽部署
1. 訪問 [https://app.netlify.com/drop](https://app.netlify.com/drop)
2. 將整個專案文件夾拖拽到頁面中
3. 等待部署完成

#### 方法二：Git 部署
1. 將專案推送到 GitHub/GitLab
2. 在 Netlify 中連接 Git 倉庫
3. 設置構建命令（留空）
4. 設置發布目錄為 `.`

### 3. 配置環境變量
在 Netlify 控制台中設置：
- `API_BASE_URL` - 後端 API 地址
- `SITE_URL` - 網站 URL

### 4. 更新 API 地址
修改 `js/main.js` 中的 API 基礎 URL：
```javascript
const API_BASE_URL = 'https://your-backend-api.com';
```

### 5. 自定義域名（可選）
1. 在 Netlify 控制台添加自定義域名
2. 配置 DNS 記錄
3. 啟用 HTTPS

## 注意事項

1. **後端 API**：需要單獨部署 FastAPI 後端到其他服務器
2. **CORS**：確保後端 API 允許 Netlify 域名的跨域請求
3. **環境變量**：在 Netlify 中設置必要的環境變量
4. **文件大小**：確保單個文件不超過 100MB

## 故障排除

### 常見問題
1. **API 404**：檢查 `_redirects` 文件配置
2. **CORS 錯誤**：檢查後端 CORS 設置
3. **路由問題**：確保 SPA 路由正確配置

### 檢查部署
1. 查看 Netlify 部署日誌
2. 檢查瀏覽器控制台錯誤
3. 測試 API 端點連接

## 性能優化

1. **圖片優化**：使用 WebP 格式
2. **代碼分割**：分離 CSS 和 JS
3. **緩存策略**：設置適當的緩存頭
4. **CDN**：利用 Netlify 的全球 CDN 
# 🚀 GitHub Pages 部署指南

## 📋 部署步驟

### 步驟 1：推送代碼到 GitHub
```bash
git add .
git commit -m "Add GitHub Pages deployment"
git push origin main
```

### 步驟 2：啟用 GitHub Pages

1. **前往 GitHub 倉庫**
   - 訪問您的 GitHub 倉庫頁面

2. **進入 Settings**
   - 點擊倉庫頁面頂部的 "Settings" 標籤

3. **找到 Pages 設定**
   - 在左側選單中點擊 "Pages"

4. **配置部署設定**
   - Source: 選擇 "Deploy from a branch"
   - Branch: 選擇 "gh-pages" (GitHub Actions 會自動創建)
   - Folder: 選擇 "/ (root)"
   - 點擊 "Save"

### 步驟 3：等待部署完成

- GitHub Actions 會自動運行部署工作流程
- 部署完成後，您的網站將在以下網址可用：
  - `https://[您的用戶名].github.io/[倉庫名稱]/`

## 🔧 自動部署配置

### GitHub Actions 工作流程
- 文件位置：`.github/workflows/deploy.yml`
- 觸發條件：推送到 main 分支時自動部署
- 部署目錄：`deploy/` 資料夾

### 重要文件
- `.nojekyll` - 告訴 GitHub Pages 不要使用 Jekyll
- `deploy/` - 包含所有網站文件
- `index.html` - 主頁面

## 🌐 自訂域名（可選）

如果您有自訂域名：

1. **在 GitHub Pages 設定中**
   - 在 "Custom domain" 欄位輸入您的域名
   - 點擊 "Save"

2. **在 DNS 提供商中**
   - 添加 CNAME 記錄指向 `[您的用戶名].github.io`

3. **更新工作流程文件**
   - 編輯 `.github/workflows/deploy.yml`
   - 在 `cname:` 欄位輸入您的域名

## 📊 部署狀態檢查

### 檢查 Actions
1. 前往倉庫的 "Actions" 標籤
2. 查看最新的部署工作流程
3. 確認狀態為綠色 ✓

### 檢查 Pages
1. 前往 "Settings" > "Pages"
2. 查看部署狀態
3. 確認顯示 "Your site is live at..."

## 🛠️ 故障排除

### 常見問題

**問題 1：404 錯誤**
- 解決方案：確保 `deploy/` 資料夾中有 `index.html`

**問題 2：樣式或腳本無法載入**
- 解決方案：檢查文件路徑是否正確

**問題 3：部署失敗**
- 解決方案：檢查 GitHub Actions 日誌

### 手動部署（備用方案）

如果自動部署失敗，可以手動部署：

1. **創建 gh-pages 分支**
```bash
git checkout -b gh-pages
```

2. **複製部署文件**
```bash
cp -r deploy/* .
```

3. **提交並推送**
```bash
git add .
git commit -m "Manual deployment"
git push origin gh-pages
```

## 🎯 部署完成後

您的網站將包含：
- 🌍 全球身份資料生成器
- 🎯 智能地址引擎
- 🌐 11種語言支援
- 📱 響應式設計
- 🔍 SEO 優化

---
© 2024 WorldSEO 專案團隊 
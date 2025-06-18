# WorldSEO Identity Generator - Windows PowerShell Upload Script
# This script will upload all files (except .env)

Write-Host "Starting WorldSEO Identity Generator upload..." -ForegroundColor Green

# Check if in correct directory
if (-not (Test-Path "main.py") -or -not (Test-Path "bot.py")) {
    Write-Host "Error: Please run this script in the project root directory" -ForegroundColor Red
    exit 1
}

# Create upload directory
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$UPLOAD_DIR = "worldseo-upload-$timestamp"
New-Item -ItemType Directory -Path $UPLOAD_DIR -Force | Out-Null

Write-Host "Creating upload directory: $UPLOAD_DIR" -ForegroundColor Yellow

# Copy all files (except .env)
Write-Host "Copying files..." -ForegroundColor Yellow

# Root directory files
Copy-Item "*.py" $UPLOAD_DIR -Force
Copy-Item "*.html" $UPLOAD_DIR -Force
Copy-Item "*.txt" $UPLOAD_DIR -Force
Copy-Item "*.md" $UPLOAD_DIR -Force
Copy-Item "*.json" $UPLOAD_DIR -Force
Copy-Item "*.toml" $UPLOAD_DIR -Force
Copy-Item "_redirects" $UPLOAD_DIR -Force
Copy-Item "deploy.sh" $UPLOAD_DIR -Force
Copy-Item ".gitignore" $UPLOAD_DIR -Force
Copy-Item "env.example" $UPLOAD_DIR -Force
Copy-Item "worldseo.db" $UPLOAD_DIR -Force
Copy-Item "news_fetcher.log" $UPLOAD_DIR -Force

# Copy directories
Copy-Item "css" $UPLOAD_DIR -Recurse -Force
Copy-Item "js" $UPLOAD_DIR -Recurse -Force
Copy-Item "data" $UPLOAD_DIR -Recurse -Force
Copy-Item "test-version" $UPLOAD_DIR -Recurse -Force

# Create file list
Write-Host "Generating file list..." -ForegroundColor Yellow
Get-ChildItem -Path $UPLOAD_DIR -Recurse -File | Sort-Object FullName | ForEach-Object { $_.FullName } | Out-File "$UPLOAD_DIR\FILES_LIST.txt" -Encoding UTF8

# Count files
$FILE_COUNT = (Get-ChildItem -Path $UPLOAD_DIR -Recurse -File).Count
$TOTAL_SIZE = "{0:N2} MB" -f ((Get-ChildItem -Path $UPLOAD_DIR -Recurse -File | Measure-Object -Property Length -Sum).Sum / 1MB)

Write-Host "Upload preparation completed!" -ForegroundColor Green
Write-Host "Statistics:" -ForegroundColor Cyan
Write-Host "   - File count: $FILE_COUNT" -ForegroundColor White
Write-Host "   - Total size: $TOTAL_SIZE" -ForegroundColor White
Write-Host "   - Upload directory: $UPLOAD_DIR" -ForegroundColor White
Write-Host ""
Write-Host "Included services:" -ForegroundColor Cyan
Write-Host "   Frontend static website (HTML/CSS/JS)" -ForegroundColor Green
Write-Host "   FastAPI backend service" -ForegroundColor Green
Write-Host "   Telegram Bot (Admin + Frontend)" -ForegroundColor Green
Write-Host "   News fetching service" -ForegroundColor Green
Write-Host "   SQLite database" -ForegroundColor Green
Write-Host "   Deployment configuration files" -ForegroundColor Green
Write-Host ""
Write-Host "Important notes:" -ForegroundColor Yellow
Write-Host "   - .env file has been excluded (contains sensitive info)" -ForegroundColor White
Write-Host "   - Need to create .env file before deployment" -ForegroundColor White
Write-Host "   - Refer to env.example for configuration" -ForegroundColor White
Write-Host ""
Write-Host "Ready to upload all files in $UPLOAD_DIR directory!" -ForegroundColor Green

# Open upload directory
Write-Host "Opening upload directory..." -ForegroundColor Yellow
Start-Process $UPLOAD_DIR 
#!/bin/bash

# 全球身份資料生成器 - 服務管理腳本
# 用於管理 FastAPI、Telegram Bot 和新聞抓取服務

APP_DIR="/www/worldseo"

# 顏色定義
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 顯示標題
show_header() {
    echo -e "${BLUE}"
    echo "=================================="
    echo "  全球身份資料生成器 - 服務管理"
    echo "=================================="
    echo -e "${NC}"
}

# 檢查服務狀態
check_service() {
    local service_name=$1
    local display_name=$2
    
    if systemctl is-active --quiet $service_name; then
        echo -e "  ${GREEN}✅ $display_name: 運行中${NC}"
    else
        echo -e "  ${RED}❌ $display_name: 已停止${NC}"
    fi
}

# 顯示所有服務狀態
show_status() {
    echo -e "${YELLOW}📊 服務狀態檢查：${NC}"
    check_service "worldseo-api" "FastAPI 後端服務"
    check_service "worldseo-bot" "Telegram Bot 服務"
    check_service "worldseo-news" "新聞抓取服務"
    check_service "nginx" "Nginx Web 服務器"
    echo ""
}

# 啟動服務
start_service() {
    local service_name=$1
    local display_name=$2
    
    echo -e "${YELLOW}🚀 啟動 $display_name...${NC}"
    sudo systemctl start $service_name
    sleep 2
    
    if systemctl is-active --quiet $service_name; then
        echo -e "${GREEN}✅ $display_name 啟動成功${NC}"
    else
        echo -e "${RED}❌ $display_name 啟動失敗${NC}"
        echo "請檢查日誌: sudo journalctl -u $service_name -n 20"
    fi
    echo ""
}

# 停止服務
stop_service() {
    local service_name=$1
    local display_name=$2
    
    echo -e "${YELLOW}🛑 停止 $display_name...${NC}"
    sudo systemctl stop $service_name
    echo -e "${GREEN}✅ $display_name 已停止${NC}"
    echo ""
}

# 重啟服務
restart_service() {
    local service_name=$1
    local display_name=$2
    
    echo -e "${YELLOW}🔄 重啟 $display_name...${NC}"
    sudo systemctl restart $service_name
    sleep 2
    
    if systemctl is-active --quiet $service_name; then
        echo -e "${GREEN}✅ $display_name 重啟成功${NC}"
    else
        echo -e "${RED}❌ $display_name 重啟失敗${NC}"
        echo "請檢查日誌: sudo journalctl -u $service_name -n 20"
    fi
    echo ""
}

# 查看日誌
view_logs() {
    local service_name=$1
    local display_name=$2
    
    echo -e "${YELLOW}📋 查看 $display_name 日誌 (按 Ctrl+C 退出)：${NC}"
    sudo journalctl -u $service_name -f
}

# 顯示菜單
show_menu() {
    echo -e "${YELLOW}🔧 請選擇操作：${NC}"
    echo "1. 查看所有服務狀態"
    echo "2. 啟動所有服務"
    echo "3. 停止所有服務"
    echo "4. 重啟所有服務"
    echo "5. 啟動單個服務"
    echo "6. 停止單個服務"
    echo "7. 重啟單個服務"
    echo "8. 查看服務日誌"
    echo "9. 查看系統資源"
    echo "10. 執行備份"
    echo "11. 更新專案"
    echo "0. 退出"
    echo ""
}

# 啟動所有服務
start_all_services() {
    echo -e "${YELLOW}🚀 啟動所有服務...${NC}"
    start_service "worldseo-api" "FastAPI 後端服務"
    start_service "worldseo-bot" "Telegram Bot 服務"
    start_service "worldseo-news" "新聞抓取服務"
    echo -e "${GREEN}✅ 所有服務啟動完成${NC}"
}

# 停止所有服務
stop_all_services() {
    echo -e "${YELLOW}🛑 停止所有服務...${NC}"
    stop_service "worldseo-news" "新聞抓取服務"
    stop_service "worldseo-bot" "Telegram Bot 服務"
    stop_service "worldseo-api" "FastAPI 後端服務"
    echo -e "${GREEN}✅ 所有服務已停止${NC}"
}

# 重啟所有服務
restart_all_services() {
    echo -e "${YELLOW}🔄 重啟所有服務...${NC}"
    restart_service "worldseo-api" "FastAPI 後端服務"
    restart_service "worldseo-bot" "Telegram Bot 服務"
    restart_service "worldseo-news" "新聞抓取服務"
    echo -e "${GREEN}✅ 所有服務重啟完成${NC}"
}

# 單個服務操作
single_service_operation() {
    local operation=$1
    local operation_name=$2
    
    echo -e "${YELLOW}選擇要${operation_name}的服務：${NC}"
    echo "1. FastAPI 後端服務 (worldseo-api)"
    echo "2. Telegram Bot 服務 (worldseo-bot)"
    echo "3. 新聞抓取服務 (worldseo-news)"
    echo "4. Nginx Web 服務器 (nginx)"
    echo "0. 返回主菜單"
    echo ""
    
    read -p "請選擇 (0-4): " choice
    
    case $choice in
        1)
            $operation "worldseo-api" "FastAPI 後端服務"
            ;;
        2)
            $operation "worldseo-bot" "Telegram Bot 服務"
            ;;
        3)
            $operation "worldseo-news" "新聞抓取服務"
            ;;
        4)
            $operation "nginx" "Nginx Web 服務器"
            ;;
        0)
            return
            ;;
        *)
            echo -e "${RED}❌ 無效選擇${NC}"
            ;;
    esac
}

# 查看系統資源
show_system_resources() {
    echo -e "${YELLOW}📊 系統資源使用情況：${NC}"
    echo ""
    
    echo -e "${BLUE}💾 記憶體使用：${NC}"
    free -h
    echo ""
    
    echo -e "${BLUE}💿 硬碟使用：${NC}"
    df -h
    echo ""
    
    echo -e "${BLUE}🔥 CPU 使用：${NC}"
    top -bn1 | grep "Cpu(s)" | awk '{print $2}' | cut -d'%' -f1
    echo ""
    
    echo -e "${BLUE}🌐 網路連接：${NC}"
    netstat -tlnp | grep :8000
    echo ""
}

# 執行備份
perform_backup() {
    echo -e "${YELLOW}💾 執行系統備份...${NC}"
    
    if [ -f "$APP_DIR/backup.sh" ]; then
        sudo $APP_DIR/backup.sh
        echo -e "${GREEN}✅ 備份完成${NC}"
    else
        echo -e "${RED}❌ 備份腳本不存在${NC}"
        echo "請先運行部署腳本創建備份功能"
    fi
    echo ""
}

# 更新專案
update_project() {
    echo -e "${YELLOW}🔄 更新專案...${NC}"
    
    if [ -d "$APP_DIR/.git" ]; then
        cd $APP_DIR
        sudo git pull origin main
        echo -e "${GREEN}✅ 專案更新完成${NC}"
        echo -e "${YELLOW}⚠️  請重啟服務以應用更新${NC}"
    else
        echo -e "${RED}❌ 專案目錄不是 Git 倉庫${NC}"
    fi
    echo ""
}

# 主程序
main() {
    while true; do
        show_header
        show_status
        show_menu
        
        read -p "請選擇操作 (0-11): " choice
        echo ""
        
        case $choice in
            1)
                show_status
                ;;
            2)
                start_all_services
                ;;
            3)
                stop_all_services
                ;;
            4)
                restart_all_services
                ;;
            5)
                single_service_operation "start_service" "啟動"
                ;;
            6)
                single_service_operation "stop_service" "停止"
                ;;
            7)
                single_service_operation "restart_service" "重啟"
                ;;
            8)
                single_service_operation "view_logs" "查看日誌"
                ;;
            9)
                show_system_resources
                ;;
            10)
                perform_backup
                ;;
            11)
                update_project
                ;;
            0)
                echo -e "${GREEN}👋 再見！${NC}"
                exit 0
                ;;
            *)
                echo -e "${RED}❌ 無效選擇，請重新輸入${NC}"
                ;;
        esac
        
        if [ $choice -ne 0 ]; then
            read -p "按 Enter 鍵繼續..."
            clear
        fi
    done
}

# 檢查是否為 root 用戶
if [ "$EUID" -eq 0 ]; then
    echo -e "${RED}❌ 請不要使用 root 用戶執行此腳本${NC}"
    echo "請使用具有 sudo 權限的普通用戶"
    exit 1
fi

# 檢查應用目錄是否存在
if [ ! -d "$APP_DIR" ]; then
    echo -e "${RED}❌ 應用目錄不存在: $APP_DIR${NC}"
    echo "請先運行部署腳本"
    exit 1
fi

# 運行主程序
main 
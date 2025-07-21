# 音樂平台

一個基於 Free Music Archive API 的音樂播放器，使用 Cloudflare Pages 和 Workers 部署，支援搜索功能。

## 功能
- 動態加載 FMA 免版權音樂。
- 支援按歌曲名稱或流派搜索。
- 使用 Cloudflare Workers 緩存 API 響應，提升性能。
- 響應式設計，支援桌面和移動設備。

## 目錄結構
- `/public/`: 靜態文件（HTML、CSS、JS）。
- `/workers/`: Workers 腳本，手動複製到 Cloudflare 控制台。
- `/audio/`: 可選，靜態音頻文件。

## 部署步驟
1. 將倉庫推送到 GitHub。
2. 在 Cloudflare Pages 連接到 GitHub 倉庫，設置輸出目錄為 `public`。
3. 在 Cloudflare 控制台創建 Workers，複製 `fma-api-cache.js` 內容。
4. 更新 `main.js` 中的 Workers URL。
5. 訪問 `*.pages.dev` 測試搜索和播放功能。

## 許可
音樂來自 [Free Music Archive](https://freemusicarchive.org)，遵守 CC 許可。

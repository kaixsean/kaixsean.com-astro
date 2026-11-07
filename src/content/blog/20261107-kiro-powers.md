---
title: "Kiro powers：讓 AI Agent 需要時才變專家"
excerpt: "前陣子去參加Amazon Summit 2026，聽了 Kiro 推出的新功能 powers，官方的說法是：透過共享最佳實踐，擴展 Kiro agent 的能力。看完之後覺得，這個方向蠻值得記一下的。"
publishDate: "2026-11-07T00:00:00.000Z"
category: "technology"
author: "kaixsean"
image: "/images/2026/kiro-powers/introducing-kiro-powers.jpg"
tags: ["Dev"]
---

前陣子去參加Amazon Summit 2026，聽了 Kiro 推出的新功能 powers，官方的說法是：透過**共享最佳實踐**，擴展 Kiro agent 的能力。看完之後覺得，這個方向蠻值得記一下的。

![Introducing Kiro powers](/images/2026/kiro-powers/introducing-kiro-powers.jpg)

## 原本的痛點

用 AI agent 寫程式一陣子，大概都會遇到兩個問題。

第一個是 AI 只能用猜的。在缺少框架、缺少背景知識的情況下，AI 其實跟人一樣，碰到從沒接觸過的東西，只能自己去讀文件，然後不斷 try and error，改了再試、試了再改，直到結果正確為止。

第二個是 context 太多，agent 變慢。現在大家很習慣一次掛好幾支 MCP，但光是 5 支 MCP，可能就要吃掉 50,000 以上的 token，還沒開始做事，context 就先塞滿一大半了。

## 現在的做法太分散

目前要讓 agent 變得更好用，大概會用到這幾種東西：

- **MCP servers**：讓 agent 能用工具，但每個 client 都要各自設定
- **Skills**：放指令和工作流程，但目前偏 Claude 專用
- **Dynamic tool loading**：管理 context，要另外設定
- **Rules 和 custom instructions**：規範 agent 的行為，像 `.cursorrules` 這種，每個 client 也都不一樣

問題是這些檔案各自分散，換一個平台就要重新設定一次，蠻麻煩的。

## Kiro powers 做了什麼

簡單說，Kiro powers 把 MCP 和框架知識打包在一起，而且是**動態載入 context**，需要用到某個技術的時候，才即時把那份專業知識載進來。

![Kiro powers how they work](/images/2026/kiro-powers/kiro-powers-how-they-work.jpg)

傳統做法是一開始就把所有工具一次載入，context 很快就膨脹，agent 也跟著變慢。powers 則是靠關鍵字觸發，只有真的需要的時候才載入，切換到別的情境時就自動停止作用。這樣 agent 只會拿到當下最關鍵的資訊，context 不會一直變大，反應速度也維持得住。

## 一個 power 裡面有什麼

一個 power 主要由三個部分組成。

![What is inside a power](/images/2026/kiro-powers/what-is-inside-a-power.jpg)

**power.md** 是入口檔案，定義這個 power 有哪些工具、什麼時候該用，同時也是 steering file 的入口。開頭會有一段描述和關鍵字，像 Supabase 的 power 大概長這樣：

```yaml
name: supabase
displayName: Supabase with local CLI
description: Build fullstack applications with Supabase's Postgres database, authentication, storage, and real-time subscriptions
keywords: [database, postgres, auth, storage, realtime, backend, supabase, rls]
```

agent 就是靠這些 keywords 判斷什麼時候要把這個 power 叫出來。

**MCP.json** 放 MCP 相關設定，像環境變數、API keys 這些，也負責管理 CLI 工具的初始化和呼叫。以 Supabase 的 power 來說，它會先檢查 Docker Desktop 和 Supabase CLI 有沒有裝好、能不能跑，沒裝好就不往下做。接著還會幫你加一個 hook，之後只要手動觸發，agent 就會去檢查資料庫的效能和安全性。

**Steering** 放相關規範，而且只在當下的任務觸發時才載入，讓 agent 專注在正在做的事情上。例如 Supabase 的 power 會寫清楚：建資料庫時讀哪份、寫 SQL 時讀哪份、設定 RLS policy 時又讀哪份。不相干的規範，就不會被載進來佔空間。

![Power directory structure](/images/2026/kiro-powers/power-directory-structure.jpg)

## 生態系

我覺得 powers 比較有意思的是安裝和分享的部分：

- 一鍵安裝，第一次用到時會問你要不要啟用，不用自己寫 json config 或下 command line
- power 可以來自合作夥伴、社群，也可以自己做
- 透過分享，每個人都能拿到一樣的專業知識和工具

![Browse powers](/images/2026/kiro-powers/browse-powers.jpg)

## 實際試一下

我自己也實際跑了一次，做一個即時查天氣的 React 網頁，再用 Netlify 的 power 部署上線：

1. 先建一個可以即時查詢天氣的 React web app

![Weather React app](/images/2026/kiro-powers/weather-react-app.png)

2. 在 Kiro 裡一鍵啟用 Netlify 的 power，然後直接跟 agent 說：「Deploy my react app to Netlify」

![Netlify power in Kiro](/images/2026/kiro-powers/netlify-power-in-kiro.png)

3. 授權 Netlify CLI 存取我的帳號，讓 Kiro 可以連到雲端帳戶
4. 部署完成，打開網址就看到網頁已經在 Netlify 上跑起來了

![Deployed on Netlify](/images/2026/kiro-powers/deployed-on-netlify.png)

整個過程我沒有去查 Netlify 的文件，也沒有手動設定 MCP，就是一句話叫 agent 部署，它自己知道該怎麼做。

## 小結

以前要讓 agent 懂一個新技術，要嘛自己貼一大堆文件給它，要嘛掛一堆 MCP 把 context 撐爆。powers 的思路是把專業知識打包、需要時才載入，用完就放掉，使用上更簡單。相關整理：[從 Prompt 到 Harness Engineering：當 AI 開始自己動](/blog/20261107-harness-engineering/)。

## 參考資料

1. [Introducing Kiro powers](https://kiro.dev/blog/introducing-powers/)
2. [Kiro Powers: Empower your AI Agents with Specialized Expertise](https://youtu.be/M46PSAXpMfA)
3. [Kiro Powers for Beginners - Step by Step Guide](https://www.youtube.com/watch?v=O5OoifJoGmM)
4. Amazon Summit：Introducing Kiro powers: AI agent specialization on demand

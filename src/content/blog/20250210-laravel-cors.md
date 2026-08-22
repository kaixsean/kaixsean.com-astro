---
title: "Laravel CORS 設定"
excerpt: "探討如何設定 Laravel CORS"
publishDate: "2025-02-10T00:00:00.000Z"
category: "technology"
author: "kaixsean"
image: "https://img.kaixsean.com/2025/mohammad.jpg"
tags: ["Laravel"]
---

## 什麼是 CORS

CORS(Cross-Origin Resource Sharing)，因為同源政策，當前端發送 Request 跟伺服器要資料時，若不是在相同的網域、相同的協定以及相同的連接阜下，就會發生錯誤。

這時候瀏覽器會發送跨域請求，伺服器會回應 CORS 的 Header，告訴瀏覽器可以存取哪些資源。

跨域請求分成簡單請求(Simple Request)和預檢請求(Preflight Request)。

## 簡單請求

簡單請求(Simple Request)，只會發送 GET、POST、HEAD 這三種方法，

## 預檢請求

預檢請求(Preflight Request)，會發送 OPTIONS 方法，詢問伺服器是否可以存取該資源。
成功後再送一次真正的請求。

## 設定 CORS

Laravel 在 8 以下使用 fruitcake/laravel-cors，在 9 之後則整合到框架中。

### fruitcake/laravel-cors 設定方式：

需要先安裝 `fruitcake/laravel-cors` 套件

```bash
composer require fruitcake/laravel-cors
```

```php
// app/Http/Kernel.php

protected $middleware = [
    \Fruitcake\Cors\HandleCors::class,
];
```

```php
// config/cors.php

return [
    'paths' => ['*'],
];
```

### Laravel cors 設定方式：

直接在 config/cors.php 設定 就可以了

```php
// config/cors.php

return [
    'paths' => ['*'],
];
```

## 結論

選擇使用 Laravel 的 cors 設定方式，比較簡單，也可以設定只允許特定路徑或是允許多個網域，並且方便統一管理。
但若要再更進一步設定，像是針對使用者做動態設定等更細部的設定，就需要手動寫更複雜的 middleware 了。

## 參考資料

- [CORS 是什麼? 為什麼要有 CORS？](https://www.explainthis.io/zh-hant/swe/what-is-cors)
- [CORS 完全手冊（三）：CORS 詳解](https://blog.huli.tw/2021/02/19/cors-guide-3/)
- [CORS Middleware for Laravel](https://github.com/fruitcake/laravel-cors)
- [解決CORS跨域Access-Control-Allow-Origin問題](https://www.jashong.tw/blog/478ebfFlglkiCqiKEBHIKToUJxyUHTKnDiGDFfHiGHhDk)
- [Laravel 設定 CORS](https://vocus.cc/article/6041fbe8fd89780001e1e8d8)

# ROC 身分證照片產生器

輸入一張照片，自動裁切出符合[身分證照片規範](http://www.ris.ntpc.gov.tw/_file/1392/SG/23594/D.html)的圖片。

## 開發

在 console 打：

```
npm start
```

會使用 webpack-dev-server 在 `0.0.0.0:5000` 開啓 web server，並且有 live reload 功能。

## 部署到 github pages

若您的 git remote origin 是 Github 且您有寫入權限，則在 console 打：

```
npm run deploy
```

會自動以您目前的 branch 做 build + push 到 gh-pages branch。

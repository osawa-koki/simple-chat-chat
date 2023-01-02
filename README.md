# simple-chat-chat

Firebase(Cloud Firestore)を使用した簡単なチャットアプリ。  

![成果物](./.development/img/fruit.gif)  

## 開発環境

| 機能 | バージョン |
| ---- | ---- |
| Windows | 11 Home |
| firebase | 11.19.0 |
| Node.js | 19.3.0 |

## 実行方法

```shell
# モジュールのインストール
yarn

# デバグ用実行
yarn dev

# ビルド
yarn generate
```

## 補足

`firebase init`でプロジェクトを初期化しようとすると`Error: It looks like you haven't used Cloud Firestore in this project before. Go to https://console.firebase.google.com/project/octo-campus/firestore to create your Cloud Firestore database.`というエラーが発生。  

GCPのデフォルトロケーションを設定すれば直るという記事を見かけたが直らず、、、  

パソコンを再起動したら直った。  
絶対にこれが解決理由ではないけど、、、笑  

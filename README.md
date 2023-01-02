# simple-chat-chat

Firebase(Cloud Firestore)を使用した簡単なチャットアプリ。  

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

結局設定ファイルをそのまま作成することで解決した。  

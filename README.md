<br>
<br>
<div align="center">
  <a href="https://valorantfinder.com"><img src="https://user-images.githubusercontent.com/101544784/217406559-db250de3-35a8-4d08-b0ec-b3cc9576187a.png" /></a>
</div>
<br>
<br>

<img src="https://img.shields.io/badge/react-v18.0.0-green">

「VALORANT FINDER」のフロントエンドのリポジトリになります。

バックエンドのリポジトリは[こちら](https://github.com/ptr-ito/VALORANT-Finder-Backend)

## 🌐 App URL

[**https://valorantfinder.com**](https://valorantfinder.com)

## サービス概要

無料オンライン FPS『**VALORANT**』で一緒に遊べるフレンドやチームと出会える募集サービス

❓『**VALORANT**』とは？
VALORANT は、Riot Games が開発、公開する 5 対 5 のキャラクター制タクティカル・ファーストパーソン・シューティングゲームです。
5 人 1 組でチームを組み、攻撃側はスパイクと呼ばれる爆弾を設置して起爆、防衛側はスパイク設置を阻止、または設置されたスパイクを解除するというルールです。

  
  
このサービスでは、多様なプレイスタイルにマッチできるように事前に詳細な募集項目やユーザーの情報を知ることができるので、
  
- SNS の募集から参加したけど思っていた雰囲気と違う...
- 誰かと一緒にプレイしてみたいけど中々踏み出せない...
- 自分のランクと合っているか不安...

などの悩みを解消するサポートが出来ます。

## 実装機能一覧

#### 認証

- 新規登録 / ログイン機能

#### メイン機能

- マイページ機能
  - ユーザープロフィール
  - 投稿履歴
- 募集の 投稿 / 削除 / 編集 機能
  - マッチ（対戦）の募集
- Twitter シェア機能
  - 各モードに合わせたハッシュタグ
- コメント機能
- ユーザー詳細機能

## 実装予定機能

- ソーシャルログイン機能（Google）
- コメント通知機能
- フレンド募集機能
  - 投稿 / 削除 / 編集
- チーム募集機能
  - 投稿 / 削除 / 編集

## 使用技術一覧

### :small_red_triangle_down: バックエンド

- Ruby 3.1.2
- Ruby on Rails 7.0.4

### :small_red_triangle_down: 主要 Gem

- Devise Token Auth
- JWT
- CarrierWave
- Fog AWS
- JSON:API serializer
- ActiveHash
- Rubocop

### :small_red_triangle_down: フロントエンド

- React.js 18.2.0
- TypeScript 4.6.4
- Vite 3.2.3

### :small_red_triangle_down: 主要ライブラリ

- React Router 6.4.3
- ReactHookForm
- Axios
- MUI
- Zod(validation)
- Emotion
- Eslint
- Prettier

### :small_red_triangle_down: インフラ・開発環境

- Docker/docker-compose
- MySQL 8.0.31
- GitHub Actions
- Firebase Hosting(フロントエンドのホスティングで利用)
- Coolify（バックエンドのデプロイで利用）

## ER 図

![ER_figure_drawio](https://user-images.githubusercontent.com/101544784/217416315-3b4dab56-fe3b-443d-9266-4c4520112b47.png)

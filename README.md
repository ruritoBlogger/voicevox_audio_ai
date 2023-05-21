# VoiceVox Audio AI

![image](/public/chat_zundamon.png)

> 上記画像では、東北ずん子・ずんだもんプロジェクトで配布されているイラストを利用しています。

### 概要

VoiceVox + ChatGPT を用いて会話が出来るような web サイトです(予定)

### 開発環境

```bash
# コンテナの生成
$ docker compose build

# コンテナの起動
$ docker compose up -d

# prisma の migrate
$ docker compose run --rm app yarn prisma:migrate

# prisma の studio を起動
$ docker compose run --rm app yarn prisma:studio

# prisma の seed データの挿入
$ docker compose run --rm app yarn prisma:seed
```

### 利用している画像について

本プロジェクトで利用しているずんだもんの画像については、
東北ずん子・ずんだもんプロジェクトで配布されているイラストを一部切り出して利用しています。
    
[東北ずん子・ずんだもんプロジェクト](https://zunko.jp/)
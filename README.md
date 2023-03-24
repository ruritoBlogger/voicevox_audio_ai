# VoiceVox Audio AI

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
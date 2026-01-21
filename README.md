# totp_hands_on_lesson

TOTP(Time-based One Time Password)の講義のために作成したハンズオン資料。受講者が演習に必要なアセットを統一管理している。

## 含まれるスクリプト

node.js上で動作するいくつかの演習用スクリプトを用意している。

### sha1.js

SHA-1ハッシュ関数。crypto標準ライブラリをそのまま使用している。

**使用方法:**

```bash
pnpm run sha1 "入力文字列"
```

### hmac.js

今回の中心的関数であるHMAC-SHA1。sha1.jsをもとに自前で実装している。

**使用方法:**

```bash
pnpm run hmac "秘密鍵(16進数)" "メッセージ"
```

### generateTOTPQR.js

TOTP登録用のQRコード生成スクリプト。URIを組み立ててQRコードに起こすだけ。

```bash
pnpm run generateTOTPQR "秘密鍵(16進数)"
```

リポジトリには秘密鍵を`1cb4db01`としたときの例を上げている。

![TOTP用のQRコード](./totp_qr.png)

## 教材

[Google Slide](https://docs.google.com/presentation/d/103wLq3QEV9uA4aWMsLSqcLe-p2LZll2_gly00ZT9jvM/edit?usp=sharing)

const { hmacSha1Bytes } = require('./hmac');

/**
 * タイムステップからTOTPコード生成直前の数値を計算する
 * @param {string} key - 秘密鍵(16進数文字列)
 * @param {number} timeStep - タイムステップ（数値）
 * @returns {number} 桁数切り捨て直前の10進数
 */
function totpStep(key, timeStep) {
  // 1. タイムステップを8バイト（16桁）のビッグエンディアン形式のBufferに変換
  const timeStepBuffer = Buffer.allocUnsafe(8);
  timeStepBuffer.writeUInt32BE(0, 0); // 上位4バイトは0
  timeStepBuffer.writeUInt32BE(timeStep, 4); // 下位4バイトにタイムステップ

  // 2. HMACのメッセージにタイムステップを入れ、ハッシュ値を出す
  const hmacHex = hmacSha1Bytes(key, timeStepBuffer);
  const hmacBuffer = Buffer.from(hmacHex, 'hex');

  // 3. ハッシュ値を切り捨てる計算を行う
  // a. 末尾4ビット(1桁)を10進数にする
  const offset = hmacBuffer[19] & 0x0f; // 最後のバイト（19番目）の下位4ビット

  // b. 0番目スタートで<a.の結果>バイト目から4バイト(8桁)取ってくる
  const binary = (hmacBuffer[offset] & 0x7f) << 24 |  // c. 最上位ビットを0にする
                 (hmacBuffer[offset + 1] & 0xff) << 16 |
                 (hmacBuffer[offset + 2] & 0xff) << 8 |
                 (hmacBuffer[offset + 3] & 0xff);

  // d. c.を10進数にする（既に10進数なのでそのまま返す）
  return binary;
}

module.exports = { totpStep };

// CLI実行時の処理
if (require.main === module) {
  const key = process.argv[2];
  const timeStep = process.argv[3];
  if (!key || !timeStep) {
    console.error('Usage: node totp.js <key> <timeStep>');
    process.exit(1);
  }
  const result = totpStep(key, Number(timeStep));
  console.log(result);
}

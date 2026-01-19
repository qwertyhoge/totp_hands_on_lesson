const { sha1 } = require('./sha1');
/**
 * HMAC-SHA1を生成する
 * WARNING: 実運用では自前で実装せずHMACライブラリを直接使用すべき
 * @param {string} key - 秘密鍵(16進数文字列)
 * @param {string} message - メッセージ(文字列)
 * @returns {string} HMAC-SHA1値（16進数文字列）
 */
function hmacSha1(key, message) {
  const normalizeKey = (key) => {
    const keyBuffer = Buffer.from(key, 'hex');
    // キー長が64バイトを超える場合はエラー
    if (keyBuffer.length > 64) {
      throw new Error('Key length must be less than 64 bytes');
    }

    // キー長が64未満であれば0埋めして64バイトにする
    return Buffer.concat([keyBuffer, Buffer.alloc(64 - keyBuffer.length)]);
  };

  const normalizedKey = normalizeKey(key);

  // ビットマスクを作成
  const iPad = Buffer.alloc(64, 0x36);
  const opad = Buffer.alloc(64, 0x5c);

  // ビットマスクにより部分的に反転したキーを作成
  // Bufferにxorを通す方法が存在しないので、各バイトにxorを通してBuffer化
  const iMaskedKey = Buffer.from(normalizedKey.map((byte, index) => byte ^ iPad[index]));
  const oMaskedKey = Buffer.from(normalizedKey.map((byte, index) => byte ^ opad[index]));

  // 内側のハッシュを作成
  const innerInput = Buffer.concat([iMaskedKey, Buffer.from(message)]);
  const innerHash = Buffer.from(sha1(innerInput), 'hex');

  // 外側のハッシュを作成
  const outerInput = Buffer.concat([oMaskedKey, innerHash]);
  const outerHashHex = sha1(outerInput);

  return outerHashHex;
}

module.exports = { hmacSha1 };

// CLI実行時の処理
if (require.main === module) {
  const key = process.argv[2];
  const message = process.argv[3];
  if (!key || !message) {
    console.error('Usage: node hmac.js <key> <message>');
    process.exit(1);
  }
  const result = hmacSha1(key, message);
  console.log(result);
}

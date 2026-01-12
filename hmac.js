/**
 * HMAC-SHA1を生成する
 * WARNING: 実運用では自前で実装せずHMACライブラリを直接使用すべき
 * @param {string} message - メッセージ
 * @param {string} key - 秘密鍵
 * @returns {string} HMAC-SHA1値（16進数文字列）
 */
function hmacSha1(message, key) {
  // TODO: 実装
}

module.exports = { hmacSha1 };

// CLI実行時の処理
if (require.main === module) {
  const message = process.argv[2];
  const key = process.argv[3];
  if (!message || !key) {
    console.error('Usage: node hmac.js <message> <key>');
    process.exit(1);
  }
  const result = hmacSha1(message, key);
  console.log(result);
}

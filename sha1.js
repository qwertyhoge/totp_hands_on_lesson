const crypto = require('crypto');

/**
 * SHA-1ハッシュを生成する
 * @param {string} input - ハッシュ化する文字列
 * @returns {string} SHA-1ハッシュ値（16進数文字列）
 */
function sha1(input) {
  return crypto.createHash('sha1').update(input).digest('hex');
}

module.exports = { sha1 };

// CLI実行時の処理
if (require.main === module) {
  const input = process.argv[2];
  if (!input) {
    console.error('Usage: node sha1.js <input>');
    process.exit(1);
  }
  const result = sha1(input);
  console.log(result);
}

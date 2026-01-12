/**
 * 16進数文字列を10進数に変換する
 * @param {string} hexString - 16進数文字列
 * @returns {number} 10進数値
 */
function hexToDec(hexString) {
  // TODO: 実装
}

module.exports = { hexToDec };

// CLI実行時の処理
if (require.main === module) {
  const hexString = process.argv[2];
  if (!hexString) {
    console.error('Usage: node hexToDec.js <hexString>');
    process.exit(1);
  }
  const result = hexToDec(hexString);
  console.log(result);
}

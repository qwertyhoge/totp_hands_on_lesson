/**
 * 16進数文字列を数値に変換する
 * @param {string} hexString - 16進数文字列
 * @returns {number} 数値
 */
function hexToNumber(hexString) {
  return parseInt(hexString, 16);
}

module.exports = { hexToNumber };

// CLI実行時の処理
if (require.main === module) {
  const hexString = process.argv[2];
  if (!hexString) {
    console.error('Usage: node hexToNumber.js <hexString>');
    process.exit(1);
  }
  const result = hexToNumber(hexString);
  console.log(result);
}

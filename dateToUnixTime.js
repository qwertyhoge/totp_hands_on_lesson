/**
 * 日時文字列（JST確定）からUnix時刻を割り出す
 * @param {string} dateString - 日時文字列（例: "2024-01-01T12:00:00"）
 * @returns {number} Unix時刻（秒単位）
 */
function dateToUnixTime(dateString) {
  // ISO 8601形式に変換
  const isoString = dateString + '+09:00';
  const date = new Date(isoString);

  // Unix時刻に変換
  return Math.floor(date.getTime() / 1000);
}

module.exports = { dateToUnixTime };

// CLI実行時の処理
if (require.main === module) {
  const dateString = process.argv[2];
  if (!dateString) {
    console.error('Usage: node dateToUnixTime.js <dateString>');
    process.exit(1);
  }
  const result = dateToUnixTime(dateString);
  console.log(result);
}

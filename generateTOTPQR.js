const qrcode = require('qrcode');
const base32Encode = require('base32-encode').default;

function generateTOTPQR(secret) {
  const secretBuffer = Buffer.from(secret, 'hex');
  console.log(secretBuffer);
  const encoded = base32Encode(secretBuffer, 'RFC4648');
  console.log(encoded);
  const uri = `otpauth://totp/cood.gh47@hotmail.co.jp?secret=${encoded}&issuer=qwertyhoge-totp-lesson&algorithm=SHA1&digits=6&period=30`;
  qrcode.toFile('totp_qr.png', uri);
  console.log(uri);
}

module.exports = { generateTOTPQR };

// CLI実行時の処理
if (require.main === module) {
  const secret = process.argv[2];
  if (!secret) {
    console.error('Usage: node generateTOTPQR.js <secret>');
    process.exit(1);
  }
  const result = generateTOTPQR(secret);
  console.log(result);
}

LCD = require("./lcd")


var exports = module.exports = {};

lcd = new LCD("/dev/i2c-1", 0x27)
lcd.init()
.then( ->
  return lcd.createChar(0, [
    0x1b, 0x15, 0x0e, 0x1b,
    0x15, 0x1b, 0x15, 0x0e
  ])
).then( ->
  return lcd.createChar(1, [
    0x0c, 0x12, 0x12, 0x0c
    0x00, 0x00, 0x00, 0x00
  ])
)
.then( -> lcd.home() )
.then( -> lcd.print("Raspberry Pi #{String.fromCharCode(0)}") );

/*
 * Sets the Mesage displayed on the LCD
 *
 * @param     msg(String)
 */
exports.setLCDMesage = function(msg) {
  lcd.print(msg);
};

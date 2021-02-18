function hexStr2byteArray(str) {
  var byteArray = Array();
  var d = 0;
  var j = 0;
  var k = 0;

  for (let i = 0; i < str.length; i++) {
    var c = str.charAt(i);
    if (isHexChar(c)) {
      d <<= 4;
      d += hexChar2byte(c);
      j++;
      if (0 === j % 2) {
        byteArray[k++] = d;
        d = 0;
      }
    }
  }
  return byteArray;
}

/* Convert a hex char to value */
function hexChar2byte(c) {
  var d = 0;
  if (c >= "A" && c <= "F") {
    d = c.charCodeAt(0) - "A".charCodeAt(0) + 10;
  } else if (c >= "a" && c <= "f") {
    d = c.charCodeAt(0) - "a".charCodeAt(0) + 10;
  } else if (c >= "0" && c <= "9") {
    d = c.charCodeAt(0) - "0".charCodeAt(0);
  }
  return d;
}

function isHexChar(c) {
  if (
    (c >= "A" && c <= "F") ||
    (c >= "a" && c <= "f") ||
    (c >= "0" && c <= "9")
  ) {
    return 1;
  }
  return 0;
}

/* Convert a byte to string */
function byte2hexStr(byte) {
  var hexByteMap = "0123456789ABCDEF";
  var str = "";
  str += hexByteMap.charAt(byte >> 4);
  str += hexByteMap.charAt(byte & 0x0f);
  return str;
}

function byteArray2hexStr(byteArray) {
  var str = "";
  for (var i = 0; i < byteArray.length - 1; i++) {
    str += byte2hexStr(byteArray[i]);
  }
  str += byte2hexStr(byteArray[i]);
  return str;
}

module.exports = {
  hexStr2byteArray,
  byteArray2hexStr,
};

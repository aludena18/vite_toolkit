// Returns a string separating the bytes by one space
export const stringSpaced = function (str) {
  let dataString = "";
  for (let i = 0; i < str.length; i++) {
    i % 2 === 0
      ? (dataString = dataString + " " + str[i])
      : (dataString = dataString + str[i]);
  }
  return dataString.trim();
};

// Returns a fixed size array of string hex bytes from a number
export function numToFixedSizeArr(val, arrNumBytes) {
  const hexArr = [];
  const numHexStr = val.toString(16);
  const tempArr =
    numHexStr.length % 2 === 1
      ? ["0", ...numHexStr.split("")]
      : [...numHexStr.split("")];

  const tempArrLen = tempArr.length;
  for (let i = 0; i < tempArrLen / 2; i++) {
    hexArr.push(tempArr.splice(0, 2).join(""));
  }

  const hexArrLen = hexArr.length;
  for (let i = 0; i < arrNumBytes - hexArrLen; i++) {
    hexArr.unshift("00");
  }
  return hexArr;
}

// Retunr CRC 16 IBM - https://www.lddgo.net/en/encrypt/crc
export function getCRC16(buffer) {
  // let crc = 0xffff;
  let crc = 0x0000;
  let odd;

  for (let i = 0; i < buffer.length; i++) {
    crc = crc ^ buffer[i];

    for (let j = 0; j < 8; j++) {
      odd = crc & 0x0001;
      crc = crc >> 1;
      if (odd) {
        crc = crc ^ 0xa001;
      }
    }
  }

  return crc;
}

// Return CRC 16 CCITT - https://www.lddgo.net/en/encrypt/crc
export const crc16ccitt = (regInit, message) => {
  if (typeof message === "undefined") {
    message = regInit;
    regInit = 0x0000;
  }

  if (typeof message === "string") {
    message = message.split("").map((c) => c.charCodeAt(0));
    // console.log(message);
  }

  // Binary input reverse
  const binArrInput = message.map((num) => mirror_nbits(8, num));
  const input = binArrInput;

  let crc = regInit + 0;
  const polynomial = 0x1021;

  for (const b of input) {
    for (let i = 0; i < 8; i++) {
      const bit = ((b >> (7 - i)) & 1) === 1;
      const c15 = ((crc >> 15) & 1) === 1;
      crc <<= 1;
      if (c15 ^ bit) crc ^= polynomial;
    }
  }
  crc &= 0xffff;

  // Binary output reverse
  const output = mirror_nbits(16, crc);

  return output;
};

// Return CRC 16 CCITT - https://www.lddgo.net/en/encrypt/crc
export const crc16_ccitt = (message) => {
  // console.log(message);
  const polynomial = 0x1021;
  const initialValue = 0x0000;
  const reverseRefIn = true;
  const reverseRefOut = true;

  // Binary input reverse
  const binArrInput = reverseRefIn
    ? message.map((num) => mirror_nbits(8, num))
    : message;
  const input = binArrInput;

  let crc = initialValue + 0;
  for (const b of input) {
    for (let i = 0; i < 8; i++) {
      const bit = ((b >> (7 - i)) & 1) === 1;
      const c15 = ((crc >> 15) & 1) === 1;
      crc <<= 1;
      if (c15 ^ bit) crc ^= polynomial;
    }
  }
  crc &= 0xffff;

  // Binary output reverse
  const output = reverseRefOut ? mirror_nbits(16, crc) : crc;

  return output;
};

// Return CRC 16 IBM - https://www.lddgo.net/en/encrypt/crc
export const crc16_ibm = (message) => {
  // console.log(message);
  const polynomial = 0x8005;
  const initialValue = 0x0000;
  const reverseRefIn = true;
  const reverseRefOut = true;

  // Binary input reverse
  const binArrInput = reverseRefIn
    ? message.map((num) => mirror_nbits(8, num))
    : message;
  const input = binArrInput;

  let crc = initialValue + 0;
  for (const b of input) {
    for (let i = 0; i < 8; i++) {
      const bit = ((b >> (7 - i)) & 1) === 1;
      const c15 = ((crc >> 15) & 1) === 1;
      crc <<= 1;
      if (c15 ^ bit) crc ^= polynomial;
    }
  }
  crc &= 0xffff;

  // Binary output reverse
  const output = reverseRefOut ? mirror_nbits(16, crc) : crc;

  return output;
};

// Return CRC 16 X25 - https://www.lddgo.net/en/encrypt/crc
export const crc16_x25 = (message) => {
  const polynomial = 0x1021;
  const initialValue = 0xffff;
  const xorOut = 0xffff;
  const reverseRefIn = true;
  const reverseRefOut = true;

  // Binary input reverse
  const binArrInput = reverseRefIn
    ? message.map((num) => mirror_nbits(8, num))
    : message;
  const input = binArrInput;

  let crc = initialValue + 0;
  for (const b of input) {
    for (let i = 0; i < 8; i++) {
      const bit = ((b >> (7 - i)) & 1) === 1;
      const c15 = ((crc >> 15) & 1) === 1;
      crc <<= 1;
      if (c15 ^ bit) crc ^= polynomial;
    }
  }
  crc &= 0xffff;

  // Xor output
  const xorOutCrc = xorOut ^ crc;

  // Binary output reverse
  const output = reverseRefOut ? mirror_nbits(16, xorOutCrc) : xorOutCrc;

  return output;
};

// Return a number where the bits have been reversed
function mirror_nbits(digits, n) {
  let t = n.toString(2).split("");
  let str_len = t.length;
  for (let i = 0; i < digits - str_len; i++) {
    t.unshift("0");
  }
  return parseInt(t.reverse().join(""), 2);
}

// Fletcher Checksum - Digital Matter Oyster 3
export function fletcherDM(dataArr) {
  let sum1 = 0;
  let sum2 = 0;
  for (let i = 0; i < dataArr.length; i++) {
    sum1 = (sum1 + dataArr[i]) % 256;
    sum2 = (sum2 + sum1) % 256;
  }
  let check1 = 256 - ((sum1 + sum2) % 256);
  let check2 = 256 - ((sum1 + check1) % 256);

  const output = (check1 << 8) | check2;
  return output;
}

// https://en.wikipedia.org/wiki/Fletcher%27s_checksum
export function fletcher16(dataArr) {
  let sum1 = 0;
  let sum2 = 0;

  for (let index = 0; index < dataArr.length; index++) {
    sum1 = (sum1 + dataArr[index]) % 255;
    sum2 = (sum2 + sum1) % 255;
  }
  console.log(sum1, sum2);
  return (sum2 << 8) | sum1;
}

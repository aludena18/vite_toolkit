import {
  numToFixedSizeArr,
  crc16_ibm,
  crc16_ccitt,
  crc16_x25,
  fletcherDM,
} from "./helpers";
// import fs from "fs/promises";
import { devicesList } from "./config";

/*
// Set data into a temporary file
export function setData(data, file) {
  const promise = fs.writeFile(file, JSON.stringify(data));
  return promise;
}

// Get data from the temporaty file
export async function getData(file) {
  try {
    const rawFileContent = await fs.readFile(file, { encoding: "utf8" });
    const data = JSON.parse(rawFileContent);
    return data;
  } catch (error) {
    console.log(error);
  }
}
*/

// Teltonika Command
export const teltonikaCommand = function (commandStr) {
  const command = [
    ...commandStr.split("").map((char) => char.charCodeAt(0).toString(16)),
    "0d",
    "0a",
  ];
  const preamble = ["00", "00", "00", "00"];
  const codecId = ["0c"];
  const cmdQ1 = ["01"];
  const type = ["05"];
  const cmdSize = numToFixedSizeArr(command.length, 4);
  const cmdQ2 = ["01"];
  const data = [
    ...codecId,
    ...cmdQ1,
    ...type,
    ...cmdSize,
    ...command,
    ...cmdQ2,
  ];
  const dataSize = numToFixedSizeArr(data.length, 4);

  const dataBytes = data.map((char) => parseInt(char, 16));
  const crc16 = numToFixedSizeArr(crc16_ibm(dataBytes), 4);

  const commandMessage = [...preamble, ...dataSize, ...data, ...crc16]
    .map((char) => char.toUpperCase())
    .join(" ");
  return commandMessage;
};

// Ruptela command
export const ruptelaCommand = function (commandStr) {
  const commandID = ["6c"];
  const payload = commandStr
    .split("")
    .map((char) => char.charCodeAt(0).toString(16));
  const data = [...commandID, ...payload];
  const packetLength = numToFixedSizeArr(data.length, 2);

  const dataBytes = data.map((char) => parseInt(char, 16));
  const crc16 = numToFixedSizeArr(crc16_ccitt(dataBytes), 2);

  const commandMessage = [...packetLength, ...data, ...crc16]
    .map((char) => char.toUpperCase())
    .join(" ");

  return commandMessage;
};

// Concox command
export const concoxCommand = function (commandStr) {
  const startBit = ["78", "78"];
  const protocolNumber = ["80"];
  const serverFlagBit = ["00", "00", "00", "01"];
  const infSerialNumber = ["00", "00"];
  const stop = ["0D", "0A"];

  const commandContent = commandStr
    .split("")
    .map((char) => char.charCodeAt(0).toString(16));

  const commandLength = numToFixedSizeArr(
    commandContent.length + serverFlagBit.length,
    1
  );

  const packetLength = numToFixedSizeArr(
    protocolNumber.length +
      commandLength.length +
      serverFlagBit.length +
      commandContent.length +
      infSerialNumber.length +
      2,
    1
  );

  const data = [
    ...packetLength,
    ...protocolNumber,
    ...commandLength,
    ...serverFlagBit,
    ...commandContent,
    ...infSerialNumber,
  ];

  const dataBytes = data.map((char) => parseInt(char, 16));
  const crc16 = numToFixedSizeArr(crc16_x25(dataBytes), 2);

  const commandMessage = [...startBit, ...data, ...crc16, ...stop]
    .map((char) => char.toUpperCase())
    .join(" ");

  return commandMessage;
};

// Get command
export const getCommandHex = function (device, commandStr) {
  switch (+device) {
    case 0:
      // console.log("Teltonika");
      return teltonikaCommand(commandStr);
    case 1:
      // console.log("Ruptela");
      return ruptelaCommand(commandStr);
    case 2:
      // console.log("Concox");
      return concoxCommand(commandStr);

    default:
      return "";
  }
};

// Get device Name
export const getDeviceName = function (id) {
  return devicesList[id];
};

//Get CRC
export const getCRCHex = function (devId, strArr) {
  const byteArr = strArr
    .trim()
    .toLowerCase()
    .split(" ")
    .map((el) => parseInt(el, 16));

  let checkSum;
  if (devId === 0) checkSum = fletcherDM(byteArr);
  if (devId === 1) checkSum = crc16_ccitt(byteArr);
  if (devId === 2) checkSum = crc16_ibm(byteArr);
  if (devId === 3) checkSum = crc16_x25(byteArr);

  const checkSumArr = numToFixedSizeArr(checkSum);

  const checkSumString = checkSumArr
    .map((el) => el.toString(16))
    .join(" ")
    .toUpperCase();

  return checkSumString;
};

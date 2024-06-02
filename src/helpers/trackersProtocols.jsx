import { stringSpaced } from "./helpers.jsx";

// // Puts a data string into an array separated by bytes
// const stringToStringArray = function (str) {
//   let dataString = "";
//   for (let i = 0; i < str.length; i++) {
//     i % 2 === 0
//       ? (dataString = dataString + " " + str[i])
//       : (dataString = dataString + str[i]);
//   }
//   return dataString.trim().split(" ");
// };

// Create an object
const createData = function (name, value, hexValue) {
  return { name, value, hexValue };
};

export const decode = function (data, type) {
  // const dataStringArray = stringToStringArray(data);
  const dataStringArray = stringSpaced(data).split(" ");
  switch (type) {
    case 0:
      return jointechJT709(dataStringArray);
      break;
    default:
      return [];
  }
};

export const jointechJT709 = function (dataArray) {
  // console.log(dataArray);

  // Terminal Reporting Location Information【0200】------------
  const protocolHeader = dataArray.slice(0, 1);
  const msgId = dataArray.slice(1, 3);
  const msgLen = dataArray.slice(3, 5);
  const idNum = dataArray.slice(5, 11);
  const msgSerialNum = dataArray.slice(11, 13);
  const alarmSign = dataArray.slice(13, 17);
  const stateDef = dataArray.slice(17, 21);
  const lat = dataArray.slice(21, 25);
  const lon = dataArray.slice(25, 29);
  const alt = dataArray.slice(29, 31);
  const speed = dataArray.slice(31, 33);
  const direction = dataArray.slice(33, 35);
  const date = dataArray.slice(35, 38);
  const time = dataArray.slice(38, 41);
  // console.log(speed, date, time, lat, lon);
  return [
    createData(
      "Protocol Header",
      protocolHeader.join(""),
      protocolHeader.join("")
    ),
    createData("Message ID", msgId.join(""), msgId.join("")),
    createData("Message Length", msgLen.join(""), msgLen.join("")),
    createData("ID Number", idNum.join(""), idNum.join("")),
    createData(
      "Msg Serial Number",
      msgSerialNum.join(""),
      msgSerialNum.join("")
    ),
    createData("Alarm Sign", alarmSign.join(""), alarmSign.join("")),
    createData("State Definition", stateDef.join(""), stateDef.join("")),
    createData("Latitude", lat.join(""), lat.join("")),
    createData("Longitude", lon.join(""), lon.join("")),
    createData("Altitude", alt.join(""), alt.join("")),
    createData("Speed", speed.join(""), speed.join("")),
    createData("Direction", direction.join(""), direction.join("")),
    createData("Date", date.join(""), date.join("")),
    createData("Time", time.join(""), time.join("")),
  ];
};

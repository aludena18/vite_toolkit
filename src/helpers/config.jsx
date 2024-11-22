import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import WifiIcon from "@mui/icons-material/Wifi";
import CalculateIcon from "@mui/icons-material/Calculate";
import LaptopIcon from "@mui/icons-material/Laptop";

export const sections = {
  index: {
    title: "Intro",
    description:
      "This application offers a set of utilities that you might find useful. It includes a section for filtering text files and another for generating commands in hexadecimal format for specific types of GPS tracker devices.",
    link: "/",
  },
  rawData: {
    title: "Text Filter",
    description:
      "This utility helps you filter a text file by mapping all the lines and including only those that match the keyword. You can also use the checkbox below to return the content following the keyword in each line.",
    link: "/rawdata",
    headerTitle: " - Text Filter",
    sectionTitle: "Text Filter",
    getIcon() {
      return <TextSnippetIcon />;
    },
  },
  commands: {
    title: "Commands",
    description:
      "This utility helps you convert a GPS tracker device command into its hexadecimal format for transmission over GPRS. The supported devices are listed in the dropdown menu. For more information about the hexadecimal structure, visit each device's website and refer to the command section.",
    link: "/commands",
    headerTitle: " - Commands",
    sectionTitle: "Commands",
    getIcon() {
      return <WifiIcon />;
    },
  },
  calculators: {
    title: "Calculators",
    description:
      "This utility is designed to calculate the CRC (Cyclic Redundancy Check) for a hexadecimal data string. A list of calculators is available, depending on the required algorithm. Please enter the hexadecimal data string with a single space between each byte. \nExample: E0 94 5D 09 DC 05 03 00 DA 0A 53",
    link: "calculators",
    headerTitle: " - Calculators",
    sectionTitle: "Calculators",
    getIcon() {
      return <CalculateIcon />;
    },
  },
  // decoding: {
  //   title: "Decoding",
  //   description: "Hello Decoding",
  //   link: "decoding",
  //   headerTitle: " - Decoding",
  //   sectionTitle: "Decoding",
  //   getIcon() {
  //     return <LaptopIcon />;
  //   },
  // },
};

export const tabTitle = "Toolkit";

// List of devices for the basicSelectMenu component
export const devicesList = [
  {
    id: 3,
    type: "Atrack",
  },
  {
    id: 2,
    type: "Concox",
  },
  {
    id: 1,
    type: "Ruptela",
  },
  {
    id: 0,
    type: "Teltonika",
  },
];

// List of calculators for the basicSelectMenu component
export const calculatorsList = [
  {
    id: 4,
    type: "Hex to String",
  },
  {
    id: 5,
    type: "String to Hex",
  },
  {
    id: 1,
    type: "CRC 16 CCITT",
  },
  {
    id: 2,
    type: "CRC 16 IBM",
  },
  {
    id: 3,
    type: "CRC 16 X25",
  },
  {
    id: 0,
    type: "Fletcher 16 (Digital Matter)",
  },
];

// List of devices for decoding for the basicSelectMenu component
export const decodingList = ["Jointech JT709A", "Suntech", "Concox"];

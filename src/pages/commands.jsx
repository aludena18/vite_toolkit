import { useEffect, useState } from "react";
import { Container, Grid, Paper } from "@mui/material";

import * as config from "../helpers/config.jsx";
import SimpleForm from "../components/inputs/customCommandForm.jsx";
import BoxResult from "../components/outputs/boxResult.jsx";
import Introduction from "../components/introduction/introduction.jsx";
import { getCommandHex, getDeviceName } from "../helpers/serverHelpers.jsx";

export const meta = () => {
  return [{ title: config.tabTitle }];
};

export default function CommandsRoute() {
  const [_input, _setInput] = useState("");
  const [_inMenuItem, _setInMenuItem] = useState(0);
  const [_result, _setResult] = useState({});
  const [dataToShow, setDataToShow] = useState([]);

  useEffect(() => {
    const storage = localStorage.getItem("gprsCommand");
    if (storage) {
      const calcData = JSON.parse(storage);
      setDataToShow(calcData);
    }
  }, []);

  const persistResultOnLocal = function (data) {
    localStorage.setItem("gprsCommand", JSON.stringify(data));
  };

  const processCommand = function (data) {
    const commandStr = data;
    const deviceId = _inMenuItem;
    const commandHex = getCommandHex(deviceId, commandStr);

    const result = [
      { label: "Date", value: new Date().toString() },
      { label: "Device", value: getDeviceName(+deviceId) },
      { label: "Command", value: commandStr },
      { label: "Command (Hex)", value: commandHex },
    ];
    setDataToShow(result);
    persistResultOnLocal(result);
  };

  const handleSubmit = function () {
    processCommand(_input);
  };

  const handleInputValue = function (val) {
    _setInput(val);
  };

  const handleInputMenu = function (val) {
    _setInMenuItem(val);
  };

  return (
    <Container>
      <Introduction
        title={config.sections.commands.title}
        description={config.sections.commands.description}
      />
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} md={12} lg={12}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              // height: 280,
            }}
          >
            <SimpleForm
              setCmd={handleSubmit}
              handleInputVal={handleInputValue}
              handleInputMenu={handleInputMenu}
              setDropDownLabel={"Device"}
              setDropDownList={config.devicesList}
              setInputLabel={"Command"}
              setButtonLabel={"try it out"}
            />
            <BoxResult sx={{ mt: 2 }} data={dataToShow} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

// Backend functions ---------------------------
/*
// Action
export async function action({ request }) {
  const formData = await request.formData();
  const commandStr = formData.get("command");
  const deviceId = formData.get("device");
  const commandHex = getCommandHex(deviceId, commandStr);

  const command = {
    date: new Date().toString(),
    device: getDeviceName(+deviceId),
    command: commandStr,
    hexCommand: commandHex,
  };
  await setCommandToUser(USER_NAME, command);

  return redirect("/commands");
}

// Loader
export async function loader() {
  const user = await getUser(USER_NAME);
  const data = user.commands;
  return data;
}
*/

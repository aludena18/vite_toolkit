// import { useSubmit } from "@remix-run/react";
import { Container, TextField } from "@mui/material";
import { useState } from "react";
import TextButton from "./textButton.jsx";
import BasicSelectMenu, { clearElement } from "../menu/basicSelectMenu.jsx";

export default function CustomCommandForm(props) {
  const TEXTFIELD_COMMAND_LABEL = props.setInputLabel;
  // const submit = useSubmit();
  const [input, setInput] = useState("");
  const [deviceId, setDeviceId] = useState(-1);
  const [cmdEmptyErr, setCmdEmptyErr] = useState(false);
  const [selectEmptyErr, setSelectEmptyErr] = useState(false);

  const handleSubmit = function (ev) {
    ev.preventDefault();
    submitForm(ev);
  };

  const submitForm = function (ev) {
    if (deviceId < 0) {
      setSelectEmptyErr(true);
      return;
    }
    if (!input) {
      setCmdEmptyErr(true);
      return;
    }

    // Copy the content to the hidden input
    const commandHiddenEl = document.getElementById("frm-command");
    commandHiddenEl.value = input;

    const deviceHiddenEl = document.getElementById("frm-device");
    deviceHiddenEl.value = deviceId;

    // Submit the form
    // const formEl = document.getElementById("tel-form");
    const formEl = ev.currentTarget.closest("form");
    // submit(formEl, { replace: true });
    setInput("");
    setDeviceId(-1);
    clearElement();
    props.setCmd();
  };

  const handleOnChange = function (ev) {
    setCmdEmptyErr(false);
    setInput(ev.target.value);
    props.handleInputVal && props.handleInputVal(ev.target.value);
  };

  const handleElementId = function (id) {
    setSelectEmptyErr(false);
    setDeviceId(id);
    props.handleMenuIndex && props.handleMenuIndex(id);
  };

  const handleElementName = function (name) {
    props.handleMenuName && props.handleMenuName(name);
  };

  return (
    <Container>
      <form id="cmd-form" onSubmit={handleSubmit}>
        <BasicSelectMenu
          sx={{ pb: 2, minWidth: 120 }}
          setElementId={handleElementId}
          setElementType={handleElementName}
          setDropDownLabel={props.setDropDownLabel}
          setDropDownList={props.setDropDownList}
          selectError={selectEmptyErr}
        />
        <TextField
          error={cmdEmptyErr}
          id="filled-basic"
          label={TEXTFIELD_COMMAND_LABEL}
          variant="outlined"
          fullWidth
          sx={{ pb: 2 }}
          onChange={handleOnChange}
          value={input}
        />
        <input id="frm-device" type="hidden" name="device" />
        <input id="frm-command" type="hidden" name="command" />
        <TextButton buttonName={props.setButtonLabel} onClick={submitForm} />
      </form>
    </Container>
  );
}

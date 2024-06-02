import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

let _setDevice;

export default function BasicSelectMenu(props) {
  const [device, setDevice] = React.useState("");
  _setDevice = setDevice;

  const handleChange = (event) => {
    setDevice(event.target.value);
    props.setDeviceId(event.target.value);
  };

  return (
    <Box sx={props.sx}>
      <FormControl fullWidth error={props.selectError}>
        <InputLabel id="demo-simple-select-label">
          {props.setDropDownLabel}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={device}
          label="Age"
          onChange={handleChange}
        >
          {/* <MenuItem value={1}>Teltonika</MenuItem>
          <MenuItem value={2}>Ruptela</MenuItem> */}
          {props.setDropDownList.map((device, i) => (
            <MenuItem key={i} value={i}>
              {device}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export const clearDevice = function () {
  _setDevice("");
};

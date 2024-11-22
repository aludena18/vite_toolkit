import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

let _setElement;

export default function BasicSelectMenu(props) {
  //
  const [element, setElement] = React.useState("");
  _setElement = setElement;

  const handleChange = (event) => {
    const el = event.target.value;
    setElement(el);
    // console.log(el);
    props.setElementId(el.id);
    props.setElementType(el.type);
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
          value={element}
          label="Age"
          onChange={handleChange}
        >
          {props.setDropDownList.map((el, i) => (
            <MenuItem key={i} value={el}>
              {el.type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export const clearElement = function () {
  _setElement("");
};

import * as config from "../helpers/config.jsx";
import { execOp } from "../helpers/serverHelpers.jsx";

import { useEffect, useState } from "react";
import { Container, Grid, Paper, Typography } from "@mui/material";

import BoxResult from "../components/outputs/boxResult.jsx";
import SimpleForm from "../components/inputs/customCommandForm.jsx";
import Introduction from "../components/introduction/introduction.jsx";

export const meta = () => {
  return [{ title: config.tabTitle }];
};

export default function CalculatorsRoute() {
  const [_input, _setInput] = useState("");
  const [_inMenuItem, _setInMenuItem] = useState(0);
  const [_inMenuName, _setInMenuName] = useState("");
  const [_result, _setResult] = useState({});
  const [dataToShow, setDataToShow] = useState([]);

  useEffect(() => {
    const storage = localStorage.getItem("calcResult");
    if (storage) {
      const calcData = JSON.parse(storage);
      setDataToShow(calcData);
    }
  }, []);

  const persistResultOnLocal = function (data) {
    localStorage.setItem("calcResult", JSON.stringify(data));
  };

  const processChecksum = function (data) {
    const operationId = _inMenuItem;
    const operationName = _inMenuName;
    const checkSumString = execOp(_inMenuItem, data);

    const result = [
      { label: "Date", value: new Date().toString() },
      { label: "Operation", value: operationName },
      { label: "Analyzed Data", value: _input },
      { label: "Result", value: checkSumString },
    ];
    setDataToShow(result);
    persistResultOnLocal(result);
  };

  const handleSubmit = function () {
    processChecksum(_input);
  };

  // Set the string that will be process
  const handleInputValue = function (val) {
    _setInput(val);
  };

  // Set the index of the selected item in the menu
  const handleMenuIndex = function (id) {
    _setInMenuItem(id);
  };

  // Set the name of the selected item in the mennu
  const handleMenuName = function (name) {
    _setInMenuName(name);
  };

  return (
    <Container>
      <Introduction
        title={config.sections.calculators.title}
        description={config.sections.calculators.description}
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
              handleMenuIndex={handleMenuIndex}
              handleMenuName={handleMenuName}
              setDropDownLabel={"Type"}
              setDropDownList={config.calculatorsList}
              setInputLabel={"Data"}
              setButtonLabel={"try it out"}
            />
            <BoxResult
              sx={{ mt: 2 }}
              data={dataToShow}
              // show={showResult}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

// Backend functions ---------------------------

// Action
// export async function action({ request }) {
// const formData = await request.formData();
// const data = formData.get("command");
// const dataArray = data
//   .trim()
//   .toLowerCase()
//   .split(" ")
//   .map((el) => parseInt(el, 16));
// console.log(dataArray);
// console.log(helpers.fletcherCS(dataArray));

//   return redirect("/calculators");
// }

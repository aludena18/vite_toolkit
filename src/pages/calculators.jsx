import * as config from "../helpers/config.jsx";
import { getCRCHex } from "../helpers/serverHelpers.jsx";

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
    const checkSumString = getCRCHex(_inMenuItem, data);

    const result = [
      { label: "Date", value: new Date().toString() },
      { label: "Calculator", value: config.calculatorsList[_inMenuItem] },
      { label: "Data Analyzed", value: _input },
      { label: "Result", value: checkSumString },
    ];
    setDataToShow(result);
    persistResultOnLocal(result);
  };

  const handleSubmit = function () {
    processChecksum(_input);
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
              handleInputMenu={handleInputMenu}
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

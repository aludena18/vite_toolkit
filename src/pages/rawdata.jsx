import { Container, Grid, Paper } from "@mui/material";
import DropzoneForm from "../components/dropzone/dropzoneForm.jsx";
import { useState } from "react";
import Introduction from "../components/introduction/introduction.jsx";
import * as config from "../helpers/config.jsx";

export const meta = () => {
  return [{ title: config.tabTitle }];
};

export default function RawdataRoute() {
  const FILE_NAME_COMPLEMENT = "_";
  const [readyToSave, setreadyToSave] = useState(false);

  const saveFile = function (dataFiltered) {
    if (!readyToSave) return;
    setreadyToSave(false);
    // console.log(dataFiltered);

    //Saving files
    dataFiltered.forEach((file) => {
      const blob = new Blob([file.content], {
        type: "text/plain;charset=utf-8",
      });
      const fileUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = `${FILE_NAME_COMPLEMENT}${file.name}`;
      link.href = fileUrl;
      link.click();
      URL.revokeObjectURL(link.href);
      console.log("File Saved");
    });
  };

  const handleReadyToSave = function () {
    setreadyToSave(true);
  };

  const handleSetDataFiltered = function (data) {
    saveFile(data);
  };

  return (
    <Container>
      <Introduction
        title={config.sections.rawData.title}
        description={config.sections.rawData.description}
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
            <DropzoneForm
              handleClick={saveFile}
              handleReadyToSave={handleReadyToSave}
              handleSetDataFiltered={handleSetDataFiltered}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

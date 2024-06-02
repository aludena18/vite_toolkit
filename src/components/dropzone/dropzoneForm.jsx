// import { useSubmit } from "@remix-run/react";
import React, { useCallback, useState } from "react";
import * as myDropZone from "react-dropzone";

import {
  Box,
  Container,
  Typography,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import TextButton from "../inputs/textButton";

export default function DropzoneForm(props) {
  const BUTTON_NAME = "FILTER & SAVE";
  const FILTER_WORD_HELPER_TEXT = "Entry required.";
  const CHECKBOX_LABEL = "Only content after the keyword";
  const [renderFiles, setRenderFiles] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [check, setCheck] = useState(false);
  const [filesArr, setFilesArr] = useState([]);
  const [filterWord, setFilterWord] = useState("");
  // const submit = useSubmit();

  const onDrop = useCallback((acceptedFiles) => {
    console.log("a file has been drooped");
    console.log(acceptedFiles);

    const filesData = [];
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.readAsText(file);

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        const fileData = {};
        fileData.name = file.path;
        fileData.content = reader.result;
        filesData.push(fileData);
      };
      reader.onloadend = () => {
        if (filesData.length !== acceptedFiles.length) return;
        setFilesArr(filesData);
        // console.log("finish reading files", filesData);
        props.handleReadyToSave();
        setRenderFiles(true);
      };
    });
  }, []);

  const { acceptedFiles, getRootProps, getInputProps } = myDropZone.useDropzone(
    {
      onDrop,
    }
  );

  let files = acceptedFiles.map((file) => (
    <li key={file.path} id={file.path}>
      {/* {file.path} - {file.size} bytes */}
      {file.path}
    </li>
  ));

  const handleClick = function () {
    // Filter logic
    if (!filterWord) {
      setInputError(true);
      return;
    }
    const filesDataFiltered = filesArr.map((fileData) => {
      const firstFilter = fileData.content
        .split(/\r\n|\n/)
        .filter((frame) => frame.includes(filterWord));

      const secondFilter = check
        ? firstFilter.map((line) => line.split(filterWord)[1]).join("\r\n")
        : [];
      const contentFiltered = check ? secondFilter : firstFilter.join("\r\n");
      return { name: fileData.name, content: contentFiltered };
    });
    //console.log(filesDataFiltered.length, " files filtered");

    setFilterWord("");
    setCheck(false);
    setRenderFiles(false);
    props.handleSetDataFiltered(filesDataFiltered);
  };

  const handleOnChange = function (ev) {
    setInputError(false);
    setFilterWord(ev.target.value);
  };

  const handleOnChangeCheck = function (ev) {
    setCheck((st) => !st);
  };

  const dropzoneStyle = {
    color: "gray",
    display: "flex",
    height: 100,
  };

  return (
    <Container>
      <form id="drop-form" method="post">
        {/* Drop zone */}
        <Box sx={{ border: "1px dashed gray", borderRadius: 1 }}>
          <div style={dropzoneStyle} {...getRootProps()}>
            <input {...getInputProps()} />
            <Typography
              style={{ margin: "auto" }}
              variant="body1"
              align="center"
              color="text.secondary"
              paragraph
            >
              Drag 'n' drop some files here, or click to select files
            </Typography>
          </div>
        </Box>

        {/* Input - filter */}
        <Box sx={{ pt: 2 }}>
          <TextField
            error={inputError}
            helperText={inputError && FILTER_WORD_HELPER_TEXT}
            id="outlined-basic"
            label="Keyword"
            variant="outlined"
            onChange={handleOnChange}
            value={filterWord}
          />
        </Box>

        {/* Input - Checkbox */}
        <FormGroup>
          <FormControlLabel
            onChange={handleOnChangeCheck}
            control={<Checkbox checked={check} />}
            label={CHECKBOX_LABEL}
          />
        </FormGroup>

        {/* Files list */}
        <aside>
          <Typography sx={{ pt: 2 }} variant="body2">
            Files
          </Typography>
          <ul>
            <Typography variant="body2">{renderFiles && files}</Typography>
          </ul>
        </aside>

        <input id="files-data" type="hidden" name="files" />

        {/* Button */}
        <TextButton
          align="center"
          buttonName={BUTTON_NAME}
          onClick={handleClick}
        />
      </form>
    </Container>
  );
}

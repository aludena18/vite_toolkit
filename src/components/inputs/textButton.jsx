import { Button, Container } from "@mui/material";

export default function TextButton(props) {
  return (
    <Button
      color="secondary"
      variant="contained"
      onClick={props.onClick}
      onSubmit={props.onSubmit}
      sx={{ mx: "auto" }}
    >
      {props.buttonName}
    </Button>
  );
}

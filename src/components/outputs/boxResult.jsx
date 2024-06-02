import { Container, Box, Typography } from "@mui/material";

export default function BoxResult(props) {
  const result = function () {
    return (
      <Box>
        {props.data.map((el, i) => (
          <Typography key={i} variant="body2">
            {el.label}: {el.value}
          </Typography>
        ))}
      </Box>
    );
  };

  return (
    <Container sx={props.sx}>
      <Box
        sx={{
          p: 2,
          border: "1px solid ",
          borderColor: "#bbb",
          borderRadius: 1,
          minHeight: 120,
        }}
      >
        {result()}
      </Box>
    </Container>
  );
}

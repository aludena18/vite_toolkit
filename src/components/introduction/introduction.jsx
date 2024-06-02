import { Box, Container, Divider, Typography } from "@mui/material";

export default function Introduction(props) {
  return (
    <Box component="div" sx={{ mb: 2 }}>
      <Box component="div">
        <Typography variant="h4">{props.title}</Typography>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <Box component="div">
        <Typography variant="body2">{props.description}</Typography>
      </Box>
    </Box>
  );
}

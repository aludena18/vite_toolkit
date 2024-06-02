import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container, Box, Typography } from "@mui/material";
import { stringSpaced } from "../../data/helpers";

export default function TableResult(props) {
  //   console.log(props.data);
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
        <Box
          sx={{
            minHeight: 50,
          }}
        >
          <Typography variant="body2">
            Input: {stringSpaced(props.data.input)}
          </Typography>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Value</TableCell>
                <TableCell align="right">Hex Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.data.dataParsed.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" size="small">
                    {row.name}
                  </TableCell>
                  <TableCell align="right" size="small">
                    {row.value}
                  </TableCell>
                  <TableCell align="right" size="small">
                    {row.hexValue}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}

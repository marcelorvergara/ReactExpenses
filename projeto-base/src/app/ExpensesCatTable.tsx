import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { IExpense } from "./backend";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    table: {
      minWidth: 650,
    },
  })
);

interface IExpensesProps {
  expenses: IExpense[];
}

export function ExpensesCatTable(props: IExpensesProps) {
  console.log("categoria");
  const classes = useStyles();
  return (
    <Box paddingX="48px">
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Categoria</TableCell>
              <TableCell align="left">Valor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.expenses.map((exp, i) => (
              <TableRow key={i}>
                <TableCell align="left">{exp.categoria}</TableCell>
                <TableCell align="left">
                  {exp.valor.toFixed(2).replace(".", ",")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

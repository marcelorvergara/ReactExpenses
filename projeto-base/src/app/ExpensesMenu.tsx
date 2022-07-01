import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import React from "react";

const YEARS = ["2020", "2021", "2022"];
const MONTHS = [
  { mes: "Janeiro", numMes: "01" },
  { mes: "Fevereiro", numMes: "02" },
  { mes: "Março", numMes: "03" },
  { mes: "Abril", numMes: "04" },
  { mes: "Maio", numMes: "05" },
  { mes: "Junho", numMes: "06" },
  { mes: "Julho", numMes: "07" },
  { mes: "Agosto", numMes: "08" },
  { mes: "Setembro", numMes: "09" },
  { mes: "Outubro", numMes: "10" },
  { mes: "Novembro", numMes: "11" },
  { mes: "Dezembro", numMes: "12" },
];

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
    tab: {
      backgroundColor: "#d9d9d9",
      margin: "0 46px 20px 46px",
      borderRadius: "4px",
    },
  })
);

interface IExpensesMenuProps {
  year: string;
  month: string;
  onChangeAno: (year: string) => void;
  onChangeMes: (month: string) => void;
  total: string;
}

export const ExpensesMenu = React.memo(function (props: IExpensesMenuProps) {
  console.log("menu");
  const classes = useStyles();
  return (
    <Box display="flex" padding="48px" alignItems="center">
      <Box flexGrow={1}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-native-simple">Ano</InputLabel>
          <Select
            native
            value={props.year}
            onChange={(evt) => props.onChangeAno(evt.target.value as string)}>
            {YEARS.map((year) => (
              <option value={year} key={year}>
                {year}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-native-simple">Mês</InputLabel>
          <Select
            native
            value={props.month}
            onChange={(evt) => props.onChangeMes(evt.target.value as string)}>
            {MONTHS.map((month) => (
              <option value={month.numMes} key={month.numMes}>
                {month.mes}
              </option>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box></Box>
      <Box>
        Despesa total: <strong>R$ {props.total}</strong>
      </Box>
    </Box>
  );
});

import { useEffect, useState } from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { apiGetExpenses, IExpense } from "./backend";
import { useParams } from "react-router-dom";
import { ExpensesTable } from "./ExpensesTable";
import { Paper, Tabs, Tab } from "@material-ui/core";

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

export function Expenses() {
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
  const { dateParam } = useParams<{ dateParam: string }>();
  const classes = useStyles();
  const [year, setYear] = useState<string>(dateParam.split("-")[0]);
  const [month, setMonth] = useState<string>(dateParam.split("-")[1]);
  const [total, setTotal] = useState<string>("0");

  const [expenses, setExpenses] = useState<IExpense[]>([]);

  useEffect(() => {
    apiGetExpenses(year, month).then((resp) => {
      setTotal(
        resp
          .reduce((acc, obj) => {
            return acc + obj.valor;
          }, 0)
          .toLocaleString()
      );
      setExpenses(resp);
    });
  }, [year, month]);

  const [value, setValue] = useState(1);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Box display="flex" padding="48px" alignItems="center">
        <Box flexGrow={1}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-native-simple">Ano</InputLabel>
            <Select
              native
              value={year}
              onChange={(evt) => setYear(evt.target.value as string)}>
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
              value={month}
              onChange={(evt) => setMonth(evt.target.value as string)}>
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
          Despesa total: <strong>R$ {total}</strong>
        </Box>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        padding="24px"
        className={classes.tab}>
        <Paper square>
          <Tabs
            value={value}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
            aria-label="disabled tabs example">
            <Tab label="Resumo"></Tab>
            <Tab label="Detalhes" />
          </Tabs>
        </Paper>
      </Box>
      {value === 0 && <ExpensesTable expenses={expenses} />}
    </>
  );
}

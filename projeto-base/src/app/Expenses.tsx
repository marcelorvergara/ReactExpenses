import { useCallback, useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { apiGetExpenses, IExpense } from "./backend";
import { useHistory, useParams } from "react-router-dom";
import { ExpensesResumeTable } from "./ExpensesResumeTable";
import { Paper, Tabs, Tab } from "@material-ui/core";
import { ExpensesCatTable } from "./ExpensesCatTable";
import { ExpensesMenu } from "./ExpensesMenu";

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
  const { dateParam } = useParams<{ dateParam: string }>();
  const classes = useStyles();
  const [year, month] = dateParam.split("-");

  // tabs
  const [value, setValue] = useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  function useCalcExpenses(month: string, year: string) {
    // expenses
    const [total, setTotal] = useState<string>("0");
    const [catTotal, setCatTotal] = useState<IExpense[]>([]);
    const [expenses, setExpenses] = useState<IExpense[]>([]);
    function calcTotalExp(exp: IExpense[]) {
      return exp.reduce((acc, obj) => {
        return acc + obj.valor;
      }, 0);
    }

    function calcCatTotal(exp: IExpense[]) {
      const resultCat: IExpense[] = [];
      exp.forEach((obj) => {
        const newObj = resultCat.find((f) => f.categoria === obj.categoria);
        if (!newObj) {
          resultCat.push({ categoria: obj.categoria, valor: obj.valor });
        } else {
          const idx = resultCat.indexOf(newObj);
          resultCat.splice(idx, 1, {
            categoria: obj.categoria,
            valor: newObj.valor + obj.valor,
          });
        }
      });
      resultCat.sort((v1, v2) => v2.valor - v1.valor);
      return resultCat;
    }

    useEffect(() => {
      apiGetExpenses(year, month).then((resp) => {
        // sum of month expenses
        const totalExpenses = calcTotalExp(resp);
        setTotal(totalExpenses.toLocaleString());
        // all expenses (resume)
        setExpenses(resp);
        // category expenses (details)
        const resultCat = calcCatTotal(resp);
        setCatTotal(resultCat);
      });
    }, [year, month]);
    return {
      total,
      catTotal,
      expenses,
    };
  }

  const { total, catTotal, expenses } = useCalcExpenses(month, year);

  // url
  const history = useHistory();

  const onChangeAno = useCallback(
    (yearParam: string) => {
      history.push(`/expenses/${yearParam}-${month}`);
    },
    [history, month]
  );

  const onChangeMes = useCallback(
    (monthParam: string) => {
      history.push(`/expenses/${year}-${monthParam}`);
    },
    [history, year]
  );

  return (
    <>
      <ExpensesMenu
        year={year}
        month={month}
        onChangeAno={onChangeAno}
        onChangeMes={onChangeMes}
        total={total}
      />
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
      {value === 0 && <ExpensesResumeTable expenses={expenses} />}
      {value === 1 && <ExpensesCatTable expenses={catTotal} />}
    </>
  );
}

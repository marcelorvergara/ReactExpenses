import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { IUser } from "./backend";
import { Box, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "16px",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: "#5c5c5c",
    fontWeight: "bold",
  },
  info: {
    display: "flex",
    justifyContent: "between",
  },
  appName: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: "#5c5c5c",
  },
}));

interface IUserInfo {
  onSignOut: () => void;
  userInfo: IUser;
}

export function ExpensesHeader(props: IUserInfo) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs>
          <Paper className={classes.appName}>
            <strong>EXPENSES</strong>
          </Paper>
        </Grid>
        <Grid item xs></Grid>
        <Grid item xs>
          <Paper className={classes.paper}>
            <Box
              className={classes.info}
              alignItems="center"
              justifyContent="flex-end">
              <Box flexGrow={1}>Olá {props.userInfo.nome}</Box>
              <Box> &nbsp; </Box>
              <Box>
                <Button variant="outlined" onClick={props.onSignOut}>
                  SAIR
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

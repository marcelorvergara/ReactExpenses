import { TextField, Container, Button, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { apiSignInEndpoint, IUser } from "./backend";

const useStyles = makeStyles({
  error: {
    backgroundColor: "#ff0000",
    borderRadius: "4px",
    padding: "12px",
    margin: "16px 0",
    color: "white",
  },
});

interface ILoginScreenProps {
  onSignIn: (user: IUser) => void;
}

export function LoginScreen(props: ILoginScreenProps) {
  const classes = useStyles();
  const [email, setEmail] = useState("usuario@email.com");
  const [pass, setPass] = useState("1234");
  const [error, setError] = useState("");

  function signIn(evt: React.FormEvent) {
    evt.preventDefault();
    apiSignInEndpoint(email, pass).then(
      (user) => {
        props.onSignIn(user);
      },
      (e) => {
        setError(e.message);
        console.error("error", e);
      }
    );
  }

  return (
    <Container maxWidth="sm">
      <h2>Expenses (Despesas)</h2>
      <p>
        Digite seu login para entrar na aplicação Expenses (
        <kbd>usuario@email.com</kbd> / <kbd>1234</kbd>)
      </p>
      <form onSubmit={signIn}>
        <TextField
          margin="normal"
          label="E-mail"
          fullWidth
          variant="outlined"
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
        />
        <TextField
          type="password"
          margin="normal"
          label="Senha"
          fullWidth
          variant="outlined"
          value={pass}
          onChange={(evt) => setPass(evt.target.value)}
        />
        {error && <div className={classes.error}>{error}</div>}
        <Box textAlign="right" marginTop="8px">
          <Button type="submit" variant="contained" color="primary">
            Sign In
          </Button>
        </Box>
      </form>
    </Container>
  );
}

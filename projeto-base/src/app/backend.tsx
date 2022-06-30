export interface IExpense {
  id: number;
  descricao: string;
  categoria: string;
  valor: number;
  mes: string;
  dia: string;
}

export interface IUser {
  nome: string;
  email: string;
}

const backEnd: string = "http://localhost:3001";

export function apiGetExpenses(
  year: string,
  month: string
): Promise<IExpense[]> {
  return fetch(`${backEnd}/despesas?mes=${year}-${month}&_sort=dia`, {
    credentials: "include",
  }).then(handleResponse);
}

export function apiGetUserEndpoint(): Promise<IUser> {
  return fetch(`${backEnd}/sessao/usuario`, { credentials: "include" }).then(
    handleResponse
  );
}

export function apiSignInEndpoint(
  email: string,
  senha: string
): Promise<IUser> {
  return fetch(`${backEnd}/sessao/criar`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, senha }),
  }).then(handleResponse);
}

export function apiSignOut(): Promise<void> {
  return fetch(`${backEnd}/sessao/finalizar`, {
    credentials: "include",
    method: "POST",
  }).then(handleResponse);
}

function handleResponse(resp: Response) {
  if (resp.ok) {
    return resp.json();
  } else {
    throw new Error("Erro na requisição: " + resp.statusText);
  }
}

import logo from "./logo.svg";
import { ThemeProvider, createMuiTheme, Typography } from "@material-ui/core";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import Routes from "./modules/routes";

const theme = createMuiTheme({
  typography: {
    fontFamily: ['"Josefin Sans"', "sans-serif"],
  },
  palette: {
    primary: {
      main: "#14213d",
    },
    secondary: {
      main: "#fca311",
    },
  },
});

const GRAPHQL_SERVER = "http://localhost:4000";

const client = new ApolloClient({
  uri: GRAPHQL_SERVER,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>{" "}
    </ApolloProvider>
  );
}

export default App;

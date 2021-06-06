import logo from "./logo.svg";
import { ThemeProvider, createMuiTheme, Typography } from "@material-ui/core";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { StoreProvider } from "easy-peasy";

import store from "./store";
import client from './apolloClient'
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


function App() {
  return (
    <StoreProvider store={store}>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <Routes />
        </ThemeProvider>
      </ApolloProvider>
    </StoreProvider>
  );
}

export default App;

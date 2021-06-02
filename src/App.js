import logo from "./logo.svg";
import { ThemeProvider, createMuiTheme, Typography } from "@material-ui/core";

import Routes from "./modules/routes";

const theme = createMuiTheme({
  typography: {
    fontFamily: ['"Josefin Sans"', "sans-serif"],
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
}

export default App;

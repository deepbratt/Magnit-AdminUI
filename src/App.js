import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme/theme";

import Routes from "./routes";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Routes />
      </div>
    </ThemeProvider>
  );
}

export default App;

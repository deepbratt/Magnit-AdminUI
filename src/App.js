
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./redux/reducers/authSlice";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme/theme";
import { Button } from "@material-ui/core";
import Routes from "./routes";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.rootReducer.auth.isLoggedIn);
  console.log(isLoggedIn);
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {/* <Routes /> */}
        <Button onClick={() => dispatch(isLoggedIn ? logout() : login())}>
          {isLoggedIn ? "LOGOUT" : "LOGIN"}
        </Button>
      </div>
    </ThemeProvider>
  );
}

export default App;

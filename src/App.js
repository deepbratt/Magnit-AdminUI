import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { login, logout } from "./redux/reducers/authSlice";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.rootReducer.auth.isLoggedIn);
  console.log(isLoggedIn);
  return (
    <div className="App">
      <button onClick={() => dispatch(isLoggedIn ? logout() : login())}>
        {isLoggedIn ? "LOGOUT" : "LOGIN"}
      </button>
    </div>
  );
}

export default App;

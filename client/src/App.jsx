import "./App.css";
import { Provider } from "react-redux";
import generateStore from "./store";
import AuthForm from "./components/authForm";
import Message from "./components/message";
import LogoutButton from "./components/logoutButton";

function App() {
  return (
    <Provider store={generateStore()}>
      <div className="App">
        <AuthForm urlTerm="login" />
        <AuthForm urlTerm="register" />
        <Message />
        <LogoutButton />
      </div>
    </Provider>
  );
}

export default App;

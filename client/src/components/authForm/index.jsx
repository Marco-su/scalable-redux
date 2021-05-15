import { useState } from "react";
import { login, register } from "../../store/actions/user.actions";
import { useDispatch } from "react-redux";

const AuthForm = ({ urlTerm }) => {
  const [data, setData] = useState({ email: "", password: "" });

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    urlTerm === "login" && dispatch(login(data));
    urlTerm === "register" && dispatch(register(data));
  };

  return (
    <form onSubmit={handleSubmit}>
      {urlTerm === "login" && <h1>Login</h1>}
      {urlTerm === "register" && <h1>Register</h1>}

      <input
        type="email"
        placeholder="email"
        onChange={(e) => setData({ ...data, email: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setData({ ...data, password: e.target.value })}
        required
      />

      {urlTerm === "login" && <button>Login</button>}
      {urlTerm === "register" && <button>Register</button>}
    </form>
  );
};

export default AuthForm;

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authService";
import '../index.css';
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await loginUser({ email, password });

      localStorage.setItem("token", res.token);
      navigate("/dashboard");

    } catch (err) {
      console.log(err);
      if (err.response) {
        if (err.response.status == 401) {
          setError("Invalid Credentials!");
        }
        else {
          setError("Server error");
        }
      }
      else {
        setError("Server unreachable");
      }
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Login</h2>

        <input onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />

        <button className="auth-btn" onClick={handleLogin}>Login</button>

        <p>New user? <Link to="/signup">Signup</Link></p>

        {error && <p className="auth-error">{error}</p>}
      </div>
    </div>
  );
}
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signupUser } from "../services/authService";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await signupUser({ name, email, password });
      alert("user regestered successfully");
      navigate("/");
    } catch (err) {
      if (err.response.status == 400) {
        alert("user already exists");
      }
      else {
        alert("Signup failed");
      }
    }

  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Signup</h2>
        <input onChange={(e) => setName(e.target.value)} placeholder="Name" />

        <input onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />

        <button className="auth-btn" onClick={handleSignup}>Signup</button>

        <p>Already have account? <Link to="/">Login</Link></p>
      </div>
    </div>
  );
}
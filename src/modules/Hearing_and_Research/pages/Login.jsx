import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:9999/auth/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);

      // ✅ Redirect to dashboard
      window.location.href = "/research";

    } catch (err) {
      alert("Invalid email or password ❌");
    }
  };

  return (
    <div className="login-page">

      <form className="login-card" onSubmit={handleLogin}>

        <h4 className="text-center mb-3">
          ⚖️ JusticeGov Login
        </h4>

        {/* Email */}
        <input
          className="form-control mb-3"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password */}
        <input
          className="form-control mb-3"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Button */}
        <button className="btn btn-primary w-100">
          Sign In
        </button>

      </form>

    </div>
  );
};

export default Login;
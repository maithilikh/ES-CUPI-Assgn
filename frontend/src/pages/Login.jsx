import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import api from "../api/api";

function Login() {
  if (localStorage.getItem("token")) {
    return <Navigate to="/dashboard" />;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const [email, setEmail] = useState("");

  const nav = useNavigate();

  const [err, setErr] = useState("");

  const submit = async () => {
    try {
      setErr("");

      if (!email.trim()) {
        setErr("Enter an email");
        return;
      }

      if (!emailRegex.test(email)) {
        setErr("Please enter a valid email");
        return;
      }

      await api.post("/auth/request-otp", { email });

      nav("/verify", {
        state: { email },
      });
    } catch {
      setErr("Unable to request OTP");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-xl mb-4">Login</h2>

        <input
          className="border p-2 w-full"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {err && <p className="text-red-500 mt-2">{err}</p>}

        <button
          onClick={submit}
          className="mt-4 bg-black text-white px-4 py-2 w-full"
        >
          Request OTP
        </button>
      </div>
    </div>
  );
}

export default Login;

import { useState } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";

import api from "../api/api";

import { useAuth } from "../context/AuthContext";

function VerifyOtp() {
  const [otp, setOtp] = useState("");

  const [err, setErr] = useState("");

  const { state } = useLocation();

  if (!state?.email) {
    return <Navigate to="/" />;
  }

  const nav = useNavigate();

  const { login } = useAuth();

  const verify = async () => {
    if (otp.length !== 6) {
      return;
    }
    const res = await api.post("/auth/verify-otp", {
      email: state.email,
      otp,
    });

    login(res.data.token, res.data.user);

    nav("/dashboard");
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-xl mb-4">Verify OTP</h2>

        <input
          className="border p-2 w-full"
          placeholder="OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        {err && <p className="text-red-500 mt-2">{err}</p>}

        <button
          onClick={verify}
          className="mt-4 bg-black text-white px-4 py-2 w-full"
        >
          Verify
        </button>
      </div>
    </div>
  );
}

export default VerifyOtp;

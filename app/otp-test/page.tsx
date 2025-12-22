"use client";

import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function OTPTestPage() {
  const { sendOTP, verifyOTP } = useAuth();

  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"phone" | "code">("phone");

  const handleSendOTP = async () => {
    const ok = await sendOTP(phone);
    if (ok) setStep("code");
    else alert("OTP send failed");
  };

  const handleVerifyOTP = async () => {
    const ok = await verifyOTP(code, "/account");
    if (!ok) alert("OTP verification failed");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm border p-6 rounded-xl space-y-4">

        <h1 className="text-xl font-bold text-center">
          Phone OTP Test
        </h1>

        {step === "phone" ? (
          <>
            <input
              placeholder="+91XXXXXXXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border p-3 rounded"
            />
            <button
              onClick={handleSendOTP}
              className="w-full py-3 rounded font-semibold bg-black text-white"
            >
              Send OTP
            </button>
          </>
        ) : (
          <>
            <input
              placeholder="Enter OTP"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full border p-3 rounded"
            />
            <button
              onClick={handleVerifyOTP}
              className="w-full py-3 rounded font-semibold bg-black text-white"
            >
              Verify OTP
            </button>
          </>
        )}
      </div>
    </div>
  );
}

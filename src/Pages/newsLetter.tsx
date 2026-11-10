import { useState } from "react";
import type {  MouseEvent } from "react";
import { useNavigate } from "react-router-dom";


const API_URL = `${import.meta.env.VITE_API_URL ?? "http://localhost:3000"}/api`;

const NewsLetter = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");

  const [showOtp, setShowOtp] = useState<boolean>(false);

  const [serverStatus, setServerStatus] = useState<string>("");
  const [statusColor, setStatusColor] = useState<string>("text-gray-500");
  const [otpColor, setOtpColor] = useState<string>("");

  const handleEmailSubmit = async (e: any) => {
    e.preventDefault();

    setServerStatus("Loading...");
    setStatusColor("text-gray-500");

    try {
      const res = await fetch(`${API_URL}/verifyForNewLetter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.status === 200) {
        setStatusColor("text-green-500");
        setServerStatus("OTP Sent");
        setShowOtp(true);
      } else {
        setStatusColor("text-red-500");
        setServerStatus("Server Error");
      }
    } catch (error) {
      console.error(error);
      setStatusColor("text-red-500");
      setServerStatus("Server Error");
    }
  };

  const flashInvalidOtp = () => {
    setOtpColor("border-red-700 text-red-800");
    setTimeout(() => setOtpColor(""), 3000);
  };

  const handleOtpSubmit = async (e: MouseEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/addToNewsLetter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      if (res.status === 200) {
        setOtpColor("border-green-700 text-green-800");
        navigate("/");
      } else {
        flashInvalidOtp();
      }
    } catch (error) {
      console.error(error);
      flashInvalidOtp();
    }
  };

  return (
    <div className="min-h-screen w-full px-4">
      {/* Newsletter */}
      <div className="flex min-h-[80dvh] justify-center items-center">
        {/* Email form */}
        <div className="flex h-fit w-full max-w-lg border rounded-xl shadow-2xl p-6 sm:p-12 lg:p-20">
          <form
            className="flex w-full text-center flex-col gap-2"
            onSubmit={handleEmailSubmit}
          >
            <h1 className="text-2xl">Enter Your Email</h1>

            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 text-center rounded-xl h-10 text-xl"
            />

            <button
              type="submit"
              className="px-8 py-2 cursor-pointer hover:bg-black hover:text-white hover:underline text-2xl duration-75"
            >
              Subscribe
            </button>

            {serverStatus && (
              <div className={`text-center ${statusColor}`}>{serverStatus}</div>
            )}
          </form>
        </div>

        {/* OTP popup */}
        {showOtp && (
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-sm border-2 backdrop-blur-3xl bg-white text-center p-6 sm:p-10 text-xl sm:text-2xl rounded-xl shadow-2xl">
            <p className="mb-3 text-gray-700">Enter the OTP:</p>

            <div className="w-full h-full flex flex-col items-center gap-2">
              <input
                type="number"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className={`border-2 rounded-xl text-center w-full ${otpColor}`}
              />

              {/* Submit OTP */}
              <svg
                width="40px"
                height="40px"
                className="cursor-pointer"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={handleOtpSubmit}
              >
                <path
                  d="M12 16L16 12M16 12L12 8M16 12H8M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <div className="text-xl">
                {otpColor.includes("red") ? "Invalid OTP" : ""}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsLetter;
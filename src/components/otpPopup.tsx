import { REGEXP_ONLY_DIGITS } from "input-otp";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";
import { ArrowRight, Loader, X } from "lucide-react";
import axios from "axios";
import { useState } from "react";
import { useFirebase } from "@/Context/firebase";
import ErrorPop from "./Errorpop";
import { useNavigate } from "react-router-dom";

interface OTPProps {
  onClose: () => void;
  email: string;
  password: string;
}

interface OTPValidate {
  email: string;
  password: string;
}

const OTP = ({ onClose, email, password }: OTPProps) => {
  const navigate = useNavigate();

  const firebaseAuth = useFirebase();
  const [val, setVal] = useState("");
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const BackendAPI = `${import.meta.env.VITE_API_URL ?? "http://localhost:3000"}/api/`;

  const validateOTP = async ({ email, password }: OTPValidate) => {
    if (val.length != 6) return;
    setIsLoading(true);
    const res = await axios.post(BackendAPI + "verifyForSignup", {
      email: email,
      password: password,
      otp: val,
    });

    if (res.status === 200) {
      console.log(res);
      const user = await firebaseAuth?.loginInWithToken(res.data?.token);
      if (user) {
        navigate("/");
        return; 
      }
    }
    setIsLoading(false); 
    setErrMsg("Something went wrong.");
    setErr(true);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
        <div className="flex flex-col gap-2 border p-4 bg-white rounded-2xl justify-center items-center max-w-full">
          <span
            onClick={onClose}
            className="self-start border rounded-full p-1 bg-red-400 cursor-pointer"
          >
            <X></X>
          </span>
          <p>Enter the OTP: </p>
          <InputOTP
            id="digits-only"
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS}
            onChange={(v) => setVal(v)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <button
            className="rounded-full p-2 hover:bg-yellow-200"
            disabled={val.length != 6}
            onClick={() => validateOTP({ email, password })}
          >
            {val.length === 6 && !isLoading ? <ArrowRight></ArrowRight>: ""}
            {val.length === 6 && isLoading ? <Loader> </Loader>: ""}
          </button>
        </div>
        {err ? <ErrorPop message={errMsg} /> : null}
      </div>
    </>
  );
};

export default OTP;
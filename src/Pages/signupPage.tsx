import { LogIn } from "lucide-react";
import { InputBox } from "@/components/inputBox";
import Btn3 from "@/components/Btn3";
import CustomLink from "@/components/link";
import { useEffect, useState } from "react";
import ErrorPop from "@/components/Errorpop";
import { FirebaseError } from "firebase/app";
import axios from "axios";
import OTP from "@/components/otpPopup";
import { emailSchema } from "@/types";

const Signup = () => {
  const BackendAPI = `${import.meta.env.VITE_API_URL ?? "http://localhost:3000"}/api/`;
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [otp, activeOTP] = useState(false);

  const validateEmail = (email: string): boolean => {
    const res = emailSchema.safeParse(email);
    if (res.success) return true;
    return false;
  };

  const handleCustomServerRequest = async (): Promise<boolean> => {
    try {
      const res = await axios.post(BackendAPI + "signup", {
        email: form.email,
      });

      console.log(res);

      if (res.status === 200) {
        activeOTP(true);
        return true;
      }
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        setErrMsg("Email already in use.");
      } else {
        setErrMsg("Server Error.");
      }
      setError(true);
      setLoading(false);
    }
    return false;
  };

  const handleOnClick = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleLogin = async () => {
    if (form.password != form.confirmPassword) {
      setErrMsg("Password does not match.");
      setError(true);
      return;
    }
    if (!validateEmail(form.email)) {
      setErrMsg("Enter Valid Email.");
      setError(true);
      return;
    }
    setLoading(true);
    setError(false);
    try {
      if (!(await handleCustomServerRequest())) {
        return;
      }
    } catch (e: unknown) {
      if (e instanceof FirebaseError) {
        console.log(e.message);
        if (e.message === "Firebase: Error (auth/email-already-in-use).") {
          setErrMsg("Email already in use.");
        } else if (
          e.message ===
          "Firebase: Password should be at least 6 characters (auth/weak-password)."
        ) {
          setErrMsg("Password is weak.");
        }
      } else {
        setErrMsg("Something went wrong.");
      }
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!error) return;
    const t = setTimeout(() => setError(false), 3000);
    return () => clearTimeout(t);
  }, [error]);

  return (
    <>
      <div className="w-full min-h-[70dvh] flex justify-center items-center px-4 py-10 relative">
        <div className="w-full max-w-md rounded-2xl border-2 flex flex-col justify-start items-center p-6 sm:p-10 gap-5">
          <div>
            <LogIn></LogIn>
          </div>
          <div className="text-2xl">Sign up with email.</div>
          <InputBox
            heading="Email"
            placeholder=""
            onChange={handleOnClick}
            type="email"
            name="email"
            value={form.email}
          />
          <InputBox
            heading="Password"
            placeholder=""
            onChange={handleOnClick}
            type="password"
            name="password"
            value={form.password}
          />
          <InputBox
            heading="Confirm Password"
            placeholder=""
            onChange={handleOnClick}
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
          />
          <div className="flex flex-col">
            <Btn3
              title={"Signup"}
              url="/"
              onClick={handleLogin}
              load={loading ? true : false}
            />
          </div>
          <CustomLink url="/login" title="Already have a account? Login" />
        </div>
        {otp ? (
          <OTP
            onClose={() => activeOTP(false)}
            email={form.email}
            password={form.password}
          />
        ) : null}
      </div>
      {error && <ErrorPop message={errMsg} />}
    </>
  );
};

export default Signup;
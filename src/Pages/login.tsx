import { LogIn } from "lucide-react";
import { InputBox } from "@/components/inputBox";
import Btn3 from "@/components/Btn3";
import CustomLink from "@/components/link";
import { useFirebase } from "../Context/firebase";
import { useEffect, useState } from "react";
import ErrorPop from "@/components/Errorpop";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const fireBase = useFirebase();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleOnClick = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleLogin = async () => {
    setLoading(true);
    setError(false);
    try {
      await fireBase?.loginInWIthMailAndPassword({ ...form });
      navigate("/");
    } catch (e) {
      console.log(e);
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
      <div className="w-full min-h-[70dvh] flex justify-center items-center px-4 py-10">
        <div className="w-full max-w-md rounded-2xl border-2 flex flex-col justify-start items-center p-6 sm:p-10 gap-5">
          <div>
            <LogIn></LogIn>
          </div>
          <div className="text-2xl">Sign in with email.</div>
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
          <div className="flex flex-col">
            <Btn3
              title={"Login"}
              url="/"
              onClick={handleLogin}
              load={loading ? true : false}
            />
          </div>
          <CustomLink url="/signup" title="Don't have account? Signup." />
        </div>
        {error && <ErrorPop message="Invalid Email or Password" />}
      </div>
    </>
  );
};

export default Login;
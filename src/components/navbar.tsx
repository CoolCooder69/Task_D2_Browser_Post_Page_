import Logo from "./logo";
import Btn1 from "./Btn1";
import { NavigateHover } from "./navHover";
import { useAuth } from "@/Context/AuthContext";

const Navbar = () => {
  const { user, loading } = useAuth();

  return (
    <div className="w-full flex justify-center items-center mt-3 sm:mt-5 px-2 sm:px-0">
      <div className="w-full sm:w-11/12 rounded-xl px-3 py-3 sm:px-5 sm:py-5 flex flex-wrap items-center justify-between gap-3 bg-black">
        <Logo name="Deakin@Dev" />

        <div className="order-last w-full md:order-none md:w-auto md:min-w-2/6 bg-white rounded-xl flex items-center justify-center">
          <NavigateHover />
        </div>

        <div className="flex gap-2 sm:gap-5">
          <Btn1 name="Post" link="/post" />
          {user && !loading ? (
            <Btn1 name="Logout" link="/logout" />
          ) : (
            <Btn1 name="Login" link="/login" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
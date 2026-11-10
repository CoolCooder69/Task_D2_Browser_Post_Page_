import { useNavigate } from "react-router-dom";
import { useFirebase } from "@/Context/firebase";

const Logout = () => {
  const app = useFirebase();
  const navigate = useNavigate();


  const handleClick = async () => {
    await app?.logoutUser();
    navigate("/");
  };

  return (
    <>
      <div className="min-h-80 flex justify-center items-center">
        <div className="border rounded mx-4 p-4 text-center flex justify-center items-center flex-col gap-2">
          <p>Are You Sure, you want to logout?</p>
          <button
            onClick={handleClick}
            className="p-2 rounded bg-red-400 hover:scale-105"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Logout;
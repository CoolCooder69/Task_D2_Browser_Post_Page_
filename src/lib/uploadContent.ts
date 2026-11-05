import { useCallback } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";
import ErrorPop from "@/components/Errorpop";

interface IuploadContent {
  title: string;
  content: string;
}

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

const useUploadPost = () => {
  return useCallback(async ({ title, content }: IuploadContent) => {
    const user = getAuth().currentUser;
    if (!user) {
      ErrorPop({ message: "Please login to upload content." });
      return;
    }

    try {
      const token = await user.getIdToken();

      const res = await axios.post<{ id: string; tier: string }>(
        `${API_URL}/api/posts`,
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return res.data.id;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const message =
          err.response?.data?.message ?? "Upload failed. Please try again.";
        ErrorPop({ message });
      } else {
        console.error(err);
        ErrorPop({ message: "Something went wrong." });
      }
    }
  }, []);
};

export default useUploadPost;
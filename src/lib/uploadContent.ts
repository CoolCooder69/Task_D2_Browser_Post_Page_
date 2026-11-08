import { useCallback } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";
import ErrorPop from "@/components/Errorpop";



interface IuploadContent {
  title: string;
  content: string;
  thumbnail?: File | null | undefined;
}

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";
const CLOUDINARY_PUBLIC_KEY = import.meta.env.VITE_CLOUDINARY_PUBLIC_KEY;
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME; 
let thumbnailURL : string; 

const useUploadPost = () => {
  return useCallback(async ({ title, content, thumbnail }: IuploadContent) => {
    const user = getAuth().currentUser;
    if (!user) {
      ErrorPop({ message: "Please login to upload content." });
      return;
    }

    const handleThumbnail = async () => {
      if (!thumbnail) return;
      const token = await user.getIdToken(); 
      console.log(token); 
      const uploadSign = await axios.post<{
        signature: string;
        timestamp: string;
        folder: string;
      }>(`${API_URL}/api/uploadPhoto`, 
        {}, 
        { headers: { Authorization: `Bearer ${token}` } },
      );

      const photoData = new FormData();
      const { signature, timestamp, folder } = uploadSign.data;

      photoData.append("file", thumbnail);
      photoData.append("api_key", CLOUDINARY_PUBLIC_KEY);
      photoData.append("timestamp", String(timestamp));
      photoData.append("signature", signature);
      photoData.append("folder", folder); 
      
      const upload = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        photoData
      );
      
      if(upload.status == 200) thumbnailURL = upload.data?.url; 
    };
    try {
      const token = await user.getIdToken();

      if(thumbnail) await handleThumbnail();  
      const res = await axios.post<{ id: string; tier: string }>(
        `${API_URL}/api/posts`,
        { title, content, thumbnailURL },
        { headers: { Authorization: `Bearer ${token}` } },
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

import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithCustomToken,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import type ICreateUser from "@/interface/createUser";
import type { IauthContextType } from "@/interface/createUserContext";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const fireBaseAuth = getAuth(app);
export const db = getFirestore(app);

const FirebaseContext = createContext<IauthContextType | null>(null);

export const useFirebase = () => {
  const ctx = useContext(FirebaseContext);
  if (!ctx) throw new Error("useFirebase must be used inside FirebaseProvider");
  return ctx;
};

export const FirebaseProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [plan, setPlan] = useState<"free" | "premium">("free");
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(fireBaseAuth, (u) => {
      setUser(u);
      setAuthLoading(false);
      if (!u) setPlan("free");
    });
  }, []);


  useEffect(() => {
    if (!user?.email) return;
    return onSnapshot(
      doc(db, "users", user.email),
      (snap) => setPlan(snap.data()?.plan === "premium" ? "premium" : "free"),
      (err) => console.error("Plan listener error:", err.message)
    );
  }, [user]);

  const createUserWithMail = ({ email, password }: ICreateUser) =>
    createUserWithEmailAndPassword(fireBaseAuth, email, password);

  const loginInWIthMailAndPassword = ({ email, password }: ICreateUser) =>
    signInWithEmailAndPassword(fireBaseAuth, email, password);

  const loginInWithToken = (token: string) =>
    signInWithCustomToken(fireBaseAuth, token);

  const useDB = () => {
    return getFirestore(app); 
  }

  const logoutUser = async (): Promise<boolean> => {
    try {
      await signOut(fireBaseAuth);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <FirebaseContext.Provider
      value={{
        user,
        plan,
        isPremium: plan === "premium",
        authLoading,
        createUserWithMail,
        loginInWIthMailAndPassword,
        loginInWithToken,
        logoutUser,
        useDB
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
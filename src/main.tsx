import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { FirebaseProvider } from "@/Context/firebase";
import { AuthProvider } from "./Context/AuthContext";
import { Toaster } from "@/components/ui/sonner";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

const rootElement = document.getElementById("root"); 
if (!rootElement) throw new Error("Root element #root not found");

createRoot(rootElement).render(
  <BrowserRouter>
    <FirebaseProvider>
      <AuthProvider>
        <QueryClientProvider client={new QueryClient()}>
          <App />
          <ReactQueryDevtools/>
        </QueryClientProvider>
        <Toaster />
      </AuthProvider>
    </FirebaseProvider>
  </BrowserRouter>,
);



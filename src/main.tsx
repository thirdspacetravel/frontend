import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { trpcClient, trpc } from "./trpc/index";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";
const queryClient = new QueryClient();
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider clientId="837205847430-cnmsfum76sn97m054bogioi64gofpmse.apps.googleusercontent.com">
          <App />
        </GoogleOAuthProvider>
      </QueryClientProvider>
    </trpc.Provider>
  </StrictMode>,
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { trpcClient, trpc } from "./trpc/index";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { NotificationProvider } from "./components/utils/Notifications.tsx";
import App from "./App.tsx";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider clientId="837205847430-cnmsfum76sn97m054bogioi64gofpmse.apps.googleusercontent.com">
          <NotificationProvider>
            <App />
          </NotificationProvider>
        </GoogleOAuthProvider>
      </QueryClientProvider>
    </trpc.Provider>
  </StrictMode>,
);

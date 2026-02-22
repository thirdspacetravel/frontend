import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { trpcClient, trpc } from "./trpc/index";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </trpc.Provider>
  </StrictMode>,
);

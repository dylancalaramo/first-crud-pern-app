import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./context/theme.tsx";
import { EditAndDeleteTaskProvider } from "./context/editAndDeleteMode";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <ThemeProvider>
        <EditAndDeleteTaskProvider>
          <App />
        </EditAndDeleteTaskProvider>
      </ThemeProvider>
    </StrictMode>
  </QueryClientProvider>
);

import { HydrationBoundary, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { readPrerenderState } from "@/lib/prerender-state";

export const queryClient = new QueryClient();

function QueryProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={readPrerenderState()?.queryState}>
        {children}
      </HydrationBoundary>
    </QueryClientProvider>
  );
}

export { QueryProvider };

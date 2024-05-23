import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// const handleError = (error: unknown) => {
//     if (error instanceof Error) console.error(error.message);
// };

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            retry: 3,
            staleTime: 0,
            refetchInterval: 1000 * 60,
        },
    },
});

const QueryProvider = ({ children }: { children?: React.ReactNode }) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};

export { QueryProvider };

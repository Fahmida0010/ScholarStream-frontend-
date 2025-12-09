import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router/dom";
import { router } from './routes/Routes.jsx';
import AuthProvider from './contexts/AuthProvider.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <QueryClientProvider client={QueryClient}>  */}
     <AuthProvider>
      <RouterProvider router={router} />
      {/* <Toaster position='top-right' reverseOrder={false} /> */}
     </AuthProvider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      {/* </QueryClientProvider> */}
  </StrictMode>,
)
 
import { RouterProvider } from "react-router-dom"
import { router } from "./routing/appRoute/AppRoute"
import AuthContext from "./context/AuthContext"
import { ToastContainer } from "react-toastify"
import { QueryClient , QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

function App() {
  

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContext>
       <RouterProvider router={router} />
       <ToastContainer />
       <ReactQueryDevtools/>
      </AuthContext>
      </QueryClientProvider>
    </>
  )
}

export default App

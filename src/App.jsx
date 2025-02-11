import { createBrowserRouter, RouterProvider } from "react-router-dom";
import IntroPage from "./ui/onboarding/intro/pages/IntroPage";
import Register from "./ui/onboarding/Register/Register";
import Login from "./ui/onboarding/Login/Login";
const App = () => {
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <IntroPage />,
        
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/login",
        element: <Login/>
      }
      
    ]
  )
  return <RouterProvider router={router} />
}

export default App;

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import IntroPage from "./ui/onboarding/intro/pages/IntroPage";
import Register from "./ui/onboarding/Register/Register";
import Login from "./ui/onboarding/Login/Login";
import Home from './ui/app/Home/Home';
import About from "./ui/app/who/About";
import AskUs from "./ui/app/AskUs/AskUs";
import Servicespage from "./ui/app/Servicespage/Servicespage";
import FQAPAGE from "./ui/app/fqapage/FQAPAGE";
const App = () => {
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <Home />,
        
      },
      {
        path: "/intro",
        element: <IntroPage />,
        
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/about",
        element: <About/>
      },
      {
        path: "/askus",
        element: <AskUs/>
      }
      ,
      {
        path: "/serivcepage",
        element: <Servicespage/>
      },
      {
        path: "/FQAPAGE",
        element: <FQAPAGE/>
      }
      
    ]
  )
  return <RouterProvider router={router} />
}

export default App;

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import IntroPage from "./Pages/IntroPage";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Home from './Pages/Home'; // Corrected path
import About from "./Pages/About";
import AskUs from "./Pages/AskUs";
import Servicespage from "./Pages/Servicespage";
import FQAPAGE from "./Pages/FQAPAGE";
import NurseDashboard from "./Pages/nurse/NurseDashboard";
import Profilenurse from "./Pages/nurse/Profile";
import RequestNew from "./Pages/nurse/RequestNew";
import RequestsList from "./Pages/nurse/RequestsList";
import SharedLayout from "./ui/app/client/Pages/SharedLayout";
import UpdateProfile  from "./ui/app/client/Pages/UpdateProfile";
import  MyRequests  from "./ui/app/client/Pages/MyRequests";
import  NewRequst  from "./ui/app/client/Pages/NewRequst";
import  EditRequest  from "./ui/app/client/Pages/EditRequest";
import MyOffers from "./Pages/nurse/MyOffers";
import OffersPage from "./ui/app/client/Pages/OffersPage";
import AddReview from "./ui/app/client/Pages/AddReview";
import RequestReviwes  from "./Pages/nurse/RequestReviews"

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
      }, {
        path:"/nurse-dashboard",
        element : <NurseDashboard/>
      }, {
        path:"/Profilenurse",
        element : <Profilenurse/>
      }
      , {
        path:"/RequestNew",
        element :<RequestNew/>
      }, {
        path:"/MyOffers",
        element :<MyOffers/>
      }
      , {
        path:"/nurse-dashboard/:request_id",
        element :<RequestsList />
      }
      , {
        path:"/RequestReviwes/:nurseId",
        element :<RequestReviwes />
      }
    ,
  {
    path: "/SharedLayout",
    element: <SharedLayout/>, 
    children: [
      {
        path: "UpdateProfile", //لبداية
        element: <UpdateProfile />,
      },
      {
        path: "my-requests", //لبداية
        element: <MyRequests />,
      }, {
        path: "requsts", //لبداية
        element: <NewRequst/>,

      }, {
        path:"edit-request/:id",
        element:<EditRequest />
      }, {
        path:"offers/:requestId",
        element:<OffersPage />
      }, {
        path:"add-review/:offerId" ,
        element:<AddReview />
      }
    ],
  },
    ]
  )
  return (
    
    <RouterProvider router={router} />
  
  )
}

export default App;

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import IntroPage from "./ui/onboarding/intro/pages/IntroPage";
import Register from "./ui/onboarding/Register/Register";
import Login from "./ui/onboarding/Login/Login";
import Home from './ui/app/Home/Home';
import About from "./ui/app/who/About";
import AskUs from "./ui/app/AskUs/AskUs";
import Servicespage from "./ui/app/Servicespage/Servicespage";
import FQAPAGE from "./ui/app/fqapage/FQAPAGE";
import NurseDashboard from "./ui/app/nurse/NurseDashboard";
import Profilenurse from "./ui/app/nurse/Profile";
import RequestNew from "./ui/app/nurse/RequestNew";
import RequestsList from "./ui/app/nurse/RequestsList";
import SharedLayout from "./ui/app/client/Pages/SharedLayout";
import UpdateProfile  from "./ui/app/client/Pages/UpdateProfile";
import  MyRequests  from "./ui/app/client/Pages/MyRequests";
import  NewRequst  from "./ui/app/client/Pages/NewRequst";
import  EditRequest  from "./ui/app/client/Pages/EditRequest";
import MyOffers from "./ui/app/nurse/MyOffers";
import OffersPage from "./ui/app/client/Pages/OffersPage";
import AddReview from "./ui/app/client/Pages/AddReview";
import RequestReviwes  from "./ui/app/nurse/RequestReviews" 

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
      },{
        path:"/nurse-dashboard",
        element : <NurseDashboard/>
      },{
        path:"/Profilenurse",
        element : <Profilenurse/>
      }
      ,{
        path:"/RequestNew",
        element :<RequestNew/>
      },{
        path:"/MyOffers",
        element :<MyOffers/>
      }
      ,{
        path:"/nurse-dashboard/:request_id",
        element :<RequestsList />
      }
      ,{
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
      },{
        path: "requsts", //لبداية
        element: <NewRequst/>,

      },{
        path:"edit-request/:id",
        element:<EditRequest />
      },{
        path:"offers/:requestId",
        element:<OffersPage />
      },{
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

import { Outlet } from "react-router-dom";
import Header from "../../../shared/Header/Header";
// import Footer from "../../../shared/footer/Footer";
import  Sidebar  from "../Componands/Sidebar";
import Welcome from "./Welcome";
// import { NavBar } from "../Componant/NavBar";
export default function SharedLayout() {
  return (
  <>
        <Header/>
        <Sidebar/>
        <Welcome/>
        <Outlet/>
        {/* <Footer/> */}
  </>
  
  )
}

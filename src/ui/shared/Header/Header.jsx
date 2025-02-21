
import styled from "styled-components";
import avtar from "../../../assets/logoes.jpg"
import { IoPerson } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
const Header = () => {
  const [username, setUsername] = useState("");
  const [isNurse, setIsNurse] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    const storedName = localStorage.getItem("username");
    if (storedName) setUsername(storedName);
    const nurseId = localStorage.getItem("nurse_id");
    setIsNurse(nurseId !== "");
  }, []);
  const handleClick = () => {
    if (isNurse) {
      navigate("/nurse-dashboard");
    } else {
      navigate("/SharedLayout");
    }
  };

  return (
      
      <Headersection>
        <Nav>
          <img src={avtar} alt="" style={{ width: "180px" ,}}/>
          <NavLinks>
            <NavLink to="/"style={({ isActive }) => ({textDecoration: "none",color: isActive ? "#2395F8" : " rgb(20, 50, 120)"  })}>الرئيسيه</NavLink>
            <NavLink to="/about"style={({ isActive }) => ({textDecoration: "none",color: isActive ? "#2395F8" : " rgb(20, 50, 120)",  })}>من نحن</NavLink>
            <NavLink to="/askus"style={({ isActive }) => ({textDecoration: "none",color: isActive ? "#2395F8" : " rgb(20, 50, 120)",  })}> تواصل معنا</NavLink>
            <NavLink to="/serivcepage"style={({ isActive }) => ({textDecoration: "none",color: isActive ? "#2395F8" : " rgb(20, 50, 120)",  })}>الخدمات</NavLink>
            
            <NavLink to="/FQAPAGE"style={({ isActive }) => ({textDecoration: "none",color: isActive ? "#2395F8" : " rgb(20, 50, 120)",  })}>الاسئله الشائعه </NavLink>
          
          </NavLinks>
          <NavLinks>
            <h1 style={{ color:" rgb(20, 50, 120)" ,/* أزرق داكن */
                          fontSize: "24px",
                          fontWeight: "bold",
                          textAlign:" center",
                          marginBottom: "20px;"}}>مرحبًا {username ? ` ${username}` : "بك في التطبيق"}</h1>
            <IoPerson onClick={handleClick} style={{ fontSize: "24px",marginTop: "15px", cursor: "pointer" ,color:" rgb(20, 50, 120)" , }} />
          </NavLinks>
          
        </Nav>
      </Headersection>
      
  );
};




const Headersection = styled.header`
  width: 100%;
  position: fixed; 
  top: 0;
  left: 0;
  background: #fff;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  padding: 10px 0;
  z-index: 1000; 
  height: 80px;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin: auto;

`;



const NavLinks = styled.div`
  display: flex;
  line-height: 60px;
  gap: 20px;
  a {
    text-decoration: none;
    color: var(--secondary-color);
    font-weight: bold;
  }

`;


export default Header;

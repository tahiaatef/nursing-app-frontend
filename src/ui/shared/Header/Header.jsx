
import styled from "styled-components";
import avtar from "../../../assets/Vector.png"
import './header.css';
import { IoPerson } from "react-icons/io5";
import { IoNotifications } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { NavLink } from "react-router-dom";
const Header = () => {
  
  return (
    
      <Headersection>
        <Nav>
          <img src={avtar} alt="" className="avtar"/>
          <NavLinks>
            <NavLink to="/"style={({ isActive }) => ({textDecoration: "none",color: isActive ? "#2395F8" : "#000",  })}>الرئيسيه</NavLink>
            <NavLink to="/about"style={({ isActive }) => ({textDecoration: "none",color: isActive ? "#2395F8" : "#000",  })}>من نحن</NavLink>
            <NavLink to="/askus"style={({ isActive }) => ({textDecoration: "none",color: isActive ? "#2395F8" : "#000",  })}> تواصل معنا</NavLink>
            <NavLink to="/serivcepage"style={({ isActive }) => ({textDecoration: "none",color: isActive ? "#2395F8" : "#000",  })}>الخدمات</NavLink>
            
            <NavLink to="/FQAPAGE"style={({ isActive }) => ({textDecoration: "none",color: isActive ? "#2395F8" : "#000",  })}>الاسئله الشائعه </NavLink>
          
          </NavLinks>
          <NavLinks>
            <CiSearch />
            <IoNotifications />
            <IoPerson />
          </NavLinks>
          
        </Nav>
      </Headersection>
      
  );
};



// const Headersection = styled.header`
//   width: 100%;
//   margin : auto;
//   background: #fff;
//   box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
//   padding: 10px 0;
  
// `;
const Headersection = styled.header`
  width: 100%;
  position: fixed; 
  top: 0;
  left: 0;
  background: #fff;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  padding: 10px 0;
  z-index: 1000; 
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
  gap: 20px;
  a {
    text-decoration: none;
    color: var(--secondary-color);
    font-weight: bold;
  }

`;


export default Header;

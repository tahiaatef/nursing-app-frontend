

import styled from "styled-components";
import avtar from "../../../assets/logoes.jpg";
import { IoPerson } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; // استيراد الأيقونات

const Header = () => {
  const [username, setUsername] = useState("");
  const [isNurse, setIsNurse] = useState(false);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const storedName = localStorage.getItem("username");
    if (storedName) setUsername(storedName);
    const nurseId = localStorage.getItem("nurse_id");
    setIsNurse(nurseId !== "");
  }, []);

  const handleClick = () => {
    navigate(isNurse ? "/nurse-dashboard" : "/SharedLayout");
  };

  return (
    <Headersection>
      <Nav>
      <LogoContainer>
        <Avatar src={avtar} alt="User Avatar" />
        <Hamburger onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </Hamburger>
        </LogoContainer>
        <NavLinks className={isOpen ? "open" : ""}>
          <StyledNavLink to="/" onClick={() => setIsOpen(false)}>الرئيسية</StyledNavLink>
          <StyledNavLink to="/about" onClick={() => setIsOpen(false)}>من نحن</StyledNavLink>
          <StyledNavLink to="/serivcepage" onClick={() => setIsOpen(false)}>الخدمات</StyledNavLink>
          <StyledNavLink to="/askus" onClick={() => setIsOpen(false)}>تواصل معنا</StyledNavLink>
          <StyledNavLink to="/FQAPAGE" onClick={() => setIsOpen(false)}>الأسئلة الشائعة</StyledNavLink>
        </NavLinks>
        <UserSection>
          <Username>مرحبًا {username || "بك في التطبيق"}</Username>
          <PersonIcon onClick={handleClick} />
        </UserSection>
      </Nav>
      {isOpen && <Overlay onClick={() => setIsOpen(false)} />}
    </Headersection>
  );
};

const Avatar = styled.img`
  width: 140px;
  transition: all 0.3s ease-in-out;

  @media (max-width: 768px) {
    width: 100px;
  }

  @media (max-width: 480px) {
    width: 80px;
  }
`;
const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;
const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: rgb(20, 50, 120);
  font-weight: bold;
  font-size: 18px;
  padding: 10px;
  
  &.active {
    color: #2395F8;
  }

  @media (max-width: 768px) {
    display: block;
    width: 100%;
    padding: 10px;
  }
`;
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
  transition: all 0.3s ease-in-out;

  @media (max-width: 768px) {
    height: 65px;
  }

  @media (max-width: 480px) {
    height: 55px;
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin: auto;
  position: relative;

  @media (max-width: 768px) {
    width: 95%;
  }
`;

const Hamburger = styled.div`
  font-size: 25px;
  cursor: pointer;
  display: none;
  color: rgb(20, 50, 120);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: rotate(10deg);
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    position: absolute;
    top: 60px;
    left: 0;
    z-index: 1000;
    width: 100%;
    background: white;
    display: flex;
    flex-direction: column;
    gap: 15px;
    text-align: center;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transform: translateY(-100%);
    transition: transform 0.3s ease-in-out;
    opacity: 0;
    visibility: hidden;
    // &.open {
    //   transform: translateY(0); /* يظهر القائمة عند الفتح */
    // }
  }

  &.open {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }
`;


const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Username = styled.h1`
  color: rgb(20, 50, 120);
  font-size: 18px;
  font-weight: bold;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const PersonIcon = styled(IoPerson)`
  font-size: 24px;
  cursor: pointer;
  color: rgb(20, 50, 120);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

// خلفية شفافة عند فتح القائمة
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;



export default Header;

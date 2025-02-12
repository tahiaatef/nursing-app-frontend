
import styled from "styled-components";
import headerimg1 from "../../../../../assets/header1.png";
import './hero.css';
import Button from "../../../../shared/Button";
import heroimg2 from "../../../../../assets/header2.png";
import arrow from "../../../../../assets/Arrow.png";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <>
    <img src={headerimg1} alt="" className="hero-img1"/>
    <HeroSection>
    <HeroContent>
    <h1>NURSE ON</h1>
    <br/>
    <pre>بحث - نقرة - شفاء</pre>
    <br/>
    <p>خطوة واحدة تفصلك عن الانضمام</p>
    <Button onClick={() => navigate("/intro")}>ابدأ الآن</Button>
    <img src={arrow}/>
    </HeroContent>
    <img src={heroimg2} className="nurseimg2"/>
  </HeroSection>
  <br/>
  
  </>
  );
}

const HeroSection = styled.section`
  height: 400px;
  position: relative;
  display: flex;
  // align-items: center;
  justify-content: space-between;
`;

const HeroContent = styled.div`
  align-items: center;
  margin-top:100px;
  margin-right:200px;
  z-index:5;
  color: var(--secondary-color);
  h1 {
    font-size: 2.5rem;
  }
    pre {
      color: #1d84b5;
      font-size:40px
    }
`;

export default Hero;

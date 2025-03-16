
import styled from "styled-components";
import headerimg1 from "../../../../../assets/header1.png";
import Button from "../../../../shared/Button";
import heroimg2 from "../../../../../assets/header2.png";
import arrow from "../../../../../assets/Arrow.png";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <>
    <HeroImg1 src={headerimg1} alt="" />
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
    <NurseImg2 src={heroimg2} />
  </HeroSection>
  <br/>
  
  </>
  );
}



export default Hero;


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


const HeroImg1 = styled.img`
  position: absolute;
  right: 0;
  top: 0;
  z-index: -5;
  max-width: 100%;
  height: auto;
`;

const NurseImg2 = styled.img`
  margin-top: 20px;
  position: absolute;
  left: 170px;
  top: 70px;
  width: 500px;
  max-width: 80%;

  @media (max-width: 768px) {
    left: 50%;
    transform: translateX(-50%);
    width: 300px;
    top: 100px;
  }
`;

// const ArrowImg = styled.img`
//   margin-left: 10px;
//   width: 30px;

//   @media (max-width: 768px) {
//     width: 20px;
//   }
// `

import Header from "../Componants/Header"
import HeroSection from "../Componants/Hero";
import styled from "styled-components";
import What from "../Componants/What";
import Services from "../Componants/Services";
import Reviews from "../Componants/Reviews";
import FAQ from "../Componants/FAQ ";
import Footer from "../Componants/Footer"
const HomePage = () => {
  return (
    <>
    <Container>
    <Header/>
    <HeroSection/>
    <What/>
    <Services />
    <Reviews />
    <FAQ/>
    <Footer />
    </Container>
    </>
  );
};

export default HomePage;

const Container = styled.div`
  width: 100%;
  font-family: Arial, sans-serif;
  direction: rtl;
  text-align: center;

  
`;
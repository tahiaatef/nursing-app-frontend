import Header from "../../../ui/shared/Header/Header"
import HeroSection from "./component/Hero/Hero";
import styled from "styled-components";
import What from "./component/What/What";
import Services from "./component/Services/Services";
import Reviews from "./component/Reviews/Reviews";
import FAQ from "./component/Faq/FAQ ";
import Footer from "../../shared/footer/Footer"
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
  margin: 100px 0px auto 50px;
  
`;
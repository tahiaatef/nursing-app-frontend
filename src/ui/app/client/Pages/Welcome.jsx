import welcomeimg from "../../../../assets/welcome img.png";
import styled from "styled-components";

const WelcomeImage = styled.img`
  position: absolute;
  top: 300px;
  left: 0px;
  right: 300px;
  z-index: -1;
`;
const Welcome = () => {
  return (
    <>
      <WelcomeImage src={welcomeimg} alt="" />
      <div style={{ position: "absolute", zIndex: -1 , left: "50px", top: "160px" }}>
      <h1
        style={{
          textAlign: "center",
          marginTop: "100px",
          color: "var(--primary-color)",
        }}
      >
        مرحبا بكم في  <strong>ONurse</strong>
      </h1>
      <p
        style={{
          textAlign: "center",
          marginTop: "50px",  
          color: "var(--secondary-color)",
        }}
      >
        Onurse – لأن راحتك تهمنا! احصل على خدمات التمريض والرعاية الصحية التي تحتاجها بكل سهولة وسرعة.  
      </p>
      </div>
      
    </>
  );
}

export default Welcome;

import what from "../assets/what.png";
import styled from "styled-components";
import "../styles/what.css";
const What = () => {
  return (
    <Div>
      <img src={what} className="img-what"/>
    </Div>
  );
}
const Div = styled.div`
  margin-top:230px
`;
export default What;

import styled from "styled-components"
import Header  from "../../shared/Header/Header";
import Slider from "./Slider";
import RequestsList from "./RequestsList";

const MainContent = styled.main`
  max-width: 1200px;
  padding: 0 2rem;
  display: grid;
  gap: 2rem;
  margin-right:250px;
  margin-top:350px;
`

const RequestNew = () => {
  return (
    <>
      <Header/>
      <MainContent>
      <RequestsList/>
      <Slider/>
      </MainContent>
    </>
  );
}

export default RequestNew;

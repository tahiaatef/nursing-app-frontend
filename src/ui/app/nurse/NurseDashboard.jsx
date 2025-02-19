// import styled from "styled-components"
import Slider from "./Slider"
import Header  from "../../shared/Header/Header";
import RequestsList from "./RequestsList";

// const MainContent = styled.main`
//   max-width: 1200px;
//   padding: 0 2rem;
//   display: grid;
//   gap: 2rem;
//   margin-right:250px;
//   // margin-top:150px;
// `
const NurseDashboard = () => {
  return (
    <div dir="rtl">
      <Header/>
      {/* <MainContent>  */}
      <Slider/> 
      <RequestsList/>
      {/* </MainContent>  */}
    </div>
  )
}

export default NurseDashboard;




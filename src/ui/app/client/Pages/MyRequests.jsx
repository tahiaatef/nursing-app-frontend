
import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    const userId = localStorage.getItem("user_id");

    if (!userId) {
      console.error("User ID not found in localStorage");
      return;
    }

    const fetchRequests = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/requests/user/${userId}`);
        setRequests(res.data);
      } catch (error) {
        console.error("❌ Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);

  // حذف الطلب
  const handleDelete = async (requestId) => {
    try {
      await axios.delete(`http://localhost:5000/api/requests/${requestId}`);
      setRequests(requests.filter(request => request._id !== requestId));
    } catch (error) {
      console.error("❌ Error deleting request:", error);
    }
  };

  // تعديل الطلب
  const handleEdit = (requestId) => {
    navigate(`/SharedLayout/edit-request/${requestId}`);
  };

  // عرض العروض الخاصة بالطلب
  const handleViewOffers = (requestId) => {
    navigate(`/SharedLayout/offers/${requestId}`);
  };

  return (
    <Back>
    <Container>
        <H2>طلباتي</H2>
        {requests.length === 0 ? (
          <NoOffersMessage>لا توجد طلبات متاحة.</NoOffersMessage>
        ) : (
          requests.map(request => (
            <RequestCard key={request._id}>
              <Divm><Headp> العنوان :</Headp>  {request.title}</Divm>
              <Divm><Headp>الوصف :</Headp> {request.description}</Divm>
              <Divm><Headp> رقم الموبايل :</Headp> {request.phone} </Divm>
              <Divm><Headp> الحالة :</Headp> {request.status}</Divm>
              <ButtonGroup>
                <OfferButton onClick={() => handleViewOffers(request._id)}> العروض</OfferButton>
                <EditButton onClick={() => handleEdit(request._id)}>تعديل</EditButton>
                <DeleteButton onClick={() => handleDelete(request._id)}> حذف</DeleteButton>
              </ButtonGroup>
            </RequestCard>
          ))
        )}
      </Container>
    </Back>
  );
};

export default MyRequests;

const Back = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4f6f9;
  margin-right:250px;
  
`;

const Container = styled.div`
  width: 100%;
  padding: 200px;
  margin-top: -50px;
  
  
`;

const H2 = styled.h2`
  text-align: center;
  color: rgb(36, 53, 89);
  margin-bottom: 30px;
`;

// const NoRequests = styled.p`
//   text-align: center;
//   color: #7f8c8d;
//   font-size: 18px;
// `;



const RequestCard = styled.div`
  background:#6d9df2 ;
  padding: 15px;
  margin:30px 0;
  border-radius: 8px;
  box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.15); 
  text-align: center;
  color: white;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05); /* تكبير خفيف لجذب الانتباه */
    box-shadow: 4px 6px 15px rgba(0, 0, 0, 0.2); /* زيادة الظل عند التحويم */
  }
`;

const  Divm  = styled.div`
  background: rgba(250, 249, 249, 0.2);
  border-radius: 8px;
  box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.15); 
  padding:15px;
    font-weight:bold;

`
const Headp = styled.p`
  text-align:right;
  font-size:18px;
  // font-weight:bold;

`
const ButtonGroup = styled.div`
  display: flex;
  justify-content:center;
  margin-top: 15px;
`;

const Button = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
  font-size: 14px;
`;

const EditButton = styled(Button)`
  background:var(--color-dark);
  color: #fff;
  &:hover {
    background: rgb(51, 87, 179);
  }
  margin-left:40px; 
  margin-right:40px; 
`;

const DeleteButton = styled(Button)`
  background:rgb(157, 45, 33);
  color: #fff;
  &:hover {
    background: #c0392b;
  }

`;

const OfferButton = styled(Button)`
  background:rgb(18, 84, 46);
  color: #fff;
  &:hover {
    background: #27ae60;
  }
    
`;
const NoOffersMessage = styled.p`
  text-align: center;
  font-size: 1.5rem;
  color: #6b7280;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 8px;
  margin: 2rem auto;
  max-width: 600px;
`;

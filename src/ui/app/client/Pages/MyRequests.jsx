
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
    {/* <Container>
      <br/><br/>
      <H2>طلباتي</H2>
      {requests.length === 0 ? (
        <p>لا توجد طلبات متاحة.</p>
      ) : (
        requests.map(request => (
          <RequestCard key={request._id}>
            <h4> العنوان : {request.title}</h4>
            <p><strong>الوصف:</strong> {request.description}</p>
            <p><strong>رقم الموبيل :</strong> {request.price} </p>
            <p><strong>الحالة:</strong> {request.status}</p>
            <ButtonGroup>
              <EditButton onClick={() => handleEdit(request._id)}>✏️ تعديل</EditButton>
              <DeleteButton onClick={() => handleDelete(request._id)}>🗑️ حذف</DeleteButton>
              <OfferButton onClick={() => handleViewOffers(request._id)}>🎉 العروض</OfferButton>
            </ButtonGroup>
          </RequestCard>
        ))
      )}
    </Container> */}
     <Container>
        <H2>طلباتي</H2>
        {requests.length === 0 ? (
          <NoRequests>لا توجد طلبات متاحة.</NoRequests>
        ) : (
          requests.map(request => (
            <RequestCard key={request._id}>
              <h4>📌 العنوان:    {request.title}</h4><br/>
              <p><strong>📖 الوصف:   </strong> {request.description}</p><br/>
              <p><strong>📞 رقم الموبايل:   </strong> {request.price} </p><br/>
              <p><strong>🔄 الحالة:   </strong> {request.status}</p><br/>
              <ButtonGroup>
                <EditButton onClick={() => handleEdit(request._id)}>✏️ تعديل</EditButton>
                <DeleteButton onClick={() => handleDelete(request._id)}>🗑️ حذف</DeleteButton>
                <OfferButton onClick={() => handleViewOffers(request._id)}>🎉 العروض</OfferButton>
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
  // position: absolute;
  // left: 0px;
  // top: 0px;
  // height: 100vh;
  // right: 250px;
  // background-color: #f8f9fa;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f6f9;
  margin-right:250px;
  
`;

const Container = styled.div`
  width: 80%;
  max-width: 1000px;
  margin-top:200px;
  // background:  #f9f9f9;
  padding: 20px;
  // border-radius: 10px;
  // box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const H2 = styled.h2`
  text-align: center;
  color: var(--primary-color);
  margin-bottom: 20px;
`;

const NoRequests = styled.p`
  text-align: center;
  color: #7f8c8d;
  font-size: 18px;
`;

const RequestCard = styled.div`
  background:#ffffff;
  padding: 15px;
  margin: 15px 0;
  border-radius: 8px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  text-align: right;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
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
  background: #3498db;
  color: #fff;
  &:hover {
    background: #2980b9;
  }
`;

const DeleteButton = styled(Button)`
  background: #e74c3c;
  color: #fff;
  &:hover {
    background: #c0392b;
  }
`;

const OfferButton = styled(Button)`
  background: #2ecc71;
  color: #fff;
  &:hover {
    background: #27ae60;
  }
`;

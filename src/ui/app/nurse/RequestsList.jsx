
import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const RequestsList = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");

  // ✅ تحميل البيانات مع التحقق من الطلبات المحفوظة في localStorage
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/requests", {
        "headers": {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }})
      .then((response) => {
        console.log(response.data);
        const updatedRequests = response.data.map((req) => ({
          ...req,
          status: req.status || "pending",
        }));
        setRequests(updatedRequests);
      })
      .catch((error) => console.error("Error fetching requests:", error));
  }, []);

  const handleAcceptClick = (request) => {
    if (request.status !== "open") return;
    setSelectedRequest(request);
    setPrice("");
    setMessage("");
  };

  const submitAcceptRequest = () => {
    if (!price || !message) {
      alert("يرجى إدخال السعر والرسالة!");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to accept requests.");
      return;
    }

    axios
      .post(
        "http://localhost:5000/api/acceptRequests",
        { request_id: selectedRequest._id, price, message },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        setRequests((prev) => {
          const updatedRequests = prev.map((req) =>
            req._id === selectedRequest._id ? { ...req, accepted: true } : req
          );

          // ✅ حفظ الطلبات المقبولة في localStorage
          const acceptedRequests = updatedRequests
            .filter((req) => req.accepted)
            .map((req) => req._id);

          localStorage.setItem("acceptedRequests", JSON.stringify(acceptedRequests));

          return updatedRequests;
        });

        setSelectedRequest(null); // ✅ إخفاء المودال بعد الإرسال
      })
      .catch((error) => console.error("Error accepting request:", error));
  };

  return (
    // <Container>
    //   {requests.length > 0 ? (
    //     requests.map((req, index) => (
    //       <RequestCard key={req.id || req._id || index}>
    //         {req.img && <Image src={req.img} alt="Request Image" />}
    //         <Details>
    //           <Dev1>
    //             <Item status={req.status}>{req.status}</Item>
    //             <Item2>{req.approved ? "Approved" : "Pending"}</Item2>
    //           </Dev1>
    //           <Title>{req.title || "No Title"}</Title>
    //           <Description>{req.description || "No Description"}</Description>
    //           {req.price && <Price>السعر: ${req.price}</Price>}
    //         </Details>
    //         {/* <Button $accepted={req.accepted} $disabled={req.accepted}>
    //           {req.accepted ? "Accepted" : "Accept"}
    //         </Button> */}
    //         <Button
    //             onClick={() => handleAcceptClick(req)}
    //             $disabled={req.status !== "open" || req.accepted}
    //             $accepted={req.accepted}
    //           >
    //             {req.status === "open" ? (req.accepted ? "Accepted" : "Accept") : "Unavailable"}
    //           </Button>
    //       </RequestCard>
    //     ))
    //   ) : (
    //     <p>لا يوجد طلبات متاحه </p>
    //   )}
    //     {/* Modal for entering price & message */}
    //     {selectedRequest && (
    //       <ModalOverlay>
    //         <ModalContent>
    //           <h2>أدخل التفاصيل</h2>
    //           <Input
    //             type="number"
    //             placeholder="السعر"
    //             value={price}
    //             onChange={(e) => setPrice(e.target.value)}
    //           />
    //           <Input
    //             type="text"
    //             placeholder="الرسالة"
    //             value={message}
    //             onChange={(e) => setMessage(e.target.value)}
    //           />
    //           <div style={{ marginTop: "10px" }}>
    //             <Button onClick={() => setSelectedRequest(null)}>إلغاء</Button>
    //             <Button onClick={submitAcceptRequest} style={{ marginLeft: "10px" }}>
    //               إرسال
    //             </Button>
    //           </div>
    //         </ModalContent>
    //       </ModalOverlay>
    //     )}
    // </Container>
    <Container>
      {requests.length > 0 ? (
        <GridContainer>
          {requests.map((req, index) => (
            <RequestCard key={req.id || req._id || index}>
              {req.img && <Image src={req.img} alt="Request Image" />}
              <Details>
                <Title>{req.title || "No Title"}</Title>
                <Description>{req.description || "No Description"}</Description>
                <Price>السعر: {req.price ? `$${req.price}` : "غير محدد"}</Price>
                <StatusContainer>
                  <Item  $status={req.status}>{req.status}</Item>
                  <Item2>{req.approved ? "Approved" : "Pending"}</Item2>
                </StatusContainer>
                <Button
                        onClick={() => handleAcceptClick(req)}
                        disabled={req.status !== "open" || req.accepted}
                        $accepted={req.accepted}
                        >
                    {req.status === "open" ? (req.accepted ? "Accepted" : "Accept") : "Unavailable"}
                </Button>
              </Details>
            </RequestCard>
          ))}
        </GridContainer>
      ) : (
        <p>لا يوجد طلبات متاحه </p>
      )}
      {selectedRequest && (
        <ModalOverlay>
          <ModalContent>
            <h2>أدخل التفاصيل</h2>
            <Input
              type="number"
              placeholder="السعر"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <Input
              type="text"
              placeholder="الرسالة"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div style={{ marginTop: "10px" }}>
              <Button onClick={() => setSelectedRequest(null)}>إلغاء</Button>
              <Button onClick={submitAcceptRequest} style={{ marginLeft: "10px" }}>
                إرسال
              </Button>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default RequestsList;



const Image = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #ddd;
`;

const Details = styled.div`
  flex: 1;
  padding-left: 15px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 18px;
  color: #333;
`;

const Description = styled.p`
  margin: 5px 0;
  color: #666;
`;

const Price = styled.p`
  font-weight: bold;
  color: green;
`;




const Container = styled.div`
  max-width: 1200px;
  padding: 20px;
  font-family: Arial, sans-serif;
  // background-color:red;
  margin-top:-200px;
  margin-right:100px
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const RequestCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const StatusContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
`;

// const Item = styled.div`
//   background-color: ${(props) =>
//     props.status === "open" ? "blue" : props.status === "in_progress" ? "orange" : "red"};
//   color: white;
//   padding: 8px;
//   border-radius: 5px;
//   font-size: 12px;
//   font-weight: bold;
// `;
const Item = styled.div`
  background-color: ${(props) =>
    props.$status === "open" ? "blue" :
    props.$status === "in_progress" ? "orange" : "red"};
  color: white;
  padding: 8px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: bold;
`;


const Item2 = styled.div`
  color: green;
  font-weight: bold;
`;

// const Button = styled.button`
//   background: ${(props) => (props.accepted ? "green" : "#007BFF")};
//   color: white;
//   padding: 10px;
//   border-radius: 5px;
//   cursor: pointer;
//   transition: background 0.3s;

//   &:hover {
//     background: ${(props) => (props.accepted ? "darkgreen" : "#0056b3")};
//   }
// `;

const Button = styled.button`
  background: ${(props) => (props.$accepted ? "green" : "#007BFF")};
  color: white;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: ${(props) => (props.$accepted ? "darkgreen" : "#0056b3")};
  }
`;

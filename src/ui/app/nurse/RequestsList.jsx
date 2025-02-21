
import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";


const RequestsList = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");
  const [expanded, setExpanded] = useState({});




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

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Container>
      {requests.length > 0 ? (
        <GridContainer>
          {requests.map((req, index) => (
            <RequestCard key={req.id || req._id || index}>
              <Item2 $approved={req.approved}>{req.approved ? "تم الموافقه" : "انتظار"}</Item2>
              <Details>
                <Title> العنوان : {req.title || "No Title"}</Title>
                <Description>
                  <strong>وصف الطلب :</strong>  
                  {expanded[req._id] || (req.description || "").length <= 50
                    ? req.description || "No Description"
                    : `${req.description.substring(0, 50)}... `}
  
                    {(req.description || "").length > 50 && (
                <span 
                    onClick={() => toggleExpand(req._id)} 
                      style={{ color: "var(--primary-color)", cursor: "pointer", fontWeight: "bold" }}
                >
                {expanded[req._id] ? "عرض أقل" : "عرض المزيد"}
                </span>
                )}
                </Description>
                <Price>رقم الهاتف : {req.price ? `${req.price}` : " لم يتم ارساله"}</Price>
                <Item $status={req.status === "open" ? "مفتوح" : req.status === "في حاله التنفيذ" ? "في حاله التنفيذ" : "مغلق"}>
                    حاله الطلب : { req.status === "open" ? "مفتوح" : req.status === "في حاله التنفيذ" ? "في حاله التنفيذ" : "مغلق"}
                </Item>
                <br/>
                <Button
                        onClick={() => handleAcceptClick(req)}
                        disabled={req.status !== "open" || req.accepted}
                        $accepted={req.accepted}
                        >
                    {req.status === "open" ? (req.accepted ? "تم اضافه العرض " : "اضافه عرض ") : "غير متاح "}
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
              <Putton Putton onClick={() => setSelectedRequest(null)}>إلغاء</Putton>
              <Putton onClick={submitAcceptRequest} style={{ marginRight: "30px" }}>
                إرسال
              </Putton>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default RequestsList;



const Details = styled.div`
  flex: 1;
  padding-left: 15px;
`;

const Title = styled.h3`
  margin: 5px 0;
  font-size: 16px;
  color: #333;
`;

const Price = styled.p`
  font-weight: bold;
  color: rgb(137, 135, 135) ;
  margin: 5px 0;
`;

const Container = styled.div`
  max-width: 1200px;
  padding: 20px;
  margin-top:-200px;
  margin-right:100px;
  
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const Item = styled.p`
  color: ${(props) =>
    props.$status === "مفتوح" ? "blue" :
    props.$status === "في حاله التنفيذ" ? "orange" : "red"};
  font-weight: bold;
  margin: 5px 0;
`;

const Item2 = styled.div`
  color: ${(props) => (props.$approved ? "green" : "#D3D3D3")};
  font-weight: bold;
`;

const RequestCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  min-height: 250px; /* ارتفاع مناسب */
  justify-content: space-between;

  &:hover {
    transform: scale(1.05);
  }
`;

const Description = styled.p`
  margin: 5px 0;
  color: #666;
  line-height: 1.4;
  text-align: justify;
`;

const Button = styled.button`
  background: ${(props) => (props.$accepted ? "green" : "#007BFF")};
  color: white;
  padding: 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  width: 90%;
  // margin-top: 10px;
  transition: background 0.3s;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);


  &:hover {
    background: ${(props) => (props.$accepted ? "darkgreen" : "#0056b3")};
  }
`;

const Putton = styled.button`
  color: white;
  padding: 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  background : var(--primary-color);
  width:20%

`

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
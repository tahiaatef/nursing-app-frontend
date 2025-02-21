import Header  from "../../shared/Header/Header";
import Slider from "./Slider";
import  { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

const MainContent = styled.main`
  max-width: 1200px;
  padding: 0 2rem;
  display: grid;
  gap: 2rem;
  margin-right:450px;
  margin-top:150px;
`


const Container = styled.div`
    width: 50%;
    text-align: center;
    margin-right : 150px;
    
  word-wrap: break-word;
  overflow-wrap: break-word;
`;

const RequestCard = styled.div`
    background: #f9f9f9;
    padding: 15px;
    margin: 20px 0;
    border-radius: 8px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    text-align: right;
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
`;

const EditButton = styled.button`
    background: var(--primary-color);
    color: #fff;
    border: none;
    padding: 8px 12px;
    cursor: pointer;
    border-radius: 5px;
    display: block;
`;

const DeleteButton = styled.button`
    background: #ff4444;
    color: #fff;
    border: none;
    padding: 8px 12px;
    cursor: pointer;
    border-radius: 5px;
`;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    min-width: 300px;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
`;
const  Pp = styled.h2`
color:#000;

`
const Button = styled.button`
    background: var(--primary-color);
    color: #fff;
    border: none;
    padding: 8px 12px;
    cursor: pointer;
    border-radius: 5px;
    display: inline-block;
`;

// --- MyOffers Component ---
const MyOffers = () => {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [price, setPrice] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchOffers();
    }, []);

    const fetchOffers = async () => {
        try {
            const user_id = localStorage.getItem("user_id");
            if (!user_id) {
                throw new Error("User ID not found in localStorage");
            }
            const response = await axios.get(
                `http://localhost:5000/api/acceptRequests/nurse/${user_id}`
            );
            console.log("📌 بيانات العروض:", response.data); // ← طباعة البيانات القادمة من API
            setOffers(response.data);
        } catch (error) {
            console.error("Error fetching offers:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (offerId) => {
        try {
            await axios.delete(`http://localhost:5000/api/acceptRequests/${offerId}`);
            setOffers((prevOffers) => prevOffers.filter((offer) => offer._id !== offerId));
            console.log("Offer deleted successfully");
            setError(null);
        } catch (error) {
            console.error("Error deleting offer:", error);
            setError(error.message);
        }
    };

    const handleEdit = (offer) => {
        setSelectedRequest(offer);
        setPrice(offer.price);
        setMessage(offer.message);
    };

    const submitAcceptRequest = async () => {
        try {
            const offerId = selectedRequest._id;
            console.log("🚀 إرسال التعديل:", { offerId, price, message });
            const response = await axios.put(`http://localhost:5000/api/acceptRequests/${offerId}/accept`,
                { price, message }
            );
            console.log("✅ تحديث العرض:", response.data);
            // تحديث حالة العروض بشكل صحيح
            setOffers((prevOffers) =>
                prevOffers.map((offer) =>
                    offer._id === offerId ? { ...offer, price, message } : offer
                )
            );
            
            setSelectedRequest(null); // إخفاء ال overlay
            fetchOffers();
            console.log("Offer updated successfully");
            setError(null);
        } catch (error) {
            console.error("Error updating offer:", error);
            setError(error.response?.data?.message || error.message);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
      <>
      <Header/>
      <Slider/>
      <MainContent>
      <Container>
            <h2 style={{color: "var(--primary-color)"}}>عروضي</h2>
            <br />
            {offers.length === 0 ? (
                <Pp>لم تقدم علي عرض بعد</Pp>
            ) : (
                offers.map((offer) => (
                    <RequestCard key={offer._id}>
                        <h3>{offer.title}</h3>
                        <p>
                            <strong>السعر:</strong> {offer.price} جنيه
                        </p>
                        <p>
                            <strong>الرساله:</strong> {offer.message}
                        </p>
                        <ButtonGroup>
                            <EditButton onClick={() => handleEdit(offer)}>
                                  تعديل
                            </EditButton>
                            <DeleteButton onClick={() => handleDelete(offer._id)}>
                                ️ حذف
                            </DeleteButton>
                        </ButtonGroup>
                    </RequestCard>
                ))
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
                            <Button onClick={submitAcceptRequest} style={{ marginRight: "10px" }}>
                                إرسال
                            </Button>
                        </div>
                    </ModalContent>
                </ModalOverlay>
            )}
      </Container>
      </MainContent>
      
      </>
    );
};

export default MyOffers;




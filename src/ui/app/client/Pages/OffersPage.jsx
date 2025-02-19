
import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useParams ,useNavigate} from "react-router-dom";

const OffersPage = () => {
  const { requestId } = useParams();
  const [offers, setOffers] = useState([]);
  const [message, setMessage] = useState(""); // إضافة حالة لعرض الرسالة
  // const [patientId, setPatientId] = useState(""); // تعريف patientId هنا
  const [nurseId, setNurseId] = useState(""); // تعريف nurseId هنا

  // console.log("patientId:", patientId);
  console.log("nurseId:", nurseId);
  console.log("requestId:", requestId);
  

  useEffect(() => {
    if (!requestId) {
      console.error("❌ requestId is missing in URL");
      return;
    }

    const fetchOffers = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/acceptRequests/offers/${requestId}`);
        console.log(response.data);
        
        setOffers(response.data);
        if (response.data && response.data.length > 0) {
          const firstOffer = response.data[0];
          
          // تأكد من أن الحقول موجودة
          if (firstOffer.nurse && firstOffer.nurse._id) {
            setNurseId(firstOffer.nurse._id);
          }
          
        
          setOffers(response.data); // تأكد من تعيين العروض هنا
        } else {
          console.error("❌ No offers found for this request");
        }
        
      } catch (error) {
        console.error("❌ Error fetching offers:", error);
        if (error.response) {
          // استجابة من السيرفر، مثل خطأ 404 أو 500
          console.error("Server responded with:", error.response.data);
          console.error("Server status:", error.response.status);
        } else if (error.request) {
          // مشكلة في إرسال الطلب (مثلاً انقطاع الإنترنت)
          console.error("Request was made but no response received:", error.request);
        } else {
          // خطأ آخر
          console.error("Error setting up the request:", error.message);
        }
      }
    };

    fetchOffers();
  }, [requestId]);

  const handleApply = async (offerId) => {
    try {
      await axios.put(`http://localhost:5000/api/acceptRequests/${offerId}/accept`);
      setMessage("تم تعجيل الطلب بنجاح!"); // تغيير الرسالة عند تطبيق العرض

      // إخفاء الرسالة بعد 3 ثواني
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("❌ Error updating request status:", error);
      setMessage("حدث خطأ أثناء تعجيل الطلب."); // رسالة في حالة حدوث خطأ

      // إخفاء الرسالة بعد 3 ثواني
      setTimeout(() => setMessage(""), 3000);
    }
  };
  

  const navigate = useNavigate(); // استخدام useNavigate للحصول على دالة التنقل

  const handleNavigation = () => {
    // const requestId = "request123";  
    // const nurseId = "nurse456";      

    // التنقل إلى الصفحة مع تمرير state
    navigate('/SharedLayout/add-review/${offer._id}', {
      state: { requestId, nurseId },  // تمرير الـ state هنا
    });
  };
  return (
    <Back>
      <Container>
        <br /><br />
        <H2>العروض المتاحة</H2>
        {message && <Message>{message}</Message>} {/* عرض الرسالة إذا كانت موجودة */}
        {offers.length === 0 ? (
          <Ppm>لا توجد عروض متاحة لهذا الطلب</Ppm>
        ) : (
          offers.map(offer => (
            <OfferCard key={offer._id}>
              <h3>{offer.nurse.first_name} {offer.nurse.last_name}</h3>
              <p><strong>السعر:</strong> {offer.price ? offer.price : "غير متوفر"} جنيه</p>
              <p><strong>الوصف:</strong> {offer.message ? offer.message : "لا يوجد وصف"}</p>
              <ApplyButton onClick={() => handleApply(offer._id)}>✔️ تطبيق</ApplyButton>
              <ReviewButton onClick={() => handleNavigation(offer._id)}>إضافة مراجعة 📝</ReviewButton>
            </OfferCard>
          ))
        )}
      </Container>
    </Back>
  );
};

export default OffersPage;

const Back = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  height: 100vh;
  right: 250px;
  background-color: #f8f9fa;
`;
const Ppm = styled.h2`


`
const H2 = styled.h2`
  text-align: center;
  color: var(--primary-color);
  margin-bottom: 20px;
  margin-top: 100px;
`;

const Container = styled.div`
  margin-right: 90px;
  margin-top: 0px;
  text-align: center;
  background-color: #f8f9fa;
`;

const OfferCard = styled.div`
  background: #f9f9f9;
  padding: 15px;
  margin: 20px 100px;
  border-radius: 8px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  text-align: right;
`;

const ApplyButton = styled.button`
  background: #28a745;
  color: #fff;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 5px;
`;

const Message = styled.div`
  background-color: #28a745;
  width: 400px;
  margin-right: 350px;
  color: white;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  text-align: center;
  font-size: 16px;
`;

const ReviewButton = styled.button`
  background: #007bff;
  color: #fff;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 5px;
  margin-left: 10px;
`;






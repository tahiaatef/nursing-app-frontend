
// import { useEffect, useState } from "react";
// import axios from "axios";
// import Header  from "../../shared/Header/Header";
// import Slider from "./Slider";
// import styled from "styled-components";
// const MainContent = styled.main`
//   max-width: 1200px;
//   padding: 0 2rem;
//   display: grid;
//   gap: 2rem;
//   margin-right:450px;
//   margin-top:150px;
// `
// const RequestReviews = () => {
//   const nurseId = localStorage.getItem("nurse_id"); 
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   console.log("Nurse ID from localStorage:", nurseId);


//   useEffect(() => {
//     if (!nurseId) {
//       console.error("❌ nurseId is missing!");
//       setError("Nurse ID is required");
//       setLoading(false);
//       return;
//     }


//     console.log("🔍 Fetching reviews for nurseId:", nurseId);

//     axios
//       .get(`http://localhost:5000/api/reviews/nurse/${nurseId}`)
//       .then((response) => {
//         console.log("✅ Reviews fetched:", response.data);
//         setReviews(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("❌ Error fetching reviews:", error);
//         setError("Failed to load reviews");
//         setLoading(false);
//       });
//   }, [nurseId]);

//   return (
//     <>
//     <Header/>
//     <Slider/>
//     <MainContent>
//     <div>
//       <h3>التقيمات</h3>
//       {loading && <p>Loading reviews...</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {!loading && !error && reviews.length > 0 ? (
//         reviews.map((review) => (
//           <div key={review._id} style={{ border: "1px solid #ddd", padding: "10px", margin: "5px" }}>
//             <p><strong>Rating:</strong> {review.rating} ⭐</p>
//             <p><strong>Comment:</strong> {review.comment}</p>
//           </div>
//         ))
//       ) : (
//         !loading && <p>لا يوجد تقيمات حتي الان </p>
//       )}
//     </div>
//     </MainContent>
//     </>
//   );
// };

// export default RequestReviews;
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../shared/Header/Header";
import Slider from "./Slider";
import styled from "styled-components";

const MainContent = styled.main`
  max-width: 800px;
  margin: 150px auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h3`
  font-size: 24px;
  font-weight: bold;
  color: var(--primary-color);
  margin-bottom: 20px;
`;

const ReviewCard = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 15px;
  width: 100%;
  text-align: right;
  border-left: 5px solid var(--primary-color);
`;

const Rating = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #ffcc00;
`;

const Comment = styled.p`
  font-size: 16px;
  color: #333;
`;

const ErrorMessage = styled.p`
  color: red;
  font-weight: bold;
`;

const RequestReviews = () => {
  const nurseId = localStorage.getItem("nurse_id");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!nurseId) {
      console.error("❌ nurseId is missing!");
      setError("Nurse ID is required");
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:5000/api/reviews/nurse/${nurseId}`)
      .then((response) => {
        setReviews(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("❌ Error fetching reviews:", error);
        setError("Failed to load reviews");
        setLoading(false);
      });
  }, [nurseId]);

  return (
    <>
      <Header />
      <Slider />
      <MainContent>
        <Title>💬 التقييمات</Title>
        {loading && <p>⏳ جاري تحميل التقييمات...</p>}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {!loading && !error && reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewCard key={review._id}>
              <Rating>⭐ {review.rating} / 5</Rating>
              <Comment>📝 {review.comment}</Comment>
            </ReviewCard>
          ))
        ) : (
          !loading && <p>🚫 لا يوجد تقييمات حتى الآن.</p>
        )}
      </MainContent>
    </>
  );
};

export default RequestReviews;

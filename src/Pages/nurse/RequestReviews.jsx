import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../Componants/Header"; // Corrected path
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

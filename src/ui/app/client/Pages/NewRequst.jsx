
import { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height:100vh;
  background-color: #f8f9fa;
  
`;

const FormWrapper = styled.div`
  background: white;
  margin-right : 200px;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 800px;
`;

const Title = styled.h2`
  color: #2395f8;
  text-align: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  resize: none;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #2395f8;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #1a7ac4;
  }
`;

const ErrorMsg = styled.p`
  color: red;
  font-size: 14px;
`;

export default function NewRequest() {
  const [requestData, setRequestData] = useState({
    title: "",
    description: "",
    price: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const validateForm = () => {
    let newErrors = {};
    if (!requestData.title.trim()) newErrors.title = "يجب إدخال عنوان الطلب";
    if (!requestData.description.trim()) newErrors.description = "يجب إدخال وصف الطلب";
    if (!requestData.price.trim() || isNaN(requestData.price)) newErrors.price = "يجب إدخال سعر صحيح";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequestData({ ...requestData, [name]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const userId = localStorage.getItem("user_id") || "معرف_افتراضي";
      await axios.post("http://localhost:5000/api/requests", { ...requestData, user_id: userId });
      setMessage("✅ تم إرسال الطلب بنجاح!");
      setRequestData({ title: "", description: "", price: "" });
    } catch (error) {
      setMessage(`❌ :${error}ث خطأ أثناء الإرسالح`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <FormWrapper>
        <Title>طلب جديد</Title>
        
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="title"
            placeholder=" يرجي كتابه عنوان حضرتك بالتفاصيل "
            value={requestData.title}
            onChange={handleChange}
          />
          {errors.title && <ErrorMsg>{errors.title}</ErrorMsg>}

          <Input
            type="tel"
            name="price"
            placeholder="رقم الهاتف"
            value={requestData.price}
            onChange={handleChange}
          />
          {errors.price && <ErrorMsg>{errors.price}</ErrorMsg>}

          <TextArea
            name="description"
            placeholder="يرجي كتابه حاله المريض وما تحتاجه بوضوح "
            rows="4"
            value={requestData.description}
            onChange={handleChange}
          />
          {errors.description && <ErrorMsg>{errors.description}</ErrorMsg>}

          <Button type="submit" disabled={loading}>
            {loading ? "جاري الإرسال..." : "إرسال الطلب"}
          </Button>
          {message && <P1>{message}</P1>}
        </form>
      </FormWrapper>
    </Container>
  );
}


const P1 = styled.p`
  text-align : center ;
  margin-top : 10px;
  color:var(--primary-color);
`
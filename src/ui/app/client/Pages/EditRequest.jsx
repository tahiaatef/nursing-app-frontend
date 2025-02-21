
const Back = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  right: 250px;
  background-color: #f8f9fa;
  // padding: 60px;
  height:100vh; 
`;
const Container = styled.div`
  margin-top: 150px;
  margin-right: 130px;
  margin-left:80px;
  text-align: center;
  background: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  color:var(--primary-color);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label`
  font-weight: bold;
  text-align: right;

`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Textarea = styled.textarea`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;
  height: 80px;
`;

const Select = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  background: #28a745;
  color: #fff;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 10px;
`;

const BackButton = styled.button`
  background: #007bff;
  color: #fff;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 10px;
  display: block;
  width: 100%;
`;

const SuccessMessage = styled.p`
  background: #d4edda;
  color: #155724;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #c3e6cb;
  margin-bottom: 10px;
`;

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

const EditRequest = () => {
  const { id } = useParams();
  console.log("📌 ID from URL:", id);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState(null); // خليها `null` بدل ما تكون فارغة

  const [successMessage, setSuccessMessage] = useState("");
  

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/requests/${id}`);
        console.log("📥 البيانات المسترجعة:", res.data); // تأكيد جلب البيانات
        setFormData(res.data);
      } catch (error) {
        console.error("❌ خطأ في جلب البيانات:", error);
      }
    };

    fetchRequest();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/requests/${id}`, formData);
      setSuccessMessage("✅ تم حفظ التعديل بنجاح!");
      
      // ✅ إعادة تحميل البيانات بعد الحفظ
      const updatedRes = await axios.get(`http://localhost:5000/api/requests/${id}`);
      setFormData(updatedRes.data);
  
    } catch (error) {
      console.error("❌ خطأ في تحديث البيانات:", error);
    }
  };
  

  return (
    <Back>
    <Container>
      <h2>تعديل الطلب</h2>

      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}

      {/* عرض رسالة تحميل إذا لم يتم جلب البيانات بعد */}
      {!formData ? (
        <p>⏳ جاري تحميل البيانات...</p>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Label>العنوان:</Label>
          <Input type="text" name="title" value={formData.title} onChange={handleChange} required />

          <Label>الوصف:</Label>
          <Textarea name="description" value={formData.description} onChange={handleChange} required />

          <Label>السعر:</Label>
          <Input type="number" name="price" value={formData.price} onChange={handleChange} required />

          <Label>الحالة:</Label>
          <Select name="status" value={formData.status} onChange={handleChange}>
            <option value="مفتوح">مفتوح</option>
            <option value="في حاله التنفيذ">في حاله التنفيذ</option>
            <option value="مغلقه">مغلقه</option>
          </Select>
          <Button type="submit">💾 حفظ التعديلات</Button>
        </Form>
      )}

      <BackButton onClick={() => navigate("/SharedLayout/my-requests")}>🔙 الرجوع إلى الطلبات</BackButton>
    </Container>
    </Back>
  );
};

export default EditRequest;


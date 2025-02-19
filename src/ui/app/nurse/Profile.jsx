import styled from "styled-components"
import Header  from "../../shared/Header/Header";
import Slider from "./Slider";
import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile_number: "",
    user_name: "",
    city: "",
    country: "",
  });
  const [message, setMessage] = useState("");
  const userId = localStorage.getItem("user_id");

  // جلب بيانات المستخدم عند تحميل الصفحة
  useEffect(() => {
    if (!userId) {
      console.error("User ID غير موجود في localStorage");
      setMessage("خطأ: لم يتم العثور على المستخدم.");
      return;
    }

    axios
      .get(`http://localhost:5000/api/users/${userId}`)
      .then((response) => {
        setFormData(response.data); // تخزين البيانات في الفورم
      })
      .catch((error) => {
        console.error("حدث خطأ أثناء جلب البيانات:", error);
        setMessage("حدث خطأ أثناء تحميل البيانات.");
      });
  }, [userId]);

  // تحديث البيانات عند التعديل في الحقول
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // احضار التوكن من localStorage
      await axios.put("http://localhost:5000/api/users/",formData,{
      headers: {
      Authorization: `Bearer ${token}`, // إضافة التوكن في الهيدر
      "Content-Type": "application/json",
    },
  }
);

      
      setMessage("تم تحديث البيانات بنجاح!");
    } catch (error) {
      console.error("خطأ أثناء التحديث:", error);
      setMessage("حدث خطأ أثناء تحديث البيانات.");
    }
  };
  
  return (
    <>
      <Header/>
      <MainContent>    
    <Container>
    <H2>تحديث الملف الشخصي</H2>
    {message && <Message>{message}</Message>}
    <form onSubmit={handleSubmit}>
      <Input type="text" name="first_name" placeholder="الاسم الأول" value={formData.first_name} onChange={handleChange} required />
      <Input type="text" name="last_name" placeholder="الاسم الأخير" value={formData.last_name} onChange={handleChange} required />
      <Input type="email" name="email" placeholder="البريد الإلكتروني" value={formData.email} onChange={handleChange} required />
      <Input type="text" name="mobile_number" placeholder="رقم الهاتف" value={formData.mobile_number} onChange={handleChange} required />
      <Input type="text" name="user_name" placeholder="اسم المستخدم" value={formData.user_name} onChange={handleChange} required />
      <Input type="text" name="city" placeholder="المدينة" value={formData.city} onChange={handleChange} required />
      <Input type="text" name="country" placeholder="الدولة" value={formData.country} onChange={handleChange} required />
      <Button type="submit">تحديث</Button>
    </form>
    </Container>
      <Slider/>
      </MainContent>
    </>
  );
}

export default Profile;

const MainContent = styled.main`
  max-width: 1200px;
  padding: 0 2rem;
  display: grid;
  gap: 2rem;
  margin-right:450px;
  margin-top:150px;
`
const Container = styled.div`
  max-width: 700px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  background: #fff;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;
const H2 = styled.h2`
  text-align: center;
  color: var(--primary-color);
  margin-bottom: 20px;
`;
const Button = styled.button`
  width: 100%;
  padding: 10px;
  background:var(--primary-color);
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background:rgb(103, 196, 243);
  }
`;

const Message = styled.p`
  text-align: center;
  color: ${(props) => (props.error ? "red" : "green")};
`;

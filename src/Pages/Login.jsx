
import Button from '../Componants/Button';
import Input from '../Componants/Input';
import styled from "styled-components";
import '../styles/login.css';
import { useState } from "react";
import axios from "axios";
import Container from '../Componants/Container';
import { FaAngleRight } from "react-icons/fa";
import HeaderIntro from "../assets/Header.png";
import loginimg from "../assets/loginimg.png";
import logo from "../assets/Vector.png";
import { useNavigate } from "react-router-dom";
import AuthFooter from '../Componants/AuthFooter';
import { jwtDecode } from "jwt-decode";

const Message = styled.p`
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setMessage(""); // مسح أي رسالة سابقة

  //   // التحقق من صحة البريد الإلكتروني
  //   if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  //     return setMessage("Invalid Email");
  //   }

  //   try {
  //     const res = await axios.post("http://localhost:5000/api/users/login", { email, password });
  //     setMessage(res.data.message || "Login successful");
  //     localStorage.setItem("token", res.data.token);
  //     localStorage.setItem("user_id", res.data.user_id); // مثال على تخزين الـ user_id
  //     localStorage.setItem("nurse_id", res.data.nurse_id); // مثال على تخزين الـ nurse_id
  //     const decoded = jwtDecode(res.data.token);
  //     console.log("Token Data:", decoded);
  //     // const isNurse = decoded.isNurse; // 👈 جلب isNurse
  //     const isNurse = decoded.is_nurse; // ✅ استخدمي نفس الاسم اللي في الـ Backend

  //     // التوجيه بناءً على isNurse
  //     if (isNurse) {
  //       navigate("/nurse-dashboard"); // 👈 لو ممرض
  //     } else {
  //       navigate("/client-dashboard"); // 👈 لو عميل
  //     }

  //   } catch (error) {
  //     setMessage(error.response?.data?.error || "Login failed");
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // مسح أي رسالة سابقة
  
    // التحقق من صحة البريد الإلكتروني
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return setMessage("Invalid Email");
    }
  
    try {
      const res = await axios.post("http://localhost:5000/api/users/login", { email, password });
      
      setMessage(res.data.message || "Login successful");
      
      const token = res.data.token;
      if (!token) {
        throw new Error("Token not received");
      }
      
      localStorage.setItem("token", token);
      
      // استخراج البيانات باستخدام jwtDecode
      const decoded = jwtDecode(token);
      console.log("Token Data:", decoded);
  
      // استخدام `?.` لتجنب تخزين `undefined`
      localStorage.setItem("user_id", decoded?.id || "");
      localStorage.setItem("nurse_id", decoded?.is_nurse ? decoded.id : ""); 
      const userId = decoded?.id; 

      axios.get(`http://localhost:5000/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("🔍 API Response:", res.data); // تحقق مما إذا كانت البيانات صحيحة
    
        if (res.data?.first_name && res.data?.last_name) {
          const fullName = `${res.data.first_name}`.trim();
          
          localStorage.setItem("username", fullName);
          console.log("✅ تم تخزين الاسم في Local Storage:", fullName);
        } else {
          console.warn("⚠️ لم يتم العثور على first_name و last_name في الاستجابة!");
        }
      })
      .catch((err) => {
        console.error("❌ خطأ أثناء جلب بيانات المستخدم:", err);
        setMessage("حدث خطأ أثناء جلب بيانات المستخدم");
      });


      // التوجيه بناءً على دور المستخدم
      if (decoded?.is_nurse) {
        navigate("/nurse-dashboard");
      } else {
        navigate("/SharedLayout");
      }
  
    } catch (error) {
      console.error("❌ خطأ أثناء تسجيل الدخول:", error);
      setMessage(error.response?.data?.error || "Login failed");
    }
  };
  
  return (
    <div className="pagelogin-container">
      <Container className="register-container">
        <div id="intro-header-container">
          <img src={HeaderIntro} alt="" id="intro-header" />
          <div className="flex-item">
            <FaAngleRight className='icon' onClick={() => navigate(-1)} />
          </div>
          <div className="flexitemh3">
            <h3 className='salayty'>سجل الدخول و احصل علي كل الصلاحيات</h3>
          </div>
        </div>
        <img src={logo} alt="" className="logo-login" />
        <h2 className="title-login">تسجيل دخول</h2>
        {message && <Message>{message}</Message>}
        <div className="padding">
          <form onSubmit={handleSubmit}>
            <Input 
              type="email" 
              name="email" 
              placeholder="ادخل الايميل" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
            <Input 
              type="password" 
              name="password" 
              placeholder="الباسورد" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              autoComplete="off" 
            />
            <Button type="submit">تسجيل</Button>
            <AuthFooter text="ليس لديك حساب؟" linkText="سجّل الآن" to="/register" />
          </form>
        </div>
      </Container>
      <img src={loginimg} alt="" className="logimg" />
    </div>
  );
};

export default Login;

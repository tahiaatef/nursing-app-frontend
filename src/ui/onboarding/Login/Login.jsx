
import Button from '../../shared/Button';
import Input from '../../shared/Input';
import styled from "styled-components";
import './login.css';
import { useState } from "react";
import axios from "axios";
import Container from '../../shared/Container';
import { FaAngleRight } from "react-icons/fa";
import HeaderIntro from "../../../assets/Header.png";
import loginimg from "../../../assets/loginimg.png";
import logo from "../../../../src/assets/Vector.png"
import { useNavigate } from "react-router-dom";
import AuthFooter from '../../shared/AuthFooter'

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
      localStorage.setItem("token", res.data.token);
      // navigate("/dashboard");
    } catch (error) {
      setMessage(error.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="pagelogin-container">
      <Container className="register-container">
        <div id="intro-header-container">
          <img src={HeaderIntro} alt="" id="intro-header" />
          <div className="flex-item"><FaAngleRight className='icon' onClick={() => navigate(-1)} /></div>
          <div className="flexitemh3"><h3 className='salayty'>سجل الدخول و احصل علي كل الصلاحيات</h3></div>
        </div>
        <img src={logo} alt="" className="logo-login" />
        <h2 className="title-login">تسجيل دخول</h2>
        {message && <Message>{message}</Message>}
        <div className="padding">
          <form onSubmit={handleSubmit}>
            <Input 
              type="email" 
              name="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
            <Input 
              type="password" 
              name="password" 
              placeholder="Password" 
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

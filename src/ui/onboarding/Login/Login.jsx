// import Button from '../../shared/Button';
// import Input from '../../shared/Input';
// import styled from "styled-components";
// import './login.css';
// import { useState } from "react";
// import axios from "axios";
// import Container from '../../shared/Container';
// import { FaAngleRight } from "react-icons/fa";
// import HeaderIntro from "../../../assets/Header.png";
// import loginimg from "../../../assets/loginimg.png";
// import logo from "../../../../src/assets/Vector.png"
// import { useNavigate } from "react-router-dom";

// const Message = styled.p`
//   color: red;
//   font-size: 14px;
//   margin-bottom: 10px;
// `;
// const Login = () => {

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();


//   // const [formData, setFormData] = useState({
//   //   first_name: "",
//   //   last_name: "",
//   //   user_name: "",
//   //   email: "",
//   //   password: "",
//   //   mobile_number: "",
//   //   is_nurse: false,
//   // });

//   const [message, setMessage] = useState("");

//   // const handleChange = (e) => {
//   //   const { name, value, type, checked } = e.target;
//   //   setFormData({
//   //     ...formData,
//   //     [name]: type === "checkbox" ? checked : value,
//   //   });
//   // };


//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {

//       if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test({email})) {
//         setMessage("Invalid Email");
//       }

//       else {
//         const res = await axios.post("http://localhost:5000/api/users/login", { email, password });
//         setMessage(res.data.message || "Login successful");
//         localStorage.setItem("token", res.data.token);
//         navigate("/dashboard");
//       }

//     } catch (error) {
//       setMessage(error.response?.data?.error || "loginfailed");
//     }
//   };
//   return (
//     <div  className="pagelogin-container">
//     <Container className="register-container">
//       <div id="intro-header-container" >
//         <img src={HeaderIntro} alt="" id="intro-header" />
//         <div className="flex-item"><FaAngleRight className='icon' /></div>
//         <div className="flex-item"><h2 style={{}}>  سجل الدخول و احصل علي كل الصلاحيات </h2></div>
//         <div className="flex-item"></div> 
//       </div>
//       <img src={logo} alt="" className="logo-login"/>
//       <h2 className="title-login">تسجيل دخول  </h2>
//       {message && <Message>{message}</Message>}
//       <div className="padding">
//       <form onSubmit={handleSubmit} >
//         <Input type="email" name="email" className={message === "Email already exists" ? "highlight-error" : ""} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required  />
//         <Input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//         <Button type="submit">تسجيل </Button>
//       </form>
//       </div>
//     </Container>
//     <img src={loginimg} alt= "" className="logimg"/>
//     </div>
//   );
// }

// export default Login;

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
      navigate("/dashboard");
    } catch (error) {
      setMessage(error.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="pagelogin-container">
      <Container className="register-container">
        <div id="intro-header-container">
          <img src={HeaderIntro} alt="" id="intro-header" />
          <div className="flex-item"><FaAngleRight className='icon' /></div>
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
          </form>
        </div>
      </Container>
      <img src={loginimg} alt="" className="logimg" />
    </div>
  );
};

export default Login;

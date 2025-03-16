
import styled from "styled-components";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

// تصاميم العناصر باستخدام styled-components
const FooterContainer = styled.footer`
  background-color:rgb(56, 55, 55);
  color: white;
  padding: 30px 20px;
  text-align: center;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterSection = styled.div`
  text-align: left;
`;

const Title = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 10px;
`;

const Text = styled.p`
  font-size: 0.9rem;
  color: #b0b0b0;
`;

const Links = styled.ul`
  list-style: none;
  padding: 0;
`;

const LinkItem = styled.li`
  margin-bottom: 8px;

  a {
    text-decoration: none;
    color: #b0b0b0;
    transition: color 0.3s ease;

    &:hover {
      color: white;
    }
  }
`;

// const SocialIcons = styled.div`
//   display: flex;
//   gap: 15px;
//   font-size: 1.5rem;
//   margin-top: 30px;
//   margin-right:300px;

//   a {
//     color: #b0b0b0;
//     transition: color 0.3s ease;

//     &:hover {
//       color: white;
//     }
//   }
// `;
const SocialIcons = styled.div`
  display: flex;
  gap: 15px;
  font-size: 1.5rem;
  margin-top: 30px;
  justify-content: center; /* يجعل الأيقونات في المنتصف */

  a {
    color: #b0b0b0;
    transition: color 0.3s ease;

    &:hover {
      color: white;
    }
  }

  @media (max-width: 768px) {
    gap: 10px; /* تقليل المسافات بين الأيقونات */
    font-size: 1.2rem; /* تصغير حجم الأيقونات */
  }
`;


const Copyright = styled.div`
  text-align: center;
  font-size: 0.8rem;
  color: #b0b0b0;
  margin-top: 20px;
  border-top: 1px solid #333;
  padding-top: 10px;
`;

const Footer = () => {
  return (
    <>
    <FooterContainer>
      <FooterContent>
        
        <FooterSection>
          <Title>عن التطبيق</Title>
          <Text>نحن في ONURSE نوفر خدمات التمريض المنزلي لضمان راحتكم ورفاهيتكم. يقدم فريقنا من الممرضين والممرضات المتخصصين رعاية طبية مهنية تلبي احتياجتكم الصحيه في منزلكم بكل أمان وراحة</Text>
        </FooterSection>

        <FooterSection>
          <Title>روابط سريعة</Title>
          <Links>
            <LinkItem><a href="/">الرئيسيه</a></LinkItem>
            <LinkItem><a href="/serivcepage">الخدمات</a></LinkItem>
            <LinkItem><a href="/FQAPAGE">الأسئلة المتكررة</a></LinkItem>
            <LinkItem><a href="/askus">اتصل بنا</a></LinkItem>
          </Links>
        </FooterSection>

        <FooterSection>
          {/* <img src={vectorr}/> */}
          <Title>تابعنا</Title>
          <SocialIcons>
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedin /></a>
          </SocialIcons>
        </FooterSection>
      </FooterContent>
      {/* الحقوق */}
      <Copyright>© 2025 جميع الحقوق محفوظة | تطبيق التمريض المنزلي</Copyright>
    </FooterContainer>
    </>
  );
};

export default Footer;

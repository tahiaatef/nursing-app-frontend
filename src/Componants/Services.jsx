
import styled from "styled-components";
import img1 from "../assets/imageservice.png";
import img2 from "../assets/imageservicee.png";
import img3 from "../assets/imageservicee3.png";
import img4 from "../assets/imageserv4.png";
import img5 from "../assets/image 10service.png";

const ServicesSection = styled.section`
  padding: 50px 20px;
  text-align: center;
  color:var(--primary-color);
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  max-width: 1200px;

`;

const ServiceCard = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  img {
    width: 100%;
    border-radius: 8px;
  }

  h3 {
    font-size: 18px;
    margin: 15px 0 10px;
  }

  p {
    font-size: 14px;
    color: #555;
  }
`;

const services = [
  {
    title: "العناية بالجروح",
    desc: "لدينا ممرضون متخصصون في تنظيف الجروح والعناية بها.",
    img: img1,
  },
  {
    title: "رعاية المسنين",
    desc: "خدمات رعاية منزلية لكبار السن وفقًا لاحتياجاتهم.",
    img: img2,
  },
  {
    title: "القسطرة البولية",
    desc: "تركيب وإزالة القسطرة البولية بمهنية عالية.",
    img: img5,
  },
  {
    title: "العمليات الجراحية",
    desc: "رعاية بعد العمليات الجراحية لضمان التعافي السريع.",
    img: img3,
  },
  {
    title: "العناية بالجروح",
    desc: "لدينا ممرضون متخصصون في تنظيف الجروح والعناية بها.",
    img: img4,
  },
  
  {
    title: "القسطرة البولية",
    desc: "تركيب وإزالة القسطرة البولية بمهنية عالية.",
    img: img5,
  },
  {
    title: "العمليات الجراحية",
    desc: "رعاية بعد العمليات الجراحية لضمان التعافي السريع.",
    img: img3,
  },
  {
    title: "رعاية المسنين",
    desc: "خدمات رعاية منزلية لكبار السن وفقًا لاحتياجاتهم.",
    img: img2,
  },
];

const Services = () => {
  return (
    <ServicesSection>
      <h2>الخدمات</h2>
      <br/>
      <ServicesGrid>
        {services.map((service, index) => (
          <ServiceCard key={index}>
            <img src={service.img} alt={service.title} />
            <h3>{service.title}</h3>
            <p>{service.desc}</p>
          </ServiceCard>
        ))}
      </ServicesGrid>
    </ServicesSection>
  );
};

export default Services;

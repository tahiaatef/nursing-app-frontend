
import styled from "styled-components";
import Header from "../Componants/Header";
import Footer from "../Componants/Footer";
const About = () => {
  return (
    <>
      <Header />
      <main className="container lh-md ">
        <Title>من نحن</Title>
      
          <p className="mb-3">
            <strong className="d-block">🌿 من نحن في OnNurse</strong>
            <br />
            في <strong>OnNurse</strong>، نحن أكثر من مجرد منصة للرعاية الصحية المنزلية؛  
            نحن **فريق متكامل من المهنيين الصحيين** الذين يعملون بجد لضمان  
            **أفضل رعاية طبية ممكنة** للمرضى في منازلهم، بأعلى درجات الأمان والجودة.  
            هدفنا هو **توفير راحة وطمأنينة** لأفراد الأسرة من خلال تقديم خدمات  
            صحية موثوقة بكفاءة عالية.
          </p>

          <h3 className="mb-2 fs-4">🌟 مهمتنا</h3>
          <p className="mb-3">
            مهمتنا هي **تحسين جودة الحياة** من خلال توفير **رعاية صحية منزلية متكاملة**  
            تضمن راحة المرضى وتساعدهم على التعافي بشكل أسرع في **بيئة مريحة وآمنة**.  
            نؤمن أن كل مريض يستحق **رعاية شخصية متخصصة** تلبي احتياجاته الصحية  
            بطريقة احترافية وإنسانية.
          </p>

          <h3 className="mb-2 fs-4">🎯 رؤيتنا</h3>
          <p className="mb-3">
            نطمح إلى أن نكون **الشريك الصحي الأول** لكل من يحتاج إلى  
            **رعاية طبية منزلية موثوقة**.  
            هدفنا هو **إحداث تغيير إيجابي** في نظام الرعاية الصحية  
            عبر تقديم **أحدث الحلول التكنولوجية** والكفاءات الطبية المتخصصة.
          </p>

          <h3 className="mb-2 fs-4">💡 ما يميزنا</h3>
          <p className="mb-3 color1">
            1️⃣ <strong>فريق ممرضين محترفين:</strong> نختار ممرضينا بعناية فائقة،  
            حيث نحرص على توظيف الأكفاء والأكثر خبرة في المجال. جميع ممرضينا  
            حاصلون على **شهادات معتمدة وخبرة واسعة** في تقديم الرعاية الصحية المنزلية.
            <br /><br />
            2️⃣ <strong>رعاية صحية شاملة:</strong> نوفر خدمات **التمريض المتخصص،  
            متابعة الحالات الحرجة، العناية بكبار السن، وتأهيل المرضى بعد العمليات**،  
            كل ذلك في راحة منزلك.
            <br /><br />
            3️⃣ <strong>تقنيات متطورة:</strong> نستخدم أحدث **التكنولوجيا الطبية**  
            لمراقبة صحة المرضى عن بعد، وتقديم تقارير دقيقة للعائلات لضمان راحة البال.
            <br /><br />
            4️⃣ <strong>متابعة واستشارات طبية:</strong> نحن معكم على مدار الساعة  
            لتقديم الدعم الطبي اللازم والاستجابة لأي استفسارات أو حالات طارئة.
          </p>

          <h3 className="mb-2 fs-4">💙 قيمنا</h3>
          <p className="mb-3">
            🔹 <strong>الإنسانية:</strong> نهتم بكل مريض كأنه فرد من عائلتنا.  
            <br />
            🔹 <strong>الاحترافية:</strong> نوفر خدمات طبية بمعايير عالية من الجودة.  
            <br />
            🔹 <strong>الابتكار:</strong> نستخدم أحدث الوسائل لتقديم أفضل رعاية.  
            <br />
            🔹 <strong>الأمان:</strong> نضمن أعلى معايير الأمان والراحة لمرضانا.
          </p>
  
      </main>
      <Footer />
    </>
  );
};

export default About;

// ✅ تصميم باستخدام Styled Components
const Container = styled.div`
  padding: 50px;
  max-width: 900px;
  margin: 50px auto;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    margin: 150px auto ;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  color: #2395F8;
  margin-bottom: 20px;
`;

const Content = styled.div`
  text-align: right;
  font-size: 18px;
  color: #444;
  line-height: 1.9;
`;

import styled from "styled-components"
import {
  LogOut,
  FileEdit,
  Inbox,
  InfoIcon,
  MessageSquare
} from "lucide-react"


const Sidebar = styled.aside`
  background: var(--primary-color);
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  // height: fit-content;
  position: fixed;
  right: 0;
  top: 100px;
  width: 250px;
  height: 100vh;
`

const SidebarLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
  color: white;
  text-decoration: none;
  border:1px solid white;
  border-radius: 0.375rem;
  transition: background-color 0.3s ease;
  
  &:hover {
    background: #f0f4f8;
    color :var(--primary-color);
  }
`
const Slider = () => {

  return (
    <>
      <Sidebar>
          <SidebarLink href="/Profilenurse">
            <FileEdit size={20} />
            <span>تعديل الملف الشخصي</span>
          </SidebarLink>
          <SidebarLink href="/RequestNew">
            <Inbox size={20} />
            <span>استقبال الطلبات الجديدة</span>
          </SidebarLink>
          <SidebarLink href="/MyOffers">
            <InfoIcon size={20} />
            <span>معلومات الطلب</span>
          </SidebarLink>
          <SidebarLink href="/RequestReviwes/:nurseId">
            <MessageSquare size={20} />
            <span> التقيمات</span>
          </SidebarLink>
          <SidebarLink href="/">
            <LogOut size={20} />
            <span>تسجيل الخروج</span>
          </SidebarLink>
        </Sidebar>
    </>
  );
}

export default Slider;

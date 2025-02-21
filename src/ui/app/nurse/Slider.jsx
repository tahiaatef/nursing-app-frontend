

import { FaUser,  FaSignOutAlt ,FaInbox ,FaInfoCircle , FaCommentDots } from 'react-icons/fa';


// const Sidebar = styled.aside`
//   padding: 2rem;
//   border-radius: 0.5rem;
//   box-shadow: 0 2px 4px rgba(0,0,0,0.1);
//   position: fixed;
//   right: 0;
//   top: 0;
//   width: 250px;
//   height: 100vh;
//   background: linear-gradient(135deg, #3b5998, #6d9df2);
// `

// const SidebarLink = styled.a`
//   display: flex;
//   align-items: center;
//   gap: 0.75rem;
//   padding: 0.75rem;
//   margin-bottom: 0.75rem;
//   color: white;
//   text-decoration: none;
//   border-radius: 0.375rem;
//   transition: background-color 0.3s ease;
  
//   &:hover {
//     background: rgba(255, 255, 255, 0.2);
//   }

//   &.active {
//     background: rgba(255, 255, 255, 0.3);
//     font-weight: bold;
//   }
// `
// const Slider = () => {

//   return (
//     <>
//       <Sidebar>
//            <div style={{height:"90px"}}></div> 
//           <SidebarLink href="/Profilenurse">
//             <FaUser size={20} />
//             <span> البيانات الشخصيه</span>
//           </SidebarLink>
//           <SidebarLink href="/RequestNew">
//             <FaInbox size={20} />
//             <span> الطلبات الجديدة</span>
//           </SidebarLink>
//           <SidebarLink href="/MyOffers">
//             <FaInfoCircle size={20} />
//             <span>معلومات الطلب</span>
//           </SidebarLink>
//           <SidebarLink href="/RequestReviwes/:nurseId">
//             <FaCommentDots  size={20} />
//             <span> التقيمات</span>
//           </SidebarLink>
//           <SidebarLink href="/">
//             <FaSignOutAlt size={20} />
//             <span>تسجيل الخروج</span>
//           </SidebarLink>
//         </Sidebar>
//     </>
//   );
// }

// export default Slider;


import styled from 'styled-components';
import { NavLink } from 'react-router-dom'

const SidebarContainer = styled.div`
  width: 250px;
  flex-shrink: 0;
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  background: linear-gradient(135deg, #3b5998, #6d9df2);
  color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 0.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15); 
`;



const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex-grow: 1;
`;


const MenuItem = styled.li`
  margin: 10px 0;
`;

const MenuLink = styled(NavLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
  font-size: 18px;
  padding: 12px 20px;
  border-radius: 8px;
  transition: 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  &.active {
    background: rgba(255, 255, 255, 0.3);
    font-weight: bold;
  }
`;

const IconWrapper = styled.span`
  margin-left: 10px;
  font-size: 20px;
`;

const Slider = () => {
  const menuItems = [
    { text: 'البيانات الشخصية', path: '/Profilenurse', icon: <FaUser /> },
    { text: 'الطلبات الجديده', path: '/RequestNew', icon: <FaInbox /> },
    { text: ' معلومات الطلب', path: '/MyOffers', icon: <FaInfoCircle  /> },
    {text:'التقيمات' ,path:'/RequestReviwes/:nurseId', icon : <FaCommentDots/>},
    { text: 'تسجيل الخروج', path: '/', icon: <FaSignOutAlt /> },
  ];

  return (
    <SidebarContainer>
      <div  style={{height:"90px"}}></div>
      <MenuList>
        {menuItems.map(({ text, path, icon }) => (
          <MenuItem key={text}>
            <MenuLink to={path}>
              <IconWrapper>{icon}</IconWrapper>
              {text}
            </MenuLink>
          </MenuItem>
        ))}
      </MenuList>
    </SidebarContainer>
  );
};

export default Slider;
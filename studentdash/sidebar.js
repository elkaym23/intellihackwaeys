import React from 'react'; 
import {
  CDBBadge,
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBSidebarSubMenu,
} from 'cdbreact-pro';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
      <CDBSidebar textColor="#333" backgroundColor="#FFC0CB"> {/* Light Pink */}
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            Sidebar
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent>
          <CDBSidebarMenu>
            <CDBSidebarMenuItem
              suffix={
                <CDBBadge color="danger" size="small" borderType="pill">
                  new
                </CDBBadge>
              }
              icon="th-large"
              style={{ backgroundColor: "#FF69B4", color: "#fff" }} // Dark Pink
            >
              Dashboard
            </CDBSidebarMenuItem>
            <CDBSidebarMenuItem
              icon="sticky-note"
              suffix={
                <CDBBadge color="danger" size="small" borderType="pill">
                  new
                </CDBBadge>
              }
              style={{ backgroundColor: "#FF69B4", color: "#fff" }} // Dark Pink
            >
              Components
            </CDBSidebarMenuItem>
          </CDBSidebarMenu>
          <CDBSidebarMenu>
            <CDBSidebarSubMenu title="Sidemenu" icon="th">
              <NavLink exact to="/sub1" activeClassName="activeClicked">
                <CDBSidebarMenuItem>submenu 1</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/sub2" activeClassName="activeClicked">
                <CDBSidebarMenuItem>submenu 2</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/sub3" activeClassName="activeClicked">
                <CDBSidebarMenuItem>submenu 3</CDBSidebarMenuItem>
              </NavLink>
            </CDBSidebarSubMenu>
            <CDBSidebarSubMenu
              title="Sidemenu2"
              icon="book"
              suffix={
                <CDBBadge color="danger" size="small" borderType="pill">
                  new
                </CDBBadge>
              }
            >
              <CDBSidebarMenuItem>submenu 1</CDBSidebarMenuItem>
              <CDBSidebarMenuItem>submenu 2</CDBSidebarMenuItem>
              <CDBSidebarMenuItem>submenu 3</CDBSidebarMenuItem>
            </CDBSidebarSubMenu>
            <CDBSidebarSubMenu title="MultiLevel with Icon" icon="table">
              <CDBSidebarMenuItem>submenu 1 </CDBSidebarMenuItem>
              <CDBSidebarMenuItem>submenu 2 </CDBSidebarMenuItem>
              <CDBSidebarSubMenu title="submenu 3">
                <CDBSidebarMenuItem>submenu 3.1 </CDBSidebarMenuItem>
                <CDBSidebarMenuItem>submenu 3.2 </CDBSidebarMenuItem>
                <CDBSidebarSubMenu title="subnet">
                  <CDBSidebarMenuItem>submenu 3.3.1 </CDBSidebarMenuItem>
                  <CDBSidebarMenuItem>submenu 3.3.2 </CDBSidebarMenuItem>
                  <CDBSidebarMenuItem>submenu 3.3.3 </CDBSidebarMenuItem>
                </CDBSidebarSubMenu>
              </CDBSidebarSubMenu>
            </CDBSidebarSubMenu>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center', backgroundColor: "#FFB6C1" }}> {/* Secondary Light Pink */}
          <div
            style={{
              padding: '20px 5px',
            }}
          >
            Sidebar Footer
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
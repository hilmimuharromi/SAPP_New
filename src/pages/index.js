import {
  React,
  BrowserRouter as Router,
  Route,
  Link,
  Layout,
  Menu,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  useState,
} from "../libraries/dependencies";

import { RekamDokumenPiutang, BrowseDokumenPiutang } from "./sapp";
import { RekamBilling, BrowseBilling } from "./perekaman billing";

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

const appRoutes = [
  {
    name: "RekamDokumenPiutang",
    component: RekamDokumenPiutang,
    exact: true,
    path: "/rekammanual",
  },
  {
    name: "BrowseSAPP",
    component: BrowseDokumenPiutang,
    exact: true,
    path: "/",
  },
  {
    name: "RekamBilling",
    component: RekamBilling,
    exact: true,
    path: "/rekambilling",
  },
  {
    name: "BrowseBilling",
    component: BrowseBilling,
    exact: true,
    path: "/browsebilling",
  },
];

function Perbendaharaan() {
  const [state, setState] = useState({
    collapsed: false,
  });

  const toggle = () => {
    setState({ collapsed: !state.collapsed });
  };

  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider trigger={null} collapsible collapsed={state.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["0"]}>
            <SubMenu key="sub1" icon={<UserOutlined />} title="SAPP">
              <Menu.Item key="1">
                <Link to="/">Browse SAPP</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/rekammanual">Form Perekaman Manual</Link>
              </Menu.Item>
            </SubMenu>

            <SubMenu
              key="sub2"
              icon={<UserOutlined />}
              title="Perekaman Billing"
            >
              <Menu.Item key="3">
                <Link to="/rekambilling">Rekam</Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/browsebilling">Browse</Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(
              state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: toggle,
              }
            )}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            {appRoutes.map((route) => (
              <Route key={route.name} {...route} />
            ))}
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default Perbendaharaan;

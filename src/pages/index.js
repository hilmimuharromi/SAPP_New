import {
  React,
  BrowserRouter as Router,
  Route,
  Redirect,
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
    path: "/rekam-manual",
  },
  {
    name: "BrowseSAPP",
    component: BrowseDokumenPiutang,
    exact: true,
    path: "/browse-sapp",
  },
  {
    name: "RekamBilling",
    component: RekamBilling,
    exact: true,
    path: "/rekam-billing",
  },
  {
    name: "BrowseBilling",
    component: BrowseBilling,
    exact: true,
    path: "/browse-billing",
  },
  {
    name: "Home",
    path: "/",
    exact: true,
    render: () => <Redirect to="/browse-sapp" />,
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
                <Link to="/browse-sapp">Browse SAPP</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/rekam-manual">Form Perekaman Manual</Link>
              </Menu.Item>
            </SubMenu>

            <SubMenu
              key="sub2"
              icon={<UserOutlined />}
              title="Perekaman Billing"
            >
              <Menu.Item key="3">
                <Link to="/rekam-billing">Rekam</Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/browse-billing">Browse</Link>
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
              <Route key={route.name} {...route} Re />
            ))}
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default Perbendaharaan;

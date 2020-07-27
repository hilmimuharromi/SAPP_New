import {
  React,
  Layout,
  Menu,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  useHistory,
  UserOutlined,
  useState,
} from "./libraries/dependencies";
import { BrowseDokumenPiutang } from "./dashboard";

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

function Perbendaharaan() {
  const [state, setState] = useState({
    collapsed: false,
  });

  const toggle = () => {
    setState({ collapsed: !state.collapsed });
  };

  let history = useHistory();
  const handleNavigate = () => {
    history.push("/");
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={state.collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["0"]}>
          <SubMenu key="sub1" icon={<UserOutlined />} title="Perbendaharaan">
            <Menu.Item key="1" onClick={handleNavigate}>
              Browse Perekaman
            </Menu.Item>
            <Menu.Item key="2" onClick={() => history.push("/perekaman")}>
              Form Perekaman Manual
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
          <BrowseDokumenPiutang />
        </Content>
      </Layout>
    </Layout>
  );
}

export default Perbendaharaan;

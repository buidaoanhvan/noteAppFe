import { Routes, Route, Link, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import NoteList from "./pages/NoteList";
import Note from "./pages/Note";

const { Header, Content } = Layout;

function App() {
  const location = useLocation();
  const menuItems = [
    {
      key: "logo",
      label: (
        <img
          src="/logo.png"
          alt="logo"
          style={{ width: 50, verticalAlign: "middle", borderRadius: "13px" }}
        />
      ),
      disabled: true,
    },
    {
      key: "/",
      label: <Link to="/">Danh sách ghi chú</Link>,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
        />
      </Header>
      <Content style={{ padding: "24px" }}>
        <Routes>
          <Route path="/" element={<NoteList />} />
          <Route path="/note/:id" element={<Note />} />
        </Routes>
      </Content>
    </Layout>
  );
}

export default App;

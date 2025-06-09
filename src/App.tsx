import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TodoProvider } from './stores/TodoContext';
import { ConfigProvider, Menu, Layout } from 'antd';
import { Link } from 'react-router-dom';
import TodosPage from './pages/TodosPage';
import TodoDetailsPage from './pages/TodoDetailsPage';
import UsersPage from './pages/UsersPage';
import 'antd/dist/reset.css';

const { Header, Content } = Layout;

function App() {
  return (
    <ConfigProvider>
      <TodoProvider>
        <BrowserRouter>
          <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header style={{ position: 'fixed', top: 0, zIndex: 1, width: '100%' }}>
              <Menu theme="dark" mode="horizontal" selectable={false}>
                <Menu.Item key="todos">
                  <Link to="/todos">Todos</Link>
                </Menu.Item>
                <Menu.Item key="users">
                  <Link to="/users">Users</Link>
                </Menu.Item>
              </Menu>
            </Header>
            <Content style={{ 
              padding: '24px', 
              background: '#fff', 
              marginTop: '64px',
              flex: 1,
              overflow: 'auto',
              maxHeight: 'calc(100vh - 64px)'
            }}>
              <Routes>
                <Route path="/" element={<Navigate to="/todos" replace />} />
                <Route path="/todos" element={<TodosPage />} />
                <Route path="/todos/:id" element={<TodoDetailsPage />} />
                <Route path="/users" element={<UsersPage />} />
              </Routes>
            </Content>
          </Layout>
        </BrowserRouter>
      </TodoProvider>
    </ConfigProvider>
  );
}

export default App;

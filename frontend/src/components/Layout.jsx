import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <main style={{ flex: '1', padding: '3rem', overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  );
};

export default Layout;

import { useAuth } from '../context/AuthContext';
import { NavLink } from 'react-router-dom';
import { LogOut, Book, CheckSquare, Users, BarChart, User as UserIcon } from 'lucide-react';

const Sidebar = () => {
  const { user, logout } = useAuth();

  const navItemStyle = ({ isActive }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem',
    borderRadius: '0.75rem',
    textDecoration: 'none',
    color: isActive ? 'var(--text-main)' : 'var(--text-muted)',
    background: isActive ? 'var(--primary)' : 'transparent',
    transition: 'all 0.3s ease',
    marginBottom: '0.5rem'
  });

  return (
    <div className="glass-card" style={{ 
      width: '280px', borderRadius: '0', borderLeft: 'none', borderTop: 'none', borderBottom: 'none',
      display: 'flex', flexDirection: 'column', padding: '2rem', flexShrink: 0
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
        <div style={{ background: 'var(--primary)', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Book color="white" size={20} />
        </div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>STIRE</h2>
      </div>

      <nav style={{ flex: '1' }}>
        <NavLink to="/dashboard" style={navItemStyle}>
          <BarChart size={18} /> Dashboard
        </NavLink>
        <NavLink to="/concepts" style={navItemStyle}>
          <Book size={18} /> Conceptos
        </NavLink>
        <NavLink to="/evaluations" style={navItemStyle}>
          <CheckSquare size={18} /> Evaluaciones
        </NavLink>
        {user?.role === 'admin' && (
          <NavLink to="/users" style={navItemStyle}>
            <Users size={18} /> Usuarios
          </NavLink>
        )}
      </nav>

      <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
           <div style={{ background: 'var(--glass)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <UserIcon size={20} />
           </div>
           <div style={{ overflow: 'hidden' }}>
              <p style={{ fontSize: '0.9rem', fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.fullName}</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>{user?.role}</p>
           </div>
        </div>
        <button 
          onClick={logout}
          style={{ 
            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem', 
            padding: '0.8rem', borderRadius: '0.75rem', border: '1px solid var(--danger)', 
            color: 'var(--danger)', background: 'transparent', cursor: 'pointer', fontWeight: '600'
          }}
        >
          <LogOut size={18} /> Salir
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

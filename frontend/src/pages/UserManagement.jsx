import { useState, useEffect } from 'react';
import api from '../api/api';
import { Users, UserPlus, Trash2, Edit2, Shield, Search } from 'lucide-react';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get('/users');
      setUsers(data);
    } catch (err) {
      console.error('Error fetching users', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
      try {
        await api.delete(`/users/${id}`);
        setUsers(users.filter(u => u.id !== id));
      } catch (err) {
        alert('Error al eliminar usuario');
      }
    }
  };

  const filteredUsers = users.filter(u => 
    u.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const RoleBadge = ({ role }) => {
    const styles = {
      admin: { bg: 'rgba(239, 68, 68, 0.1)', color: '#f87171', border: 'rgba(239, 68, 68, 0.2)' },
      docente: { bg: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa', border: 'rgba(59, 130, 246, 0.2)' },
      estudiante: { bg: 'rgba(16, 185, 129, 0.1)', color: '#34d399', border: 'rgba(16, 185, 129, 0.2)' }
    };
    const s = styles[role] || styles.estudiante;
    return (
      <span style={{ 
        background: s.bg, color: s.color, border: `1px solid ${s.border}`,
        padding: '0.25rem 0.75rem', borderRadius: '2rem', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase'
      }}>
        {role}
      </span>
    );
  };

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '2rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Users size={32} color="var(--primary)" /> Gestión de Usuarios
          </h2>
          <p style={{ color: 'var(--text-muted)' }}>Administra los accesos y roles de la plataforma</p>
        </div>
        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <UserPlus size={18} /> Nuevo Usuario
        </button>
      </div>

      <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '0.8rem', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Buscar por nombre o email..." 
            className="input-field" 
            style={{ paddingLeft: '3rem', padding: '0.7rem 0.7rem 0.7rem 3rem' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="glass-card" style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)', background: 'rgba(255,255,255,0.02)' }}>
              <th style={{ padding: '1.5rem' }}>Usuario</th>
              <th style={{ padding: '1.5rem' }}>Rol</th>
              <th style={{ padding: '1.5rem' }}>Estado</th>
              <th style={{ padding: '1.5rem', textAlign: 'right' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>Cargando usuarios...</td></tr>
            ) : filteredUsers.length === 0 ? (
              <tr><td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No se encontraron usuarios</td></tr>
            ) : filteredUsers.map(u => (
              <tr key={u.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '1.5rem' }}>
                  <div style={{ fontWeight: '600' }}>{u.fullName}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{u.email}</div>
                </td>
                <td style={{ padding: '1.5rem' }}><RoleBadge role={u.role} /></td>
                <td style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: u.isActive ? 'var(--secondary)' : 'var(--danger)' }}></div>
                    {u.isActive ? 'Activo' : 'Inactivo'}
                  </div>
                </td>
                <td style={{ padding: '1.5rem', textAlign: 'right' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                    <button style={{ padding: '0.5rem', background: 'var(--glass)', border: 'none', borderRadius: '0.5rem', color: 'white', cursor: 'pointer' }}><Edit2 size={16} /></button>
                    <button 
                      onClick={() => deleteUser(u.id)}
                      style={{ padding: '0.5rem', background: 'rgba(239, 68, 68, 0.1)', border: 'none', borderRadius: '0.5rem', color: '#f87171', cursor: 'pointer' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;

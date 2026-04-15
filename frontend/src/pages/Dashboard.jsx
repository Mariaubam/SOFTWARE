import { useAuth } from '../context/AuthContext';
import { Book, CheckSquare, BarChart } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  const StatCard = ({ icon: Icon, title, value, color }) => (
    <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
      <div style={{ background: `${color}20`, color: color, padding: '1rem', borderRadius: '1rem' }}>
        <Icon size={24} />
      </div>
      <div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.2rem' }}>{title}</p>
        <p style={{ fontSize: '1.5rem', fontWeight: '700' }}>{value}</p>
      </div>
    </div>
  );

  return (
    <div className="animate-fade-in">
      <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>Panel de Control</h1>
          <p style={{ color: 'var(--text-muted)' }}>Bienvenido, {user?.fullName}. Aquí tienes un resumen de tu actividad.</p>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        <StatCard icon={Book} title="Conceptos Vistos" value="12" color="#8b5cf6" />
        <StatCard icon={CheckSquare} title="Exámenes Realizados" value="5" color="#10b981" />
        <StatCard icon={BarChart} title="Promedio General" value="8.5" color="#f59e0b" />
      </div>

      <div className="glass-card" style={{ padding: '2.5rem' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>Próximas Actividades</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ background: 'var(--glass)', padding: '1.5rem', borderRadius: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontWeight: '600' }}>Evaluación de Álgebra Lineal</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Mañana, 10:00 AM</p>
            </div>
            <button className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>Comenzar</button>
          </div>
          <div style={{ background: 'var(--glass)', padding: '1.5rem', borderRadius: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontWeight: '600' }}>Repaso de Estructuras de Datos</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Lunes, 3:00 PM</p>
            </div>
            <button className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', background: 'var(--glass)', color: 'var(--text-main)' }}>Ver ahora</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

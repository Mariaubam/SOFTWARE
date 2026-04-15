import { useState, useEffect } from 'react';
import api from '../api/api';
import { Book, Plus, Search, ChevronRight } from 'lucide-react';

const ConceptList = () => {
  const [concepts, setConcepts] = useState([
    { id: 1, titulo: 'Introducción a NestJS', descripcion: 'Conceptos básicos de módulos, controladores y servicios.', nivel: 'Básico' },
    { id: 2, titulo: 'TypeORM y MySQL', descripcion: 'Entidades, repositorios y relaciones entre tablas.', nivel: 'Intermedio' },
    { id: 3, titulo: 'Seguridad con JWT', descripcion: 'Implementación de guards, estrategias y decoradores.', nivel: 'Avanzado' },
  ]);

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '2rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Book size={32} color="var(--primary)" /> Material de Estudio
          </h2>
          <p style={{ color: 'var(--text-muted)' }}>Explora los conceptos cargados en la plataforma</p>
        </div>
        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={18} /> Nuevo Concepto
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {concepts.map(c => (
          <div key={c.id} className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
            <span style={{ 
              background: 'var(--glass)', border: '1px solid var(--border)', padding: '0.2rem 0.6rem', 
              borderRadius: '0.5rem', fontSize: '0.7rem', alignSelf: 'flex-start', marginBottom: '1rem'
            }}>
              {c.nivel}
            </span>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '1rem' }}>{c.titulo}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem', flex: '1' }}>{c.descripcion}</p>
            <button style={{ 
              background: 'transparent', border: '1px solid var(--border)', color: 'white', 
              padding: '0.8rem', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', 
              justifyContent: 'center', gap: '0.5rem', cursor: 'pointer'
            }}>
              Leer más <ChevronRight size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConceptList;

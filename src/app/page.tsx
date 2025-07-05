'use client';
import { useState } from 'react';
import Tabla from '@/components/Tabla';
import { Evento } from '@/types';

export default function Home() {
  const [testEventos, setTestEventos] = useState<Evento[]>([
    { id: '1', nombre: 'Conferencia Tech', presupuesto: 500, categoria: 'educativo', descripcion: 'Conferencia anual de tecnología', fecha: '2025-08-15' },
    { id: '2', nombre: 'Festival de Música', presupuesto: 1200, categoria: 'cultural', descripcion: 'Festival de verano con bandas locales', fecha: '2025-07-20' },
    { id: '3', nombre: 'Partido de Baloncesto', presupuesto: 150, categoria: 'deportivo', descripcion: 'Partido amistoso de la liga local', fecha: '2025-07-10' },
  ]);

  const handleEditTest = (evento: Evento) => {
    console.log("Editando evento:", evento);
  };

  const handleDeleteTest = (id: string) => {
    console.log("Eliminando evento con ID:", id);
    setTestEventos(prev => prev.filter(e => e.id !== id));
  };

  return (
    <div>
      <h1>Sistema de Gestión de Actividades</h1>
      <p>Testeo del componente Tabla.</p>
      <Tabla eventos={testEventos} onEditar={handleEditTest} onEliminar={handleDeleteTest} />
    </div>
  );
}
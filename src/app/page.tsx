
'use client';
import { useState, useEffect } from 'react';
import Formulario from '@/components/Formulario';
import Tabla from '@/components/Tabla';
import { Evento, initialStateEvento } from '@/types';
import { obtenerEventos, registrarEvento, actualizarEvento, eliminarEvento } from '@/app/Firebase/Promesas';

export default function Home() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [eventoEditar, setEventoEditar] = useState<Evento | null>(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Cargar eventos desde Firebase al iniciar la pagina
  useEffect(() => {
    const getEventos = async () => {
      const data = await obtenerEventos();
      setEventos(data);
    };
    getEventos();
  }, []);

  const handleRegistrar = async (evento: Evento) => {
    if (eventoEditar) {
      // Actualizar evento existente en Firebase
      await actualizarEvento(evento);
      const eventosActualizados = eventos.map(e =>
        e.id === evento.id ? evento : e
      );
      setEventos(eventosActualizados);
      setEventoEditar(null);
      console.log("Evento actualizado en Firebase: ", evento);
    } else {
      // Crear nuevo evento en Firebase
      const nuevoEventoConId = await registrarEvento(evento);
      const nuevosEventos = [...eventos, nuevoEventoConId];
      setEventos(nuevosEventos);
      console.log("Nuevo evento creado en Firebase: ", evento);
    }
    setMostrarFormulario(false);
  };

  const handleEditar = (evento: Evento) => {
    setEventoEditar(evento);
    setMostrarFormulario(true);
    console.log("Iniciando edicion para: ", evento);
  };

  const handleEliminar = async (id: string) => {
    // Eliminar evento de Firebase
    await eliminarEvento(id);
    const eventosActualizados = eventos.filter(evento => evento.id !== id);
    setEventos(eventosActualizados);
    console.log("Evento eliminado de Firebase con ID: ", id);
  };

  const handleCancelar = () => {
    setEventoEditar(null);
    setMostrarFormulario(false);
    console.log("Edicion cancelada.");
  };

  return (
    <div>
      <h1>Sistema de Gestion de Actividades</h1>
      <p>Organizacion Comunitaria - Gestion de Eventos</p>

      <button
        onClick={() => {
          setMostrarFormulario(!mostrarFormulario);
          if (eventoEditar) {
            setEventoEditar(null);
          }
          console.log("Boton 'Crear Nuevo Evento' / 'Ocultar Formulario' clickeado. Mostrar formulario: ", !mostrarFormulario);
        }}
      >
        {mostrarFormulario ? 'Ocultar Formulario' : 'Crear Nuevo Evento'}
      </button>

      {mostrarFormulario && (
        <Formulario
          onSubmit={handleRegistrar}
          eventoEditar={eventoEditar}
          onCancelar={handleCancelar}
        />
      )}

      <Tabla
        eventos={eventos}
        onEditar={handleEditar}
        onEliminar={handleEliminar}
      />

    </div>
  );
}



'use client';
import { useState, useEffect } from 'react';
import Formulario from '@/components/Formulario';
import Tabla from '@/components/Tabla';
import { Evento, initialStateEvento } from '@/types';

export default function Home() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [eventoEditar, setEventoEditar] = useState<Evento | null>(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Cargar eventos desde local storage al iniciar la pagina
  useEffect(() => {
    if (typeof window !== 'undefined') {
      let listadoStr = window.localStorage.getItem("eventos");
      if (listadoStr != null) {
        let listado = JSON.parse(listadoStr);
        setEventos(listado);
      }
      console.log("useEffect: Eventos cargados exitosamente");
    }
  }, []);

  const handleRegistrar = (evento: Evento) => {
    if (eventoEditar) {
      // Actualizar evento existente
      const eventosActualizados = eventos.map(e =>
        e.id === evento.id ? evento : e
      );
      setEventos(eventosActualizados);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem("eventos", JSON.stringify(eventosActualizados));
      }
      setEventoEditar(null);
      console.log("Evento actualizado: ", evento);
    } else {
      // Crear nuevo evento
      const nuevosEventos = [...eventos, evento];
      setEventos(nuevosEventos);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem("eventos", JSON.stringify(nuevosEventos));
      }
      console.log("Nuevo evento creado: ", evento);
    }
    setMostrarFormulario(false);
  };

  const handleEditar = (evento: Evento) => {
    setEventoEditar(evento);
    setMostrarFormulario(true);
    console.log("Iniciando edician para: ", evento);
  };

  const handleEliminar = (id: string) => {
    const eventosActualizados = eventos.filter(evento => evento.id !== id);
    setEventos(eventosActualizados);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem("eventos", JSON.stringify(eventosActualizados));
    }
    console.log("Evento eliminado con ID: ", id);
  };

  const handleCancelar = () => {
    setEventoEditar(null);
    setMostrarFormulario(false);
    console.log("Edicion cancelada.");
  };

  return (
    <div>
      <h1>Sistema de Gestion de Actividades</h1>
      <p>Organizzacion Comunitaria - Gestion de Eventos</p>

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
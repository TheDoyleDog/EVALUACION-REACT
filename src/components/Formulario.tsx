'use client';

import { useState } from 'react';
import { Evento, initialStateEvento } from '@/types';

interface FormularioProps {
  onSubmit: (evento: Evento) => void;
  eventoEditar?: Evento | null;
  onCancelar?: () => void;
}

export default function Formulario({ onSubmit, eventoEditar, onCancelar }: FormularioProps) {
  const [evento, setEvento] = useState<Evento>(eventoEditar || initialStateEvento);
  const [errores, setErrores] = useState({
    nombre: "",
    presupuesto: "",
    categoria: "",
    descripcion: "",
    fecha: ""
  });

  const handleEvento = (name: string, value: string | number) => {
    setEvento({
      ...evento,
      [name]: value
    });

    // Validaciones simples
    if (name === "nombre" && typeof value === "string" && value.length < 3) {
      setErrores({ ...errores, nombre: "El nombre debe tener al menos 3 caracteres" });
    } else if (name === "nombre") {
      setErrores({ ...errores, nombre: "" });
    }

    if (name === "presupuesto" && Number(value) <= 0) {
      setErrores({ ...errores, presupuesto: "El presupuesto debe ser mayor a 0" });
    } else if (name === "presupuesto") {
      setErrores({ ...errores, presupuesto: "" });
    }

    if (name === "categoria" && !value) {
      setErrores({ ...errores, categoria: "Debe seleccionar una categoría" });
    } else if (name === "categoria") {
      setErrores({ ...errores, categoria: "" });
    }

    if (name === "descripcion" && typeof value === "string" && value.length < 10) {
      setErrores({ ...errores, descripcion: "La descripción debe tener al menos 10 caracteres" });
    } else if (name === "descripcion") {
      setErrores({ ...errores, descripcion: "" });
    }

    if (name === "fecha" && !value) {
      setErrores({ ...errores, fecha: "Debe seleccionar una fecha" });
    } else if (name === "fecha") {
      setErrores({ ...errores, fecha: "" });
    }
  };

  const handleRegistrar = () => {
    // Generar ID si es un evento nuevo
    if (!evento.id) {
      evento.id = Date.now().toString();
    }
    
    onSubmit(evento);
    
    // Limpiar formulario si no es edición
    if (!eventoEditar) {
      setEvento(initialStateEvento);
    }
  };

  return (
    <form>
      <h2>{eventoEditar ? 'Editar Evento' : 'Crear Nuevo Evento'}</h2>

      <label>Nombre del Evento *</label><br/>
      <input
        type="text"
        name="nombre"
        value={evento.nombre}
        placeholder="Nombre del evento"
        onChange={(e) => handleEvento(e.target.name, e.target.value)}
      /><br/>
      <span>{errores.nombre}</span><br/>

      <label>Presupuesto *</label><br/>
      <input
        type="number"
        name="presupuesto"
        value={evento.presupuesto}
        placeholder="0.00"
        min="0"
        step="0.01"
        onChange={(e) => handleEvento(e.target.name, Number(e.target.value))}
      /><br/>
      <span>{errores.presupuesto}</span><br/>

      <label>Categoría *</label><br/>
      <select
        name="categoria"
        value={evento.categoria}
        onChange={(e) => handleEvento(e.target.name, e.target.value)}
      >
        <option value="">Seleccione una categoría</option>
        <option value="educativo">Educativo</option>
        <option value="cultural">Cultural</option>
        <option value="deportivo">Deportivo</option>
        <option value="social">Social</option>
        <option value="benefico">Benéfico</option>
      </select><br/>
      <span>{errores.categoria}</span><br/>

      <label>Descripción *</label><br/>
      <textarea
        name="descripcion"
        value={evento.descripcion}
        placeholder="Describa el evento..."
        rows={4}
        onChange={(e) => handleEvento(e.target.name, e.target.value)}
      /><br/>
      <span>{errores.descripcion}</span><br/>

      <label>Fecha del Evento *</label><br/>
      <input
        type="date"
        name="fecha"
        value={evento.fecha}
        onChange={(e) => handleEvento(e.target.name, e.target.value)}
      /><br/>
      <span>{errores.fecha}</span><br/>

      <button
        type="button"
        onClick={handleRegistrar}
      >
        {eventoEditar ? 'Actualizar' : 'Registrar'} Evento
      </button>
      
      {eventoEditar && onCancelar && (
        <button
          type="button"
          onClick={onCancelar}
        >
          Cancelar
        </button>
      )}
    </form>
  );
}
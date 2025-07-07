'use client';

import { useState, useEffect } from 'react';
import { Evento, initialStateEvento } from '@/types';

interface FormularioProps {
  onSubmit: (evento: Evento) => void;
  eventoEditar?: Evento | null;
  onCancelar?: () => void;
}

export default function Formulario({ onSubmit, eventoEditar, onCancelar }: FormularioProps) {
  // Estado para el evento actual del formulario
  const [evento, setEvento] = useState<Evento>(eventoEditar || initialStateEvento);
  // Estado para los mensajes de error de cada campo
  const [errores, setErrores] = useState({
    nombre: "",
    presupuesto: "",
    categoria: "",
    descripcion: "",
    fecha: ""
  });

  // Efecto para resetear el formulario cuando se edita un evento diferente
  useEffect(() => {
    setEvento(eventoEditar || initialStateEvento);
    setErrores({
      nombre: "",
      presupuesto: "",
      categoria: "",
      descripcion: "",
      fecha: ""
    });
  }, [eventoEditar]);

  // Función para validar un campo específico
  const validateField = (name: string, value: string | number) => {
    let error = "";
    switch (name) {
      case "nombre":
        if (typeof value !== "string" || value.trim().length < 3) {
          error = "El nombre debe tener al menos 3 caracteres.";
        }
        break;
      case "presupuesto":
        if (typeof value !== "number" || value <= 0) {
          error = "El presupuesto debe ser un número mayor a 0.";
        }
        break;
      case "categoria":
        if (typeof value !== "string" || !value) {
          error = "Debe seleccionar una categoría.";
        }
        break;
      case "descripcion":
        if (typeof value !== "string" || value.trim().length < 10) {
          error = "La descripción debe tener al menos 10 caracteres.";
        }
        break;
      case "fecha":
        if (typeof value !== "string" || !value) {
          error = "Debe seleccionar una fecha.";
        } else if (new Date(value) < new Date()) {
          error = "La fecha no puede ser anterior a hoy.";
        }
        break;
      default:
        break;
    }
    return error;
  };

  // Maneja los cambios en los campos del formulario
  const handleEvento = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const parsedValue = name === "presupuesto" ? Number(value) : value;

    setEvento({
      ...evento,
      [name]: parsedValue
    });

    // Valida el campo y actualiza los errores
    const error = validateField(name, parsedValue);
    setErrores(prevErrores => ({ ...prevErrores, [name]: error }));
  };

  // Valida todo el formulario antes de enviar
  const validateForm = () => {
    let newErrores: typeof errores = {
      nombre: "",
      presupuesto: "",
      categoria: "",
      descripcion: "",
      fecha: ""
    };
    let isValid = true;

    // Itera sobre cada campo del evento para validarlo
    for (const key in evento) {
      if (Object.prototype.hasOwnProperty.call(evento, key)) {
        const error = validateField(key, evento[key as keyof Evento]);
        if (error) {
          newErrores = { ...newErrores, [key]: error };
          isValid = false;
        }
      }
    }
    setErrores(newErrores);
    return isValid;
  };

  // Maneja el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    if (validateForm()) { // Si el formulario es válido
      // Genera un ID si es un evento nuevo
      if (!evento.id) {
        evento.id = Date.now().toString();
      }
      onSubmit(evento); // Llama a la función onSubmit pasada por props
      // Limpia el formulario si no se está editando
      if (!eventoEditar) {
        setEvento(initialStateEvento);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>
        {eventoEditar ? 'Editar Evento' : 'Crear Nuevo Evento'}
      </h2>

      {/* Campo Nombre */}
      <div>
        <label htmlFor="nombre">
          Nombre del Evento *
        </label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={evento.nombre}
          onChange={handleEvento}
          placeholder="Ingrese el nombre del evento"
        />
        {errores.nombre && <p style={{color: 'red', fontSize: '0.8em'}}>{errores.nombre}</p>}
      </div>

      {/* Campo Presupuesto */}
      <div>
        <label htmlFor="presupuesto">
          Presupuesto *
        </label>
        <input
          type="number"
          id="presupuesto"
          name="presupuesto"
          value={evento.presupuesto}
          onChange={handleEvento}
          min="0"
          step="0.01"
          placeholder="0.00"
        />
        {errores.presupuesto && <p style={{color: 'red', fontSize: '0.8em'}}>{errores.presupuesto}</p>}
      </div>

      {/* Campo Categoría */}
      <div>
        <label htmlFor="categoria">
          Categoría *
        </label>
        <select
          id="categoria"
          name="categoria"
          value={evento.categoria}
          onChange={handleEvento}
        >
          <option value="">Seleccione una categoría</option>
          <option value="educativo">Educativo</option>
          <option value="cultural">Cultural</option>
          <option value="deportivo">Deportivo</option>
          <option value="social">Social</option>
          <option value="benefico">Benéfico</option>
        </select>
        {errores.categoria && <p style={{color: 'red', fontSize: '0.8em'}}>{errores.categoria}</p>}
      </div>

      {/* Campo Descripción */}
      <div>
        <label htmlFor="descripcion">
          Descripción *
        </label>
        <textarea
          id="descripcion"
          name="descripcion"
          value={evento.descripcion}
          onChange={handleEvento}
          rows={4}
          placeholder="Describa el evento..."
        />
        {errores.descripcion && <p style={{color: 'red', fontSize: '0.8em'}}>{errores.descripcion}</p>}
      </div>

      {/* Campo Fecha */}
      <div>
        <label htmlFor="fecha">
          Fecha del Evento *
        </label>
        <input
          type="date"
          id="fecha"
          name="fecha"
          value={evento.fecha}
          onChange={handleEvento}
        />
        {errores.fecha && <p style={{color: 'red', fontSize: '0.8em'}}>{errores.fecha}</p>}
      </div>

      {/* Botones de acción */}
      <div>
        <button type="submit">
          {eventoEditar ? 'Actualizar' : 'Registrar'} Evento
        </button>
        
        {eventoEditar && onCancelar && (
          <button type="button" onClick={onCancelar}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
'use client';
import { useState } from "react";
import Formulario from "@/components/Formulario";
import { Evento, initialStateEvento} from '@/types';

export default function Home() {
  const [submittedEvento, setSubmittedEvento] = useState<Evento | null>(null);

  const handleFormSubmitTest = (evento: Evento) => {
    console.log("Formulario enviado con exito:", evento);
    setSubmittedEvento(evento);
  };

  return (
    <div>
      <h1>Sistema de Gestion de Actividades</h1>
      <p>Testeo del componente Formulario</p>
      <Formulario onSubmit={handleFormSubmitTest} />
      {submittedEvento && (
        <div>
          <h2>Datos del Evento Enviado:</h2>
          <p>ID: {submittedEvento.id}</p>
          <p>Nombre: {submittedEvento.nombre}</p>
          <p>Presupuesto: {submittedEvento.presupuesto}</p>
          <p>Categoria: {submittedEvento.categoria}</p>
          <p>Descripcion: {submittedEvento.descripcion}</p>
          <p>Fecha: {submittedEvento.fecha}</p>
        </div>
      )}
    </div>
  )
}
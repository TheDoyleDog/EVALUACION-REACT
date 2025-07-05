'use client';
import { useState } from "react";
import { Evento, initialStateEvento} from '@/types';

export default function Home() {
  const [testEvento, setTestEvento] = useState<Evento>(initialStateEvento);

  console.log("Test de initialStateEvento:", testEvento);

  // Simulacion de una actualizacion para ver el estado
  const handleTestUpdate = () => {
    setTestEvento({
      ...testEvento,
      nombre: "Evento de Prueba",
      presupuesto: 100,
      categoria: "cultural"
    });
    console.log("Test de actualizacion de evento:", testEvento);
  };

  return (
    <div>
      <h1>Bienvenido al Sistema de Gestion de Actividades</h1>
      <p>La aplicacion esta funcionando</p>
      <button onClick={handleTestUpdate}>Test Update Evento</button>
      <p>Nombre de test: {testEvento.nombre}</p>
    </div>
  );
}
'use client';

import { useState } from "react";
import { Evento } from "@/types";

interface TablaProps {
    eventos: Evento[];
    onEditar: (evento: Evento) => void;
    onEliminar: (id: string) => void;
}

export default function Tabla({ eventos, onEditar, onEliminar}: TablaProps) {
    const [filtro, setFiltro] = useState('');
    const [categoriaFiltro, setCategoriaFiltro] = useState('');

    const eventosFiltrados = eventos.filter(evento => {
        const coincideTexto = evento.nombre.toLowerCase().includes(filtro.toLowerCase()) || evento.descripcion.toLowerCase().includes(filtro.toLowerCase());
        const coincideCategoria = categoriaFiltro === '' || evento.categoria === categoriaFiltro;

        return coincideTexto && coincideCategoria;
    });

    const handleEliminar = (id: string, nombre: string) => {
        if (window.confirm('Esta seguro de que desea elimnar el evento "${nombre}"?')) {
            onEliminar(id);
        }
    };

    return (
        <div>
            <h2>Lista de Eventos</h2>

            <label>Buscar Eventos</label><br/>
            <input
                type="text"
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                placeholder="Buscar por nombre o descripcion..."
            /><br/>

            <label>Filtrar por categoria</label><br/>
            <select
                value={categoriaFiltro}
                onChange={(e) => setCategoriaFiltro(e.target.value)}
            >
                <option value="">Todas las categorias</option>
                <option value="educativo">Educativo</option>
                <option value="cultural">Cultural</option>
                <option value="deportivo">Deportivo</option>
                <option value="benefico">Benefico</option>
            </select><br/>

            <p>Mostrando {eventosFiltrados.length} de {eventos.length} eventos</p>

            {eventosFiltrados.length === 0 ? (
                <div>
                    {eventos.length === 0 
                    ? 'No hay enventos registrados'
                    : 'No se encontraron eventos que coincidan con los filtros'
                    }
                </div>
            ) : (
                <table border={1}>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Categoria</th>
                            <th>Presupuesto</th>
                            <th>Fecha</th>
                            <th>Descripcion</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {eventosFiltrados.map((evento) => (
                            <tr key={evento.id}>
                                <td>{evento.nombre}</td>
                                <td>{evento.categoria}</td>
                                <td>${evento.presupuesto}</td>
                                <td>{new Date(evento.fecha).toLocaleDateString('es-ES')}</td>
                                <td>{evento.descripcion}</td>
                                <td>
                                    <button onClick={() => onEditar(evento)}>
                                        Editar
                                    </button>
                                    <button onClick={() => handleEliminar(evento.id, evento.nombre)}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
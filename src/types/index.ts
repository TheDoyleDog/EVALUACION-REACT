export interface Evento {
    id: string;
    nombre: string;
    presupuesto: number;
    categoria: string;
    descripcion: string;
    fecha: string;
}

//Estado inicial para el formulario
export const initialStateEvento: Evento = {
    id: "",
    nombre: "",
    presupuesto: 0,
    categoria: "",
    descripcion: "",
    fecha: ""
};
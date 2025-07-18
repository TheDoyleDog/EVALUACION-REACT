import { addDoc, collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "./Conexion";
import { Evento } from "@/types";

export const registrarEvento = async (evento: Evento) => {
  try {
    const docRef = await addDoc(collection(db, "eventos"), evento);
    console.log("Document written with ID: ", docRef.id);
    return { ...evento, id: docRef.id };
  } catch (e) {
    console.error("Error adding document: ", e);
    return evento;
  }
};

export const obtenerEventos = async () => {
  const result: Evento[] = [];
  const querySnapshot = await getDocs(collection(db, "eventos"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
    result.push({ ...doc.data() as Evento, id: doc.id });
  });
  return result;
};

export const actualizarEvento = async (evento: Evento) => {
  try {
    const eventoDoc = doc(db, "eventos", evento.id);
    const { id, ...eventoData } = evento;
    await updateDoc(eventoDoc, eventoData);
    console.log("Document updated with ID: ", evento.id);
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};

export const eliminarEvento = async (id: string) => {
  try {
    const eventoDoc = doc(db, "eventos", id);
    await deleteDoc(eventoDoc);
    console.log("Document deleted with ID: ", id);
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
};



import { useState } from 'react';
import Encabezado from './components/Encabezado';
import ListaEquipos from './components/ListaEquipos';
import { equiposIniciales } from './data/equipos';
import type { Equipo } from './types/Equipo';
import './App.css';

export default function App() {
  const [equipos] = useState<Equipo[]>(equiposIniciales);

  const manejarPrestamo = (id: number) => {
    alert(`Formulario de préstamo para el equipo ${id}. Lo implementaremos en la Parte 2.`);
  };

  return (
    <div className="aplicacion">
      <Encabezado equipos={equipos} />

      <main>
        <div className="titulo-seccion">
          <h2>Inventario de equipos</h2>
          <p>Consulta la disponibilidad de los equipos del laboratorio.</p>
        </div>

        <ListaEquipos
          equipos={equipos}
          onPrestar={manejarPrestamo}
        />
      </main>
    </div>
  );
}
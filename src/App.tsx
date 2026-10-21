
import { useEffect, useState } from 'react';
import { useEquipos } from './hooks/useEquipos';

import Encabezado from './components/Encabezado';
import ListaEquipos from './components/ListaEquipos';
import FormularioPrestamo from './components/FormularioPrestamo';
import PrestamosActivos from './pages/PrestamosActivos';

import type { Equipo } from './types/Equipo';
import type { Prestamo } from './types/Prestamo';

import {
  obtenerPrestamos,
  crearPrestamo,
  actualizarEquipo,
  marcarDevuelto,
} from './services/api';

import './App.css';

export default function App() {
  // Hook personalizado para administrar equipos
  const {
    equipos,
    cargando,
    error: errorEquipos,
    cargarEquipos,
  } = useEquipos();

  const [prestamos, setPrestamos] = useState<Prestamo[]>([]);
  const [equipoSeleccionado, setEquipoSeleccionado] =
    useState<Equipo | null>(null);

  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState('Todas');
  const [error, setError] = useState('');
  const [guardando, setGuardando] = useState(false);
  const [devolviendoId, setDevolviendoId] =
    useState<string | number | null>(null);

  // Cargar préstamos desde JSON Server
  const cargarPrestamos = async () => {
    try {
      const datos = await obtenerPrestamos();
      setPrestamos(datos);
    } catch {
      setError('No se pudieron cargar los préstamos.');
    }
  };

  useEffect(() => {
    void cargarPrestamos();
  }, []);

  // Volver a consultar la API
  const reintentar = async () => {
    setError('');

    await Promise.all([
      cargarEquipos(),
      cargarPrestamos(),
    ]);
  };

  // Seleccionar equipo disponible
  const manejarPrestamo = (id: number) => {
    const equipo = equipos.find(
      (item) => item.id === id
    );

    if (equipo?.disponible) {
      setEquipoSeleccionado(equipo);
    }
  };

  // Registrar préstamo
  const guardarPrestamo = async (datos: {
    solicitante: string;
    carne: string;
    fechaLimite: string;
  }) => {
    if (!equipoSeleccionado || guardando) return;

    setGuardando(true);
    setError('');

    const nuevoPrestamo: Prestamo = {
      id: String(Date.now()),
      equipoId: equipoSeleccionado.id,
      solicitante: datos.solicitante,
      carne: datos.carne,
      fechaPrestamo: new Date().toISOString(),
      fechaLimite: datos.fechaLimite,
      devuelto: false,
    };

    try {
      await crearPrestamo(nuevoPrestamo);
      await actualizarEquipo(equipoSeleccionado.id, false);

      await Promise.all([
        cargarEquipos(),
        cargarPrestamos(),
      ]);

      setEquipoSeleccionado(null);
    } catch (error) {
      console.error('Error al registrar:', error);
      setError(
        'No se pudo completar el préstamo. Revisa JSON Server.'
      );
    } finally {
      setGuardando(false);
    }
  };

  // Devolver un equipo
  const devolverPrestamo = async (
    id: number | string
  ) => {
    if (devolviendoId !== null) return;

    const prestamo = prestamos.find(
      (p) => String(p.id) === String(id)
    );

    if (!prestamo || prestamo.devuelto) return;

    setDevolviendoId(id);
    setError('');

    try {
      await marcarDevuelto(prestamo.id);
      await actualizarEquipo(prestamo.equipoId, true);

      await Promise.all([
        cargarEquipos(),
        cargarPrestamos(),
      ]);
    } catch (error) {
      console.error('Error al devolver:', error);
      setError(
        'No se pudo devolver el equipo. Revisa JSON Server.'
      );
    } finally {
      setDevolviendoId(null);
    }
  };

  // Búsqueda y filtros
  const equiposFiltrados = equipos.filter((equipo) => {
    const coincideNombre = equipo.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());

    const coincideCategoria =
      categoria === 'Todas' ||
      equipo.categoria === categoria;

    return coincideNombre && coincideCategoria;
  });

  return (
    <div className="aplicacion">
      <Encabezado equipos={equipos} />

      <main>
        <div className="titulo-seccion">
          <h2>Inventario de equipos</h2>
          <p>
            Consulta la disponibilidad de los equipos
            del laboratorio.
          </p>
        </div>

        {(error || errorEquipos) && (
          <div style={{ marginBottom: '20px' }}>
            <p style={{ color: 'red' }}>
              {error || errorEquipos}
            </p>

            <button
              type="button"
              onClick={reintentar}
            >
              Reintentar
            </button>
          </div>
        )}

        <div className="filtros">
          <input
            type="text"
            placeholder="Buscar equipo por nombre..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />

          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="Todas">
              Todas las categorías
            </option>
            <option value="Tablet">Tablet</option>
            <option value="Cámara">Cámara</option>
            <option value="Micrófono">Micrófono</option>
          </select>
        </div>

        {cargando ? (
          <p>Cargando equipos...</p>
        ) : (
          <ListaEquipos
            equipos={equiposFiltrados}
            onPrestar={manejarPrestamo}
          />
        )}

        <PrestamosActivos
          prestamos={prestamos}
          equipos={equipos}
          onDevolver={devolverPrestamo}
        />

        <p>
          Préstamos registrados: {prestamos.length}
        </p>
      </main>

      {equipoSeleccionado && (
        <FormularioPrestamo
          equipo={equipoSeleccionado}
          onGuardar={guardarPrestamo}
          onCancelar={() =>
            setEquipoSeleccionado(null)
          }
        />
      )}
    </div>
  );
}

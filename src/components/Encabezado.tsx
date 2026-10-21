import type { Equipo } from '../types/Equipo';

interface EncabezadoProps {
  equipos: Equipo[];
}

export default function Encabezado({ equipos }: EncabezadoProps) {
  const disponibles = equipos.filter(
    (equipo) => equipo.disponible
  ).length;

  return (
    <header className="encabezado">
      <div>
        <h1>Préstamos Lab — 0902-20-9735</h1>
        <p>Sistema de control de equipos del laboratorio</p>
      </div>

      <div className="contador">
        <strong>{disponibles} de {equipos.length}</strong>
        <span> equipos disponibles</span>
      </div>
    </header>
  );
}
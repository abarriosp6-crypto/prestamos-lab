import type { Equipo } from '../types/Equipo';

interface TarjetaEquipoProps {
  equipo: Equipo;
  onPrestar: (id: number) => void;
}

export default function TarjetaEquipo({
  equipo,
  onPrestar,
}: TarjetaEquipoProps) {
  return (
    <article className="tarjeta-equipo">
      <div className="equipo-icono">
        {equipo.categoria === 'Tablet'
          ? '📱'
          : equipo.categoria === 'Cámara'
          ? '📷'
          : '🎤'}
      </div>

      <h3>{equipo.nombre}</h3>
      <p>{equipo.categoria}</p>

      <span className={equipo.disponible ? 'disponible' : 'prestado'}>
        {equipo.disponible ? 'Disponible' : 'Prestado'}
      </span>

      <button
        disabled={!equipo.disponible}
        onClick={() => onPrestar(equipo.id)}
      >
        Prestar equipo
      </button>
    </article>
  );
}
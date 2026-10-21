
import type { Equipo } from '../types/Equipo';
import type { Prestamo } from '../types/Prestamo';

interface PrestamosActivosProps {
  equipos: Equipo[];
  prestamos: Prestamo[];
  onDevolver: (id: number | string) => void;
}

export default function PrestamosActivos({
  equipos,
  prestamos,
  onDevolver,
}: PrestamosActivosProps) {
  const activos = prestamos.filter((p) => !p.devuelto);

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  return (
    <section className="prestamos-seccion">
      <h2>Préstamos activos</h2>
      <p>Consulta los préstamos registrados y devuelve los equipos.</p>

      {activos.length === 0 ? (
        <p>No hay préstamos activos registrados.</p>
      ) : (
        <div className="tabla-contenedor">
          <table className="tabla-prestamos">
            <thead>
              <tr>
                <th>Equipo</th>
                <th>Solicitante</th>
                <th>Fecha límite</th>
                <th>Estado</th>
                <th>Acción</th>
              </tr>
            </thead>

            <tbody>
              {activos.map((prestamo) => {
                const equipo = equipos.find(
                  (e) => String(e.id) === String(prestamo.equipoId)
                );

                const fecha = new Date(prestamo.fechaLimite);
                const vencido = fecha < hoy;

                return (
                  <tr
                    key={prestamo.id}
                    className={vencido ? 'fila-vencida' : ''}
                  >
                    <td>{equipo?.nombre ?? 'Equipo no encontrado'}</td>
                    <td>{prestamo.solicitante}</td>
                    <td>{fecha.toLocaleDateString('es-GT')}</td>
                    <td>
                      <span
                        className={
                          vencido ? 'estado-vencido' : 'estado-activo'
                        }
                      >
                        {vencido ? 'Vencido' : 'Activo'}
                      </span>
                    </td>
                    <td>
                      <button
                        className="boton-devolver"
                        onClick={() => onDevolver(prestamo.id)}
                      >
                        Devolver
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

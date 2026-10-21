
import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import type { Equipo } from '../types/Equipo';

interface FormularioPrestamoProps {
  equipo: Equipo;
  onGuardar: (datos: {
    solicitante: string;
    carne: string;
    fechaLimite: string;
  }) => Promise<void>;
  onCancelar: () => void;
}

export default function FormularioPrestamo({
  equipo,
  onGuardar,
  onCancelar,
}: FormularioPrestamoProps) {
  const [solicitante, setSolicitante] = useState('');
  const [carne, setCarne] = useState('');
  const [fechaLimite, setFechaLimite] = useState('');
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [guardando, setGuardando] = useState(false);
  const enviandoRef = useRef(false);

  const validar = () => {
    const nuevosErrores: Record<string, string> = {};

    if (solicitante.trim().length < 5) {
      nuevosErrores.solicitante =
        'El nombre debe tener al menos 5 caracteres.';
    }

    if (!/^\d{4}-\d{2}-\d{5}$/.test(carne)) {
      nuevosErrores.carne =
        'El carné debe tener el formato 0000-00-00000.';
    }

    if (!fechaLimite) {
      nuevosErrores.fechaLimite =
        'Seleccione una fecha límite.';
    } else {
      const ahora = new Date();
      const hoy = new Date(
        ahora.getFullYear(),
        ahora.getMonth(),
        ahora.getDate()
      );

      const [anio, mes, dia] = fechaLimite
        .split('-')
        .map(Number);

      const fecha = new Date(anio, mes - 1, dia);

      const diferencia = Math.round(
        (Date.UTC(anio, mes - 1, dia) -
          Date.UTC(
            hoy.getFullYear(),
            hoy.getMonth(),
            hoy.getDate()
          )) / 86400000
      );

      if (diferencia < 0) {
        nuevosErrores.fechaLimite =
          'La fecha no puede ser anterior a hoy.';
      } else if (diferencia > 2) {
        nuevosErrores.fechaLimite =
          'El préstamo no puede superar los 2 días.';
      } else if (
        fecha.getDay() === 0 ||
        fecha.getDay() === 6
      ) {
        nuevosErrores.fechaLimite =
          'No se permiten fechas límite en fines de semana.';
      }
    }

    setErrores(nuevosErrores);

    return Object.keys(nuevosErrores).length === 0;
  };

  const manejarEnvio = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    // Evitar solicitudes duplicadas
    if (enviandoRef.current) return;

    if (!validar()) return;

    enviandoRef.current = true;
    setGuardando(true);

    try {
      await onGuardar({
        solicitante: solicitante.trim(),
        carne,
        fechaLimite: new Date(
          `${fechaLimite}T12:00:00`
        ).toISOString(),
      });
    } catch (error) {
      console.error(
        'Error al enviar el formulario:',
        error
      );
    } finally {
      enviandoRef.current = false;
      setGuardando(false);
    }
  };

  return (
    <div className="modal-fondo">
      <form
        className="formulario-prestamo"
        onSubmit={manejarEnvio}
        noValidate
      >
        <h2>Registrar préstamo</h2>

        <p>
          Equipo: <strong>{equipo.nombre}</strong>
        </p>

        <label htmlFor="solicitante">
          Nombre del solicitante
        </label>

        <input
          id="solicitante"
          value={solicitante}
          disabled={guardando}
          onChange={(e) =>
            setSolicitante(e.target.value)
          }
          placeholder="Nombre completo"
        />

        {errores.solicitante && (
          <small className="mensaje-error">
            {errores.solicitante}
          </small>
        )}

        <label htmlFor="carne">Carné</label>

        <input
          id="carne"
          value={carne}
          disabled={guardando}
          onChange={(e) =>
            setCarne(e.target.value)
          }
          placeholder="0000-00-00000"
        />

        {errores.carne && (
          <small className="mensaje-error">
            {errores.carne}
          </small>
        )}

        <label htmlFor="fechaLimite">
          Fecha límite
        </label>

        <input
          id="fechaLimite"
          type="date"
          value={fechaLimite}
          disabled={guardando}
          onChange={(e) =>
            setFechaLimite(e.target.value)
          }
        />

        {errores.fechaLimite && (
          <small className="mensaje-error">
            {errores.fechaLimite}
          </small>
        )}

        <div className="acciones-formulario">
          <button
            type="button"
            onClick={onCancelar}
            disabled={guardando}
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={guardando}
          >
            {guardando
              ? 'Guardando...'
              : 'Guardar préstamo'}
          </button>
        </div>
      </form>
    </div>
  );
}

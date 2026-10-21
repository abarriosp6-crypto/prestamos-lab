
import type { Equipo } from '../types/Equipo';
import type { Prestamo } from '../types/Prestamo';

const API_URL =
  import.meta.env.VITE_API_URL || 'http://127.0.0.1:3003';

// Verificar respuestas de JSON Server
async function verificarRespuesta(respuesta: Response) {
  if (!respuesta.ok) {
    throw new Error(
      `Error HTTP ${respuesta.status}: ${respuesta.statusText}`
    );
  }

  return respuesta.json();
}

// Obtener todos los equipos
export async function obtenerEquipos(): Promise<Equipo[]> {
  const respuesta = await fetch(`${API_URL}/equipos`);
  const datos = await verificarRespuesta(respuesta);

  return datos.map((equipo: Equipo) => ({
    ...equipo,
    id: Number(equipo.id),
  }));
}

// Obtener todos los préstamos
export async function obtenerPrestamos(): Promise<Prestamo[]> {
  const respuesta = await fetch(`${API_URL}/prestamos`);
  const datos = await verificarRespuesta(respuesta);

  return datos.map((prestamo: Prestamo) => ({
    ...prestamo,
    id: String(prestamo.id),
    equipoId: Number(prestamo.equipoId),
  }));
}

// Registrar un nuevo préstamo
export async function crearPrestamo(
  prestamo: Prestamo
): Promise<Prestamo> {
  const respuesta = await fetch(`${API_URL}/prestamos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...prestamo,
      id: String(prestamo.id),
    }),
  });

  const datos = await verificarRespuesta(respuesta);

  return {
    ...datos,
    id: String(datos.id),
    equipoId: Number(datos.equipoId),
  };
}

// Actualizar disponibilidad de un equipo
export async function actualizarEquipo(
  id: number,
  disponible: boolean
): Promise<Equipo> {
  const respuesta = await fetch(
    `${API_URL}/equipos/${encodeURIComponent(String(id))}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ disponible }),
    }
  );

  const datos = await verificarRespuesta(respuesta);

  return {
    ...datos,
    id: Number(datos.id),
  };
}

// Marcar un préstamo como devuelto
export async function marcarDevuelto(
  id: string | number
): Promise<Prestamo> {
  const respuesta = await fetch(
    `${API_URL}/prestamos/${encodeURIComponent(String(id))}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ devuelto: true }),
    }
  );

  const datos = await verificarRespuesta(respuesta);

  return {
    ...datos,
    id: String(datos.id),
    equipoId: Number(datos.equipoId),
  };
}

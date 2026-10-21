
import { useCallback, useEffect, useState } from 'react';
import type { Equipo } from '../types/Equipo';
import { obtenerEquipos } from '../services/api';

export function useEquipos() {
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const cargarEquipos = useCallback(async () => {
    setCargando(true);
    setError('');

    try {
      const datos = await obtenerEquipos();
      setEquipos(datos);
    } catch {
      setError('No se pudieron cargar los equipos.');
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    void cargarEquipos();
  }, [cargarEquipos]);

  return {
    equipos,
    setEquipos,
    cargando,
    error,
    cargarEquipos,
  };
}

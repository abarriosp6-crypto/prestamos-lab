export interface Prestamo {
  id: string | number;
  equipoId: number;
  solicitante: string;
  carne: string;
  fechaPrestamo: string;
  fechaLimite: string;
  devuelto: boolean;
}
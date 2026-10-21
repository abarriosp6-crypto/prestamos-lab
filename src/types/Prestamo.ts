export interface Prestamo {
  id: number;
  equipoId: number;
  solicitante: string;
  carne: string;
  fechaPrestamo: string;
  fechaLimite: string;
  devuelto: boolean;
}
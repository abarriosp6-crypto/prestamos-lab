import type { Equipo } from '../types/Equipo';

export const equiposIniciales: Equipo[] = [
  { id: 1, nombre: 'Samsung Galaxy Tab S9', categoria: 'Tablet', disponible: true },
  { id: 2, nombre: 'Apple iPad 10', categoria: 'Tablet', disponible: true },
  { id: 3, nombre: 'Lenovo Tab M10', categoria: 'Tablet', disponible: false },
  { id: 4, nombre: 'Canon EOS Rebel T7', categoria: 'Cámara', disponible: true },
  { id: 5, nombre: 'Sony Alpha A6400', categoria: 'Cámara', disponible: true },
  { id: 6, nombre: 'Nikon D3500', categoria: 'Cámara', disponible: false },
  { id: 7, nombre: 'Blue Yeti USB', categoria: 'Micrófono', disponible: true },
  { id: 8, nombre: 'HyperX QuadCast', categoria: 'Micrófono', disponible: true },
];
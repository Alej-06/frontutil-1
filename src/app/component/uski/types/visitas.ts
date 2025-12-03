export interface IVisita {
  id: number
  nombre: string
  comentario: string
  fechaCreacion: string
  fechaModificacion: string | null
  estaPublicado: boolean;
}
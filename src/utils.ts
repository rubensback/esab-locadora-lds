export interface IdAndName {
  id: string
  name: string
}

export interface Movie {
  id: string
  name: string
  days: number
  value: number
  type: string
  status: string
}

export const formattedPrice = (price: number) =>
  !isNaN(price)
    ? new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price)
    : ''

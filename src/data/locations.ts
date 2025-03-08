export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  isAirport: boolean;
}

export const locations: Location[] = [
  {
    id: 'vila-seca',
    name: 'Vila-seca',
    address: 'Calle Principal 123',
    city: 'Vila-seca',
    isAirport: false
  },
  {
    id: 'tarragona',
    name: 'Tarragona Centro',
    address: 'Avenida Central 45',
    city: 'Tarragona',
    isAirport: false
  },
  {
    id: 'reus-airport',
    name: 'Aeropuerto de Reus',
    address: 'Terminal de Llegadas',
    city: 'Reus',
    isAirport: true
  },
  {
    id: 'barcelona-airport',
    name: 'Aeropuerto de Barcelona',
    address: 'Terminal 1, Zona de Llegadas',
    city: 'Barcelona',
    isAirport: true
  },
  {
    id: 'barcelona-center',
    name: 'Barcelona Centro',
    address: 'Plaza Catalunya 10',
    city: 'Barcelona',
    isAirport: false
  },
  {
    id: 'salou',
    name: 'Salou',
    address: 'Paseo Marítimo 78',
    city: 'Salou',
    isAirport: false
  },
  {
    id: 'cambrils',
    name: 'Cambrils',
    address: 'Avenida del Mar 22',
    city: 'Cambrils',
    isAirport: false
  }
]; 
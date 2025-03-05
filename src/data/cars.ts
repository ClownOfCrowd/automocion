export interface Car {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
  features: string[];
  transmission: string;
  fuel: string;
  seats: number;
  luggage: number;
  power: number;
}

export const cars: Car[] = [
  {
    id: 'mercedes-c-class',
    name: 'Mercedes-Benz Clase C',
    description: 'Elegancia y rendimiento en perfecta armonía',
    category: 'Premium',
    price: 150,
    image: '/cars/mercedes-c-class.jpg',
    features: ['GPS', 'Bluetooth', 'Climatizador', 'Asientos de cuero'],
    transmission: 'Automático',
    fuel: 'Diesel',
    seats: 5,
    luggage: 3,
    power: 194
  },
  {
    id: 'bmw-5-series',
    name: 'BMW Serie 5',
    description: 'La combinación perfecta de deportividad y confort',
    category: 'Premium',
    price: 180,
    image: '/cars/bmw-5-series.jpg',
    features: ['GPS', 'Bluetooth', 'Climatizador', 'Asientos deportivos'],
    transmission: 'Automático',
    fuel: 'Gasolina',
    seats: 5,
    luggage: 3,
    power: 252
  },
  {
    id: 'audi-q7',
    name: 'Audi Q7',
    description: 'SUV de lujo con espacio y prestaciones excepcionales',
    category: 'SUV',
    price: 220,
    image: '/cars/audi-q7.jpg',
    features: ['GPS', 'Bluetooth', 'Climatizador', '7 plazas'],
    transmission: 'Automático',
    fuel: 'Diesel',
    seats: 7,
    luggage: 4,
    power: 286
  },
  {
    id: 'porsche-cayenne',
    name: 'Porsche Cayenne',
    description: 'Deportividad y lujo en formato SUV',
    category: 'SUV',
    price: 250,
    image: '/cars/porsche-cayenne.jpg',
    features: ['GPS', 'Bluetooth', 'Climatizador', 'Techo panorámico'],
    transmission: 'Automático',
    fuel: 'Gasolina',
    seats: 5,
    luggage: 3,
    power: 340
  },
  {
    id: 'range-rover-sport',
    name: 'Range Rover Sport',
    description: 'Lujo británico y capacidad todoterreno',
    category: 'SUV',
    price: 240,
    image: '/cars/range-rover-sport.jpg',
    features: ['GPS', 'Bluetooth', 'Climatizador', 'Tracción integral'],
    transmission: 'Automático',
    fuel: 'Diesel',
    seats: 5,
    luggage: 4,
    power: 300
  },
  {
    id: 'mercedes-s-class',
    name: 'Mercedes-Benz Clase S',
    description: 'La máxima expresión del lujo sobre ruedas',
    category: 'Premium',
    price: 300,
    image: '/cars/mercedes-s-class.jpg',
    features: ['GPS', 'Bluetooth', 'Climatizador', 'Masaje en asientos'],
    transmission: 'Automático',
    fuel: 'Gasolina',
    seats: 5,
    luggage: 3,
    power: 435
  }
]; 
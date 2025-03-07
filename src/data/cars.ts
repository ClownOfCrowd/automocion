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
  specs?: {
    year: number;
    transmission: string;
    fuel: string;
    consumption: number;
    doors: number;
    ac: boolean;
    gps: boolean;
    bluetooth: boolean;
    usb: boolean;
  };
}

export const cars: Car[] = [
  {
    id: 'peugeot-208',
    name: 'Peugeot 208',
    description: 'Компактный и экономичный городской автомобиль',
    category: 'Compact',
    price: 45,
    image: '/cars/peugeot-208.jpg',
    features: ['GPS', 'Bluetooth', 'Climatizador', 'USB'],
    transmission: 'Manual',
    fuel: 'Gasolina',
    seats: 5,
    luggage: 2,
    power: 100,
    specs: {
      year: 2022,
      transmission: 'Manual',
      fuel: 'Gasolina',
      consumption: 4.5,
      doors: 5,
      ac: true,
      gps: true,
      bluetooth: true,
      usb: true
    }
  },
  {
    id: 'citroen-c3',
    name: 'Citroen C3',
    description: 'Стильный и комфортный городской автомобиль',
    category: 'Compact',
    price: 50,
    image: '/cars/citroen-c3.jpg',
    features: ['GPS', 'Bluetooth', 'Climatizador', 'Sensores de aparcamiento'],
    transmission: 'Manual',
    fuel: 'Diesel',
    seats: 5,
    luggage: 2,
    power: 110,
    specs: {
      year: 2021,
      transmission: 'Manual',
      fuel: 'Diesel',
      consumption: 4.2,
      doors: 5,
      ac: true,
      gps: true,
      bluetooth: true,
      usb: true
    }
  },
  {
    id: 'mini-cooper-s',
    name: 'MINI Cooper S',
    description: 'Deportivo y elegante con un rendimiento excepcional',
    category: 'Premium',
    price: 85,
    image: '/cars/mini-cooper-s.jpg',
    features: ['GPS', 'Bluetooth', 'Climatizador', 'Asientos deportivos', 'Techo panorámico'],
    transmission: 'Automático',
    fuel: 'Gasolina',
    seats: 4,
    luggage: 1,
    power: 178,
    specs: {
      year: 2022,
      transmission: 'Automático',
      fuel: 'Gasolina',
      consumption: 6.2,
      doors: 3,
      ac: true,
      gps: true,
      bluetooth: true,
      usb: true
    }
  }
]; 
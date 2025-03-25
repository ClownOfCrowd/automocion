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
    category: 'economy',
    description: 'car.peugeot_208.description',
    price: 35,
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
    category: 'economy',
    description: 'car.citroen_c3.description',
    price: 38,
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
    category: 'premium',
    description: 'car.mini_cooper_s.description',
    price: 75,
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
  },
  {
    id: 'seat-ibiza',
    name: 'Seat IBIZA 1.4',
    category: 'economy',
    description: 'car.seat_ibiza.description',
    price: 35,
    image: '/cars/seat-ibiza.jpg',
    features: ['GPS', 'Bluetooth', 'Climatizador', 'USB', 'Sensores de aparcamiento'],
    transmission: 'Manual',
    fuel: 'Gasolina',
    seats: 5,
    luggage: 2,
    power: 85,
    specs: {
      year: 2021,
      transmission: 'Manual',
      fuel: 'Gasolina',
      consumption: 5.0,
      doors: 5,
      ac: true,
      gps: true,
      bluetooth: true,
      usb: true
    }
  },
  {
    id: 'peugeot-207sw',
    name: 'Peugeot 207sw OUTDOOR VT',
    category: 'economy',
    description: 'car.peugeot_207sw.description',
    price: 37,
    image: '/cars/peugeot-207sw.jpg',
    features: ['GPS', 'Bluetooth', 'Climatizador', 'USB', 'Sensores de aparcamiento'],
    transmission: 'Manual',
    fuel: 'Diesel',
    seats: 5,
    luggage: 3,
    power: 90,
    specs: {
      year: 2020,
      transmission: 'Manual',
      fuel: 'Diesel',
      consumption: 4.8,
      doors: 5,
      ac: true,
      gps: true,
      bluetooth: true,
      usb: true
    }
  },
  {
    id: 'mercedes-gle-350',
    name: 'Mercedes GLE 350 2019',
    category: 'premium',
    description: 'car.mercedes_gle.description',
    price: 350,
    image: '/cars/mercedes-gle.jpg',
    features: ['GPS', 'Bluetooth', 'Climatizador', 'Asientos de cuero', 'Techo panorámico', 'Sistema premium de sonido', 'Cámaras 360°'],
    transmission: 'Automático',
    fuel: 'Diesel',
    seats: 5,
    luggage: 4,
    power: 272,
    specs: {
      year: 2019,
      transmission: 'Automático',
      fuel: 'Diesel',
      consumption: 7.2,
      doors: 5,
      ac: true,
      gps: true,
      bluetooth: true,
      usb: true
    }
  },
  {
    id: 'range-rover-velar',
    name: 'Range Rover Velar 2019',
    category: 'premium',
    description: 'car.range_rover_velar.description',
    price: 350,
    image: '/cars/range-rover-velar.jpg',
    features: ['GPS', 'Bluetooth', 'Climatizador', 'Asientos de cuero', 'Techo panorámico', 'Sistema premium de sonido', 'Cámaras 360°', 'Head-up display'],
    transmission: 'Automático',
    fuel: 'Diesel',
    seats: 5,
    luggage: 4,
    power: 300,
    specs: {
      year: 2019,
      transmission: 'Automático',
      fuel: 'Diesel',
      consumption: 7.5,
      doors: 5,
      ac: true,
      gps: true,
      bluetooth: true,
      usb: true
    }
  }
]; 
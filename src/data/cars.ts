export interface Car {
  id: number
  name: string
  category: string
  price: number
  image: string
  specs: {
    seats: number
    transmission: string
    fuel: string
    consumption: number
    year: number
  }
  features: string[]
  available: boolean
}

export const cars: Car[] = [
  {
    id: 1,
    name: 'Mercedes-Benz C-Class',
    category: 'Premium',
    price: 120,
    image: '/cars/mercedes-c.jpg',
    specs: {
      seats: 5,
      transmission: 'Automatic',
      fuel: 'Diesel',
      consumption: 5.8,
      year: 2023
    },
    features: ['leather_seats', 'navigation', 'parking_sensors', 'bluetooth', 'climate_control', 'led_lights'],
    available: true
  },
  {
    id: 2,
    name: 'Volkswagen Golf',
    category: 'Economy',
    price: 45,
    image: '/cars/vw-golf.jpg',
    specs: {
      seats: 5,
      transmission: 'Manual',
      fuel: 'Petrol',
      consumption: 5.2,
      year: 2022
    },
    features: ['air_conditioning', 'bluetooth', 'usb', 'apple_carplay', 'android_auto'],
    available: true
  },
  {
    id: 3,
    name: 'Toyota RAV4 Hybrid',
    category: 'SUV',
    price: 85,
    image: '/cars/toyota-rav4.jpg',
    specs: {
      seats: 5,
      transmission: 'Automatic',
      fuel: 'Hybrid',
      consumption: 4.9,
      year: 2023
    },
    features: ['four_wheel_drive', 'backup_camera', 'apple_carplay', 'android_auto', 'lane_assist', 'adaptive_cruise'],
    available: true
  },
  {
    id: 4,
    name: 'BMW i4',
    category: 'Electric',
    price: 130,
    image: '/cars/bmw-i4.jpg',
    specs: {
      seats: 5,
      transmission: 'Automatic',
      fuel: 'Electric',
      consumption: 0,
      year: 2023
    },
    features: ['electric_range', 'fast_charging', 'premium_sound', 'panoramic_roof', 'driver_assistance'],
    available: true
  },
  {
    id: 5,
    name: 'Seat Leon',
    category: 'Economy',
    price: 50,
    image: '/cars/seat-leon.jpg',
    specs: {
      seats: 5,
      transmission: 'Manual',
      fuel: 'Petrol',
      consumption: 5.5,
      year: 2022
    },
    features: ['air_conditioning', 'bluetooth', 'usb', 'navigation', 'parking_sensors'],
    available: true
  },
  {
    id: 6,
    name: 'Audi Q5',
    category: 'SUV',
    price: 110,
    image: '/cars/audi-q5.jpg',
    specs: {
      seats: 5,
      transmission: 'Automatic',
      fuel: 'Diesel',
      consumption: 6.2,
      year: 2023
    },
    features: ['leather_seats', 'panoramic_roof', 'backup_camera', 'premium_sound', 'wireless_charging'],
    available: true
  },
  {
    id: 7,
    name: 'Fiat 500e',
    category: 'Electric',
    price: 65,
    image: '/cars/fiat-500e.jpg',
    specs: {
      seats: 4,
      transmission: 'Automatic',
      fuel: 'Electric',
      consumption: 0,
      year: 2023
    },
    features: ['electric_range', 'perfect_city', 'easy_parking', 'digital_cockpit', 'fast_charging'],
    available: true
  },
  {
    id: 8,
    name: 'Cupra Formentor',
    category: 'SUV',
    price: 95,
    image: '/cars/cupra-formentor.jpg',
    specs: {
      seats: 5,
      transmission: 'Automatic',
      fuel: 'Hybrid',
      consumption: 5.1,
      year: 2023
    },
    features: ['sport_mode', 'dynamic_chassis', 'premium_sound', 'digital_cockpit', 'wireless_charging'],
    available: true
  },
  {
    id: 9,
    name: 'Tesla Model 3',
    category: 'Electric',
    price: 115,
    image: '/cars/tesla-model3.jpg',
    specs: {
      seats: 5,
      transmission: 'Automatic',
      fuel: 'Electric',
      consumption: 0,
      year: 2023
    },
    features: ['electric_range', 'autopilot', 'premium_interior', 'supercharging', 'glass_roof'],
    available: true
  },
  {
    id: 10,
    name: 'Mercedes-Benz V-Class',
    category: 'Premium',
    price: 160,
    image: '/cars/mercedes-v.jpg',
    specs: {
      seats: 7,
      transmission: 'Automatic',
      fuel: 'Diesel',
      consumption: 7.2,
      year: 2023
    },
    features: ['luxury_interior', 'electric_doors', 'ambient_lighting', 'rear_climate', 'climate_control'],
    available: true
  }
] 
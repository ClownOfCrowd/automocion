interface Review {
  id: number
  name: string
  rating: number
  date: string
  comment: string
  avatar: string
  car: string
  status: 'pending' | 'approved' | 'rejected'
  language: string
}

export const reviews: Review[] = [
  {
    id: 1,
    name: 'Juan García',
    rating: 5,
    date: '2024-02-15',
    comment: 'Excelente servicio. El Mercedes-Benz Clase C estaba en perfectas condiciones y el personal fue muy atento. El proceso de alquiler fue rápido y sin complicaciones. ¡Definitivamente volveré a alquilar con ellos!',
    avatar: '/avatars/avatar1.jpg',
    car: 'Mercedes-Benz C-Class',
    status: 'approved',
    language: 'es'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    rating: 5,
    date: '2024-02-10',
    comment: 'Amazing experience with the Tesla Model 3! The car exceeded all expectations, and the staff was incredibly professional and friendly. The whole process was smooth and efficient. Will definitely recommend to friends!',
    avatar: '/avatars/avatar2.jpg',
    car: 'Tesla Model 3',
    status: 'approved',
    language: 'en'
  },
  {
    id: 3,
    name: 'Дмитрий Соколов',
    rating: 4,
    date: '2024-02-05',
    comment: 'Отличный опыт аренды BMW i4! Автомобиль в идеальном состоянии, персонал очень профессиональный. Единственное пожелание - ускорить процесс оформления документов. В целом, очень доволен и обязательно обращусь снова.',
    avatar: '/avatars/avatar3.jpg',
    car: 'BMW i4',
    status: 'approved',
    language: 'ru'
  },
  {
    id: 4,
    name: 'Maria Fernández',
    rating: 5,
    date: '2024-01-30',
    comment: 'El Fiat 500e es perfecto para la ciudad. Muy económico y fácil de aparcar. El servicio de atención al cliente fue excepcional, y el proceso de alquiler muy sencillo. ¡Una experiencia fantástica!',
    avatar: '/avatars/avatar4.jpg',
    car: 'Fiat 500e',
    status: 'approved',
    language: 'es'
  },
  {
    id: 5,
    name: 'Michael Brown',
    rating: 5,
    date: '2024-01-25',
    comment: 'The Audi Q5 was perfect for our family trip. The car was immaculately clean and well-maintained. The staff was helpful and provided excellent service. The pricing was transparent with no hidden fees. Will definitely use their services again!',
    avatar: '/avatars/avatar5.jpg',
    car: 'Audi Q5',
    status: 'approved',
    language: 'en'
  },
  {
    id: 6,
    name: 'Sophie Dubois',
    rating: 5,
    date: '2024-01-20',
    comment: 'Excellente expérience avec la Porsche Taycan ! La voiture était en parfait état et le personnel très professionnel. Le processus de location était simple et rapide. Je recommande vivement ce service pour la qualité des véhicules et l\'attention portée aux clients.',
    avatar: '/avatars/avatar6.jpg',
    car: 'Porsche Taycan',
    status: 'approved',
    language: 'fr'
  }
]

export type { Review } 
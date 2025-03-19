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
    comment: 'Excelente servicio. El Peugeot 208 estaba en perfectas condiciones y el personal fue muy atento. El proceso de alquiler fue rápido y sin complicaciones. La conducción por Vila-seca fue increíble con este coche compacto. ¡Definitivamente volveré a alquilar con ellos!',
    avatar: '/avatars/avatar1.jpg',
    car: 'Peugeot 208',
    status: 'approved',
    language: 'es'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    rating: 5,
    date: '2024-02-10',
    comment: 'Amazing experience with the Citroen C3! The car exceeded all expectations - very economical and perfect for our trip around Tarragona. The staff was incredibly professional and friendly. The whole process was smooth and efficient. Will definitely recommend to friends!',
    avatar: '/avatars/avatar2.jpg',
    car: 'Citroen C3',
    status: 'approved',
    language: 'en'
  },
  {
    id: 3,
    name: 'Дмитрий Соколов',
    rating: 4,
    date: '2024-02-05',
    comment: 'Отличный опыт аренды MINI Cooper S! Автомобиль в идеальном состоянии, очень мощный и стильный. Персонал очень профессиональный. Поездка в Салоу была незабываемой благодаря этому автомобилю. Единственное пожелание - ускорить процесс оформления документов. В целом, очень доволен и обязательно обращусь снова.',
    avatar: '/avatars/avatar3.jpg',
    car: 'MINI Cooper S',
    status: 'approved',
    language: 'ru'
  },
  {
    id: 4,
    name: 'Maria Fernández',
    rating: 5,
    date: '2024-01-30',
    comment: 'El Peugeot 208 es perfecto para la ciudad. Muy económico y fácil de aparcar. El consumo de gasolina es increíblemente bajo y el GPS nos ayudó mucho en nuestro viaje por Cambrils. El servicio de atención al cliente fue excepcional, y el proceso de alquiler muy sencillo. ¡Una experiencia fantástica!',
    avatar: '/avatars/avatar4.jpg',
    car: 'Peugeot 208',
    status: 'approved',
    language: 'es'
  },
  {
    id: 5,
    name: 'Michael Brown',
    rating: 5,
    date: '2024-01-25',
    comment: 'The Citroen C3 was perfect for our family trip to La Pineda. The diesel engine is super efficient for longer drives. The car was immaculately clean and well-maintained. The staff was helpful and provided excellent service. The pricing was transparent with no hidden fees. Will definitely use their services again!',
    avatar: '/avatars/avatar5.jpg',
    car: 'Citroen C3',
    status: 'approved',
    language: 'en'
  },
  {
    id: 6,
    name: 'Sophie Dubois',
    rating: 5,
    date: '2024-01-20',
    comment: 'Excellente expérience avec le MINI Cooper S ! La voiture était en parfait état et très puissante. J\'ai adoré les sièges sport et le toit panoramique. Le processus de location était simple et rapide. Notre voyage à Reus était magnifique grâce à cette voiture. Je recommande vivement ce service pour la qualité des véhicules et l\'attention portée aux clients.',
    avatar: '/avatars/avatar6.jpg',
    car: 'MINI Cooper S',
    status: 'approved',
    language: 'fr'
  }
]

export type { Review } 
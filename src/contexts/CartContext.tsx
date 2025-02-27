import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { Car } from '../data/cars'

interface CartItem {
  car: Car
  startDate: string
  endDate: string
  pickupLocation: string
  returnLocation: string
  additionalOptions?: string[]
}

interface CartContextType {
  items: CartItem[]
  addToCart: (item: CartItem) => void
  updateCartItem: (carId: number, updates: Partial<CartItem>) => void
  removeFromCart: (carId: number) => void
  clearCart: () => void
  isInCart: (carId: number) => boolean
  isCartOpen: boolean
  openCart: () => void
  closeCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_STORAGE_KEY = 'automocion_cart'

export const CartProvider = ({ children }: { children: ReactNode }) => {
  // Инициализируем состояние из localStorage
  const [items, setItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY)
    return savedCart ? JSON.parse(savedCart) : []
  })
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Сохраняем корзину в localStorage при каждом изменении
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const addToCart = (item: CartItem) => {
    // Проверяем, нет ли уже этой машины в корзине
    if (!isInCart(item.car.id)) {
      setItems(prev => [...prev, item])
      setIsCartOpen(true) // Автоматически открываем корзину при добавлении
    }
  }

  const updateCartItem = (carId: number, updates: Partial<CartItem>) => {
    setItems(prev => 
      prev.map(item => 
        item.car.id === carId ? { ...item, ...updates } : item
      )
    )
  }

  const removeFromCart = (carId: number) => {
    setItems(prev => prev.filter(item => item.car.id !== carId))
  }

  const clearCart = () => {
    setItems([])
  }

  const isInCart = (carId: number) => {
    return items.some(item => item.car.id === carId)
  }

  const openCart = () => setIsCartOpen(true)
  const closeCart = () => setIsCartOpen(false)

  return (
    <CartContext.Provider value={{ 
      items, 
      addToCart,
      updateCartItem,
      removeFromCart, 
      clearCart, 
      isInCart,
      isCartOpen,
      openCart,
      closeCart
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
} 
import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useCart } from '../contexts/CartContext'
import PageTransition from '../components/PageTransition'

interface CheckoutForm {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  country: string
  postalCode: string
  comments: string
  additionalOptions: string[]
}

const additionalOptions = [
  { id: 'gps', name: 'gps', price: 5, description: 'GPS navigation system' },
  { id: 'childSeat', name: 'childSeat', price: 10, description: 'Child safety seat' },
  { id: 'insurance', name: 'insurance', price: 15, description: 'Additional insurance coverage' },
  { id: 'wifi', name: 'wifi', price: 8, description: 'Portable WiFi hotspot' },
]

const CheckoutPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { items, clearCart } = useCart()
  
  // Объединяем все дополнительные опции из элементов корзины
  const initialOptions = useMemo(() => {
    const allOptions = new Set<string>();
    items.forEach(item => {
      if (item.additionalOptions) {
        item.additionalOptions.forEach(option => allOptions.add(option));
      }
    });
    return Array.from(allOptions);
  }, [items]);
  
  const [form, setForm] = useState<CheckoutForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    comments: '',
    additionalOptions: initialOptions
  })

  if (items.length === 0) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t('checkout.empty')}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {t('checkout.emptyMessage')}
            </p>
            <button
              onClick={() => navigate('/catalog')}
              className="mt-4 btn-primary"
            >
              {t('checkout.backToCatalog')}
            </button>
          </div>
        </div>
      </PageTransition>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Здесь будет логика отправки заказа
    const order = {
      items,
      customerInfo: form,
      orderDate: new Date().toISOString(),
      totalAmount: calculateTotal()
    }

    // Временно: сохраняем в localStorage для демонстрации
    const orders = JSON.parse(localStorage.getItem('orders') || '[]')
    orders.push(order)
    localStorage.setItem('orders', JSON.stringify(orders))

    // Очищаем корзину
    clearCart()

    // Перенаправляем на страницу успешного оформления
    navigate('/checkout/success')
  }

  const handleOptionToggle = (optionId: string) => {
    setForm(prev => ({
      ...prev,
      additionalOptions: prev.additionalOptions.includes(optionId)
        ? prev.additionalOptions.filter(id => id !== optionId)
        : [...prev.additionalOptions, optionId]
    }))
  }

  const calculateTotal = () => {
    let total = 0;
    
    // Рассчитываем стоимость аренды для каждого автомобиля
    items.forEach(item => {
      const startDate = new Date(item.startDate);
      const endDate = new Date(item.endDate);
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
      
      total += item.car.price * diffDays;
      
      // Добавляем плату за разные места получения и возврата
      if (item.pickupLocation !== item.returnLocation) {
        total += 50;
      }
    });
    
    // Добавляем стоимость дополнительных опций
    form.additionalOptions.forEach(optionId => {
      const option = additionalOptions.find(opt => opt.id === optionId);
      if (option) {
        total += option.price;
      }
    });
    
    return total;
  }

  return (
    <PageTransition>
      <div className="bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 pt-16 pb-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              {t('checkout.title')}
            </h1>

            <form onSubmit={handleSubmit} className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
              <div className="lg:col-span-7">
                {/* Персональные данные */}
                <div className="border-b border-gray-200 dark:border-gray-700 pb-8">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                    {t('checkout.personalInfo')}
                  </h2>
                  <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t('checkout.form.firstName')}
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        value={form.firstName}
                        onChange={e => setForm(prev => ({ ...prev, firstName: e.target.value }))}
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white sm:text-sm"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t('checkout.form.lastName')}
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        value={form.lastName}
                        onChange={e => setForm(prev => ({ ...prev, lastName: e.target.value }))}
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white sm:text-sm"
                        required
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t('checkout.form.email')}
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={form.email}
                        onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white sm:text-sm"
                        required
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t('checkout.form.phone')}
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={form.phone}
                        onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))}
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white sm:text-sm"
                        required
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t('checkout.form.address')}
                      </label>
                      <input
                        type="text"
                        id="address"
                        value={form.address}
                        onChange={e => setForm(prev => ({ ...prev, address: e.target.value }))}
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white sm:text-sm"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t('checkout.form.city')}
                      </label>
                      <input
                        type="text"
                        id="city"
                        value={form.city}
                        onChange={e => setForm(prev => ({ ...prev, city: e.target.value }))}
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white sm:text-sm"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t('checkout.form.country')}
                      </label>
                      <input
                        type="text"
                        id="country"
                        value={form.country}
                        onChange={e => setForm(prev => ({ ...prev, country: e.target.value }))}
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white sm:text-sm"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t('checkout.form.postalCode')}
                      </label>
                      <input
                        type="text"
                        id="postalCode"
                        value={form.postalCode}
                        onChange={e => setForm(prev => ({ ...prev, postalCode: e.target.value }))}
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white sm:text-sm"
                        required
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="comments" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t('checkout.form.comments')}
                      </label>
                      <textarea
                        id="comments"
                        rows={4}
                        value={form.comments}
                        onChange={e => setForm(prev => ({ ...prev, comments: e.target.value }))}
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white sm:text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Дополнительные опции */}
                <div className="border-b border-gray-200 dark:border-gray-700 py-8">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    {t('booking.options.title')}
                  </h2>
                  <div className="space-y-4">
                    {additionalOptions.map((option) => (
                      <div key={option.id} className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id={option.id}
                            name={option.id}
                            type="checkbox"
                            checked={form.additionalOptions.includes(option.id)}
                            onChange={() => handleOptionToggle(option.id)}
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor={option.id} className="font-medium text-gray-700 dark:text-gray-300">
                            {t(`booking.options.${option.name}`)} (+{option.price}€)
                          </label>
                          <p className="text-gray-500 dark:text-gray-400">{t(`booking.options.${option.name}Description`)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Сводка заказа */}
              <div className="mt-10 lg:mt-0 lg:col-span-5">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
                    {t('checkout.orderSummary')}
                  </h2>

                  <div className="flow-root">
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                      {items.map((item) => (
                        <li key={item.car.id} className="py-6 flex">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={item.car.image}
                              alt={item.car.name}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>{item.car.name}</h3>
                                <p className="ml-4">{item.car.price}€/day</p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">
                                {t('checkout.rentalDates')}: {item.startDate} - {item.endDate}
                              </p>
                              <p className="mt-1 text-sm text-gray-500">
                                {t('checkout.pickupLocation')}: {item.pickupLocation}
                              </p>
                              <p className="mt-1 text-sm text-gray-500">
                                {t('checkout.returnLocation')}: {item.returnLocation}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Дополнительные опции в сводке */}
                  {form.additionalOptions.length > 0 && (
                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                        {t('booking.options.title')}
                      </h3>
                      {form.additionalOptions.map(optionId => {
                        const option = additionalOptions.find(opt => opt.id === optionId);
                        return option ? (
                          <div key={optionId} className="flex justify-between text-sm">
                            <span className="text-gray-500 dark:text-gray-400">
                              {t(`booking.options.${option.name}`)}
                            </span>
                            <span className="text-gray-900 dark:text-white">
                              {option.price}€
                            </span>
                          </div>
                        ) : null;
                      })}
                    </div>
                  )}

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
                    <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                      <p>{t('checkout.total')}</p>
                      <p>{calculateTotal().toFixed(2)}€</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                      {t('checkout.taxesIncluded')}
                    </p>
                  </div>

                  <div className="mt-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    >
                      {t('checkout.submit')}
                    </motion.button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

export default CheckoutPage 
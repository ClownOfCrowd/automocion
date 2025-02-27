import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { motion } from 'framer-motion'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { items, removeFromCart } = useCart()

  const handleCheckout = () => {
    onClose()
    navigate('/checkout')
  }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white dark:bg-gray-900 shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-white">
                          {t('cart.title')}
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300"
                            onClick={onClose}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      {items.length === 0 ? (
                        <div className="mt-8 text-center">
                          <ShoppingCartIcon className="mx-auto h-12 w-12 text-gray-400" />
                          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                            {t('cart.empty')}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {t('cart.emptyMessage')}
                          </p>
                          <div className="mt-6">
                            <button
                              type="button"
                              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              onClick={onClose}
                            >
                              {t('cart.continueShopping')}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-8">
                          <div className="flow-root">
                            <ul role="list" className="-my-6 divide-y divide-gray-200 dark:divide-gray-700">
                              {items.map((item) => (
                                <motion.li
                                  key={item.car.id}
                                  className="flex py-6"
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -20 }}
                                >
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
                                    <img
                                      src={item.car.image}
                                      alt={item.car.name}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                                        <h3>{item.car.name}</h3>
                                        <p className="ml-4">{item.car.price}€/day</p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                        {t('cart.dates')}: {item.startDate} - {item.endDate}
                                      </p>
                                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                        {t('cart.location')}: {item.pickupLocation}
                                      </p>
                                      {item.additionalOptions && item.additionalOptions.length > 0 && (
                                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                          {t('booking.options.title')}: {item.additionalOptions.length}
                                        </p>
                                      )}
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <button
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                        onClick={() => removeFromCart(item.car.id)}
                                      >
                                        {t('cart.remove')}
                                      </button>
                                    </div>
                                  </div>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>

                    {items.length > 0 && (
                      <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                          <p>{t('cart.total')}</p>
                          <p>
                            {items.reduce((total, item) => total + item.car.price, 0)}€/day
                          </p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                          {t('cart.taxesIncluded')}
                        </p>
                        <div className="mt-6">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                            onClick={handleCheckout}
                          >
                            {t('cart.checkout')}
                          </motion.button>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500 dark:text-gray-400">
                          <p>
                            {t('cart.or')}{' '}
                            <button
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                              onClick={onClose}
                            >
                              {t('cart.continueShopping')}
                            </button>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default CartDrawer 